/**
 * Seed 검증 게이트 — 06 데이터 기획서 §23.1 Product DB Definition of Done
 *
 * FAIL 이 하나라도 있으면 exit 1. 배포/적재를 중단한다.
 * WARN 은 DECISIONS.md 에서 이미 수용한 알려진 공백이다. 중단하지 않는다.
 *
 *   npm run seed:verify
 *
 * 2026-09-22 — D-09 정본 판정에 따라 `PDB_v0.2` 기준에서 `product_db_v1.5` 기준으로 재작성했다.
 * v0.2의 D-06 회귀 검사(발볼 넓음 + 장거리)는 v1.5에 fit_width / caution_tags 컬럼이 없어
 * 그대로 옮길 수 없다. 대신 같은 성격의 실측 검사인 **Direction 후보 커버리지**로 교체했다.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DIRECTION, GEAR_NEED, PRIMARY_USE, PRIORITY, RECOMMENDATION_STATUS, RULE_VERSIONS,
  SCORE_ATTRIBUTE, SPECIALIZATION, isScoreValue,
} from '../../src/domain/shared/vocabulary.js';
import type { SeedFile } from './types.js';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** 기대값은 10-A v1.5 기준. 원본 DB가 개정되면 여기와 DECISIONS.md 를 함께 올린다. */
const EXPECTED = {
  products: 35,
  eligible: 10,
  evidencePerProduct: SCORE_ATTRIBUTE.length, // 8축 × eligible 10 = 80
  directions: DIRECTION.length,
} as const;

/** 한 Direction이 채워야 하는 후보 수. D-05: 순위 없는 최대 3 후보. */
const CANDIDATES_PER_DIRECTION = 3;

const failures: string[] = [];
const warnings: string[] = [];

const fail = (msg: string): void => void failures.push(msg);
const warn = (msg: string): void => void warnings.push(msg);

function check(condition: boolean, msg: string): void {
  if (!condition) fail(msg);
}

function counts<T>(items: T[], key: (t: T) => string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) {
    const k = key(it);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

const fmt = (rec: Record<string, number>): string =>
  Object.entries(rec)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `${k} ${v}`)
    .join(' / ');

/** 워크북의 Controlled Vocabulary와 코드 상수가 어긋나면 양쪽 다 보고한다. */
function crossCheckVocab(
  label: string, fromSheet: string[], fromCode: readonly string[],
): void {
  const sheet = new Set(fromSheet);
  const code = new Set(fromCode);
  for (const c of code) {
    if (!sheet.has(c)) fail(`${label}: 코드 상수에만 있고 04_Controlled_Vocabulary에 없습니다: ${c}`);
  }
  for (const s of sheet) {
    if (!code.has(s)) fail(`${label}: 워크북에만 있고 vocabulary.ts에 없습니다: ${s}`);
  }
}

function main(): void {
  const path = resolve(REPO_ROOT, 'seed/products.v1.5.json');
  const seed = JSON.parse(readFileSync(path, 'utf8')) as SeedFile;

  const { products, productScores, productEvidence, reviewAudit, vocabulary,
    scoreRubric, directionRules } = seed;

  const scoresById = new Map(productScores.map((s) => [s.productId, s]));
  const auditById = new Map(reviewAudit.map((a) => [a.productId, a]));

  // ── 1. Rule Version ──────────────────────────────────────────
  check(seed.meta.productDbVersion === RULE_VERSIONS.productDb,
    `meta.productDbVersion 불일치: ${seed.meta.productDbVersion} != ${RULE_VERSIONS.productDb}`);
  for (const p of products) {
    if (p.productDbVersion !== RULE_VERSIONS.productDb) {
      fail(`product_db_version 불일치: ${p.productId}=${p.productDbVersion}`);
    }
  }

  // ── 2. 카운트 ────────────────────────────────────────────────
  check(products.length === EXPECTED.products,
    `product 수가 ${EXPECTED.products}가 아닙니다: ${products.length}`);
  check(productScores.length === products.length,
    `scores 행 수가 product 수와 다릅니다: ${productScores.length} vs ${products.length}`);
  check(reviewAudit.length === products.length,
    `audit 행 수가 product 수와 다릅니다: ${reviewAudit.length} vs ${products.length}`);
  check(directionRules.length === EXPECTED.directions,
    `Direction Rule이 ${EXPECTED.directions}개가 아닙니다: ${directionRules.length}`);

  const eligible = products.filter((p) => p.recommendationEligible);
  check(eligible.length === EXPECTED.eligible,
    `Recommendation Eligible 수가 ${EXPECTED.eligible}가 아닙니다: ${eligible.length}`);

  // ── 3. 키 무결성 ─────────────────────────────────────────────
  const ids = new Set<string>();
  for (const p of products) {
    if (ids.has(p.productId)) fail(`product_id 중복: ${p.productId}`);
    ids.add(p.productId);
    if (!scoresById.has(p.productId)) fail(`scores 행 누락: ${p.productId}`);
    if (!auditById.has(p.productId)) fail(`audit 행 누락: ${p.productId}`);
  }
  for (const s of productScores) {
    if (!ids.has(s.productId)) fail(`master에 없는 scores 행: ${s.productId}`);
  }
  for (const e of productEvidence) {
    if (!ids.has(e.productId)) fail(`master에 없는 evidence 행: ${e.productId}`);
  }

  const evidenceKeys = new Set<string>();
  for (const e of productEvidence) {
    if (evidenceKeys.has(e.evidenceKey)) fail(`evidence 키 중복: ${e.evidenceKey}`);
    evidenceKeys.add(e.evidenceKey);
  }

  // 1 Row = 1 Model + Version. version 은 null 허용.
  const modelKeys = new Set<string>();
  for (const p of products) {
    const key = `${p.brand}|${p.model}|${p.version ?? ''}`;
    if (modelKeys.has(key)) fail(`brand+model+version 중복: ${key}`);
    modelKeys.add(key);
  }

  // ── 4. Eligible 플래그 정합 ───────────────────────────────────
  // VERIFIED / eligible / calibration_set / 점수 보유가 모두 같은 집합이어야 한다.
  for (const p of products) {
    const s = scoresById.get(p.productId);
    if (!s) continue;
    const verified = p.recommendationStatus === 'VERIFIED';
    if (p.recommendationEligible !== verified) {
      fail(`eligible과 recommendation_status 불일치: ${p.productId} (eligible=${p.recommendationEligible}, status=${p.recommendationStatus})`);
    }
    if (p.recommendationEligible !== p.calibrationSet) {
      fail(`eligible과 calibration_set 불일치: ${p.productId}`);
    }
    if (p.recommendationEligible !== s.scored) {
      fail(`eligible과 점수 보유 여부 불일치: ${p.productId} (scored=${s.scored})`);
    }
  }

  // ── 5. Controlled Vocabulary ─────────────────────────────────
  const byCategory = (cat: string): string[] =>
    vocabulary.filter((v) => v.category === cat).map((v) => v.code);

  crossCheckVocab('PRIMARY_USE', byCategory('PRIMARY_USE'), PRIMARY_USE);
  crossCheckVocab('SPECIALIZATION', byCategory('SPECIALIZATION'), SPECIALIZATION);
  crossCheckVocab('STATUS', byCategory('STATUS'), RECOMMENDATION_STATUS);
  crossCheckVocab('GEAR_NEED', byCategory('GEAR_NEED'), GEAR_NEED);
  crossCheckVocab('PRIORITY', byCategory('PRIORITY'), PRIORITY);
  crossCheckVocab('DIRECTION', byCategory('DIRECTION'), DIRECTION);

  const inVocab = (v: string, set: readonly string[]): boolean => set.includes(v);
  for (const p of products) {
    if (!inVocab(p.primaryUse, PRIMARY_USE)) fail(`primary_use 어휘 위반: ${p.productId}=${p.primaryUse}`);
    if (!inVocab(p.specialization, SPECIALIZATION)) fail(`specialization 어휘 위반: ${p.productId}=${p.specialization}`);
    if (!inVocab(p.recommendationStatus, RECOMMENDATION_STATUS)) fail(`recommendation_status 어휘 위반: ${p.productId}=${p.recommendationStatus}`);
    for (const u of p.secondaryUses) {
      if (!inVocab(u, PRIMARY_USE)) fail(`secondary_uses 어휘 위반: ${p.productId}=${u}`);
      if (u === p.primaryUse) fail(`secondary_uses가 primary_use와 같습니다: ${p.productId}=${u}`);
    }
  }

  // ── 6. 점수 범위 / Rubric ─────────────────────────────────────
  const rubricAttrs = new Set(scoreRubric.map((r) => r.attribute));
  for (const a of SCORE_ATTRIBUTE) {
    if (!rubricAttrs.has(a)) fail(`05_Score_Rubric에 ${a} 정의가 없습니다`);
  }
  for (const s of productScores) {
    for (const a of SCORE_ATTRIBUTE) {
      const v = s.scores[a];
      if (v !== null && !isScoreValue(v)) fail(`점수 범위 위반 (0~100 정수): ${s.productId}.${a}=${v}`);
    }
  }

  // ── 7. Evidence ↔ Score 교차 검증 ─────────────────────────────
  // 근거의 normalized_value와 02 시트의 점수가 다르면 근거 표시가 거짓말이 된다.
  for (const e of productEvidence) {
    const s = scoresById.get(e.productId);
    if (!s) continue;
    const scoreValue = s.scores[e.attribute];
    if (scoreValue !== e.normalizedValue) {
      fail(`evidence와 점수 불일치: ${e.evidenceKey} (score=${String(scoreValue)}, evidence=${String(e.normalizedValue)})`);
    }
  }

  // ── 8. Eligible 제품의 P0 필수 조건 ───────────────────────────
  for (const p of eligible) {
    const s = scoresById.get(p.productId);
    const id = p.productId;
    if (!s) continue;

    // 시장 — MVP 추천 대상은 KR 판매 제품만
    if (p.market !== 'KR') fail(`eligible인데 market이 KR이 아닙니다: ${id}=${p.market}`);
    if (p.currency !== 'KRW') fail(`eligible인데 currency가 KRW가 아닙니다: ${id}=${p.currency}`);

    // P0 필수 점수 — 8축 Missing 0%
    for (const a of SCORE_ATTRIBUTE) {
      if (s.scores[a] === null) fail(`eligible인데 ${a} 점수가 비어 있습니다: ${id}`);
    }

    // 가격
    if (p.officialMsrpKrw === null || p.officialMsrpKrw <= 0) {
      fail(`eligible인데 공식 정가가 없습니다: ${id}`);
    }

    // D-04: Store CTA가 이 URL로 실제 이동한다. 없으면 CTA를 렌더할 수 없다.
    if (p.officialProductUrl === null || !p.officialProductUrl.startsWith('https://')) {
      fail(`eligible인데 official_product_url이 https가 아닙니다: ${id}=${String(p.officialProductUrl)}`);
    }

    // 근거 — 8축 전부에 Source가 있어야 Product Card Expand를 채울 수 있다
    const evs = productEvidence.filter((e) => e.productId === id);
    if (evs.length !== EXPECTED.evidencePerProduct) {
      fail(`eligible인데 evidence가 ${EXPECTED.evidencePerProduct}건이 아닙니다: ${id}=${evs.length}`);
    }
    if (s.evidenceCount <= 0) fail(`eligible인데 evidence_count=0: ${id}`);

    // 점수가 아직 확정 전인 제품이 추천에 올라가면 안 된다
    const audit = auditById.get(id);
    if (audit?.scoreAction === 'HOLD_FOR_REVIEW') {
      fail(`eligible인데 score_action=HOLD_FOR_REVIEW: ${id}`);
    }
  }

  // ── 9. WARN — 수용된 공백 ─────────────────────────────────────
  const draft = products.filter((p) => !p.recommendationEligible);
  if (draft.length > 0) {
    warn(`추천 후보가 아닌 product ${draft.length}/${products.length}건 — 점수/근거 미확보. MVP는 "현재 등록된 제품 범위"를 정직하게 고지한다`);
  }

  const hold = reviewAudit.filter((a) => a.scoreAction === 'HOLD_FOR_REVIEW');
  if (hold.length > 0) {
    warn(`score_action=HOLD_FOR_REVIEW ${hold.length}건 — 웹 리뷰가 엇갈려 점수 확정 보류: ${hold.map((a) => a.productId).join(', ')}`);
  }

  const noImage = products.filter((p) => p.imageSourceUrl === null || p.imageSourceUrl === p.officialProductUrl);
  if (noImage.length > 0) {
    warn(`image_source_url이 제품 페이지 URL과 같거나 비어 있는 product ${noImage.length}/${products.length}건 — 실제 이미지 URL이 아니다. Placeholder로 렌더하고 채워지면 교체`);
  }

  const tiers = counts(productEvidence, (e) => e.sourceTier ?? 'UNKNOWN');
  if ((tiers['A'] ?? 0) === 0 && productEvidence.length > 0) {
    warn(`evidence Source Tier가 전부 ${fmt(tiers)} — Tier A가 없다. Score에 confidence penalty 필요`);
  }

  // ── 10. Coverage Report ───────────────────────────────────────
  console.log(`\n── Eligible ${eligible.length} 커버리지 ─────────────────────`);
  console.log(`primary_use    : ${fmt(counts(eligible, (p) => p.primaryUse))}`);
  console.log(`specialization : ${fmt(counts(eligible, (p) => p.specialization))}`);
  console.log(`plate_type     : ${fmt(counts(eligible, (p) => p.plateType))}`);
  console.log(`brand          : ${fmt(counts(eligible, (p) => p.brand))}`);

  const msrps = eligible.map((p) => p.officialMsrpKrw ?? 0);
  if (msrps.length > 0) {
    console.log(`msrp           : ${Math.min(...msrps).toLocaleString()} ~ ${Math.max(...msrps).toLocaleString()} KRW`);
  }

  console.log(`\n── plate_type 값 인벤토리 (전체 ${products.length}) ──────`);
  console.log(`  ${fmt(counts(products, (p) => p.plateType))}`);

  // ── 11. Direction 후보 커버리지 (v1.5 실측 검사) ────────────────
  // D-05: 추천은 순위가 아니라 서로 다른 선택 방향 최대 3개다.
  // 어떤 Direction의 후보가 0이면 그 방향 자체를 렌더할 수 없다.
  console.log('\n── Direction 후보 커버리지 ────────────────────────');
  const thin: string[] = [];
  for (const rule of directionRules) {
    const pool = eligible.filter((p) => rule.allowedPrimaryUse.includes(p.primaryUse));
    const mark = pool.length === 0 ? '  <- 렌더 불가'
      : pool.length < CANDIDATES_PER_DIRECTION ? `  <- ${CANDIDATES_PER_DIRECTION} 미만` : '';
    console.log(`${rule.direction.padEnd(20)} ${String(pool.length).padStart(2)}${mark}`);
    if (pool.length === 0) {
      fail(`Direction "${rule.direction}"의 eligible 후보가 0입니다 (허용 primary_use: ${rule.allowedPrimaryUse.join('|')})`);
    } else if (pool.length < CANDIDATES_PER_DIRECTION) {
      thin.push(`${rule.direction}(${pool.length})`);
    }
  }
  if (thin.length > 0) {
    warn(`후보가 ${CANDIDATES_PER_DIRECTION} 미만인 Direction ${thin.length}건 — 카드 3장을 채울 수 없다. DRAFT 제품 검증으로 pool을 늘려야 한다: ${thin.join(', ')}`);
  }

  // ── 결과 ─────────────────────────────────────────────────────
  if (warnings.length > 0) {
    console.log('\n── WARN (수용된 공백) ────────────────────────────');
    for (const w of warnings) console.log(`  ! ${w}`);
  }

  if (failures.length > 0) {
    console.error('\n── FAIL ─────────────────────────────────────────');
    for (const f of failures) console.error(`  x ${f}`);
    console.error(`\nseed:verify 실패 — ${failures.length}건`);
    process.exit(1);
  }

  console.log(`\nseed:verify 통과 — products ${products.length} / eligible ${eligible.length} / evidence ${productEvidence.length}`);
}

main();
