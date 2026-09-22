import type {
  Direction, PlateType, PrimaryUse, RecommendationStatus, ScoreAttribute, ScoreValue,
  SourceTier, Specialization,
} from '../../src/domain/shared/vocabulary.js';

/** `01_Product_Master` 1행 = 1 Product. 35행 중 10행이 VERIFIED다. */
export interface SeedProduct {
  productId: string;
  brand: string;
  series: string | null;
  model: string;
  /** 버전이 없는 제품이 존재한다(예: adidas Adizero EVO SL). null 허용. */
  version: string | null;
  displayName: string;
  market: string;
  currency: string;
  officialMsrpKrw: number | null;
  sourcePriceReferenceKrw: number | null;
  primaryUse: PrimaryUse;
  /** 원본은 `DAILY|RACE` 처럼 `|` 로 구분한다. */
  secondaryUses: PrimaryUse[];
  specialization: Specialization;
  /** Controlled Vocabulary에 없는 서술형 값이다. enum으로 고정하지 않는다. */
  plateType: PlateType;
  sourceIndex: number | null;
  /** 원본 DB의 한글 분류 라벨. Display 전용이며 Recommendation Score에 사용 금지. */
  sourceCategory: string | null;
  recommendationStatus: RecommendationStatus;
  recommendationEligible: boolean;
  /** v1.1 재보정 대상 10종. eligible과 같은 집합이다. */
  calibrationSet: boolean;
  officialProductUrl: string | null;
  imageSourceUrl: string | null;
  sourceVerifiedAt: string | null;
  productDbVersion: string;
  sourceNote: string | null;
}

/**
 * `02_Recommendation_Attributes` — 8축 0~100 점수.
 * VERIFIED가 아닌 제품은 모든 점수가 null이다. 임의 추정하지 않는다.
 */
export interface SeedProductScores {
  productId: string;
  displayName: string;
  scores: Record<ScoreAttribute, ScoreValue | null>;
  /** 8축이 모두 채워져 있는지. false면 추천 후보에 올리지 않는다. */
  scored: boolean;
  scoreStatus: string | null;
  evidenceCount: number;
  reviewedAt: string | null;
  reviewer: string | null;
  notes: string | null;
}

/**
 * `03_Product_Evidence` — Product × Attribute 단위 Source.
 * Product Card Expand의 근거 표시에 사용한다. v1.5에는 evidence_id 컬럼이 없어
 * `{productId}:{attribute}` 를 키로 만든다.
 */
export interface SeedProductEvidence {
  evidenceKey: string;
  productId: string;
  attribute: ScoreAttribute;
  rawEvidence: string | null;
  normalizedValue: ScoreValue | null;
  sourceType: string;
  /** `"Tier B - ..."` 접두에서 파생. 파싱 실패 시 null. */
  sourceTier: SourceTier | null;
  sourceUrl: string | null;
  secondarySourceUrl: string | null;
  sourceDate: string | null;
  normalizationReason: string | null;
  reviewer: string | null;
  evidenceStatus: string | null;
  evidenceVersion: string | null;
}

/** `08_Web_Review_Audit` — 어떤 제품의 점수가 아직 확정 전인지 알려 준다. */
export interface SeedReviewAudit {
  productId: string;
  reviewedPrimaryUse: string | null;
  reviewedPlateType: string | null;
  reviewSource1: string | null;
  reviewSource2: string | null;
  reviewConsensus: string | null;
  auditResult: string | null;
  masterAction: string | null;
  /** `HOLD_FOR_REVIEW` 면 점수를 확정하지 않은 상태다. */
  scoreAction: string | null;
  auditDate: string | null;
  auditVersion: string | null;
}

/** `04_Controlled_Vocabulary` 원본. verify가 코드값 검증에 사용한다. */
export interface SeedVocabularyEntry {
  category: string;
  code: string;
  koLabel: string | null;
  definition: string | null;
}

/**
 * `05_Score_Rubric` 상단 블록 — 8축 각각의 0/25/50/75/100 의미.
 *
 * 같은 시트의 Base Component Weight / Need·Direction 가중치 / Penalty 구간은
 * Product DB가 아니라 `gear_reco_v1.1` Rule Config다. Recommendation Engine(GM-070)에서
 * 다루며 seed에 싣지 않는다.
 */
export interface SeedScoreRubric {
  attribute: ScoreAttribute;
  levels: Record<'0' | '25' | '50' | '75' | '100', string | null>;
  definition: string | null;
}

/**
 * `05_Score_Rubric` 의 Direction Role 블록.
 *
 * 가중치 행렬과 달리 이건 싣는다. "각 Direction이 후보를 만들 수 있는가"는
 * Product DB 커버리지 문제이고, `npm run seed:verify` 가 그걸 검사해야 하기 때문이다.
 */
export interface SeedDirectionRule {
  direction: Direction;
  /** 이 Direction에 올릴 수 있는 primary_use 집합. */
  allowedPrimaryUse: PrimaryUse[];
  roleRule: string | null;
  purpose: string | null;
}

export interface SeedFile {
  meta: {
    productDbVersion: string;
    normalizationRuleVersion: string;
    recommendationRuleVersion: string;
    sourceFile: string;
    generatedAt: string;
    counts: {
      products: number;
      eligible: number;
      scored: number;
      evidence: number;
      audit: number;
      vocabulary: number;
      scoreRubric: number;
      directionRules: number;
    };
  };
  vocabulary: SeedVocabularyEntry[];
  scoreRubric: SeedScoreRubric[];
  directionRules: SeedDirectionRule[];
  products: SeedProduct[];
  productScores: SeedProductScores[];
  productEvidence: SeedProductEvidence[];
  reviewAudit: SeedReviewAudit[];
}
