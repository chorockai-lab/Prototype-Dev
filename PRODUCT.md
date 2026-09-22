# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**주 사용자: 20~30대 러너.** 취미로 러닝을 지속 중이고, 러닝화·장비에 관심이 생긴 단계. 러닝 정체성을 표현하는 데 흥미가 있고, 세련되고 직관적인 경험을 선호한다. (출처: `GearMatch_UX_Review_v1.0.md` (레포 미포함) 핵심 타깃 정의)

이들이 하려는 일 두 가지:

1. **"나는 어떤 러너인가"를 확인하고 그 결과를 갖고 싶다** — 저장하고 공유할 수 있는 형태로.
2. **다음 러닝화를 고르고 싶다** — 순위표가 아니라 "내 상황에서 무엇을 선택할지" 판단 근거를 원한다.

열람 환경은 **실제 핸드폰과 데스크톱 브라우저 양쪽**이다. 모바일이 우선이되 데스크톱에서도 제대로 보여야 한다.

## Product Purpose

Runner Identity → Runner Card → 러닝·장비 데이터 → 나에게 맞는 Gear Direction으로 이어지는 서비스.

5개 문항으로 Runner Type을 판정해 Runner Card를 만들고, 러닝 정보와 현재 장비를 더할수록 카드가 구체화되며, 그 축적된 맥락을 근거로 **순위가 아닌 3가지 장비 방향**을 제시한다. Gear Coach는 별도 챗봇이 아니라 추천 결과 안에서 결정을 돕는 Decision Assistant다.

성공은 "카드를 받았다"가 아니라 **카드를 저장·공유하고 장비 선택까지 이어가는 것**이다.

## Positioning

- **Runner Type은 Identity Layer이며 추천 점수에 투입되지 않는다.** 정체성 표현과 장비 판단을 구조적으로 분리한 것이 이 제품의 축이다. (D-01)
- **추천에 순위를 두지 않는다.** `rank` 없이 `tradeoff_label`만 저장하고, UI에도 번호를 표기하지 않는다. 후보가 2개면 2개, 0개면 0개로 정직하게 제시하며 3개를 채우려 부적합 제품을 넣지 않는다. (D-05)
- **AI는 후보를 만들지 않고 해석만 한다.** LLM이 실패해도 추천 결과는 유지된다.
- 기록 앱도, 쇼핑몰도 아니다. 러닝 기록 경쟁이나 최저가 비교가 아니라 **선택의 근거**를 다룬다.

## Operating Context

현재 단계는 **UX 프로토타입**이다. 단일 HTML 파일을 내부에 공유해 반응을 확인하고, 반응이 괜찮으면 MVP로 기능을 넣는다.

로드맵과 각 단계의 검증 질문:

| 단계 | 검증 질문 |
|---|---|
| UX 프로토타입 (완료) | 흐름이 말이 되는가, 제안이 이해되는가 |
| **UI (현재)** | 전문적이고 갖고 싶어 보이는가 |
| MVP | 실제로 쓸 만한가 |

핵심 플로우 (Prototype v1.7): 랜딩 → 5문항 → (조건부 관심 거리) → Runner Identity Reveal →
Runner ID Card → 프로필 2스텝 → Today's Run(사진·거리·시간) → Today's Run Share Card →
Home(Recent Run / Running Insight / Identity / Runners Like You) → Gear Need/Priority →
3 Gear Directions → Gear Coach.

반복 경험의 축은 `RUN → EXPRESS → DISCOVER → UNDERSTAND → EXPLORE`이며,
Gear는 폐기되지 않고 Identity · Activity · Expression 뒤에 온다.

## Capabilities and Constraints

**확정 규칙 (`docs/DECISIONS.md`)**

- `TYPE_RULE_v0.1` — **Runner Type 6종**(`ROUTINE_RUNNER` / `EXPLORE_RUNNER` / `DISTANCE_RUNNER` / `PACE_RUNNER` / `RACE_RUNNER` / `ALL_AROUND_RUNNER`). 앞 5종이 Core Persona고 `ALL_AROUND_RUNNER`는 점수가 몰릴 때 나오는 판정 결과다. 단일 질문으로 Type을 결정하지 않는다. (D-09로 5종+Modifier 체계를 대체. GM-031 착수 시 `TYPE_RULE_v0.2`로 올린다)
- `gear_reco_v1.1` — Filter / Score / Trade-off / Caution 3단계. Caution은 제품 고정값이 아니라 사용자 Context × 제품 속성으로 런타임 결정하며, **WARN 등급은 카드 `WATCH` 영역에 필수 노출**한다(접힌 영역에 두지 않는다). (D-06)
- `SIM_v0.1` — Similar Runner는 **P0 독립 화면(Gear Discovery)** 이면서 추천 카드 내부 Evidence이기도 하다. 사람 탐색·프로필은 P2. Similarity Score 숫자는 사용자에게 노출하지 않으며 `93% MATCH` 같은 표현도 쓰지 않는다. (D-02 → D-09로 갱신)
- `product_db_v1.5` — Product DB SSOT는 `10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx`. 정규화 산출물은 `seed/products.v1.5.json`(제품 35 · Eligible 10 · Evidence 80)이다. 구 `PDB_v0.2` 산출물은 `archive/seed/`로 옮겼다. (D-08 → D-09로 갱신)
- Rule을 변경하면 반드시 Version을 올린다. 과거 추천 화면을 재현할 수 없게 되는 것이 가장 큰 손실이다.

**개발 원칙**

- Product Data를 코드에 하드코딩하지 않는다.
- **Source 없는 값을 AI로 채우지 않는다. `NULL` / `UNKNOWN`은 정상 상태다.**
- 데이터 정확성 > UI Polish. 일정이 밀리면 화면 정보량을 줄이되 데이터·Event 구조는 유지한다.
- Copy는 로케일 리소스에만 두고 코드에 하드코딩하지 않는다. (D-07 — 현재 단일 HTML 프로토타입은 이 원칙의 예외 상태이며 MVP에서 해소한다.)

**이번 단계에서 의도적으로 범위 밖인 것**

실제 데이터 저장, 로그인/재진입, 푸시 알림. 프로토타입은 입력/클릭 데이터를 저장하지 않는다.

## Brand Commitments

- 이름 **GearMatch AI** 는 고정. 그 외 색·타이포·로고·그래픽은 제약 없음.
- 한국어가 기본 언어다.
- 확정 카피 (D-07): Hero Headline "나를 이해하면, 장비 선택이 달라진다.", Sub/CTA 문맥에 "나는 어떤 러너일까?" 병용. Runner Card Hook 70% : Gear Decision Value 30% 비율.
- 문항과 결과 카피의 톤: 감정·자기인식 언어를 쓴다. 데이터 서비스처럼 읽히지 않는 것이 확인된 강점이다.

## Evidence on Hand

- **제품 DB** `seed/products.v1.5.json` — 제품 35개, Recommendation Eligible 10개. 성능 점수는 0~100 여덟 축(`daily` / `comfort` / `stability` / `responsiveness` / `long_run` / `speed` / `race` / `versatility`). **Eligible 10개 전부 MSRP와 공식 제품 URL 보유.** Evidence 80행(Eligible 10 × 8축), 전부 Tier B.
- **제품 이미지는 없다.** v1.5의 `imageSourceUrl`은 35개 전부 제품 페이지 URL과 같아 실제 이미지 주소가 아니다. Placeholder로 진행하고, 값이 채워지면 코드 변경 없이 교체되도록 설계한다. (Q2) **이미지를 지어내지 않는다.**
- **Seed Runner Panel 미착수** (Q1). 따라서 "비슷한 러너 N명 중 M명" 표본이 실재하지 않는다. `n=0/1` Fallback이 정상 상태이며 **표본 수를 지어내지 않는다.**
- HOKA / Brooks는 현재 추천 후보에 없다 (Q4). MVP는 "현재 등록된 제품 범위"를 정직하게 고지한다.
- 판정 규칙 구현체: `archive/prototype-multifile/js/type-rule.js` (SSOT), 확정 카피: `archive/prototype-multifile/js/i18n.ko.js`. **⚠️ 이 두 파일은 이 레포에 없다 — 작업 PC에만 있다.** `archive/README.md`의 "이 레포에 올라오지 않은 것" 참조.

## Product Principles

1. **정체성과 추천을 섞지 않는다.** Runner Type은 표현이고, 추천은 판정 변수로 한다.
2. **순위를 매기지 않는다.** 방향의 차이를 보여주고 선택은 사용자가 한다.
3. **모르는 것은 모른다고 표시한다.** 범위 입력을 확정 수치로 바꾸지 않고, 없는 표본을 만들지 않는다.
4. **이미 답한 것은 다시 묻지 않는다.**
5. **결과는 갖고 싶은 물건이어야 한다.** Runner Card는 화면이 아니라 소유물로 설계한다.

## Accessibility & Inclusion

이번 단계 기준: 본문 대비 4.5:1, 터치 타겟 44px, 포커스 가시성 확보, `prefers-reduced-motion` 존중. 전면 WCAG AA 준수는 MVP 과제로 남긴다.
