/**
 * 10-A Product Recommendation DB v1.5 (xlsx) -> seed/products.v1.5.json
 *
 * 원본 xlsx는 읽기 전용이다. 절대 수정하지 않는다. (08 DEV Brief §5)
 * 산출 JSON은 git에 커밋해 seed 재현성을 확보한다.
 *
 *   npm run seed:build
 *   GEARMATCH_DB_XLSX=/path/to.xlsx npm run seed:build
 *
 * 2026-09-22 — D-09 정본 판정에 따라 `06-A PDB_v0.2` 기준에서 전면 재작성했다.
 *
 * v1.5는 스키마가 다르다.
 *   - 성능 점수: 1~5 세 축(cushion/stability/responsiveness) -> 0~100 여덟 축
 *   - primary_use / plate_type / specialization 이 Attrs에서 Master로 이동
 *   - evidence_id 컬럼 없음 (product_id + attribute 로 키를 만든다)
 *   - weight_g / drop_mm / fit_width / caution_tags 컬럼 없음
 *   - 다중값 구분자가 `;` 에서 `|` 로 바뀜
 *
 * 파서도 바뀌었다. 10-A 워크북은 모든 XML 요소에 `x:` 네임스페이스 접두가 붙어 있어
 * (ClosedXML 계열 writer) ExcelJS가 읽지 못한다. SheetJS로 교체했다.
 */
import { readFileSync } from 'node:fs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';
import {
  DIRECTION, PRIMARY_USE, RECOMMENDATION_STATUS, RULE_VERSIONS, SCORE_ATTRIBUTE, SPECIALIZATION,
  isScoreValue,
} from '../../src/domain/shared/vocabulary.js';
import type {
  Direction, PrimaryUse, RecommendationStatus, ScoreAttribute, ScoreValue, SourceTier,
  Specialization,
} from '../../src/domain/shared/vocabulary.js';
import type {
  SeedDirectionRule, SeedFile, SeedProduct, SeedProductEvidence, SeedProductScores,
  SeedReviewAudit, SeedScoreRubric, SeedVocabularyEntry,
} from './types.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '../..');

/** 정본 워크북은 레포 루트에 있다. (D-09) */
const DEFAULT_XLSX = resolve(
  REPO_ROOT,
  '10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx',
);

const OUT_PATH = resolve(REPO_ROOT, 'seed/products.v1.5.json');

const SHEET = {
  master: '01_Product_Master',
  attrs: '02_Recommendation_Attributes',
  evidence: '03_Product_Evidence',
  vocabulary: '04_Controlled_Vocabulary',
  rubric: '05_Score_Rubric',
  audit: '08_Web_Review_Audit',
} as const;

type Row = Record<string, unknown>;

function readSheet(wb: XLSX.WorkBook, name: string): Row[] {
  const ws = wb.Sheets[name];
  if (!ws) throw new Error(`시트를 찾을 수 없습니다: ${name}`);
  return XLSX.utils.sheet_to_json<Row>(ws, { defval: null, raw: true });
}

/** 헤더가 여러 번 등장하는 시트는 배열로 읽어 블록을 직접 찾는다. */
function readSheetRows(wb: XLSX.WorkBook, name: string): unknown[][] {
  const ws = wb.Sheets[name];
  if (!ws) throw new Error(`시트를 찾을 수 없습니다: ${name}`);
  return XLSX.utils.sheet_to_json<unknown[]>(ws, {
    header: 1, defval: null, raw: true, blankrows: true,
  });
}

function text(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === '' ? null : s;
}

const str = (r: Row, k: string): string | null => text(r[k]);

function reqStr(r: Row, k: string, ctx: string): string {
  const v = str(r, k);
  if (v === null) throw new Error(`[${ctx}] 필수 값이 비어 있습니다: ${k}`);
  return v;
}

function num(r: Row, k: string): number | null {
  const raw = r[k];
  if (raw === null || raw === undefined || raw === '') return null;
  if (typeof raw === 'number') return raw;
  const n = Number(String(raw).replace(/,/g, ''));
  if (Number.isNaN(n)) throw new Error(`숫자로 변환할 수 없습니다: ${k}="${String(raw)}"`);
  return n;
}

/**
 * 날짜 컬럼은 Excel serial(숫자)로 들어온다.
 * `cellDates: true` 로 Date를 받으면 로컬 타임존만큼 밀려 하루가 어긋나므로
 * serial을 그대로 받아 타임존 없이 변환한다. (KST에서 2026-07-02 -> 2026-07-01 이 되는 문제)
 */
function dateText(r: Row, k: string): string | null {
  const raw = r[k];
  if (raw === null || raw === undefined || raw === '') return null;
  if (typeof raw === 'number') {
    const d = XLSX.SSF.parse_date_code(raw);
    if (!d) throw new Error(`날짜 serial을 해석할 수 없습니다: ${k}=${raw}`);
    const p = (n: number): string => String(n).padStart(2, '0');
    return `${d.y}-${p(d.m)}-${p(d.d)}`;
  }
  const s = String(raw).trim();
  const m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
  return m ? m[1]! : (s === '' ? null : s);
}

/** xlsx의 boolean은 true/false 또는 'TRUE'/'True'/'FALSE' 문자열로 섞여 들어온다. */
function bool(r: Row, k: string, ctx: string): boolean {
  const raw = r[k];
  if (typeof raw === 'boolean') return raw;
  const v = text(raw);
  if (v === null) return false;
  const up = v.toUpperCase();
  if (up === 'TRUE' || up === '1') return true;
  if (up === 'FALSE' || up === '0') return false;
  throw new Error(`[${ctx}] boolean으로 변환할 수 없습니다: ${k}="${v}"`);
}

/** v1.5의 다중값 구분자는 `|` 다. (v0.2는 `;` 였다) */
function pipeList(r: Row, k: string): string[] {
  const v = str(r, k);
  if (v === null) return [];
  return v.split('|').map((t) => t.trim()).filter(Boolean);
}

function enumValue<T extends string>(
  allowed: readonly T[], raw: string, ctx: string, field: string,
): T {
  if (!(allowed as readonly string[]).includes(raw)) {
    throw new Error(
      `[${ctx}] ${field} 값이 Controlled Vocabulary에 없습니다: "${raw}" (허용: ${allowed.join(', ')})`,
    );
  }
  return raw as T;
}

function scoreOrNull(r: Row, k: string, ctx: string): ScoreValue | null {
  const n = num(r, k);
  if (n === null) return null;
  if (!isScoreValue(n)) throw new Error(`[${ctx}] 점수는 0~100 정수여야 합니다: ${k}=${n}`);
  return n;
}

/** `"Tier B - Structured Independent Review"` -> `"B"` */
function parseSourceTier(sourceType: string): SourceTier | null {
  const m = /^Tier\s+([ABC])\b/i.exec(sourceType);
  return m ? (m[1]!.toUpperCase() as SourceTier) : null;
}

/**
 * `05_Score_Rubric` 안의 Direction Role 블록을 찾아 읽는다.
 * 헤더는 `Direction | Allowed Primary Use | Role Rule | Purpose` 이고
 * 그 아래 DIRECTION 코드 행이 이어진다.
 */
function parseDirectionRules(rows: unknown[][]): SeedDirectionRule[] {
  const head = rows.findIndex(
    (r) => text(r?.[0]) === 'Direction' && text(r?.[1]) === 'Allowed Primary Use',
  );
  if (head < 0) throw new Error('05_Score_Rubric에서 Direction Role 블록을 찾지 못했습니다');

  const out: SeedDirectionRule[] = [];
  for (let i = head + 1; i < rows.length; i++) {
    const code = text(rows[i]?.[0]);
    if (code === null || !(DIRECTION as readonly string[]).includes(code)) break;
    const allowed = (text(rows[i]?.[1]) ?? '')
      .split('|').map((t) => t.trim()).filter(Boolean)
      .map((v) => enumValue<PrimaryUse>(PRIMARY_USE, v, code, 'Allowed Primary Use'));
    out.push({
      direction: code as Direction,
      allowedPrimaryUse: allowed,
      roleRule: text(rows[i]?.[2]),
      purpose: text(rows[i]?.[3]),
    });
  }
  if (out.length !== DIRECTION.length) {
    throw new Error(`Direction Rule 행이 ${DIRECTION.length}개가 아닙니다: ${out.length}`);
  }
  return out;
}

function main(): void {
  const src = process.env['GEARMATCH_DB_XLSX'] ?? DEFAULT_XLSX;
  const wb = XLSX.read(readFileSync(src), { type: 'buffer' });

  // --- 04_Controlled_Vocabulary -------------------------------------------
  const vocabulary: SeedVocabularyEntry[] = readSheet(wb, SHEET.vocabulary).map((r) => ({
    category: reqStr(r, 'category', 'vocabulary'),
    code: reqStr(r, 'code', 'vocabulary'),
    koLabel: str(r, 'ko_label'),
    definition: str(r, 'definition'),
  }));

  // --- 05_Score_Rubric (상단 8축 블록만) ------------------------------------
  // 같은 시트 하단의 Weight / Penalty 블록은 gear_reco_v1.1 Rule Config라 seed에 싣지 않는다.
  const rubricAttrs = new Set<string>(SCORE_ATTRIBUTE);
  const scoreRubric: SeedScoreRubric[] = readSheet(wb, SHEET.rubric)
    .filter((r) => {
      const a = str(r, 'Attribute');
      return a !== null && rubricAttrs.has(a);
    })
    .map((r) => ({
      attribute: str(r, 'Attribute') as ScoreAttribute,
      levels: {
        '0': str(r, '0'),
        '25': str(r, '25'),
        '50': str(r, '50'),
        '75': str(r, '75'),
        '100': str(r, '100'),
      },
      definition: str(r, 'Definition'),
    }));

  const directionRules = parseDirectionRules(readSheetRows(wb, SHEET.rubric));

  // --- 01_Product_Master ---------------------------------------------------
  const products: SeedProduct[] = readSheet(wb, SHEET.master).map((r) => {
    const id = reqStr(r, 'product_id', 'master');
    return {
      productId: id,
      brand: reqStr(r, 'brand', id),
      series: str(r, 'series'),
      model: reqStr(r, 'model', id),
      version: str(r, 'version'),
      displayName: reqStr(r, 'display_name', id),
      market: reqStr(r, 'market', id),
      currency: reqStr(r, 'currency', id),
      officialMsrpKrw: num(r, 'official_msrp_krw'),
      sourcePriceReferenceKrw: num(r, 'source_price_reference_krw'),
      primaryUse: enumValue<PrimaryUse>(PRIMARY_USE, reqStr(r, 'primary_use', id), id, 'primary_use'),
      secondaryUses: pipeList(r, 'secondary_uses').map(
        (v) => enumValue<PrimaryUse>(PRIMARY_USE, v, id, 'secondary_uses'),
      ),
      specialization: enumValue<Specialization>(
        SPECIALIZATION, reqStr(r, 'specialization', id), id, 'specialization',
      ),
      plateType: reqStr(r, 'plate_type', id),
      sourceIndex: num(r, 'source_index'),
      sourceCategory: str(r, 'source_category'),
      recommendationStatus: enumValue<RecommendationStatus>(
        RECOMMENDATION_STATUS, reqStr(r, 'recommendation_status', id), id, 'recommendation_status',
      ),
      recommendationEligible: bool(r, 'recommendation_eligible', id),
      calibrationSet: bool(r, 'calibration_set', id),
      officialProductUrl: str(r, 'official_product_url'),
      imageSourceUrl: str(r, 'image_source_url'),
      sourceVerifiedAt: dateText(r, 'source_verified_at'),
      productDbVersion: reqStr(r, 'product_db_version', id),
      sourceNote: str(r, 'source_note'),
    };
  });

  // --- 02_Recommendation_Attributes ---------------------------------------
  const productScores: SeedProductScores[] = readSheet(wb, SHEET.attrs).map((r) => {
    const id = reqStr(r, 'product_id', 'attrs');
    const scores = Object.fromEntries(
      SCORE_ATTRIBUTE.map((a) => [a, scoreOrNull(r, a, id)]),
    ) as Record<ScoreAttribute, ScoreValue | null>;
    return {
      productId: id,
      displayName: reqStr(r, 'display_name', id),
      scores,
      scored: SCORE_ATTRIBUTE.every((a) => scores[a] !== null),
      scoreStatus: str(r, 'score_status'),
      evidenceCount: num(r, 'evidence_count') ?? 0,
      reviewedAt: dateText(r, 'reviewed_at'),
      reviewer: str(r, 'reviewer'),
      notes: str(r, 'notes'),
    };
  });

  // --- 03_Product_Evidence -------------------------------------------------
  const productEvidence: SeedProductEvidence[] = readSheet(wb, SHEET.evidence).map((r) => {
    const id = reqStr(r, 'product_id', 'evidence');
    const attribute = enumValue<ScoreAttribute>(
      SCORE_ATTRIBUTE, reqStr(r, 'attribute', id), id, 'attribute',
    );
    const sourceType = reqStr(r, 'source_type', id);
    return {
      evidenceKey: `${id}:${attribute}`,
      productId: id,
      attribute,
      rawEvidence: str(r, 'raw_evidence'),
      normalizedValue: scoreOrNull(r, 'normalized_value', id),
      sourceType,
      sourceTier: parseSourceTier(sourceType),
      sourceUrl: str(r, 'source_url'),
      secondarySourceUrl: str(r, 'secondary_source_url'),
      sourceDate: dateText(r, 'source_date'),
      normalizationReason: str(r, 'normalization_reason'),
      reviewer: str(r, 'reviewer'),
      evidenceStatus: str(r, 'evidence_status'),
      evidenceVersion: str(r, 'evidence_version'),
    };
  });

  // --- 08_Web_Review_Audit -------------------------------------------------
  const reviewAudit: SeedReviewAudit[] = readSheet(wb, SHEET.audit).map((r) => ({
    productId: reqStr(r, 'product_id', 'audit'),
    reviewedPrimaryUse: str(r, 'reviewed_primary_use'),
    reviewedPlateType: str(r, 'reviewed_plate_type'),
    reviewSource1: str(r, 'review_source_1'),
    reviewSource2: str(r, 'review_source_2'),
    reviewConsensus: str(r, 'review_consensus'),
    auditResult: str(r, 'audit_result'),
    masterAction: str(r, 'master_action'),
    scoreAction: str(r, 'score_action'),
    auditDate: dateText(r, 'audit_date'),
    auditVersion: str(r, 'audit_version'),
  }));

  const out: SeedFile = {
    meta: {
      productDbVersion: RULE_VERSIONS.productDb,
      normalizationRuleVersion: RULE_VERSIONS.normalization,
      recommendationRuleVersion: RULE_VERSIONS.recommendation,
      sourceFile: basename(src),
      generatedAt: new Date().toISOString(),
      counts: {
        products: products.length,
        eligible: products.filter((p) => p.recommendationEligible).length,
        scored: productScores.filter((s) => s.scored).length,
        evidence: productEvidence.length,
        audit: reviewAudit.length,
        vocabulary: vocabulary.length,
        scoreRubric: scoreRubric.length,
        directionRules: directionRules.length,
      },
    },
    vocabulary,
    scoreRubric,
    directionRules,
    products,
    productScores,
    productEvidence,
    reviewAudit,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');

  const c = out.meta.counts;
  console.log(`source     : ${src}`);
  console.log(`products   : ${c.products}  (eligible ${c.eligible} / scored ${c.scored})`);
  console.log(`evidence   : ${c.evidence}`);
  console.log(`audit      : ${c.audit}`);
  console.log(`vocabulary : ${c.vocabulary}`);
  console.log(`rubric     : ${c.scoreRubric}`);
  console.log(`directions : ${c.directionRules}`);
  console.log(`-> ${OUT_PATH}`);
}

try {
  main();
} catch (err: unknown) {
  console.error('seed:build 실패 -', err instanceof Error ? err.message : err);
  process.exit(1);
}
