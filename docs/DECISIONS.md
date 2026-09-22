# GearMatch AI MVP — Decision Log

기준 문서: `01_사업·서비스 정의서 v1.4` ~ `09_UI Guide v0.1`, `CLAUDE.md`, `06-A Product Recommendation DB v0.2`
본 문서는 기획 문서 간 충돌을 개발 착수 전에 해소한 기록이다. 구현 판단이 기획 문서와 어긋나 보일 때는 **본 문서가 우선**한다.

확정일: 2026-08-31

> ✅ **2026-09-21 갱신 — 정본 판정 완료. "본 문서가 우선" 규칙을 다시 적용한다.**
> 정본은 **레포 최신 기획서(`00 v1.1`, `01 v2.1`, `04 v1.1`, `05`~`09 v1.0`) + `Prototype v1.7`** 계열이다.
> D-01·D-02·D-03·D-08은 이 판정으로 **대체(superseded)** 됐고, 각 항목에 대체 내용을 붙였다.
> 나머지 결정(D-04~D-07)과 그 근거는 그대로 유효하다.
> 상세는 [D-09](#d-09-프로토타입-정본-판정--확정) 참조.

---

## D-01. Runner Type = 5 Core Type + Modifier  `대체됨 → D-09`

> ⚠️ **D-09(2026-09-21)으로 대체.** 확정 체계는 **6종 enum**이다.
> 아래 5 Core + Modifier 체계는 기록으로만 남긴다.
> 단, "Runner Type을 Recommendation Score에 투입하지 않는다"와
> "단일 질문 판정 금지"는 그대로 유효하다.

- 충돌: `04 v0.4 §5.3` / `01 v1.4 §7.3` (4 Type) ↔ `05 v0.2 §06` / `06 v0.1 §0.2` (5 Type + Modifier)
- **결정: 05/06 채택.**
- Core Type: `RHYTHM_MAKER` / `MOMENTUM_BUILDER` / `DISTANCE_ARCHITECT` / `PACE_TACTICIAN` / `VERSATILE_EXPLORER`
- Modifier: `COMFORT_FIRST` / `SPEED_CURIOUS` / `DISTANCE_UP` / `RACE_READY`
- 판정 변수: 러닝 경력, 최근 빈도, 주간 러닝량, 러닝량 변화, 주요 목적, 관심 목표, 거리/기록 지향성 — **단일 질문 판정 금지**
- Runner Type은 Identity Layer다. **Recommendation Score에 절대 투입하지 않는다.**
- `type_rule_version = TYPE_RULE_v0.1`
- 후속: 04·01 문서 개정 필요

## D-02. Similar Runner P0 = Recommendation Evidence  `일부 대체됨 → D-09`

> ⚠️ **D-09(2026-09-21)으로 일부 대체.** Prototype v1.7은 Similar Runner를
> **전용 화면(P0, Gear Discovery)** 으로 올렸다. 아래의 "독립 화면을 P0에서 만들지 않는다"는
> 더 이상 유효하지 않다. 다만 **사람 탐색·프로필은 여전히 P2**이고,
> **Similarity Score 숫자 미노출** 원칙도 그대로 유효하다 (v1.7은 `93% MATCH` 같은 표현을 쓰지 않는다).

- 충돌: `04 v0.4 §5.8` (사람 Top 3 노출) ↔ `05 v0.2 §2.4/§11/§28` / `06 §12.1` / `09 §12` (Evidence)
- **결정: 05/06 채택.** 독립적인 "비슷한 러너 목록" 화면을 P0에서 만들지 않는다.
- P0 산출물은 Recommendation Card 내부의 제품별 Evidence: 유사 조건 자연어 + `qualified_n` / `positive_n`
- 사람·장비 탐색(Similar Runner Gear Explore, Other Runner Profile)은 P1
- Similarity Score는 내부 저장, **사용자에게 숫자 미노출**
- `similarity_rule_version = SIM_v0.1` (목적 30 / 주간거리 30 / 경력 15 / 체중대 15 / 발볼 10, Qualified threshold 60)

## D-03. Shoe Closet 최대 3개  `대체됨 → D-09`

> ⚠️ **D-09(2026-09-21)으로 대체.** MVP의 Current Shoe는 **Active 1개**다.
> Multi-shoe / Rotation은 P2. 아래 Closet 설계는 P2 구현 시 다시 쓴다.

- 충돌: `04 §5.6` / `05 §16.2` (Current Shoe 1개) ↔ `06 §0.2/§06` (Closet 1~3 + Primary Shoe Derived)
- **결정: 06 채택.**
- 스키마: `user_shoes` active ≤ 3
- P0 UI: 1개 등록이 기본, "다른 신발 추가"는 선택 (강제하지 않음)
- `NO_CURRENT_RUNNING_SHOE` 상태 허용
- Primary Shoe는 사용자 지정값이 아니라 **Derived**: 최근 30일 tracked distance 최대 → 동률/부족 시 최근 사용 → 최초 등록 순 fallback
- Seed Runner 수집은 **반드시 최대 3켤레**로 진행 (Evidence Cold Start 완화에 직접 기여)

## D-04. Price / Store CTA — Store만 실제 링크  `수정 확정`

- 충돌: `04 §5.16` / `01 §11.2` (실제 판매처 이동) ↔ `05 v0.2 §15.2` (전면 Mock)
- **결정: 절충안.**
  - **Store CTA → 공식 브랜드 제품 페이지 새 창 이동** (`products.official_product_url`, Eligible 29개 전부 보유)
  - **Price CTA → 카드에 공식 정가(MSRP) 표시.** 최저가·할인은 MVP 미제공 안내 후 관심 표시 상태로 전환
  - 별도 판매처 URL 수집은 하지 않는다 (P1)
- 구현 필수: **이동 직전에 `store_cta_first_click`을 서버로 먼저 기록**한 뒤 navigate. 외부 이탈해도 이벤트가 남아야 한다
- H5 해석: Price CTA = 가격 관심 Intent / Store CTA = 실제 외부 도달. 두 지표를 합산하지 않는다

## D-05. Recommendation = 순위 없는 최대 3 후보  `승인`

- 충돌: `04 §5.13` / `01 §6.1` / `08 §8` ("Top 3") ↔ `05 §2.6` / `06 §14.5` / `07 §8.1` (순위 금지)
- **결정: 순위 없음.** 데이터에 `rank`를 두지 않고 `tradeoff_label`만 저장한다
- UI에서 **번호(01/02/03)를 표기하지 않는다.** 그 자리에 Trade-off Label을 둔다
- 후속: `09 UI Guide §15.1` 예시 및 `§5.2`의 "Recommendation Ranking" 항목 개정 필요
- 후보가 2개면 2개, 0개면 0개로 정직하게 제시한다. 3개를 채우기 위해 부적합 제품을 넣지 않는다

## D-06. Caution = Context 기반 3단계  `수정 확정`

- 충돌: `05 §14.3`은 "명확한 Fit Caution 완화 금지" ↔ 실측상 Hard 적용 시 "발볼 넓음 + 장거리" 후보 **0개**
- **결정: 등급은 제품 고정값이 아니라 `사용자 Context × 제품 속성` 조합으로 런타임 결정한다.**

| 등급 | 처리 | 적용 조건 |
|---|---|---|
| **BLOCK** | 후보에서 제외. 완화 금지 | 사용자가 명시적으로 배제한 조건 / 제품 본래 용도와 정면 불일치 / 안전 관련 Hard Condition |
| **WARN** | Score 감점 + 카드 `WATCH` 영역 **필수 노출** | 발볼 불일치 시 `FIT_NARROW`·`FIT_WIDE` / 안정성 니즈 시 `STABILITY_LOW` / 편안함·초급 니즈 시 `AGGRESSIVE_RIDE`·`PLATE_STIFF` / 스피드 니즈 시 `HEAVY` |
| **NOTE** | 감점 없음. Expand 영역에만 표시 | 현재 맥락과 무관한 caution, `caution_detail_tags` 전체, `OTHER` |

- 같은 `HEAVY`라도 스피드 니즈 사용자에게는 WARN, 데일리 사용자에게는 NOTE다
- `OTHER`는 Eligible 29개 중 25개에 붙어 있어 신호가 없다 → **Score·Filter에서 완전 제외**, NOTE로만 처리
- 후속: `05 §14.3` 개정 필요 (완화 금지는 안전 조건에만 적용)
- `recommendation_rule_version = REC_v0.1`

## D-07. Landing Copy 병용  `승인`

- Hero Headline은 `09 §9.2` ("나를 이해하면, 장비 선택이 달라진다."), Sub/CTA 문맥에 `04 §5.1`·`05 §4.2` ("나는 어떤 러너일까?")를 병용
- `09 §9.1`의 Runner Card Hook 70% : Gear Decision Value 30% 비율 유지
- Copy는 Prototype 테스트로 조정 가능 (로케일 리소스에만 존재, 코드 하드코딩 금지)

## D-08. Product DB SSOT = `06-A v0.2`  `대체됨 → D-09`

> ⚠️ **D-09(2026-09-21)으로 대체.** SSOT는 `10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx`다.
> 아래의 "원본 xlsx는 읽기 전용", "Migration 재작업 금지" 원칙은 그대로 유효하다.
> `scripts/seed/`는 2026-09-22에 `10-A v1.5` 기준으로 재작성 완료했다.

- `06 §02`의 원본 진단(15컬럼, 1행 다제품)과 `§22.1`의 Migration 7단계는 **이미 완료됨**. 재작업하지 않는다
- `05 §24`가 참조하는 `러닝화_DB_ver2.0`, `06`이 참조하는 `러닝화_DB_통합본`은 현재 프로젝트에 없다
- 원본 xlsx는 **읽기 전용**. 수정하지 않는다
- `product_db_version = PDB_v0.2`

## D-09. 프로토타입 정본 판정  `확정`

기록일: 2026-09-10 · 판정일: 2026-09-21

D-01~D-08은 `01 v1.4` ~ `09 v0.1` 기준으로 확정됐으나, 이후 레포에 **개정판**이 올라오면서
두 갈래가 정면으로 충돌했다. Prototype v1.6 → v1.7이 개정판 계열로 실제 구현되면서
판정 근거가 충분해졌다.

| 항목 | 구 계열 (D-01~D-08) | **정본 — 최신 기획서 + Prototype v1.7** |
|---|---|---|
| 근거 문서 | `01 v1.4`, `04 v0.4`, `05 v0.2`, `06 v0.1` | `00 v1.1`, `01 v2.1`, `04 v1.1`, `05`~`09 v1.0` |
| 프로토타입 | `archive/..._v1.2_single.html` (2026-09-02) | `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` |
| 비주얼 | 「레인 배정」 트랙 적갈색 `#A63D25` | 라임/다크 `#D7FF2E` (DESIGN.md와 일치) |
| Runner Type | 5 Core + Modifier 4 (D-01) | **6종 enum** (`00 §12`, `04 §11`, `06 §13`, v1.7 `GM.types`) |
| Current Shoe | Closet 최대 3 (D-03) | **Active 1개** (`04 §21`, `06 §33`, v1.7 s09/s11) |
| Similar Runner | P0 Evidence만 (D-02) | **P0 전용 화면 — Gear Discovery** (v1.7 s19) |
| Product DB | `PDB_v0.2` — 61개 / Eligible 29 (D-08) | `10-A v1.5` — 35개 / VERIFIED 10 |

### 판정

- **정본 = 레포 최신 기획서 + `Prototype_GearMatch_AI_1.7_RunnerIdentity.html`.**
- `archive/`의 v1.2와 루트의 v1.5 / v1.6은 **보관본**이다. 삭제하지 않되 새 구현의 기준으로도 쓰지 않는다.
- **Runner Type은 6종으로 확정한다.** `ROUTINE_RUNNER` / `EXPLORE_RUNNER` / `DISTANCE_RUNNER` /
  `PACE_RUNNER` / `RACE_RUNNER` / `ALL_AROUND_RUNNER`.
  앞 5종이 Core Persona고, `ALL_AROUND_RUNNER`는 상위 타입 점수가 몰릴 때 나오는 판정 결과다.
  이로써 **GM-031 (Runner Type Engine) 착수 블로커는 해소됐다.**
- Runner Type은 여전히 Identity Layer다. **Recommendation Score에 투입하지 않는다** (D-01에서 유지).
- **Current Shoe는 Active 1개.** Multi-shoe / Rotation은 P2.
- **Similar Runner는 P0로 승격하되 Gear Discovery로 한정한다.**
  사람 목록·프로필·팔로우 등 Community는 그대로 P2·OUT이다. 확장 순서는 GEAR → ACTIVITY → PEOPLE.
- **Product DB SSOT는 `10-A v1.5`.** D-08의 `06-A v0.2`는 대체된다.
  `scripts/seed/` 파이프라인은 2026-09-22에 `10-A v1.5` 기준으로 **재작성 완료**했다.
  (`seed/products.v1.5.json` — 제품 35 / Eligible 10 / Evidence 80)
- D-04~D-07은 그대로 유효하다. 특히 D-06(Caution 3단계)은 "Hard 적용 시 후보 0개"라는
  실측에서 나온 것이라 타입 체계와 무관하게 유효하다.

### v1.7이 추가로 확정한 것

- 서비스 중심 경험은 Gear Recommendation Funnel이 아니라
  **RUN → EXPRESS → DISCOVER → UNDERSTAND → EXPLORE** 반복 경험이다.
- Today's Run은 **수동 입력**이 P0다. Strava / NRC / Garmin / Apple Health 연동과 OCR은 MVP 범위 밖.
- Today's Run Share Card는 **사진이 메인**이다 (Photo 70~80% + Data Overlay 20~30%).
- Visual Mood(PERFORMANCE / CLEAN / STREET / RELAXED)는 **표현 방식**이며 Runner Type과 섞지 않는다.
  Runner Type = 내가 어떤 러너인가 / Visual Mood = 오늘 나를 어떻게 표현할 것인가.
- Style은 **Concept Preview Mock**이다. Apparel DB·추천 엔진·사이즈·Commerce는 만들지 않는다.
- Running Insight는 **B 수준**이다. 최근 4주 거리·횟수·평균·최장·간단 비교까지만 다룬다.
  VO2max 추정·부상 위험 진단·Training Plan 자동 생성은 하지 않는다.

---

## Q 결정 사항

| # | 질문 | 결정 |
|---|---|---|
| **Q3** | Duramo SL 2 (Target 30 중 미완) | **Eligible 29개로 진행.** 30이라는 숫자는 검증 목표가 아니다 |
| **Q4** | HOKA / Brooks (US-only, 추천 후보 0) | **지금 추가하지 않음.** P1 데이터 작업. MVP는 "현재 등록된 제품 범위"를 정직하게 고지 |
| **Q5** | 키·체중 필수 여부 | **체중 = Band 선택형(필수), 키 = Optional.** 체중은 Similarity Weight 15점이라 유지. 키는 SIM_v0.1에서 이미 제외됨 |
| **Q6** | LLM 모델 | **기본 `claude-sonnet-5`.** `claude-opus-5`는 평가·비교용. 모델 ID를 env로 분리해 무중단 전환 + `recommendation_sessions.model_version` 기록 |
| **Q7** | 배포 접근 제한 | **Beta Access Code.** Vercel Preview + 서비스 진입 전 공통 액세스 코드 게이트 |
| **Q1** | Seed Runner Panel | **미착수.** 개발은 Similarity 로직 + `n=0/1` Fallback을 먼저 완성. 수집 양식(CSV 템플릿)을 개발 측이 제공 |
| **Q2** | 제품 이미지 (61/61 NULL) | **Placeholder 먼저.** `official_image_url`이 채워지면 코드 변경 없이 자동 교체되도록 설계 |

---

## 확정된 Rule Version

2026-09-21 D-09 판정에 따라 Product DB / Recommendation / Normalization 값을 최신으로 맞췄다.

| Version Key | 값 | 대상 | 비고 |
|---|---|---|---|
| `type_rule_version` | `TYPE_RULE_v0.1` | Runner Type 판정 | **6종 확정으로 개정 필요.** GM-031 착수 시 `TYPE_RULE_v0.2`로 올린다 |
| `similarity_rule_version` | `SIM_v0.1` | Similar Runner 가중치 / threshold 60 | 유효. 점수는 사용자에게 노출하지 않는다 |
| `recommendation_rule_version` | `gear_reco_v1.1` | Filter / Score / Trade-off / Caution 3단계 | `REC_v0.1` 대체 (CLAUDE.md §4 기준) |
| `product_db_version` | `product_db_v1.5` | Product DB Seed | `PDB_v0.2` 대체 (`10-A v1.5`) |
| `normalization_rule_version` | `product_norm_v1.1` | 성능 점수 정규화 (DB 원본) | `PERF_NORM_v0.2` 대체 |
| `prompt_version` | `GEAR_COACH_v0.1` | AI 설명 Prompt | 유효 |
| `consent_version` | `CONSENT_v0.1` | 동의 문구 | 유효 |

Rule을 변경하면 **반드시 Version을 올린다.** 과거 추천 화면을 재현할 수 없게 되는 것이 가장 큰 손실이다.

---

## 개발 원칙 (CLAUDE.md + 08 DEV Brief 요약)

1. 모든 변경은 **"이 변경이 4개 검증 질문에 기여하는가?"** 를 통과해야 한다
2. LLM은 Candidate를 만들지 않고 **해석만** 한다. LLM 실패 시에도 추천 결과는 유지된다
3. Product Data를 코드에 하드코딩하지 않는다
4. Source 없는 값을 AI로 채우지 않는다. `NULL` / `UNKNOWN`은 정상 상태다
5. 데이터 정확성 > UI Polish. 일정이 밀리면 화면 정보량을 줄이되 데이터·Event 구조는 유지한다
6. `domain/`은 DB·React·Anthropic SDK를 import하지 않는다
