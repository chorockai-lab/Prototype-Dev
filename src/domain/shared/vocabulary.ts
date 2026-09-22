/**
 * Controlled Vocabulary — 출처: `10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx`
 *                                시트 `04_Controlled_Vocabulary`
 *
 * 이 파일은 Product DB의 값 집합에 대한 단일 정의다.
 * DB 원본에 없는 값을 여기에 추가하지 않는다. (Source 없는 값 생성 금지)
 *
 * 2026-09-22 — D-09 정본 판정에 따라 `06-A PDB_v0.2` 기준에서 `10-A product_db_v1.5` 기준으로 교체했다.
 * v0.2에만 있던 값 집합(FIT_WIDTH / WIDE_OPTION / RUNNER_LEVEL_FIT / DISTANCE_FIT / PRODUCT_STATUS /
 * CONFIDENCE)은 v1.5 워크북에 대응 컬럼이 없어 제거했다. 필요해지면 DB에 컬럼이 생긴 뒤에 다시 넣는다.
 */

// ---------------------------------------------------------------------------
// 04_Controlled_Vocabulary 가 정의하는 값 집합 (정본)
// ---------------------------------------------------------------------------

/** category=PRIMARY_USE. 제품의 주 역할. */
export const PRIMARY_USE = [
  'DAILY', 'CUSHION_LONG', 'STABILITY', 'SPEED_TRAINING', 'SUPER_TRAINER', 'RACE',
] as const;

/** category=SPECIALIZATION. 용도 폭이 넓은지 특정 목적에 치우쳤는지. */
export const SPECIALIZATION = ['GENERAL', 'PERFORMANCE', 'SPECIALIZED'] as const;

/** category=STATUS. `01_Product_Master.recommendation_status` 의 값 집합. */
export const RECOMMENDATION_STATUS = ['DRAFT', 'VERIFIED', 'STALE', 'EXCLUDED'] as const;

/** category=GEAR_NEED. 사용자가 고른 장비 목적. */
export const GEAR_NEED = ['COMFORT', 'SPEED', 'DISTANCE', 'RACE', 'UNSURE'] as const;

/** category=PRIORITY. 이번 선택에서 가장 놓치고 싶지 않은 것. */
export const PRIORITY = [
  'COMFORT', 'STABILITY', 'RESPONSIVENESS', 'VERSATILITY', 'PERFORMANCE',
] as const;

/** category=DIRECTION. 추천은 순위가 아니라 서로 다른 선택 방향이다. (D-05) */
export const DIRECTION = [
  'DAILY_COMFORT', 'BALANCED_ALLROUND', 'STABILITY_SUPPORT', 'LONG_DISTANCE',
  'SPEED_TRAINING', 'PERFORMANCE_STEPUP', 'RACE_FOCUS',
] as const;

export type PrimaryUse = (typeof PRIMARY_USE)[number];
export type Specialization = (typeof SPECIALIZATION)[number];
export type RecommendationStatus = (typeof RECOMMENDATION_STATUS)[number];
export type GearNeed = (typeof GEAR_NEED)[number];
export type Priority = (typeof PRIORITY)[number];
export type Direction = (typeof DIRECTION)[number];

// ---------------------------------------------------------------------------
// 02_Recommendation_Attributes 의 점수 축
// ---------------------------------------------------------------------------

/** 점수 8축. `05_Score_Rubric` 이 각 축의 0/25/50/75/100 의미를 정의한다. */
export const SCORE_ATTRIBUTE = [
  'daily', 'comfort', 'stability', 'responsiveness', 'long_run', 'speed', 'race', 'versatility',
] as const;

export type ScoreAttribute = (typeof SCORE_ATTRIBUTE)[number];

/**
 * 성능 점수는 0~100 정수다. (v0.2의 1~5 척도에서 변경됨)
 * Source가 없으면 null이며, 임의 추정하지 않는다.
 * 사용자에게 원점수를 그대로 노출하지 않는다. (CLAUDE.md §6)
 */
export type ScoreValue = number;

export const SCORE_MIN = 0;
export const SCORE_MAX = 100;

export function isScoreValue(n: unknown): n is ScoreValue {
  return typeof n === 'number' && Number.isInteger(n) && n >= SCORE_MIN && n <= SCORE_MAX;
}

export type ProductScores = Record<ScoreAttribute, ScoreValue | null>;

// ---------------------------------------------------------------------------
// 값 집합이 워크북에 선언돼 있지 않은 컬럼
// ---------------------------------------------------------------------------

/**
 * `plate_type` 은 v1.5에서 Controlled Vocabulary에 없다.
 * 실제로 14종의 서술형 값이 들어 있다(`CARBON_RODS`, `NYLON_FIBERGLASS_SPEEDBOARD` 등).
 * enum으로 고정하면 DB가 조금만 세분화돼도 seed가 깨지므로 문자열로 둔다.
 * 실제 값 목록은 `npm run seed:verify` 가 인벤토리로 출력한다.
 */
export type PlateType = string;

/**
 * `03_Product_Evidence.source_type` 은 `"Tier B - Structured Independent Review"` 형태다.
 * 앞의 Tier 문자만 떼어 낸 것이 SourceTier다.
 */
export const SOURCE_TIER = ['A', 'B', 'C'] as const;
export type SourceTier = (typeof SOURCE_TIER)[number];

// ---------------------------------------------------------------------------
// Recommendation Rule 쪽 값 집합 (Product DB 컬럼이 아니다)
// ---------------------------------------------------------------------------

/**
 * Caution은 제품 고정 속성이 아니라 **사용자 Context × 제품 속성으로 런타임 결정**한다. (D-06)
 * 따라서 Product DB v1.5에 caution 컬럼이 없는 것이 정상이며, seed도 이 값을 싣지 않는다.
 * WARN 등급은 카드 `WATCH` 영역에 필수 노출한다.
 */
export const CAUTION_TAG = [
  'FIT_NARROW', 'FIT_WIDE', 'STABILITY_LOW', 'PLATE_STIFF', 'HEAVY', 'AGGRESSIVE_RIDE', 'OTHER',
] as const;

/** Review 운영용 세부 태그. Recommendation Score에 직접 사용하지 않는다. */
export const CAUTION_DETAIL_TAG = [
  'HEAT_BREATHABILITY', 'WET_GRIP', 'DURABILITY', 'HEEL_SLIP', 'BLISTER', 'FOREFOOT_PRESSURE',
] as const;

export type CautionTag = (typeof CAUTION_TAG)[number];
export type CautionDetailTag = (typeof CAUTION_DETAIL_TAG)[number];

/** DECISIONS.md 의 Rule Version. 변경 시 반드시 올린다. */
export const RULE_VERSIONS = {
  productDb: 'product_db_v1.5',
  normalization: 'product_norm_v1.1',
  /** Runner Type 6종 확정(D-09). GM-031 착수 시 TYPE_RULE_v0.2로 올린다. */
  runnerType: 'TYPE_RULE_v0.1',
  similarity: 'SIM_v0.1',
  recommendation: 'gear_reco_v1.1',
  prompt: 'GEAR_COACH_v0.1',
  consent: 'CONSENT_v0.1',
} as const;
