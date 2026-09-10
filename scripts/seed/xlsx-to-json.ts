/**
 * 06-A Product Recommendation DB v0.2 (xlsx) -> seed/products.v0.2.json
 *
 * 원본 xlsx는 읽기 전용이다. 절대 수정하지 않는다. (08 DEV Brief §5)
 * 산출 JSON은 git에 커밋해 seed 재현성을 확보한다.
 *
 *   npm run seed:build
 *   GEARMATCH_DB_XLSX=/path/to.xlsx npm run seed:build
 */
import ExcelJS from 'exceljs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RULE_VERSIONS } from '../../src/domain/shared/vocabulary.js';
import type { SeedFile, SeedProduct, SeedProductAttrs, SeedProductEvidence } from './types.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '../..');

const DEFAULT_XLSX =
  'C:/Users/chorock/OneDrive - 초록소프트㈜/바탕 화면/전진우/초록소프트/신사업기획파트/GearMatch AI/기획안/2차리뉴얼/DB/06-A_GearMatch_AI_Product_Recommendation_DB_v0.2.xlsx';

const SHEET = {
  master: '01_Product_Master',
  attrs: '02_Recommendation_Attrs',
  evidence: '03_Product_Evidence',
  benchmark: '05_v0.2_Benchmark',
} as const;

type Row = Record<string, unknown>;

/** ExcelJS 셀은 하이퍼링크/리치텍스트/수식 객체일 수 있다. 원시 텍스트만 뽑는다. */
function cellText(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o['text'] === 'string') return o['text'];
    if (typeof o['result'] !== 'undefined') return cellText(o['result']);
    if (Array.isArray(o['richText'])) {
      return (o['richText'] as { text?: string }[]).map((r) => r.text ?? '').join('');
    }
    if (typeof o['hyperlink'] === 'string') return o['hyperlink'];
    return null;
  }
  const s = String(v).trim();
  return s === '' ? null : s;
}

function readSheet(wb: ExcelJS.Workbook, name: string): Row[] {
  const ws = wb.getWorksheet(name);
  if (!ws) throw new Error(`시트를 찾을 수 없습니다: ${name}`);
  const header = (ws.getRow(1).values as unknown[]).map((h) => cellText(h) ?? '');
  const rows: Row[] = [];
  ws.eachRow((row, i) => {
    if (i === 1) return;
    const values = row.values as unknown[];
    const obj: Row = {};
    let empty = true;
    for (let c = 1; c < header.length; c++) {
      const key = header[c];
      if (!key) continue;
      const raw = values[c];
      obj[key] = raw ?? null;
      if (raw !== null && raw !== undefined && String(raw).trim() !== '') empty = false;
    }
    if (!empty) rows.push(obj);
  });
  return rows;
}

const str = (r: Row, k: string): string | null => cellText(r[k]);

function reqStr(r: Row, k: string, ctx: string): string {
  const v = str(r, k);
  if (v === null) throw new Error(`[${ctx}] 필수 값이 비어 있습니다: ${k}`);
  return v;
}

function num(r: Row, k: string): number | null {
  const v = cellText(r[k]);
  if (v === null) return null;
  const n = Number(v.replace(/,/g, ''));
  if (Number.isNaN(n)) throw new Error(`숫자로 변환할 수 없습니다: ${k}="${v}"`);
  return n;
}

/** xlsx의 boolean은 true/false 또는 'TRUE'/'FALSE' 문자열로 올 수 있다. */
function bool(r: Row, k: string): boolean {
  const raw = r[k];
  if (typeof raw === 'boolean') return raw;
  const v = cellText(raw);
  if (v === null) return false;
  const up = v.toUpperCase();
  if (up === 'TRUE' || up === '1') return true;
  if (up === 'FALSE' || up === '0') return false;
  throw new Error(`boolean으로 변환할 수 없습니다: ${k}="${v}"`);
}

/** "A;B;C" -> ["A","B","C"] */
function tags(r: Row, k: string): string[] {
  const v = str(r, k);
  if (v === null) return [];
  return v.split(';').map((t) => t.trim()).filter(Boolean);
}

function perfScore(r: Row, k: string): 1 | 2 | 3 | 4 | 5 | null {
  const n = num(r, k);
  if (n === null) return null;
  if (![1, 2, 3, 4, 5].includes(n)) throw new Error(`성능 점수는 1~5여야 합니다: ${k}=${n}`);
  return n as 1 | 2 | 3 | 4 | 5;
}

async function main(): Promise<void> {
  const src = process.env['GEARMATCH_DB_XLSX'] ?? DEFAULT_XLSX;
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(src);

  const masterRows = readSheet(wb, SHEET.master);
  const attrRows = readSheet(wb, SHEET.attrs);
  const evidenceRows = readSheet(wb, SHEET.evidence);
  const benchRows = readSheet(wb, SHEET.benchmark);

  const bench = new Map(benchRows.map((r) => [reqStr(r, 'product_id', 'benchmark'), r]));

  const products: SeedProduct[] = masterRows.map((r) => {
    const id = reqStr(r, 'product_id', 'master');
    return {
      productId: id,
      brand: reqStr(r, 'brand', id),
      brandKo: str(r, 'brand_ko'),
      series: str(r, 'series'),
      modelName: reqStr(r, 'model_name', id),
      version: str(r, 'version'),
      displayName: reqStr(r, 'display_name', id),
      market: reqStr(r, 'market', id),
      currency: reqStr(r, 'currency', id),
      productStatus: reqStr(r, 'product_status', id) as SeedProduct['productStatus'],
      krSaleConfirmed: bool(r, 'kr_sale_confirmed'),
      officialProductUrl: reqStr(r, 'official_product_url', id),
      officialImageUrl: str(r, 'official_image_url'),
      imageReferenceUrl: str(r, 'image_reference_url'),
      msrp: num(r, 'msrp_krw_or_source_currency'),
      msrpRaw: str(r, 'msrp_raw'),
      priceVerifiedAt: str(r, 'price_verified_at'),
      target30: bool(r, 'target_30'),
      recommendationEligible: bool(r, 'recommendation_eligible'),
      dataStatus: reqStr(r, 'data_status', id) as SeedProduct['dataStatus'],
      productDataVersion: reqStr(r, 'product_data_version', id),
      legacyUseCategory: str(r, 'legacy_use_category'),
      legacyDescription: str(r, 'legacy_description'),
      updatedAt: str(r, 'updated_at'),
    };
  });

  const productAttrs: SeedProductAttrs[] = attrRows.map((r) => {
    const id = reqStr(r, 'product_id', 'attrs');
    const b = bench.get(id);
    return {
      productId: id,
      primaryUse: reqStr(r, 'primary_use', id) as SeedProductAttrs['primaryUse'],
      secondaryUseTags: tags(r, 'secondary_use_tags') as SeedProductAttrs['secondaryUseTags'],
      cushionScore: perfScore(r, 'cushion_score'),
      stabilityScore: perfScore(r, 'stability_score'),
      responsivenessScore: perfScore(r, 'responsiveness_score'),
      weightG: num(r, 'weight_g'),
      dropMm: num(r, 'drop_mm'),
      plateType: reqStr(r, 'plate_type', id) as SeedProductAttrs['plateType'],
      fitWidth: reqStr(r, 'fit_width', id) as SeedProductAttrs['fitWidth'],
      wideOption: reqStr(r, 'wide_option', id) as SeedProductAttrs['wideOption'],
      runnerLevelFit: reqStr(r, 'runner_level_fit', id) as SeedProductAttrs['runnerLevelFit'],
      distanceFit: reqStr(r, 'distance_fit', id) as SeedProductAttrs['distanceFit'],
      cautionTags: tags(r, 'caution_tags') as SeedProductAttrs['cautionTags'],
      cautionDetailTags: tags(r, 'caution_detail_tags') as SeedProductAttrs['cautionDetailTags'],
      reviewEvidenceCount: num(r, 'review_evidence_count') ?? 0,
      sourceTier: b ? (str(b, 'source_tier') as SeedProductAttrs['sourceTier']) : null,
      performanceMethod: b ? str(b, 'performance_method') : null,
      confidence: b ? (str(b, 'confidence') as SeedProductAttrs['confidence']) : null,
      normalizationRuleVersion: reqStr(r, 'normalization_rule_version', id),
      dataStatus: reqStr(r, 'data_status', id) as SeedProductAttrs['dataStatus'],
      missingRequiredCount: num(r, 'missing_required_count') ?? 0,
      readyForRecommendation: bool(r, 'ready_for_recommendation'),
    };
  });

  const productEvidence: SeedProductEvidence[] = evidenceRows.map((r) => ({
    evidenceId: reqStr(r, 'evidence_id', 'evidence'),
    productId: str(r, 'product_id'),
    evidenceLevel: reqStr(r, 'evidence_level', 'evidence'),
    attributeName: reqStr(r, 'attribute_name', 'evidence'),
    rawValue: str(r, 'raw_value'),
    normalizedValue: str(r, 'normalized_value'),
    sourceType: reqStr(r, 'source_type', 'evidence'),
    sourceKind: str(r, 'source_kind'),
    sourceUrl: str(r, 'source_url'),
    verifiedAt: str(r, 'verified_at'),
    confidence: str(r, 'confidence') as SeedProductEvidence['confidence'],
    normalizationRuleVersion: str(r, 'normalization_rule_version'),
    marketContext: str(r, 'market_context'),
  }));

  const out: SeedFile = {
    meta: {
      productDbVersion: RULE_VERSIONS.productDb,
      sourceFile: basename(src),
      generatedAt: new Date().toISOString(),
      counts: {
        products: products.length,
        attrs: productAttrs.length,
        evidence: productEvidence.length,
        eligible: products.filter((p) => p.recommendationEligible).length,
      },
    },
    products,
    productAttrs,
    productEvidence,
  };

  const dest = resolve(REPO_ROOT, 'seed/products.v0.2.json');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, JSON.stringify(out, null, 2) + '\n', 'utf8');

  console.log(`source   : ${src}`);
  console.log(`products : ${out.meta.counts.products}  (eligible ${out.meta.counts.eligible})`);
  console.log(`attrs    : ${out.meta.counts.attrs}`);
  console.log(`evidence : ${out.meta.counts.evidence}`);
  console.log(`-> ${dest}`);
}

main().catch((err: unknown) => {
  console.error('seed:build 실패 -', err instanceof Error ? err.message : err);
  process.exit(1);
});
