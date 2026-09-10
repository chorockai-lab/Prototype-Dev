import type {
  CautionDetailTag, CautionTag, Confidence, DataStatus, DistanceFit, FitWidth,
  PerfScore, PlateType, PrimaryUse, ProductStatus, RunnerLevelFit, SourceTier, WideOption,
} from '../../src/domain/shared/vocabulary.js';

/** 01_Product_Master 1행 = 1 Product Model + Version */
export interface SeedProduct {
  productId: string;
  brand: string;
  brandKo: string | null;
  series: string | null;
  modelName: string;
  /** 버전이 없는 제품이 존재한다(예: adidas Adizero EVO SL). null 허용. */
  version: string | null;
  displayName: string;
  market: string;
  currency: string;
  productStatus: ProductStatus;
  krSaleConfirmed: boolean;
  officialProductUrl: string;
  /** 원본 DB에서 61/61 전부 비어 있다. 확보 전까지 Placeholder로 렌더한다. */
  officialImageUrl: string | null;
  imageReferenceUrl: string | null;
  msrp: number | null;
  msrpRaw: string | null;
  priceVerifiedAt: string | null;
  target30: boolean;
  recommendationEligible: boolean;
  dataStatus: DataStatus;
  productDataVersion: string;
  /** Display 전용. Recommendation Score에 사용 금지. */
  legacyUseCategory: string | null;
  legacyDescription: string | null;
  updatedAt: string | null;
}

/** 02_Recommendation_Attrs + 05_v0.2_Benchmark(Tier/Confidence) 병합 */
export interface SeedProductAttrs {
  productId: string;
  primaryUse: PrimaryUse;
  secondaryUseTags: PrimaryUse[];
  cushionScore: PerfScore | null;
  stabilityScore: PerfScore | null;
  responsivenessScore: PerfScore | null;
  weightG: number | null;
  dropMm: number | null;
  plateType: PlateType;
  fitWidth: FitWidth;
  wideOption: WideOption;
  runnerLevelFit: RunnerLevelFit;
  distanceFit: DistanceFit;
  cautionTags: CautionTag[];
  cautionDetailTags: CautionDetailTag[];
  reviewEvidenceCount: number;
  /** 05_Benchmark에서 병합. Tier B에는 confidence penalty를 적용한다. */
  sourceTier: SourceTier | null;
  performanceMethod: string | null;
  confidence: Confidence | null;
  normalizationRuleVersion: string;
  dataStatus: DataStatus;
  missingRequiredCount: number;
  readyForRecommendation: boolean;
}

/** 03_Product_Evidence — Field 단위 Source. Product Card Expand의 근거 표시에 사용. */
export interface SeedProductEvidence {
  evidenceId: string;
  productId: string | null;
  evidenceLevel: string;
  attributeName: string;
  rawValue: string | null;
  normalizedValue: string | null;
  sourceType: string;
  sourceKind: string | null;
  sourceUrl: string | null;
  verifiedAt: string | null;
  confidence: Confidence | null;
  normalizationRuleVersion: string | null;
  marketContext: string | null;
}

export interface SeedFile {
  meta: {
    productDbVersion: string;
    sourceFile: string;
    generatedAt: string;
    counts: { products: number; attrs: number; evidence: number; eligible: number };
  };
  products: SeedProduct[];
  productAttrs: SeedProductAttrs[];
  productEvidence: SeedProductEvidence[];
}
