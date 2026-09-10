/**
 * Seed 검증 게이트 — 06 데이터 기획서 §23.1 Product DB Definition of Done
 *
 * FAIL 이 하나라도 있으면 exit 1. 배포/적재를 중단한다.
 * WARN 은 DECISIONS.md 에서 이미 수용한 알려진 공백이다. 중단하지 않는다.
 *
 *   npm run seed:verify
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CAUTION_DETAIL_TAG, CAUTION_TAG, CONFIDENCE, DATA_STATUS, DISTANCE_FIT, FIT_WIDTH,
  PLATE_TYPE, PRIMARY_USE, PRODUCT_STATUS, RUNNER_LEVEL_FIT, SOURCE_TIER, WIDE_OPTION,
} from '../../src/domain/shared/vocabulary.js';
import type { SeedFile, SeedProduct, SeedProductAttrs } from './types.js';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** 기대값은 06-A v0.2 기준. 원본 DB가 개정되면 여기와 DECISIONS.md 를 함께 올린다. */
const EXPECTED = { products: 61, eligible: 29 } as const;

const failures: string[] = [];
const warnings: string[] = [];

const fail = (msg: string): void => void failures.push(msg);
const warn = (msg: string): void => void warnings.push(msg);

function check(condition: boolean, msg: string): void {
  if (!condition) fail(msg);
}

function inVocab(value: string, vocab: readonly string[]): boolean {
  return vocab.includes(value);
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

function main(): void {
  const path = resolve(REPO_ROOT, 'seed/products.v0.2.json');
  const seed = JSON.parse(readFileSync(path, 'utf8')) as SeedFile;

  const { products, productAttrs, productEvidence } = seed;
  const attrsById = new Map(productAttrs.map((a) => [a.productId, a]));

  // ── 1. 카운트 ────────────────────────────────────────────────
  check(products.length === EXPECTED.products, `product 수가 ${EXPECTED.products}가 아닙니다: ${products.length}`);
  check(productAttrs.length === products.length, `attrs 행 수가 product 수와 다릅니다: ${productAttrs.length} vs ${products.length}`);

  const eligible = products.filter((p) => p.recommendationEligible);
  check(eligible.length === EXPECTED.eligible, `Recommendation Eligible 수가 ${EXPECTED.eligible}가 아닙니다: ${eligible.length}`);

  // ── 2. 키 무결성 ─────────────────────────────────────────────
  const ids = new Set<string>();
  for (const p of products) {
    if (ids.has(p.productId)) fail(`product_id 중복: ${p.productId}`);
    ids.add(p.productId);
    if (!attrsById.has(p.productId)) fail(`attrs 행 누락: ${p.productId}`);
  }
  for (const a of productAttrs) {
    if (!ids.has(a.productId)) fail(`master에 없는 attrs 행: ${a.productId}`);
  }

  // 1 Row = 1 Model + Version (06 §8.2). version 은 null 허용.
  const modelKeys = new Set<string>();
  for (const p of products) {
    const key = `${p.brand}|${p.modelName}|${p.version ?? ''}`;
    if (modelKeys.has(key)) fail(`brand+model+version 중복: ${key}`);
    modelKeys.add(key);
  }

  // ── 3. Eligible 플래그 정합 (01 vs 02) ────────────────────────
  for (const p of products) {
    const a = attrsById.get(p.productId);
    if (!a) continue;
    if (p.recommendationEligible !== a.readyForRecommendation) {
      fail(`eligible 플래그 불일치 (01 vs 02): ${p.productId}`);
    }
  }

  // ── 4. Controlled Vocabulary (전체 61행) ──────────────────────
  for (const p of products) {
    if (!inVocab(p.productStatus, PRODUCT_STATUS)) fail(`product_status 어휘 위반: ${p.productId}=${p.productStatus}`);
    if (!inVocab(p.dataStatus, DATA_STATUS)) fail(`data_status 어휘 위반: ${p.productId}=${p.dataStatus}`);
  }
  for (const a of productAttrs) {
    if (!inVocab(a.primaryUse, PRIMARY_USE)) fail(`primary_use 어휘 위반: ${a.productId}=${a.primaryUse}`);
    if (!inVocab(a.plateType, PLATE_TYPE)) fail(`plate_type 어휘 위반: ${a.productId}=${a.plateType}`);
    if (!inVocab(a.fitWidth, FIT_WIDTH)) fail(`fit_width 어휘 위반: ${a.productId}=${a.fitWidth}`);
    if (!inVocab(a.wideOption, WIDE_OPTION)) fail(`wide_option 어휘 위반: ${a.productId}=${a.wideOption}`);
    if (!inVocab(a.runnerLevelFit, RUNNER_LEVEL_FIT)) fail(`runner_level_fit 어휘 위반: ${a.productId}=${a.runnerLevelFit}`);
    if (!inVocab(a.distanceFit, DISTANCE_FIT)) fail(`distance_fit 어휘 위반: ${a.productId}=${a.distanceFit}`);
    for (const t of a.secondaryUseTags) {
      if (!inVocab(t, PRIMARY_USE)) fail(`secondary_use_tag 어휘 위반: ${a.productId}=${t}`);
    }
    for (const t of a.cautionTags) {
      if (!inVocab(t, CAUTION_TAG)) fail(`caution_tag 어휘 위반: ${a.productId}=${t}`);
    }
    for (const t of a.cautionDetailTags) {
      if (!inVocab(t, CAUTION_DETAIL_TAG)) fail(`caution_detail_tag 어휘 위반: ${a.productId}=${t}`);
    }
    if (a.sourceTier !== null && !inVocab(a.sourceTier, SOURCE_TIER)) fail(`source_tier 어휘 위반: ${a.productId}=${a.sourceTier}`);
    if (a.confidence !== null && !inVocab(a.confidence, CONFIDENCE)) fail(`confidence 어휘 위반: ${a.productId}=${a.confidence}`);
  }

  // ── 5. Eligible 제품의 P0 필수 조건 ───────────────────────────
  for (const p of eligible) {
    const a = attrsById.get(p.productId);
    if (!a) continue;
    const id = p.productId;

    // 시장 — MVP 추천 대상은 KR 판매 확인 제품만 (06 §8.1)
    if (p.market !== 'KR') fail(`eligible인데 market이 KR이 아닙니다: ${id}=${p.market}`);
    if (p.currency !== 'KRW') fail(`eligible인데 currency가 KRW가 아닙니다: ${id}=${p.currency}`);
    if (!p.krSaleConfirmed) fail(`eligible인데 kr_sale_confirmed=false: ${id}`);
    if (!p.target30) fail(`eligible인데 target_30=false: ${id}`);

    // 데이터 상태 — VERIFIED만 추천 후보 (99_Codebook)
    if (p.dataStatus !== 'VERIFIED') fail(`eligible인데 data_status가 VERIFIED가 아닙니다: ${id}=${p.dataStatus}`);
    if (a.missingRequiredCount !== 0) fail(`eligible인데 missing_required_count=${a.missingRequiredCount}: ${id}`);

    // P0 필수 Attribute — Missing 0% (06 §21.2)
    for (const [k, v] of [
      ['cushion_score', a.cushionScore],
      ['stability_score', a.stabilityScore],
      ['responsiveness_score', a.responsivenessScore],
    ] as const) {
      if (v === null) fail(`eligible인데 ${k}가 비어 있습니다: ${id}`);
    }
    if (a.weightG === null || a.weightG <= 0) fail(`eligible인데 weight_g가 유효하지 않습니다: ${id}=${a.weightG}`);
    if (a.dropMm === null || a.dropMm <= 0) fail(`eligible인데 drop_mm이 유효하지 않습니다: ${id}=${a.dropMm}`);

    // UNKNOWN은 정상 상태지만, 추천 후보에는 허용하지 않는다
    for (const [k, v] of [
      ['plate_type', a.plateType],
      ['fit_width', a.fitWidth],
      ['wide_option', a.wideOption],
      ['runner_level_fit', a.runnerLevelFit],
      ['distance_fit', a.distanceFit],
    ] as const) {
      if (v === 'UNKNOWN') fail(`eligible인데 ${k}=UNKNOWN: ${id}`);
    }

    // 가격 — 공식 정가 (06 §21.4)
    if (p.msrp === null || p.msrp <= 0) fail(`eligible인데 공식 정가가 없습니다: ${id}`);

    // D-04: Store CTA가 이 URL로 실제 이동한다. 없으면 CTA를 렌더할 수 없다.
    if (!p.officialProductUrl.startsWith('https://')) {
      fail(`eligible인데 official_product_url이 https가 아닙니다: ${id}=${p.officialProductUrl}`);
    }

    // 성능 점수의 Source Tier는 추천 시 confidence penalty에 쓰인다
    if (a.sourceTier === null) fail(`eligible인데 source_tier가 없습니다: ${id}`);
    if (a.confidence === null) fail(`eligible인데 confidence가 없습니다: ${id}`);
  }

  // ── 6. WARN — DECISIONS.md 에서 수용한 알려진 공백 ─────────────
  const noImage = products.filter((p) => p.officialImageUrl === null);
  if (noImage.length > 0) {
    warn(`official_image_url 없음 ${noImage.length}/${products.length} (eligible ${eligible.filter((p) => p.officialImageUrl === null).length}) — Q2: Placeholder로 렌더, 채워지면 자동 교체`);
  }

  const noReview = eligible.filter((p) => (attrsById.get(p.productId)?.reviewEvidenceCount ?? 0) === 0);
  if (noReview.length > 0) {
    warn(`review evidence 0건인 eligible ${noReview.length}건 — WATCH 영역이 비게 되므로 Template Fallback 문구 필요: ${noReview.map((p) => p.displayName).join(', ')}`);
  }

  const lowTier = eligible.filter((p) => attrsById.get(p.productId)?.sourceTier !== 'A_RTINGS');
  if (lowTier.length > 0) {
    warn(`Tier A(RTINGS)가 아닌 eligible ${lowTier.length}건 — Score에 confidence penalty 필요: ${lowTier.map((p) => `${p.displayName}(${attrsById.get(p.productId)?.sourceTier})`).join(', ')}`);
  }

  const evidenceIds = new Set(productEvidence.map((e) => e.productId));
  const noEvidence = products.filter((p) => !evidenceIds.has(p.productId));
  if (noEvidence.length > 0) {
    warn(`evidence 행이 전혀 없는 product ${noEvidence.length}건 (전부 non-eligible인지 확인): ${noEvidence.filter((p) => p.recommendationEligible).length}건이 eligible`);
  }

  // ── 7. Coverage Report — 추천 엔진 설계 근거 ───────────────────
  const elAttrs = eligible.map((p) => attrsById.get(p.productId)).filter((a): a is SeedProductAttrs => !!a);

  console.log('\n── Eligible 29 커버리지 ───────────────────────────');
  console.log(`primary_use      : ${fmt(counts(elAttrs, (a) => a.primaryUse))}`);
  console.log(`runner_level_fit : ${fmt(counts(elAttrs, (a) => a.runnerLevelFit))}`);
  console.log(`distance_fit     : ${fmt(counts(elAttrs, (a) => a.distanceFit))}`);
  console.log(`fit_width        : ${fmt(counts(elAttrs, (a) => a.fitWidth))}`);
  console.log(`plate_type       : ${fmt(counts(elAttrs, (a) => a.plateType))}`);
  console.log(`cushion          : ${fmt(counts(elAttrs, (a) => String(a.cushionScore)))}`);
  console.log(`stability        : ${fmt(counts(elAttrs, (a) => String(a.stabilityScore)))}`);
  console.log(`responsiveness   : ${fmt(counts(elAttrs, (a) => String(a.responsivenessScore)))}`);
  console.log(`brand            : ${fmt(counts(eligible, (p) => p.brand))}`);

  const weights = elAttrs.map((a) => a.weightG ?? 0);
  const msrps = eligible.map((p) => p.msrp ?? 0);
  console.log(`weight_g         : ${Math.min(...weights)} ~ ${Math.max(...weights)}`);
  console.log(`msrp             : ${Math.min(...msrps).toLocaleString()} ~ ${Math.max(...msrps).toLocaleString()} KRW`);

  // ── 8. D-06 회귀 검사 ──────────────────────────────────────────
  // Fit을 Hard Filter로 두면 "발볼 넓음 + 장거리" 후보가 0개가 된다.
  // Caution 3단계(WARN)로 처리하면 pool이 유지되어야 한다.
  const isLong = (a: SeedProductAttrs): boolean => a.primaryUse === 'LONG' || a.distanceFit === 'LONG';
  const narrowRisk = (a: SeedProductAttrs): boolean => a.fitWidth === 'NARROW' || a.cautionTags.includes('FIT_NARROW');

  const longPool = elAttrs.filter(isLong);
  const longHardFiltered = longPool.filter((a) => !narrowRisk(a));

  console.log('\n── D-06 회귀 검사 (발볼 넓음 + 장거리) ─────────────');
  console.log(`장거리 pool                : ${longPool.length}`);
  console.log(`Fit을 BLOCK으로 처리 시     : ${longHardFiltered.length}  ← 이래서 Hard Filter를 쓰지 않는다`);
  console.log(`Fit을 WARN으로 처리 시      : ${longPool.length}  (전부 후보 유지 + WATCH 노출)`);

  check(longPool.length >= 3, `장거리 후보 pool이 3 미만입니다: ${longPool.length}`);
  if (longHardFiltered.length >= 3) {
    warn('Fit을 Hard Filter로 써도 후보가 충분합니다. 원본 DB가 개정되었는지 확인하고 D-06 근거를 재검토하세요.');
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
