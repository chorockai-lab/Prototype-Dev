/**
 * Controlled Vocabulary — 출처: 06 데이터 기획서 §9.3 / 06-A DB `99_Codebook`
 *
 * 이 파일은 Product DB의 값 집합에 대한 단일 정의다.
 * DB 원본에 없는 값을 여기에 추가하지 않는다. (Source 없는 값 생성 금지)
 */

export const PRIMARY_USE = ['DAILY', 'LONG', 'RECOVERY', 'STABILITY', 'TEMPO', 'RACE'] as const;
export const PLATE_TYPE = ['NONE', 'NYLON', 'CARBON', 'OTHER', 'UNKNOWN'] as const;
export const FIT_WIDTH = ['NARROW', 'STANDARD', 'WIDE', 'UNKNOWN'] as const;
/** boolean이 아니라 3-state다. UNKNOWN을 false로 캐스팅하면 조용한 데이터 손실이 발생한다. */
export const WIDE_OPTION = ['TRUE', 'FALSE', 'UNKNOWN'] as const;
export const RUNNER_LEVEL_FIT = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL', 'UNKNOWN'] as const;
export const DISTANCE_FIT = ['SHORT', 'MID', 'LONG', 'ALL', 'UNKNOWN'] as const;

export const CAUTION_TAG = [
  'FIT_NARROW', 'FIT_WIDE', 'STABILITY_LOW', 'PLATE_STIFF', 'HEAVY', 'AGGRESSIVE_RIDE', 'OTHER',
] as const;

/** Recommendation Score에 직접 사용하지 않는다. (99_Codebook: "Review 운영용 세부 태그") */
export const CAUTION_DETAIL_TAG = [
  'HEAT_BREATHABILITY', 'WET_GRIP', 'DURABILITY', 'HEEL_SLIP', 'BLISTER', 'FOREFOOT_PRESSURE',
] as const;

export const DATA_STATUS = ['DRAFT', 'VERIFIED', 'STALE', 'EXCLUDED'] as const;
export const PRODUCT_STATUS = ['CURRENT', 'DISCONTINUED', 'UNKNOWN'] as const;
export const SOURCE_TIER = ['A_RTINGS', 'B_RUNREPEAT', 'C_OFFICIAL_ONLY'] as const;
export const CONFIDENCE = ['HIGH', 'MEDIUM', 'LOW'] as const;

export type PrimaryUse = (typeof PRIMARY_USE)[number];
export type PlateType = (typeof PLATE_TYPE)[number];
export type FitWidth = (typeof FIT_WIDTH)[number];
export type WideOption = (typeof WIDE_OPTION)[number];
export type RunnerLevelFit = (typeof RUNNER_LEVEL_FIT)[number];
export type DistanceFit = (typeof DISTANCE_FIT)[number];
export type CautionTag = (typeof CAUTION_TAG)[number];
export type CautionDetailTag = (typeof CAUTION_DETAIL_TAG)[number];
export type DataStatus = (typeof DATA_STATUS)[number];
export type ProductStatus = (typeof PRODUCT_STATUS)[number];
export type SourceTier = (typeof SOURCE_TIER)[number];
export type Confidence = (typeof CONFIDENCE)[number];

/** 성능 점수는 1~5. Source 없으면 null이며, 임의 추정하지 않는다. */
export type PerfScore = 1 | 2 | 3 | 4 | 5;

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
