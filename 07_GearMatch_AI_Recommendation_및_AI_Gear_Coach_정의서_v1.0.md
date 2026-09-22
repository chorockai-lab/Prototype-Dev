# 07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서_v1.0

> **문서 목적**  
> 본 문서는 GearMatch AI MVP에서 장비 추천이 어떤 입력을 사용하고, 어떤 규칙으로 후보를 만들며,  
> 사용자에게 어떤 방식으로 설명되는지를 정의한다.  
> 또한 AI Gear Coach의 역할을 Recommendation Engine과 분리하여,  
> **추천 결정은 구조화된 데이터와 Rule/Score가 담당하고 AI는 설명과 후속 질의를 담당한다**는 원칙을 명확히 한다.

- 문서 버전: v1.0
- 기준 시점: 2026-09-04
- 서비스 정식 명칭: **GearMatch AI**
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1`
  - `05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0`
  - `06_GearMatch_AI_데이터_기획서_v1.0`
- 핵심 가설:
  - H3 Recommendation Value
  - H5 Purchase Consideration
- 보조 가설:
  - H2 Data Willingness
  - H4 Retention

---

# 1. Recommendation Philosophy

GearMatch AI는 사용자를 대신해  
“정답 신발 1개”를 고르는 서비스가 아니다.

추천의 핵심은 다음이다.

> **지금의 Runner Context에서  
> 어떤 장비 방향을 비교해야 하고  
> 각 방향은 무엇이 다르며  
> 왜 그런 선택지가 나왔는지 설명한다.**

즉 Recommendation은

```text
Best Product Selection
```

보다

```text
Choice Support
```

에 가깝다.

---

# 2. Recommendation Core Principle

## Principle 1. Direction Before Product

제품을 먼저 보여주지 않는다.

먼저 사용자가 어떤 방향을 비교해야 하는지 보여준다.

```text
Runner Context
→ Gear Need
→ 3 Gear Directions
→ Product Candidates
```

---

## Principle 2. Explain Before Recommend

추천은 최소한 다음 네 질문에 답해야 한다.

1. 왜 이 방향이 나왔는가?
2. 왜 이 제품이 후보인가?
3. 지금 신발과 무엇이 다른가?
4. 무엇을 포기하거나 고려해야 하는가?

---

## Principle 3. Structured Logic Before AI

추천 후보 생성은

- Product DB
- Filter
- Rule
- Weight
- Score

를 사용한다.

AI는 핵심 Score를 임의로 변경하지 않는다.

---

## Principle 4. Current Context Over Universal Best

GearMatch AI는

> “이 신발이 최고의 러닝화다.”

라고 판단하지 않는다.

대신

> “현재 사용자의 러닝 상태와 원하는 변화에서 이 제품이 하나의 후보가 될 수 있다.”

라고 설명한다.

---

## Principle 5. Trade-off Must Be Visible

모든 제품은 장점만 있는 것이 아니다.

예:

- 빠르지만 데일리 사용성은 낮을 수 있음
- 편안하지만 기록 향상 목적에는 덜 공격적일 수 있음
- 장거리에는 좋지만 무게가 부담일 수 있음

GearMatch AI는 이런 Trade-off를 숨기지 않는다.

---

# 3. Recommendation System Overview

```text
Runner Identity
      +
Runner Profile
      +
Activity Summary
      +
Current Shoe
      +
Gear Need
      +
Priority
      ↓
Context Normalization
      ↓
Eligibility Filter
      ↓
Direction Scoring
      ↓
Product Scoring
      ↓
3 Gear Directions
      ↓
Product Candidates
      ↓
Reason Generation
      ↓
Current Shoe Comparison
      ↓
Trade-off
      ↓
User Feedback
```

---

# 4. MVP Recommendation Input

## 4.1 Runner Identity

- runner_type
- flow
- style
- motivation
- direction

Runner Type은 Recommendation의 절대 결정값이 아니라  
**Context 중 하나**로 사용한다.

---

# 5. Runner Type Weight Principle

예를 들어 PACE RUNNER라고 해서  
항상 Speed Shoe만 추천하지 않는다.

PACE RUNNER라도 사용자가

- 주 1회만 달리고
- Weekly Distance가 낮고
- 현재 Gear Need가 Comfort

라면 Recommendation은 달라질 수 있다.

즉:

```text
Runner Type
≠
Recommendation Answer
```

Runner Type은 “사용자 경향”을 알려주는 요소일 뿐이다.

---

# 6. Runner Profile Input

MVP에서 사용:

```text
running_experience
runs_per_week
weekly_distance_band
```

---

# 7. Activity Input

Activity가 존재할 경우:

```text
weekly_km_actual
weekly_runs_actual
total_km
last_run_date
```

Profile self-report보다 실제 Activity가 충분히 쌓이면  
실제 데이터를 우선 사용할 수 있다.

MVP 초기에는 둘 다 저장한다.

---

# 8. Current Gear Input

```text
current_gear_id
current_gear_attributes
shoe_mileage
```

Current Shoe가 없거나 Unknown이면  
비교 설명을 생략한다.

---

# 9. Gear Need Input

MVP 기본 예시:

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

사용자 표시 문구는 UX에서 자연스럽게 번역한다.

예:

- 더 편하게 뛰고 싶어요
- 좀 더 빠르게 뛰고 싶어요
- 더 오래/멀리 뛰고 싶어요
- 대회를 준비하고 있어요
- 아직 잘 모르겠어요

---

# 10. Priority Input

예시:

```text
COMFORT
STABILITY
RESPONSIVENESS
VERSATILITY
PERFORMANCE
```

Gear Need와 Priority는 구분한다.

예:

```text
Gear Need = DISTANCE
Priority = COMFORT
```

즉

> “장거리를 위한 신발을 찾는데 편안함이 가장 중요하다.”

---

# 11. Follow-up Input

Follow-up은 필수가 아니다.

다음 조건에서만 사용한다.

- UNSURE 선택
- Recommendation Candidate가 지나치게 넓음
- 필수 Context 부족
- Direction 구분이 어려움

---

# 12. Recommendation Context Priority

MVP에서 Recommendation 입력 우선순위:

```text
1. Gear Need
2. Priority
3. Current Shoe
4. Weekly Distance
5. Runs / Week
6. Running Experience
7. Runner Type
8. Activity Detail
```

이 순서는 절대 Weight가 아니라  
사용자 의사결정에서 무엇을 우선 해석할지에 대한 가이드다.

---

# 13. Product Data Required for Recommendation

제품별 최소 Score 후보:

```text
daily_score
comfort_score
stability_score
responsiveness_score
long_run_score
speed_score
race_score
versatility_score
```

추가 Attribute:

```text
cushioning_level
weight_class
plate_type
recommended_use
caution_tags
```

---

# 14. Score Range

MVP에서는 내부적으로 단순화하기 위해

```text
0 ~ 100
```

또는

```text
1 ~ 5
```

중 하나를 사용할 수 있다.

권장:

> **0~100 정규화 Score**

이유:

- Weight 계산이 쉬움
- 향후 가중치 조정 가능
- 사용자에게 직접 노출하지 않음

---

# 15. Product Attribute Example

```json
{
  "comfort_score": 85,
  "stability_score": 70,
  "responsiveness_score": 65,
  "long_run_score": 88,
  "speed_score": 55,
  "race_score": 30,
  "versatility_score": 82
}
```

---

# 16. Product Score Source Principle

초기 Product Score는  
GearMatch AI 내부 기준으로 일관되게 구축해야 한다.

중요한 것은 절대적인 정답이 아니라  
**제품 간 상대 비교 기준의 일관성**이다.

---

# 17. Product Score 구축 시 피해야 할 것

- 브랜드 마케팅 문구를 그대로 Score로 사용
- 한 리뷰어의 평가를 절대값으로 사용
- 출처마다 서로 다른 기준을 단순 합산
- “카본 = 무조건 Performance 100” 같은 과도한 규칙
- 사용자 신체에 대한 의료적 적합성 판단

---

# 18. Recommendation Step 1 — Context Validation

추천 전에 입력값을 확인한다.

필수:

```text
Gear Need
Priority
```

가능하면:

```text
Runner Profile
Current Shoe
```

---

# 19. Missing Context Rule

예:

Weekly Distance가 UNKNOWN이고  
Recommendation에서 꼭 필요하다면 질문.

반대로 이미 충분한 Candidate가 생성되면  
추가 질문을 하지 않는다.

---

# 20. Recommendation Step 2 — Eligibility Filter

모든 제품을 Score하는 대신  
먼저 추천 가능한 후보만 남긴다.

필터 예:

```text
market = KR
active = true
category = running_shoe
```

필요 시:

- Race-only 제품 제외
- 사용 목적과 전혀 맞지 않는 제품 제외

---

# 21. Hard Filter vs Soft Score

## Hard Filter

추천하면 안 되는 후보를 제거한다.

## Soft Score

추천 가능 후보 중 우선순위를 계산한다.

MVP에서는 Hard Filter를 너무 많이 두지 않는다.

---

# 22. Recommendation Step 3 — Direction Scoring

GearMatch AI는 제품 하나를 바로 Ranking하지 않는다.

먼저 사용자의 Context에서  
3개 Gear Direction을 만든다.

---

# 23. Direction Concept

Direction은 제품명이 아니라  
사용자의 선택 전략이다.

예:

### Direction A — Stay Comfortable
현재 러닝을 편안하게 이어가는 방향

### Direction B — Step Up Performance
조금 더 반응성과 Performance를 높이는 방향

### Direction C — Purpose Focus
장거리 / Race 등 특정 목적에 집중하는 방향

실제 Direction 이름은 더 브랜드다운 언어로 조정 가능.

---

# 24. Direction Generation Principle

모든 사용자에게 동일한 3 Direction을 보여주지 않는다.

Context에 따라 Direction의 순서와 의미가 달라질 수 있다.

---

# 25. Direction Templates

MVP에서는 완전 자유 생성보다  
정의된 Direction Template을 사용하는 것을 권장한다.

예시:

```text
DAILY_COMFORT
BALANCED_ALLROUND
PERFORMANCE_STEPUP
LONG_DISTANCE
SPEED_FOCUS
RACE_FOCUS
STABILITY_FOCUS
```

이 중 Context에 맞는 3개를 선택한다.

---

# 26. Why Template-Based Direction

장점:

- 결과 일관성
- QA 가능
- 설명 품질 관리
- Product Mapping 용이
- AI 환각 감소

---

# 27. Direction Score Example

개념 예:

```text
Direction Score
=
Gear Need Match
+
Priority Match
+
Profile Fit
+
Current Shoe Transition Fit
+
Runner Type Support
```

---

# 28. Direction Score Weight Example

초기 예시:

```text
Gear Need Match           35%
Priority Match            25%
Profile Fit               15%
Current Shoe Transition   15%
Runner Type Support       10%
```

주의:

이 Weight는 **MVP 초기 가설값**이다.

실제 Feedback을 기반으로 조정한다.

---

# 29. Direction Weight Principle

Runner Type Weight를 크게 두지 않는다.

이유:

GearMatch AI는 MBTI형 테스트 결과만으로  
제품을 추천하는 서비스가 아니기 때문이다.

---

# 30. Recommendation Step 4 — Product Scoring

Direction마다 Product Candidate를 Score한다.

개념:

```text
Product Score
=
Direction Match
+
Priority Match
+
Usage Fit
+
Profile Fit
+
Current Shoe Difference Fit
-
Penalty
```

---

# 31. Product Score Example Weight

초기 예시:

```text
Direction Match          35%
Priority Match           25%
Usage Fit                20%
Profile Fit              10%
Current Shoe Transition  10%
```

Penalty 별도 적용.

---

# 32. Penalty Example

예:

```text
race_score high
AND
user experience very low
AND
gear_need != RACE
```

라면 Penalty.

또는

```text
very specialized product
AND
priority = VERSATILITY
```

라면 Penalty.

---

# 33. Penalty Principle

Penalty는 제품을 “나쁜 신발”로 판단하는 것이 아니다.

현재 사용자 Context와  
이번 Gear Need에 덜 맞는다는 의미다.

---

# 34. Recommendation Step 5 — Candidate Diversity

Score 상위 제품을 그대로 3개 보여주면  
서로 매우 비슷한 제품만 나올 수 있다.

따라서 Direction 간 차이가 보여야 한다.

---

# 35. Diversity Rule

예:

- 동일 제품을 여러 Direction에 중복 노출하지 않음
- 동일 브랜드만 3개 Direction에 반복되지 않도록 가능하면 분산
- Product Attribute가 실질적으로 다른 Candidate를 우선

---

# 36. Diversity의 목적

GearMatch AI는

> “Top 3”

가 아니라

> “3가지 선택 방향”

을 보여주는 서비스이기 때문이다.

---

# 37. Recommendation Step 6 — Recommendation Reason

Recommendation Reason은  
Score 자체를 보여주는 것이 아니라  
사용자가 이해할 수 있는 근거로 변환한다.

---

# 38. Reason Structure

모든 추천 후보는 다음 네 Layer를 가진다.

## WHY THIS
추천 이유

## VS YOUR SHOE
현재 신발 대비 차이

## BEST FOR
추천 사용 상황

## KEEP IN MIND
Trade-off

---

# 39. WHY THIS

예시:

> 최근 주간 러닝량이 늘고 있고, 이번에는 반응성을 더 중요하게 선택했기 때문에  
> 현재 신발보다 조금 더 빠른 훈련에 초점을 둔 후보입니다.

---

# 40. VS YOUR SHOE

예시:

> 지금 신는 모델보다 반응성이 높고 빠른 러닝에 유리하지만  
> 데일리 편안함은 조금 줄어들 수 있습니다.

Current Shoe가 없으면 이 섹션은 생략.

---

# 41. BEST FOR

예:

> 템포런, 빠른 5~10km, 기록을 의식하는 러닝

---

# 42. KEEP IN MIND

예:

> 편안한 조깅 한 켤레만 원하는 경우에는 조금 공격적인 선택일 수 있습니다.

---

# 43. Recommendation Explanation Principle

설명은

```text
User Input
+
Product Attribute
```

에 근거해야 한다.

근거 없는 표현:

> “당신의 발에 완벽하게 맞습니다.”

사용하지 않는다.

---

# 44. Reason Traceability

내부적으로 Reason 근거를 저장한다.

예:

```json
{
  "matched_factors": [
    "need_speed",
    "priority_responsiveness",
    "weekly_distance_15_30"
  ],
  "comparison_factors": [
    "higher_speed_score_than_current"
  ]
}
```

---

# 45. Recommendation Step 7 — Current Shoe Comparison

GearMatch AI의 중요한 차별점이다.

사용자는 종종

> “이 신발이 좋은가?”

보다

> “지금 신는 것보다 뭐가 달라?”

를 궁금해한다.

---

# 46. Current Shoe Comparison Axes

MVP에서는 너무 많은 Spec을 비교하지 않는다.

권장:

```text
Comfort
Stability
Responsiveness
Long Run
Speed
Versatility
```

---

# 47. Comparison UX

예:

| 기준 | 현재 신발 | 후보 |
|---|---:|---:|
| Comfort | 높음 | 중간 |
| Responsiveness | 중간 | 높음 |
| Long Run | 높음 | 중간 |
| Speed | 중간 | 높음 |

정확한 숫자보다  
상대적인 언어 표현을 우선할 수 있다.

---

# 48. User-facing Score Principle

내부 0~100 Score는  
사용자에게 그대로 노출하지 않는다.

대신:

```text
낮음
중간
높음
```

또는 서술형 비교를 사용한다.

---

# 49. Recommendation Step 8 — Product Candidate Count

MVP 권장:

```text
3 Directions
×
1 Primary Product per Direction
```

즉 첫 화면에서 3개 후보.

필요 시 각 Direction 안에  
추가 후보 1~2개를 P1에서 제공한다.

---

# 50. Why 3 Primary Candidates

너무 많은 Product를 보여주면  
GearMatch AI가 다시 쇼핑몰처럼 보일 수 있다.

---

# 51. Recommendation Order

표시 순서는

```text
Direction Rank
```

기준으로 정한다.

단

> 1위 = 절대 Best

처럼 표현하지 않는다.

---

# 52. Recommendation Label Example

피해야 함:

- BEST
- PERFECT MATCH
- 97% FIT

권장:

- 지금 가장 먼저 볼 방향
- 이런 선택도 가능
- 목적을 더 강조한 선택

---

# 53. Recommendation Confidence

MVP에서는 Confidence %를 사용자에게 노출하지 않는다.

내부적으로는

- Candidate Score 차이
- Missing Context
- Product Coverage

를 이용해 QA할 수 있다.

---

# 54. Low Confidence Handling

조건 예:

- Context 부족
- Candidate Score 차이가 거의 없음
- Product DB Coverage 부족

이 경우

> 추천을 단정하기보다 선택지를 넓게 설명

하거나 Follow-up Question을 사용한다.

---

# 55. No Candidate Handling

조건에 맞는 후보가 충분하지 않으면

> 억지로 제품을 채우지 않는다.

예:

> 현재 조건에 맞는 후보가 충분하지 않아 기준을 조금 넓혀 볼 수 있습니다.

---

# 56. Recommendation Versioning

각 Recommendation에는 반드시

```text
logic_version
```

을 저장한다.

예:

```text
gear_reco_v1.0
```

---

# 57. Why Versioning Matters

Weight 변경 후에도

- H3
- H5
- Product Click
- Helpful

을 버전별로 비교할 수 있다.

---

# 58. Recommendation QA Checklist

추천 출시 전 최소 확인:

- 같은 Context에서 결과 재현 가능
- 3 Direction이 서로 다른 의미를 가짐
- 같은 제품이 과도하게 반복되지 않음
- 특정 브랜드 편향이 심하지 않음
- Current Shoe 비교가 논리적
- Trade-off 존재
- 사용자 입력과 Reason이 연결됨

---

# 59. Recommendation Test Cases

최소 다음 Persona로 QA한다.

## Case A — Habit Runner
주 1~2회 / Comfort

## Case B — Growth Runner
주 3~4회 / Speed

## Case C — Distance Runner
주간 30km+ / Long Run

## Case D — Race Trigger
대회 준비

## Case E — Unknown Current Shoe
현재 신발 모름

## Case F — Unsure Need
장비 목적 모름

---

# 60. H3 Validation

H3는 다음으로 본다.

```text
Gear Start
→ Recommendation View
→ Product View
→ Helpful Feedback
```

---

# 61. Recommendation Feedback

질문:

> 이 추천이 도움이 되었나요?

- 도움이 됐어요
- 잘 모르겠어요
- 맞지 않아요

---

# 62. Positive Feedback Reason

- 방향을 알게 됨
- 현재 신발과 차이를 알게 됨
- 제품 후보를 알게 됨
- 비교 기준을 알게 됨

---

# 63. Negative Feedback Reason

- 내 러닝과 맞지 않음
- 제품이 마음에 들지 않음
- 이유가 납득되지 않음
- 정보가 부족함
- 기타

---

# 64. Feedback Learning Loop

초기에는 자동 Weight 업데이트를 하지 않는다.

먼저 수동 분석:

```text
Recommendation
→ Feedback
→ Segment
→ Logic Review
→ Weight Update
```

---

# 65. Why Manual First

MVP에서는 데이터가 적다.

초기부터 자동 학습을 넣으면  
노이즈에 과도하게 반응할 수 있다.

---

# 66. H5 Purchase Consideration

추천 결과 후:

> 이 제품을 다음 러닝화 후보로 고려하시겠어요?

- 적극 고려
- 후보에 넣어볼 것 같음
- 아직 모르겠음
- 고려하지 않음

---

# 67. H5 Interpretation

H5는 Recommendation 자체의 가치뿐 아니라

- 구매 시점
- 가격
- 브랜드 선호
- 제품 인지도

영향도 받는다.

따라서 H3와 함께 본다.

---

# 68. Recommendation Metrics

## Primary

- recommendation_view
- product_view
- recommendation_feedback
- purchase_consideration

## P1

- product_save
- outbound_click
- coach_open

---

# 69. Recommendation Dashboard

최소:

| Metric | 값 |
|---|---:|
| Gear Start |  |
| Recommendation View |  |
| Product View |  |
| Helpful |  |
| Unsure |  |
| Not Fit |  |
| Positive Purchase Intent |  |

---

# 70. Recommendation by Segment

반드시 분리해서 본다.

- Runner Type
- Running Experience
- Runs / Week
- Weekly Distance
- Gear Need
- Priority
- Current Shoe Known/Unknown

---

# 71. AI Gear Coach Definition

AI Gear Coach는 GearMatch AI의 핵심 Recommendation Engine이 아니다.

정의:

> **이미 생성된 Recommendation을  
> 사용자의 Runner Context와 Product Data를 바탕으로  
> 쉽게 설명하고 후속 질문에 답하는 AI Explanation Layer**

---

# 72. AI Gear Coach Position

```text
Recommendation Engine
        ↓
Recommendation Result
        ↓
AI Gear Coach
```

절대로

```text
AI Gear Coach
        ↓
Free-form Product Selection
```

이 되지 않는다.

---

# 73. AI Gear Coach MVP Role

P1 기능으로 다음을 지원한다.

1. 추천 이유 재설명
2. Current Shoe와 차이
3. 세 후보 차이
4. 사용 목적별 Trade-off
5. 추천 결과에 대한 후속 질문

---

# 74. AI Gear Coach Suggested Questions

예:

- 지금 신발과 가장 큰 차이가 뭐야?
- 세 후보 중 가장 편한 건?
- 장거리에는 어떤 게 더 나아?
- 대회에도 쓸 수 있어?
- 한 켤레만 고른다면 어떤 기준으로 봐야 해?

---

# 75. Suggested Question Principle

사용자가 빈 Chatbox를 보고  
무엇을 물어야 할지 고민하지 않도록 한다.

처음에는 Suggested Question을 제공한다.

---

# 76. AI Input Context

AI에 전달하는 Context는 제한한다.

```text
Runner Identity
Runner Profile
Activity Summary
Current Shoe
Recommendation Result
Product Attributes
Recommendation Reasons
```

---

# 77. AI Input Example

```json
{
  "runner": {
    "type": "PACE_RUNNER",
    "experience": "Y1_TO_3Y",
    "runs_per_week": "W3_4",
    "weekly_distance": "KM15_30"
  },
  "current_shoe": {
    "brand": "Nike",
    "model": "Pegasus 42"
  },
  "recommendation": {
    "gear_need": "SPEED",
    "priority": "RESPONSIVENESS",
    "products": []
  }
}
```

---

# 78. AI System Instruction Concept

AI 내부 지침 핵심:

> 너는 GearMatch AI Gear Coach다.  
> 제공된 Runner Context와 Recommendation Result 안에서만 설명한다.  
> 새로운 제품을 임의로 추가하거나 추천 순서를 바꾸지 않는다.  
> 의료·부상·진단 표현을 하지 않는다.  
> 적합성을 절대적으로 단정하지 않는다.  
> 제품 간 Trade-off를 함께 설명한다.

---

# 79. AI Output Style

짧고 이해하기 쉽게.

권장:

- 2~4문장
- 필요 시 Bullet
- 전문 용어 최소화
- 제품 Spec 나열보다 사용자 의미 설명

---

# 80. AI Answer Example

사용자:

> 지금 신발이랑 뭐가 달라?

AI:

> 현재 신발보다 반응성이 높은 방향이라 빠른 러닝에서는 차이를 느끼기 쉬울 수 있어요.  
> 대신 편안한 조깅 한 켤레로 쓰기에는 지금 신발 쪽이 더 범용적일 수 있습니다.

---

# 81. AI Should Not Say

- “당신에게 완벽합니다.”
- “부상을 예방합니다.”
- “무릎에 가장 좋습니다.”
- “반드시 이 제품을 사세요.”
- “이 신발이 더 우수합니다.”

---

# 82. AI Unknown Handling

Context에 없는 질문을 받으면

> 모른다고 말하거나  
> 현재 데이터만으로 답하기 어렵다고 설명한다.

예:

> 발볼 정보가 현재 Profile에는 없어 그 부분까지 판단하기는 어려워요.

---

# 83. AI Product Knowledge Boundary

MVP에서 AI는 제공된 Product DB를 우선 사용한다.

실시간 웹 검색 기반 제품 추천은 MVP Core에 넣지 않는다.

이유:

- 결과 일관성
- QA
- Recommendation Traceability
- 제품 정보 오류 감소

---

# 84. AI Recommendation Override

AI가 다음을 변경할 수 없다.

- Direction Rank
- Product Candidate
- Product Score
- Recommendation Reason의 핵심 근거

AI는 표현을 바꿀 수만 있다.

---

# 85. AI Conversation Logging

P1 구현 시 저장:

```text
coach_conversation_id
user_id
recommendation_id
question
response
created_at
```

---

# 86. AI Conversation Privacy

자유 입력에 개인정보나 민감정보가 들어갈 수 있으므로  
MVP에서는

- 필요한 최소 로그만 저장
- 내부 분석 목적 명시
- 장기 보존 여부 별도 검토

가 필요하다.

---

# 87. AI Feedback

AI Coach 자체에 별도 👍/👎를 넣는 것은 P2로 미뤄도 된다.

MVP 핵심 Feedback은 Recommendation 자체에 집중한다.

---

# 88. AI Gear Coach Success Metric

P1 구현 시:

- coach_open_rate
- coach_question_rate
- question_type
- post_coach_product_view
- post_coach_purchase_intent

---

# 89. AI Usage Interpretation

AI 사용률이 낮다고  
Recommendation 가치가 낮은 것은 아니다.

AI는 보조 기능이다.

---

# 90. Recommendation + AI Relationship

```text
Structured Recommendation
        ↓
Understandable UI
        ↓
AI Gear Coach
        ↓
Deeper Explanation
```

UI 설명만으로 충분하면  
AI를 반드시 열 필요가 없다.

---

# 91. Recommendation Failure Cases

## Case 1. 좋은 제품이지만 Reason이 약함

H3 실패 가능.

대응:
Reason 구조 개선.

---

## Case 2. Reason은 좋지만 Product가 관심 없음

Product DB / Candidate Logic 문제 가능.

---

## Case 3. Product View는 높지만 H5 낮음

구매 시점 또는 Commerce 정보 부족 가능.

---

## Case 4. AI Coach만 많이 사용

Recommendation UI 설명이 부족할 수 있음.

---

# 92. Recommendation Error Handling

Backend 오류:

- Random Candidate 대체 금지
- 이전 Recommendation을 새 추천처럼 보여주지 않음
- Retry 가능
- Error Event 기록

---

# 93. Recommendation History

서버에는 반드시 저장.

사용자 화면에서 과거 추천 목록 노출은 P1/P2.

---

# 94. Recommendation Snapshot

저장:

```text
runner_profile_snapshot
activity_snapshot
current_gear_snapshot
gear_need
priority
logic_version
```

---

# 95. Why Snapshot

과거 추천이 왜 나왔는지  
나중에 재현하기 위해.

---

# 96. Product Coverage QA

내부적으로 확인:

- no_candidate_rate
- product_recommendation_frequency
- brand_distribution
- direction_distribution

---

# 97. Brand Bias Rule

특정 브랜드가 반복 추천되더라도  
그것이 데이터 때문인지 Logic 때문인지 확인한다.

추천 결과에 매출 우선순위를 섞지 않는다.

---

# 98. Revenue Separation Principle

Recommendation Logic과 Revenue Logic은 분리한다.

향후 Affiliate가 생겨도

```text
Recommended
```

와

```text
Sponsored
```

는 구분한다.

---

# 99. Sponsored Recommendation

MVP에는 넣지 않는다.

향후 도입 시:

- 명확한 표시
- Organic Recommendation과 분리
- 추천 Score에 광고비 반영 금지 원칙

을 검토한다.

---

# 100. Similar Runner — Future

> **2026-09-21 개정 (D-09 / Prototype v1.7).** Similar Runner의 **Gear Discovery는 이미 P0**다
> (v1.7 `RUNNERS LIKE YOU` 화면). 아래 "Future"는 **사람 탐색 · Activity 비교 · Community**로 이어지는
> 심화 확장을 가리킨다. 확장 순서는 GEAR → ACTIVITY → PEOPLE → COMMUNITY다.

MVP 이후 데이터가 쌓이면  
Recommendation Reason에 Similar Runner를 활용할 수 있다.

예:

> 비슷한 러닝량과 목적을 가진 러너들이 많이 사용한 모델

---

# 101. Similar Runner Data

후보:

```text
Runner Type
Experience
Runs / Week
Weekly Distance
Activity Pattern
Gear Ownership
Gear Usage
Feedback
```

---

# 102. Similarity Score Exposure

사용자에게

> “92% 유사”

같은 숫자를 바로 보여주지 않는다.

대신 의미 있는 근거로 설명한다.

---

# 103. Recommendation Evolution Stage 1

## MVP

```text
Rule
+
Weight
+
Product Score
+
Human-defined Direction
```

---

# 104. Stage 2

사용자 행동 반영:

```text
Click
Save
Feedback
Purchase Intent
```

Weight 조정.

---

# 105. Stage 3

Similar Runner 기반:

```text
Runner Segment
+
Gear Usage
+
Satisfaction
```

---

# 106. Stage 4

학습형 Recommendation:

```text
Context
→ Recommendation
→ Behavior
→ Feedback
→ Model Update
```

충분한 데이터가 생긴 이후.

---

# 107. MVP Recommendation Logic — Suggested V1

개념적으로 다음과 같이 시작한다.

```text
Step 1
Context Load

Step 2
Gear Need / Priority Validation

Step 3
Product Eligibility Filter

Step 4
Direction Score

Step 5
Top 3 Directions

Step 6
Product Score per Direction

Step 7
Diversity Check

Step 8
Primary Product per Direction

Step 9
Reason Generation

Step 10
Feedback Collection
```

---

# 108. V1 Pseudologic

```text
for each eligible_product:

    base_score = 0

    base_score += need_match * W_need
    base_score += priority_match * W_priority
    base_score += usage_match * W_usage
    base_score += profile_fit * W_profile
    base_score += current_shoe_transition * W_current

    base_score -= penalties

rank by direction
apply diversity rules
select primary candidate
```

---

# 109. Recommendation Reason Template

초기에는 Template + Data 조합 권장.

예:

```text
[사용자의 현재 상태] + [이번 목적] + [제품 강점] + [Trade-off]
```

---

# 110. Reason Template Example

```text
최근 주간 러닝량이 [weekly_distance]이고,
이번에는 [priority]을 더 중요하게 보고 있어
[product]는 [strength]을 강화하는 방향의 후보입니다.
다만 [tradeoff]은 고려할 필요가 있습니다.
```

---

# 111. Why Template First

- 일관성
- QA
- 환각 감소
- Product Data 오류 확인 용이

AI는 이후 문장을 자연스럽게 만드는 역할.

---

# 112. AI Gear Coach Generation Flow

```text
Structured Reason
+
Runner Context
+
Product Facts
      ↓
LLM
      ↓
Natural Explanation
```

---

# 113. AI Hallucination Guardrail

AI Prompt에 반드시 제공:

- 허용 Product List
- 허용 Recommendation Result
- 허용 Product Facts
- 금지 영역

---

# 114. AI Fallback

LLM 장애 시에도 Recommendation은 작동해야 한다.

즉:

```text
Recommendation Engine = P0
AI Gear Coach = Optional
```

---

# 115. Recommendation Performance Target

MVP에서 시스템 응답은  
사용자가 기다린다고 느끼지 않을 정도로 빠르게 설계한다.

정확한 SLA는 DEV 문서에서 확정.

AI 응답이 느려도  
Recommendation Result 화면은 먼저 표시될 수 있다.

---

# 116. Recommendation UX Order

권장:

```text
1. 3 Gear Directions
2. Primary Product
3. Why
4. Current Shoe Difference
5. Trade-off
6. Feedback
7. AI Gear Coach
```

---

# 117. Why AI Last

AI를 먼저 보여주면  
서비스가 일반 Chatbot처럼 보일 수 있다.

GearMatch AI의 차별점은 구조화된 Runner Context와 Recommendation이다.

---

# 118. Recommendation Screen Minimum

각 Direction Card:

- Direction Name
- Product Image
- Product Name
- Short Why
- View Detail

---

# 119. Product Detail Minimum

- Product
- Direction
- Why
- VS Current Shoe
- Best For
- Keep in Mind
- Purchase Consideration
- Helpful Feedback

---

# 120. AI Gear Coach Entry

Product Detail 또는 Recommendation 하단.

문구 예:

> 이 추천이 왜 나왔는지 더 물어보기

---

# 121. Recommendation Tone

GearMatch AI는

- 과도하게 전문적이지 않고
- 지나치게 캐주얼하지 않으며
- 설명은 단정 대신 비교 중심

으로 유지한다.

---

# 122. Recommended Language Pattern

권장:

- “이런 방향이 될 수 있어요.”
- “현재 신발보다 ~에 더 초점을 둔 선택입니다.”
- “대신 ~은 줄어들 수 있습니다.”
- “이런 러닝에서 더 적합할 수 있습니다.”

---

# 123. Avoided Language

- 무조건
- 완벽
- 최적
- 반드시
- 부상 예방
- 통증 개선
- 당신에게 딱 맞음

---

# 124. Recommendation Feedback Loop — MVP

```text
Recommendation
→ Helpful
→ Purchase Intent
→ Manual Analysis
→ Logic Adjustment
```

---

# 125. Recommendation Feedback Loop — Future

```text
Recommendation
→ Product Click
→ Save
→ Purchase
→ Usage
→ Satisfaction
→ Similar Runner
→ Model Update
```

---

# 126. MVP Success Condition for Recommendation

Recommendation 기능이 성공했다고 보는 기준은  
단순 Product Click 하나가 아니다.

최소 다음이 함께 나타나야 한다.

1. 사용자가 Recommendation까지 도달
2. Product Candidate를 확인
3. Recommendation Reason이 도움된다고 평가
4. 일부 사용자가 실제 구매 후보로 고려

---

# 127. Recommendation Decision Matrix

## H3 High / H5 High

Gear Decision 가치 확인.

→ Product DB / Compare / Commerce 강화.

---

## H3 High / H5 Low

정보 가치는 있으나 구매 연결 약함.

→ 구매 시점 / 가격 / 판매처 / CTA 검토.

---

## H3 Low / H5 High

제품 자체 인기 영향 가능.

→ Recommendation 차별화 재검토.

---

## H3 Low / H5 Low

추천 구조 또는 문제정의 재검토.

---

# 128. AI Gear Coach Decision Matrix

## Usage High / Helpful High

AI Explanation 고도화.

## Usage Low / Recommendation Helpful High

AI는 불필요할 수 있음.

## Usage High / Recommendation Helpful Low

Recommendation UI 설명 부족 또는 AI에 의존하는 문제.

## Usage Low / Helpful Low

AI 기능 우선순위 축소.

---

# 129. MVP Recommendation Non-goals

- 완전 개인화 ML
- 실시간 웹 검색 추천
- 모든 신발 지원
- 의료 적합성
- 발 형태 진단
- 훈련 처방
- Dynamic Pricing
- Sponsored Ranking
- 자동 구매

---

# 130. Recommendation Development Priority

## Phase 1

Product Attribute 정의

## Phase 2

Gear Need / Priority Mapping

## Phase 3

Direction Template

## Phase 4

Product Score Logic

## Phase 5

Current Shoe Comparison

## Phase 6

Reason Template

## Phase 7

Feedback

## Phase 8 — P1

AI Gear Coach

---

# 131. Recommendation QA Dataset

테스트용 User Context를 미리 만든다.

예:

```text
Test Runner 01
Habit / 5~15km / Comfort

Test Runner 02
Pace / 15~30km / Speed

Test Runner 03
Distance / 30km+ / Long Run

Test Runner 04
Race / 15~30km / Race

Test Runner 05
Explore / Unknown Current Shoe
```

---

# 132. QA Output Review

각 Test Runner마다 확인:

- 3 Direction이 말이 되는가
- 제품이 서로 다른가
- Reason이 Input과 연결되는가
- Current Shoe 비교가 맞는가
- Trade-off가 있는가
- 과도한 단정이 없는가

---

# 133. Recommendation Change Management

Logic 변경 시 반드시:

```text
version update
change log
before/after sample
```

남긴다.

---

# 134. Example Change Log

```text
gear_reco_v1.1

- Gear Need weight 35 → 40
- Runner Type weight 10 → 5
- Versatility penalty added
```

---

# 135. Why Change Log Matters

MVP 테스트 중 Logic이 계속 바뀌면  
Cohort 비교가 어려워진다.

변경이 필요하면 Version으로 분리한다.

---

# 136. Recommendation Data Ownership

추천 결과는 사용자에게 보여주는 화면이지만  
내부적으로는 데이터 자산이다.

장기적으로 연결:

```text
Runner Context
→ Recommended Product
→ Product Click
→ Purchase
→ Actual Usage
→ Satisfaction
```

---

# 137. Long-term Recommendation Moat

GearMatch AI의 장기 차별화는  
Product Spec만으로 만들어지지 않는다.

핵심은

> **어떤 Runner Context에서  
> 어떤 Gear가 실제로 선택되고  
> 얼마나 사용되며  
> 어떻게 평가되는가**

의 축적이다.

---

# 138. Community Connection

Community가 생기면 Recommendation Reason은 확장 가능하다.

예:

> 나와 비슷한 Runner가 많이 사용하는 제품

단, 단순 인기순위로 변질되지 않도록 한다.

---

# 139. Community + Recommendation Future Loop

```text
Runner Profile
→ Similar Runner
→ Other Runner Gear
→ Recommendation
→ Purchase
→ Usage
→ Feedback
→ Community Evidence
```

---

# 140. Final Recommendation Architecture

```text
                ┌────────────────────┐
                │   Runner Identity   │
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │   Runner Profile    │
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │ Activity / Gear Use │
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │ Gear Need / Priority│
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │ Recommendation Logic│
                │ Filter / Rule/Score │
                └─────────┬──────────┘
                          │
                 ┌────────▼────────┐
                 │ 3 Gear Directions│
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ Product Candidate│
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ Reason / Compare │
                 │ / Trade-off      │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ AI Gear Coach    │
                 │ Explanation      │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ Feedback / Intent│
                 └─────────────────┘
```

---

# 141. MVP Recommendation Minimum Definition of Done

추천 기능이 MVP P0 완료라고 보려면:

- [ ] Gear Need 선택 가능
- [ ] Priority 선택 가능
- [ ] 기존 Runner Context 사용
- [ ] 실제 Product DB 연결
- [ ] 3 Directions 생성
- [ ] 각 Direction에 Product Candidate 존재
- [ ] Recommendation Reason 존재
- [ ] Current Shoe Difference 가능
- [ ] Trade-off 존재
- [ ] Logic Version 저장
- [ ] Recommendation Snapshot 저장
- [ ] Helpful Feedback 수집
- [ ] Purchase Intent 수집
- [ ] Event Logging

---

# 142. AI Gear Coach P1 Definition of Done

AI를 넣는 경우:

- [ ] Recommendation Result 이후에만 호출
- [ ] User Context 제한 전달
- [ ] 허용 Product만 사용
- [ ] 후보/순위 Override 금지
- [ ] 의료/부상 Guardrail
- [ ] Suggested Question
- [ ] Conversation Log
- [ ] 실패 시 Recommendation은 정상 동작

---

# 143. Final Recommendation Statement

> **GearMatch AI의 추천은  
> 사용자를 대신해 하나의 정답을 고르는 기능이 아니다.**

핵심은

> **지금의 Runner Context를 바탕으로  
> 어떤 방향을 비교해야 하는지 보여주고,  
> 각 제품이 왜 후보가 되는지 설명하며,  
> 사용자가 자신의 선택에 확신을 갖도록 돕는 것**

이다.

---

# 144. Final AI Gear Coach Statement

> **AI Gear Coach는 GearMatch AI의 추천을 만드는 두뇌가 아니라,  
> 이미 만들어진 추천의 이유와 차이를 사용자가 이해할 수 있게 설명하는 대화형 인터페이스다.**

MVP에서는

```text
Recommendation Logic > AI
```

의 우선순위를 유지한다.

---

# 145. 00~07 전체 연결

```text
00 Master Context
   ↓
01 사업·서비스 정의
   ↓
02 핵심 가설
   ↓
03 Target / JTBD
   ↓
04 MVP Scope
   ↓
05 User Flow
   ↓
06 Data
   ↓
07 Recommendation / AI
```

07까지 정의되면 GearMatch AI MVP의

- Why
- Who
- What
- Flow
- Data
- Recommendation
- AI Role

이 하나의 체계로 연결된다.

---

# 146. 개발 전 최종 확인 질문

1. Gear Need 최종 선택지는 무엇인가?
2. Priority 최종 선택지는 무엇인가?
3. Direction Template은 몇 개로 시작할 것인가?
4. Product Attribute를 어떤 기준으로 Score할 것인가?
5. 초기 Product DB 범위는 어디까지인가?
6. Current Shoe 비교 Axis는 무엇인가?
7. Weight 초기값은 어떻게 둘 것인가?
8. Recommendation Reason Template은 어떤 문장 구조를 사용할 것인가?
9. AI Gear Coach를 MVP 첫 출시부터 넣을 것인가, 이후 P1로 넣을 것인가?
10. Feedback 결과를 어떤 주기로 Logic에 반영할 것인가?

이 열 가지를 개발 직전 확정하면  
Recommendation Engine 구현에 들어갈 수 있다.
