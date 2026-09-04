# 06_GearMatch_AI_데이터_기획서_v1.0

> **문서 목적**  
> 본 문서는 GearMatch AI MVP에서 어떤 데이터를 수집·저장·가공하고,  
> 그 데이터가 사용자 경험·추천·리텐션·핵심 가설 검증에 어떻게 활용되는지 정의한다.  
> MVP 단계에서는 데이터의 양보다 **Runner Identity → Activity → Gear → Recommendation → Feedback**이  
> 한 사용자 단위로 연결되는 구조를 만드는 것을 우선한다.

- 문서 버전: v1.0
- 기준 시점: 2026-09-04
- 서비스 정식 명칭: **GearMatch AI**
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.0`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.0`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.0`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.0`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.0`
  - `05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0`
- 현재 단계: Prototype 완료 → MVP 데이터 구조 확정
- 핵심 가설:
  - H1 Runner Identity
  - H3 Recommendation Value
  - H4 Retention
  - H5 Purchase Consideration

---

# 1. 데이터 기획의 핵심 목적

GearMatch AI의 데이터는 단순한 서비스 로그가 아니다.

장기적으로 GearMatch AI가 만들고자 하는 핵심 데이터는 다음 관계다.

> **어떤 러너가  
> 어떤 방식으로 뛰고  
> 어떤 장비를 사용하고  
> 어떤 장비를 추천받고  
> 어떤 제품을 고려·선택하며  
> 그 결과를 어떻게 평가하는가**

이를 MVP 단계에서는 다음 구조로 시작한다.

```text
User
 ↓
Runner Identity
 ↓
Runner Profile
 ↓
Activity
 ↓
Current Gear
 ↓
Gear Usage
 ↓
Recommendation
 ↓
Product Interaction
 ↓
Feedback / Purchase Intent
```

---

# 2. Data Philosophy

## 2.1 데이터를 많이 받는 것이 목적이 아니다

MVP에서는 다음 질문을 기준으로 데이터를 수집한다.

> 이 데이터가 지금 사용자에게 가치를 주는가?

또는

> H1/H3/H4/H5를 검증하는 데 필요한가?

둘 다 아니라면 P0에서 제외한다.

---

## 2.2 사용자에게 보이는 가치와 연결한다

예:

### Weekly Distance

사용자 가치:
- Runner Card에 표시
- 현재 러닝 상태 확인

서비스 활용:
- Segment
- Recommendation Context

### Current Shoe

사용자 가치:
- Shoe Mileage 확인
- 현재 신발 대비 후보 비교

서비스 활용:
- Gear Context
- Recommendation

### Run Distance

사용자 가치:
- Activity 누적
- Shoe Mileage 증가

서비스 활용:
- H4 Retention
- Gear Usage

---

# 3. Core Data Layers

GearMatch AI MVP 데이터는 8개 Layer로 나눈다.

```text
1. User
2. Runner Identity
3. Runner Profile
4. Activity
5. Gear
6. Gear Usage
7. Recommendation
8. Feedback / Behavior
```

---

# 4. Core Entity Overview

MVP 최소 Entity:

```text
User
Session
RunnerIdentity
RunnerTestAnswer
RunnerProfile
Gear
UserGear
Activity
GearUsage
Recommendation
RecommendationDirection
RecommendationItem
RecommendationFeedback
PurchaseIntent
Event
```

---

# 5. Entity Relationship Overview

```text
User
 ├─ RunnerIdentity
 │   └─ RunnerTestAnswer
 │
 ├─ RunnerProfile
 │
 ├─ UserGear
 │    └─ Gear
 │
 ├─ Activity
 │    └─ GearUsage
 │
 ├─ Recommendation
 │    ├─ RecommendationDirection
 │    └─ RecommendationItem
 │          └─ Gear
 │
 ├─ RecommendationFeedback
 │
 ├─ PurchaseIntent
 │
 ├─ Session
 │
 └─ Event
```

---

# 6. User Entity

## 목적

서비스 내 한 명의 사용자를 식별한다.

## MVP 핵심 원칙

**Nickname을 Primary Key로 사용하지 않는다.**

내부 Unique User ID를 별도 생성한다.

---

# 7. User Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| user_id | UUID/String | Y | 내부 사용자 식별자 |
| nickname | String | Y | 사용자 표시명 |
| pin_hash | String | Y | 4자리 PIN의 안전 저장값 |
| market | Enum | Y | KR / US 등 |
| language | Enum | Y | ko / en |
| created_at | Datetime | Y | 사용자 생성 시점 |
| updated_at | Datetime | Y | 최근 수정 |
| last_login_at | Datetime | N | 최근 로그인 |
| status | Enum | Y | active / deleted / test |
| consent_version | String | Y | 동의 정책 버전 |

---

# 8. User에서 수집하지 않는 데이터

MVP에서 불필요한 개인정보는 받지 않는다.

예:

- 실명
- 주민등록번호
- 상세 주소
- 전화번호
- 생년월일
- 이메일

향후 인증 방식이 변경되면 별도 검토한다.

---

# 9. Session Entity

## 목적

한 번의 서비스 이용 세션을 구분한다.

| Field | Type | Required | 설명 |
|---|---|---:|---|
| session_id | UUID/String | Y | 세션 식별자 |
| user_id | FK | N | 로그인 전에는 null 가능 |
| started_at | Datetime | Y | 세션 시작 |
| ended_at | Datetime | N | 종료 |
| traffic_source | String | N | direct / instagram 등 |
| campaign | String | N | campaign ID |
| market | Enum | Y | KR / US |
| language | Enum | Y | ko / en |
| device_type | Enum | N | mobile / desktop / tablet |

---

# 10. Why Session Matters

Session은 다음 분석에 필요하다.

- 신규 / 기존 사용자 구분
- Return Session
- D1 / D7
- 유입 채널별 Funnel
- 한 세션 내 Gear 행동
- 반복 Recommendation 행동

---

# 11. RunnerIdentity Entity

## 목적

Runner Test 결과를 기반으로  
사용자의 비교적 안정적인 Runner Identity를 저장한다.

## MVP 원칙

Runner Type은 최초 생성 후 자동 변경하지 않는다.

---

# 12. RunnerIdentity Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| runner_identity_id | UUID | Y | 식별자 |
| user_id | FK | Y | 사용자 |
| runner_type | Enum | Y | 6종 Type |
| flow | String | Y | 카드 표현값 |
| style | String | Y | DAILY / SPEED 등 |
| motivation | String | Y | 꾸준함 / 기록 등 |
| direction | String | Y | 더 빠르게 등 |
| type_score_json | JSON | Y | Type Score |
| created_at | Datetime | Y | 생성 |
| version | String | Y | Type Logic 버전 |

---

# 13. Runner Type Enum

```text
ROUTINE_RUNNER
EXPLORE_RUNNER
DISTANCE_RUNNER
PACE_RUNNER
RACE_RUNNER
ALL_AROUND_RUNNER
```

---

# 14. Why Logic Version Matters

Runner Type Logic이 향후 수정될 수 있기 때문이다.

예:

```text
runner_type = PACE_RUNNER
version = runner_type_v1.0
```

이렇게 남겨야

- 어떤 Logic에서 생성됐는지
- Cohort 간 차이가 Logic 변화 때문인지

구분할 수 있다.

---

# 15. RunnerTestAnswer Entity

## 목적

Runner Type 결과만 저장하지 않고  
어떤 답변으로 그 결과가 나왔는지 남긴다.

---

# 16. RunnerTestAnswer Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| answer_id | UUID | Y | 답변 식별자 |
| user_id | FK | Y | 사용자 |
| question_id | String | Y | 문항 ID |
| question_version | String | Y | 문항 버전 |
| selected_option | String | Y | 선택 Option |
| answer_value | String | Y | Logic Value |
| question_index | Integer | Y | 질문 순서 |
| answered_at | Datetime | Y | 응답 시점 |

---

# 17. Why Raw Answer Matters

향후 다음 분석이 가능하다.

- 특정 답변과 Retention 관계
- 특정 답변과 Gear Need 관계
- Runner Type별 구매 행동
- Type Logic 개선

---

# 18. RunnerProfile Entity

## 목적

사용자의 실제 러닝 상태를 구조화한다.

---

# 19. RunnerProfile MVP Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| profile_id | UUID | Y | Profile ID |
| user_id | FK | Y | 사용자 |
| running_experience | Enum | Y | 러닝 경력 |
| runs_per_week | Enum | Y | 주당 횟수 |
| weekly_distance_band | Enum | Y | 주간 거리 구간 |
| created_at | Datetime | Y | 생성 |
| updated_at | Datetime | Y | 수정 |

---

# 20. Running Experience Enum

```text
LT_6M
M6_TO_1Y
Y1_TO_3Y
GT_3Y
```

표시 문구:

- 6개월 미만
- 6개월~1년
- 1~3년
- 3년 이상

---

# 21. Runs Per Week Enum

```text
LE_1
W1_2
W3_4
GE_5
```

---

# 22. Weekly Distance Band

```text
LT_5KM
KM5_15
KM15_30
GT_30KM
UNKNOWN
```

---

# 23. Why Band Instead of Exact Value

MVP Profile에서는 정확한 주간 km보다  
빠르고 부담 없는 입력이 중요하다.

정확한 Weekly Distance는  
향후 실제 Activity 데이터가 쌓이면 계산할 수 있다.

따라서

```text
Self-reported Weekly Distance
vs
Actual Activity Weekly Distance
```

를 구분한다.

---

# 24. Profile Derived Fields

원본 데이터를 수정하지 않고  
분석용으로 다음 값을 계산할 수 있다.

```text
experience_segment
activity_segment
profile_completeness
```

---

# 25. Gear Entity

## 목적

러닝화 제품 마스터 데이터.

MVP에서는 **한국에서 실제 탐색·구매 가능한 러닝화 모델을 우선** 구축한다.

---

# 26. Gear Identification Level

MVP에서는 다음 수준까지 관리한다.

> **Brand + Model + Version**

예:

```text
Nike Pegasus 42
ASICS Novablast 5
```

컬러웨이 / SKU까지 세분화하지 않는다.

---

# 27. Gear Core Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| gear_id | UUID/String | Y | 제품 ID |
| brand | String | Y | 브랜드 |
| model | String | Y | 모델 |
| version | String | N | 버전 |
| display_name | String | Y | 화면 표시명 |
| category | Enum | Y | running_shoe |
| market | Enum | Y | KR |
| active | Boolean | Y | 추천 사용 여부 |
| image_url | String | N | 이미지 |
| source_updated_at | Datetime | N | 제품 데이터 갱신 |

---

# 28. Recommendation Product Attributes

추천에 실제 사용할 제품 속성은  
정량·정성 필드를 분리한다.

MVP 예시:

| Field | Type | 설명 |
|---|---|---|
| daily_score | Number | 데일리 적합 |
| comfort_score | Number | 편안함 |
| stability_score | Number | 안정성 |
| responsiveness_score | Number | 반응성 |
| long_run_score | Number | 장거리 |
| speed_score | Number | 빠른 러닝 |
| race_score | Number | 대회 |
| versatility_score | Number | 범용성 |
| cushioning_level | Enum/Number | 쿠셔닝 |
| weight_class | Enum | 경량 등 |
| plate_type | Enum | none / nylon / carbon 등 |
| recommended_use | Array | 주요 용도 |
| caution_tags | Array | 주의/Trade-off |
| short_description | Text | 사용자 설명 |

실제 Field와 Score 정의는 `07_Recommendation & AI Gear Coach 정의서`에서 확정한다.

---

# 29. Product Data Principle

제품 데이터를 많이 모으는 것보다  
**추천에 필요한 기준을 일관되게 정의하는 것**이 중요하다.

MVP에서 피해야 할 것:

- 출처마다 기준이 다른 Score 혼합
- 리뷰 문장을 그대로 모델 Score로 사용
- 근거 없는 임의 적합도
- 너무 많은 Attribute

---

# 30. UserGear Entity

## 목적

사용자가 현재 어떤 신발을 사용하는지 저장한다.

MVP에서는 **현재 신발 1개**만 활성 상태로 둔다.

---

# 31. UserGear Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| user_gear_id | UUID | Y | 사용자 장비 ID |
| user_id | FK | Y | 사용자 |
| gear_id | FK | N | 제품 DB 연결 |
| custom_name | String | N | 제품 미확인 시 |
| status | Enum | Y | active / unknown / none |
| started_at | Date | N | 사용 시작일 |
| created_at | Datetime | Y | 등록 |
| updated_at | Datetime | Y | 수정 |

---

# 32. Current Shoe Status Enum

```text
ACTIVE
UNKNOWN_MODEL
NO_RUNNING_SHOE
```

---

# 33. Why One Shoe in MVP

복수 신발을 지원하면

- Run마다 신발 선택
- 개별 Mileage
- Rotation
- Active/Retired 상태
- 추천 Context

가 복잡해진다.

현재 MVP 핵심 가설은  
한 개 Current Shoe만으로도 검증 가능하다.

---

# 34. Future Multi-shoe Structure

향후 UserGear를 그대로 확장한다.

```text
ACTIVE
ROTATION
RETIRED
WISHLIST
```

MVP 데이터 구조는 복수 Row를 허용하되  
비즈니스 Logic상 Active 1개만 허용하는 방식이 확장성 측면에서 적절하다.

---

# 35. Activity Entity

## 목적

사용자가 입력한 실제 러닝 기록.

---

# 36. Activity MVP Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| activity_id | UUID | Y | Activity ID |
| user_id | FK | Y | 사용자 |
| activity_date | Date | Y | 러닝 날짜 |
| distance_km | Decimal | Y | 거리 |
| user_gear_id | FK | N | 사용 장비 |
| source | Enum | Y | manual |
| created_at | Datetime | Y | 입력 시점 |

---

# 37. MVP에서 Activity에 넣지 않는 것

- GPS Route
- Pace
- Heart Rate
- Cadence
- Elevation
- Splits
- Weather

이 데이터는 자동 연동을 검토할 때 추가한다.

---

# 38. Why Distance Only

H4를 검증하기 위해 필요한 최소 Activity 정보가 거리이기 때문이다.

거리 하나만으로도

- Weekly Distance
- Runs
- Total Distance
- Last Run
- Shoe Mileage

를 업데이트할 수 있다.

---

# 39. GearUsage Entity

## 목적

특정 사용자 장비의 누적 사용량을 관리한다.

---

# 40. GearUsage Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| gear_usage_id | UUID | Y | ID |
| user_gear_id | FK | Y | 사용자 장비 |
| mileage_km | Decimal | Y | 누적 거리 |
| run_count | Integer | Y | 사용 횟수 |
| first_used_at | Date | N | 최초 사용 |
| last_used_at | Date | N | 최근 사용 |
| updated_at | Datetime | Y | 갱신 |

---

# 41. GearUsage Update Logic

Activity 저장 시:

```text
IF activity.user_gear_id exists
THEN
  mileage_km += distance_km
  run_count += 1
  last_used_at = activity_date
```

---

# 42. Activity Derived Metrics

사용자 화면용 Aggregate:

```text
weekly_km
weekly_runs
total_km
last_run_km
last_run_date
shoe_mileage
```

---

# 43. Aggregate 저장 vs 계산

초기 MVP에서는 규모가 작으므로  
정합성을 위해 Activity 원본을 기준으로 계산할 수 있다.

성능이 필요하면 Cache/Aggregate Table을 추가한다.

원칙:

> **Activity 원본이 Source of Truth**

---

# 44. Recommendation Entity

## 목적

사용자에게 한 번 생성된 Recommendation Session 자체를 저장한다.

---

# 45. Recommendation Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| recommendation_id | UUID | Y | 추천 ID |
| user_id | FK | Y | 사용자 |
| runner_identity_id | FK | Y | 당시 Identity |
| profile_snapshot | JSON | Y | 당시 Profile |
| current_gear_snapshot | JSON | N | 당시 신발 |
| activity_snapshot | JSON | N | 당시 Activity 요약 |
| gear_need | Enum | Y | 장비 목적 |
| priority | Enum | Y | 우선순위 |
| followup_value | String | N | 추가 응답 |
| logic_version | String | Y | 추천 Logic 버전 |
| created_at | Datetime | Y | 생성 |

---

# 46. Why Snapshot Matters

사용자 Profile이 나중에 바뀔 수 있기 때문이다.

예:

오늘 Recommendation:

```text
weekly_distance = 5~15km
current_shoe = Pegasus 42
```

3개월 후:

```text
weekly_distance = 30km+
current_shoe = Novablast 5
```

과거 Recommendation을 해석하려면  
그 시점의 Context를 보존해야 한다.

---

# 47. Gear Need Enum

예시:

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

최종 Label은 07에서 확정한다.

---

# 48. Priority Enum

예시:

```text
COMFORT
STABILITY
RESPONSIVENESS
VERSATILITY
PERFORMANCE
```

실제 제품 Attribute와 일치해야 한다.

---

# 49. RecommendationDirection Entity

## 목적

한 Recommendation에서 생성된 3개 Direction을 저장한다.

---

# 50. Direction Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| direction_id | UUID | Y | ID |
| recommendation_id | FK | Y | 추천 |
| direction_code | String | Y | 방향 코드 |
| rank | Integer | Y | 1~3 |
| title | String | Y | 사용자 표시 |
| summary | Text | Y | 설명 |
| reason_json | JSON | Y | 방향 생성 근거 |
| created_at | Datetime | Y | 생성 |

---

# 51. RecommendationItem Entity

## 목적

Direction에 포함된 실제 제품 후보.

---

# 52. RecommendationItem Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| recommendation_item_id | UUID | Y | ID |
| recommendation_id | FK | Y | 추천 |
| direction_id | FK | Y | Direction |
| gear_id | FK | Y | 제품 |
| rank | Integer | Y | 후보 순위 |
| score | Decimal | N | 내부 Score |
| reason | Text/JSON | Y | Why |
| current_shoe_difference | Text/JSON | N | 현재 신발 대비 |
| best_use | Text | Y | 적합 상황 |
| tradeoff | Text | Y | 고려사항 |

---

# 53. Internal Score Exposure

MVP에서는 사용자가 볼 필요가 없는  
유사도 또는 적합도 %를 노출하지 않는다.

예:

```text
Fit 87%
Similarity 92%
```

같은 표현은 피한다.

사용자에게는

> **왜 이 방향이 나왔는지**

를 설명하는 것이 더 중요하다.

---

# 54. Recommendation Logic Version

반드시 남긴다.

예:

```text
gear_reco_v1.0
```

향후 Logic 변경 후

- 추천 반응
- 구매 후보 행동
- Feedback

을 버전별로 비교할 수 있다.

---

# 55. RecommendationFeedback Entity

## 목적

H3 Recommendation Value를 직접 확인한다.

---

# 56. RecommendationFeedback Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| feedback_id | UUID | Y | ID |
| user_id | FK | Y | 사용자 |
| recommendation_id | FK | Y | 추천 |
| helpful | Enum | Y | helpful / unsure / not_fit |
| reason_code | Enum | N | 이유 |
| free_text | Text | N | 기타 |
| created_at | Datetime | Y | 응답 |

---

# 57. Helpful Enum

```text
HELPFUL
UNSURE
NOT_FIT
```

---

# 58. Positive Reason Code

예:

```text
DIRECTION_HELPFUL
CURRENT_SHOE_COMPARE_HELPFUL
PRODUCT_DISCOVERY_HELPFUL
CRITERIA_HELPFUL
```

---

# 59. Negative Reason Code

예:

```text
NOT_MY_RUNNING
PRODUCT_NOT_INTERESTING
REASON_NOT_CONVINCING
INSUFFICIENT_INFO
OTHER
```

---

# 60. PurchaseIntent Entity

## 목적

H5 Purchase Consideration을 측정한다.

---

# 61. PurchaseIntent Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| purchase_intent_id | UUID | Y | ID |
| user_id | FK | Y | 사용자 |
| recommendation_id | FK | Y | 추천 |
| gear_id | FK | Y | 제품 |
| intent_level | Enum | Y | 구매 후보 수준 |
| created_at | Datetime | Y | 생성 |

---

# 62. Purchase Intent Enum

```text
STRONG_CONSIDER
CONSIDER
UNSURE
NO_CONSIDER
```

---

# 63. Future Purchase Follow-up

MVP 이후 가능하다면:

```text
PURCHASED
STILL_CONSIDERING
BOUGHT_OTHER
CANCELED
```

를 후속 조사로 수집할 수 있다.

필수 MVP DB Entity로는 두지 않아도 된다.

---

# 64. Event Entity

## 목적

화면 상태가 아니라 실제 사용자 행동을 기록한다.

---

# 65. Event Core Fields

| Field | Type | Required | 설명 |
|---|---|---:|---|
| event_id | UUID | Y | Event ID |
| event_name | String | Y | 이벤트명 |
| user_id | FK | N | 사용자 |
| session_id | FK | Y | 세션 |
| occurred_at | Datetime | Y | 발생 시점 |
| screen | String | N | 화면 |
| market | Enum | Y | KR/US |
| language | Enum | Y | ko/en |
| properties | JSON | N | Event 속성 |

---

# 66. MVP Event Taxonomy

## Acquisition

```text
landing_view
test_start
returning_entry_click
```

---

# 67. Test Events

```text
question_view
question_answer
test_complete
runner_type_reveal
runner_card_view
```

---

# 68. Profile Events

```text
profile_start
profile_step_view
profile_answer
profile_complete
shoe_search
shoe_select
shoe_register
shoe_unknown
shoe_none
```

---

# 69. Activity Events

```text
home_view
run_entry_click
run_entry_view
run_add
activity_view
shoe_mileage_update
```

---

# 70. Gear Events

```text
gear_start
gear_need_select
gear_priority_select
gear_followup_select
gear_direction_view
recommendation_view
```

---

# 71. Product Events

```text
product_view
```

P1:

```text
product_save
product_compare
outbound_click
```

---

# 72. AI Events — P1

```text
coach_open
coach_question
coach_answer_view
```

---

# 73. Feedback Events

```text
recommendation_feedback
purchase_consideration
```

---

# 74. Return Events

```text
session_start
login_attempt
login_success
login_fail
return_session
```

---

# 75. Event Naming Principle

Event 이름은

- 과거형/현재형 혼용 금지
- 화면 이름보다 행동 중심
- 띄어쓰기 없이 snake_case

로 통일한다.

좋은 예:

```text
product_view
run_add
```

피해야 할 예:

```text
clickedProductButton
RUN_COMPLETE
shoe-page
```

---

# 76. Event Property Principle

Event 이름에 모든 정보를 넣지 않는다.

예:

```text
event_name = question_answer
properties = {
  question_id: "Q3",
  option: "DISTANCE"
}
```

---

# 77. Common Event Properties

가능하면 공통:

```text
user_id
session_id
market
language
runner_type
running_experience
runs_per_week
weekly_distance_band
traffic_source
campaign
```

단, Event 생성 시점에 존재하는 값만 포함한다.

---

# 78. Gear Event Properties

```text
gear_need
priority
recommendation_id
direction_id
gear_id
current_gear_id
```

---

# 79. H1 Data Mapping

## 질문

Runner Card는 실제 Hook인가?

## 필요한 데이터

```text
landing_view
test_start
test_complete
runner_card_view
profile_start
profile_complete
```

---

# 80. H1 Metrics

### Test Start Rate

```text
unique_users(test_start)
/
unique_users(landing_view)
```

### Test Completion

```text
unique_users(runner_card_view)
/
unique_users(test_start)
```

### Profile Continuation

```text
unique_users(profile_start)
/
unique_users(runner_card_view)
```

---

# 81. H3 Data Mapping

## 질문

개인화 Recommendation은 가치가 있는가?

## 데이터

```text
gear_start
gear_direction_view
recommendation_view
product_view
recommendation_feedback
```

---

# 82. H3 Metrics

### Product Exploration Rate

```text
users(product_view)
/
users(recommendation_view)
```

### Helpful Rate

```text
HELPFUL
/
all recommendation_feedback
```

---

# 83. H4 Data Mapping

## 질문

사용자는 다시 돌아오는가?

## 데이터

```text
profile_complete
session_start
return_session
run_add
gear_start
```

---

# 84. H4 Metrics

### D1

Profile Complete 후 다음 날 Session 존재

### D7

Profile Complete 후 7일 내 Return Session

### Repeat Run

```text
users(activity_count >= 2)
/
users(profile_complete)
```

---

# 85. Return Reason Derived Data

사용자 재방문 후 첫 핵심 행동으로 분류한다.

```text
RUN_RETURN
GEAR_RETURN
CARD_RETURN
OTHER_RETURN
```

---

# 86. H5 Data Mapping

## 질문

추천이 실제 구매 후보 형성에 영향을 주는가?

## 데이터

```text
recommendation_view
product_view
purchase_consideration
product_save      # P1
outbound_click    # P1
```

---

# 87. H5 Metrics

### Product Detail Rate

```text
users(product_view)
/
users(recommendation_view)
```

### Purchase Consideration Positive

```text
STRONG_CONSIDER + CONSIDER
/
all purchase_intent
```

---

# 88. Segment Variables

MVP 분석에서는 전체 평균뿐 아니라  
최소 다음 Segment로 나눈다.

## Runner Type
6종

## Experience
4구간

## Runs / Week
4구간

## Weekly Distance
5구간

## Market
KR / US

## Traffic Source
Instagram / Community / Direct / Internal 등

---

# 89. Purchase Readiness

중요하지만 MVP의 필수 Profile 질문으로 넣을지는 신중히 판단한다.

방법 A:
Gear Recommendation 진입 직전 묻기

방법 B:
사후 인터뷰 / 설문으로 수집

권장:

> **MVP 초기에는 필수 Profile 질문으로 넣지 않고, H5 해석용 보조 데이터로 별도 수집**

이유:

- 초기 Profile 입력 부담 감소
- 장비 탐색 Flow 자체가 구매 의도를 어느 정도 나타냄

---

# 90. Gear Interest

마찬가지로 별도 필수 질문으로 추가하지 않는다.

행동으로 추정 가능하다.

예:

- Gear Start
- Product View
- Recommendation Feedback
- Repeat Gear Session

---

# 91. Derived User Status

분석용 상태:

```text
VISITOR
TEST_USER
CARD_USER
ACTIVATED_USER
ACTIVE_RUNNER
RETURNING_USER
GEAR_USER
COMMERCIAL_USER
```

---

# 92. Status Rule

## VISITOR
landing_view

## TEST_USER
test_start

## CARD_USER
runner_card_view

## ACTIVATED_USER
profile_complete

## ACTIVE_RUNNER
run_add >= 1

## RETURNING_USER
return_session >= 1

## GEAR_USER
recommendation_view >= 1

## COMMERCIAL_USER
positive purchase_intent 또는 P1 outbound/save

---

# 93. Activated User 기준

MVP 초기 기준:

> **Profile Complete**

를 권장한다.

Runner Card만 만든 사용자는  
Acquisition User로 구분한다.

---

# 94. Data Quality Principle

MVP에서 가장 위험한 것은  
데이터를 많이 모으지 못하는 것이 아니라  
**잘못 연결된 데이터를 모으는 것**이다.

---

# 95. User Identity QA

확인:

- 같은 사용자가 재로그인하면 같은 user_id인가
- Nickname 중복이 user_id 충돌로 이어지지 않는가
- Test Session과 User 생성이 올바르게 연결되는가

---

# 96. Activity QA

확인:

- Run 1회 저장이 한 Row만 생성되는가
- 중복 클릭으로 2회 저장되지 않는가
- Weekly KM 계산이 맞는가
- Shoe Mileage가 정확히 증가하는가

---

# 97. Recommendation QA

확인:

- Recommendation Input이 저장되는가
- Recommendation Logic Version이 남는가
- 3 Direction이 올바르게 저장되는가
- Product Candidate가 Recommendation과 연결되는가

---

# 98. Event QA

확인:

- 화면 Refresh로 Event가 중복되지 않는가
- user_id/session_id가 올바른가
- Return Session을 신규 Session과 구분할 수 있는가

---

# 99. Data Source of Truth

각 데이터의 원본을 명확히 한다.

| 데이터 | Source of Truth |
|---|---|
| Runner Type | RunnerIdentity |
| Profile | RunnerProfile |
| Current Shoe | UserGear |
| Activity | Activity |
| Shoe Mileage | Activity 기반 GearUsage |
| Recommendation | Recommendation |
| Product | Gear |
| Feedback | RecommendationFeedback |
| Purchase Intent | PurchaseIntent |
| 행동 분석 | Event |

---

# 100. Do Not Overwrite Raw Data

예:

Runner Type Logic이 변경되어도  
기존 사용자의 과거 답변과 결과를 지우지 않는다.

Profile 수정도 가능하면

- updated_at
- 필요 시 history

를 남길 수 있는 구조로 설계한다.

MVP에서는 전체 History Table까지 필수는 아니다.

---

# 101. Recommendation Data Flow

```text
RunnerIdentity
+
RunnerProfile
+
Activity Aggregate
+
Current Gear
+
Gear Need
+
Priority
      ↓
Recommendation Engine
      ↓
Recommendation
      ↓
3 Directions
      ↓
Recommendation Items
      ↓
User Interaction
      ↓
Feedback / Purchase Intent
```

---

# 102. AI Gear Coach Data Flow — P1

AI가 사용할 Context:

```text
RunnerIdentity
RunnerProfile
Activity Summary
Current Gear
Current Recommendation
Product Data
```

AI가 직접 원본 DB를 임의 수정하지 않는다.

---

# 103. AI Log

P1 구현 시:

```text
coach_conversation_id
user_id
recommendation_id
question
response
created_at
```

민감하거나 불필요한 자유 입력은 최소화한다.

---

# 104. Product DB MVP Scope

MVP에서는 전체 러닝화 시장을 다 담지 않는다.

우선순위:

1. 한국에서 실제 판매되는 모델
2. 대중적으로 사용되는 주요 브랜드
3. Gear Direction을 테스트할 수 있는 다양성
4. Current Shoe로 등록될 가능성이 높은 모델

---

# 105. Product Count Principle

정확한 모델 수를 먼저 고정하지 않는다.

기준은 다음이다.

> 3 Gear Directions에서  
> 동일한 몇 개 제품만 반복되지 않을 정도의 다양성을 확보한다.

초기 QA에서는 추천 결과를 반복 테스트해  
Coverage를 확인한다.

---

# 106. Product Coverage Metrics

내부 관리:

```text
coverage_rate
recommendation_frequency_by_product
recommendation_frequency_by_brand
no_candidate_rate
```

---

# 107. Recommendation Bias Monitoring

특정 브랜드가 과도하게 추천되는지 확인한다.

예:

```text
Brand A 80%
Brand B 10%
Brand C 10%
```

이런 결과가 나오면

- DB 편향
- Score 편향
- Logic 편향

을 확인한다.

---

# 108. Recommendation Explanation Trace

각 추천에 최소한 내부적으로

```text
matched_factors
penalty_factors
direction_reason
```

를 저장할 수 있어야 한다.

예:

```json
{
  "matched_factors": ["weekly_distance_15_30", "need_speed"],
  "penalty_factors": ["low_race_focus"],
  "direction_reason": "performance progression"
}
```

---

# 109. User-facing vs Internal Data

## User-facing

- Runner Type
- Weekly Distance
- Runs
- Current Shoe
- Shoe Mileage
- Recommendation Direction
- Product Reason

## Internal

- Type Score
- Recommendation Score
- Logic Version
- Raw Event
- Segment
- Model Weight

내부 Score를 그대로 사용자에게 노출하지 않는다.

---

# 110. Privacy Principle

MVP에서도 최소한 다음 원칙을 지킨다.

1. 필요한 정보만 수집
2. Nickname/PIN 외 불필요 개인정보 미수집
3. PIN 평문 저장 금지
4. 데이터 삭제 요청 경로 마련
5. Test User 데이터 구분
6. 분석용 ID와 사용자 표시명 분리

---

# 111. Data Deletion

사용자가 탈퇴/삭제를 요청할 경우  
MVP에서도 최소한 다음이 가능해야 한다.

```text
User
Profile
Identity
Activity
UserGear
Recommendation
Feedback
```

관련 사용자 데이터를 삭제 또는 비식별 처리.

세부 정책은 운영정책에서 확정한다.

---

# 112. Test Data Separation

개발자/내부 테스트 계정은

```text
status = test
```

로 구분한다.

분석에서 기본적으로 제외한다.

---

# 113. Korea / U.S. Data Separation

Market 필드를 필수로 둔다.

```text
KR
US
```

이유:

- Funnel
- Recommendation
- Purchase Intent
- Retention

을 시장별로 비교하기 위해서다.

---

# 114. Localization Data

Product Display와 Text를 코드에 직접 박기보다  
향후 다음 구조를 고려한다.

```text
locale
display_name
description
reason_template
```

MVP 1차는 ko 중심이어도  
Schema는 en 확장을 막지 않도록 한다.

---

# 115. Dashboard Minimum Dataset

MVP 운영자가 최소한 확인해야 하는 Data View:

## Acquisition

- Users
- Landing
- Test Start
- Test Complete

## Activation

- Runner Card
- Profile Complete
- Current Shoe

## Retention

- D1
- D7
- Run Add
- Repeat Run

## Gear

- Gear Start
- Recommendation View
- Product View

## Value

- Helpful
- Purchase Consideration

---

# 116. Funnel Table Example

| Metric | Count | Rate |
|---|---:|---:|
| Landing |  | 100% |
| Test Start |  |  |
| Test Complete |  |  |
| Runner Card |  |  |
| Profile Complete |  |  |
| Run Add |  |  |
| Return |  |  |
| Recommendation |  |  |
| Product View |  |  |
| Purchase Consideration |  |  |

---

# 117. Cohort Table Example

| Cohort | Activated | D1 | D7 | Repeat Run | Gear Return |
|---|---:|---:|---:|---:|---:|
| Week 1 |  |  |  |  |  |
| Week 2 |  |  |  |  |  |

---

# 118. Recommendation Table Example

| Runner Type | Reco Views | Product View | Helpful | Positive Intent |
|---|---:|---:|---:|---:|
| Routine |  |  |  |  |
| Explore |  |  |  |  |
| Distance |  |  |  |  |
| Pace |  |  |  |  |
| Race |  |  |  |  |
| All-around |  |  |  |  |

---

# 119. MVP Data Retention Priority

데이터 중요도:

## Tier 1 — 반드시 보존

- User
- Runner Identity
- Profile
- Activity
- UserGear
- Recommendation
- Feedback
- Event

## Tier 2 — P1

- Product Save
- AI Conversation
- Outbound Click Detail

## Tier 3 — Future

- Social Graph
- Follow
- Challenge
- Community Interaction

---

# 120. Future Data Expansion — Multi-shoe

MVP 이후:

```text
User
 ├─ UserGear A
 ├─ UserGear B
 └─ UserGear C
```

각 Activity에서 실제 사용 신발을 연결한다.

이후:

- Shoe Rotation
- Mileage by Shoe
- Gear History

분석 가능.

---

# 121. Future Data Expansion — Similar Runner

필요 데이터 후보:

```text
Runner Type
Running Experience
Runs / Week
Weekly Distance
Activity Pattern
Gear Ownership
Gear Usage
Recommendation Feedback
```

유사도 Score는 내부 계산에 사용하고  
사용자에게 %로 그대로 보여주지 않는다.

---

# 122. Future Data Expansion — Community

새 Entity 후보:

```text
RunnerProfileVisibility
Follow
Reaction
Group
Challenge
ChallengeParticipation
```

MVP에서는 생성하지 않는다.

---

# 123. Future Community Data Principle

다른 Runner Profile을 보여주기 전에  
공개 범위를 사용자에게 선택하게 해야 한다.

예:

```text
PRIVATE
LIMITED
PUBLIC
```

향후 별도 Privacy 설계 필요.

---

# 124. Future Data Expansion — Avatar

후보:

```text
Avatar
AvatarItem
UserAvatarItem
AvatarState
```

Activity / Milestone과 연결할 수 있다.

MVP에는 불필요.

---

# 125. Future Data Expansion — Commerce

H5가 검증되면:

```text
Merchant
ProductOffer
Price
OutboundClick
AffiliateConversion
Purchase
```

등을 검토한다.

---

# 126. Future Data Expansion — Recommendation Learning

충분한 데이터가 쌓인 이후:

```text
Runner Context
+
Recommendation
+
Click
+
Save
+
Purchase
+
Satisfaction
```

을 이용해 Recommendation Weight를 개선할 수 있다.

초기부터 ML 모델을 전제로 설계하지 않는다.

---

# 127. Data Maturity Roadmap

## Stage 1 — MVP

```text
Rule-based Recommendation
+
Event Data
+
Feedback
```

---

## Stage 2 — Behavioral Recommendation

```text
User Segment
+
Click / Save
+
Repeat Usage
```

---

## Stage 3 — Similar Runner

```text
Runner Similarity
+
Gear Usage
+
Satisfaction
```

---

## Stage 4 — Learning System

```text
Recommendation
→ User Behavior
→ Feedback
→ Weight Improvement
```

---

# 128. What Not To Infer

MVP 데이터만으로 다음을 단정하지 않는다.

### Shoe Mileage
> 신발이 반드시 교체 시점이라는 판단

### Runner Type
> 사용자의 운동 능력 진단

### Product Click
> 실제 구매

### Recommendation Helpful
> 제품이 실제로 사용자에게 물리적으로 적합함

### Similar Runner
> 생체역학적 유사성

---

# 129. Data Interpretation Principle

항상

```text
Observed Behavior
≠
Underlying Cause
```

임을 기억한다.

예:

Product Click이 높다.

가능한 원인:

- 추천이 좋음
- 제품이 유명함
- 이미지가 매력적
- 가격이 궁금함

따라서 행동 + Feedback + 인터뷰를 함께 본다.

---

# 130. MVP Data Build Priority

## Phase 1

- User
- Session
- RunnerIdentity
- RunnerTestAnswer
- RunnerProfile

## Phase 2

- Gear
- UserGear
- Activity
- GearUsage

## Phase 3

- Recommendation
- Direction
- Item

## Phase 4

- Feedback
- PurchaseIntent
- Event

실제 개발에서는 Event 기반을 Phase 1부터 함께 설계해야 한다.

---

# 131. Suggested Database Table Names

예시:

```text
users
sessions
runner_identities
runner_test_answers
runner_profiles
gears
user_gears
activities
gear_usages
recommendations
recommendation_directions
recommendation_items
recommendation_feedbacks
purchase_intents
events
```

---

# 132. Key IDs

모든 주요 Entity에는 별도 ID를 둔다.

```text
user_id
session_id
gear_id
activity_id
recommendation_id
direction_id
recommendation_item_id
```

이 ID들이 Analytics와 Recommendation Traceability의 기반이다.

---

# 133. MVP Data Contract

Frontend와 Backend 사이에서  
최소한 다음 객체 구조를 합의한다.

## Runner Context

```json
{
  "user_id": "...",
  "runner_type": "PACE_RUNNER",
  "running_experience": "Y1_TO_3Y",
  "runs_per_week": "W3_4",
  "weekly_distance_band": "KM15_30",
  "current_gear_id": "...",
  "shoe_mileage_km": 126.0
}
```

---

# 134. Recommendation Request Example

```json
{
  "user_id": "...",
  "gear_need": "SPEED",
  "priority": "RESPONSIVENESS",
  "followup": null
}
```

---

# 135. Recommendation Response Example

```json
{
  "recommendation_id": "...",
  "logic_version": "gear_reco_v1.0",
  "directions": [
    {
      "direction_id": "...",
      "title": "Performance Step-up",
      "products": [
        {
          "gear_id": "...",
          "reason": "...",
          "current_shoe_difference": "...",
          "best_use": "...",
          "tradeoff": "..."
        }
      ]
    }
  ]
}
```

---

# 136. Event Example

```json
{
  "event_name": "product_view",
  "user_id": "...",
  "session_id": "...",
  "properties": {
    "recommendation_id": "...",
    "direction_id": "...",
    "gear_id": "..."
  }
}
```

---

# 137. MVP Data QA Checklist

## User
- [ ] user_id unique
- [ ] nickname conflict handled
- [ ] PIN hash
- [ ] test user flag

## Identity
- [ ] 5 answers saved
- [ ] type result saved
- [ ] logic version saved

## Profile
- [ ] experience saved
- [ ] runs/week saved
- [ ] weekly distance saved

## Gear
- [ ] current shoe linked
- [ ] unknown/none handled

## Activity
- [ ] run saved once
- [ ] weekly stats correct
- [ ] shoe mileage correct

## Recommendation
- [ ] input snapshot saved
- [ ] logic version saved
- [ ] 3 directions saved
- [ ] product items linked

## Feedback
- [ ] helpful saved
- [ ] purchase intent saved

## Event
- [ ] user/session mapping
- [ ] no duplicate
- [ ] market/source present

---

# 138. MVP Data Success Criteria

MVP 데이터 구조가 성공적으로 구축되었다고 보는 기준:

1. 한 사용자의 Runner Test부터 Recommendation까지 전체 Journey를 추적할 수 있다.
2. Returning User가 기존 데이터와 정확히 연결된다.
3. Run Add가 Activity와 Shoe Mileage에 일관되게 반영된다.
4. 어떤 Recommendation이 어떤 Context에서 만들어졌는지 재현 가능하다.
5. Recommendation 이후 Product 행동과 Feedback을 연결할 수 있다.
6. H1/H3/H4/H5를 SQL 또는 Analytics Tool에서 계산할 수 있다.

---

# 139. 데이터 기획의 핵심 Trade-off

## More Data vs Less Friction

더 많은 데이터를 받으면 Recommendation Context는 풍부해진다.

하지만 입력이 많아지면

- H1
- H2
- Activation

이 악화될 수 있다.

MVP에서는 **최소 Context**를 우선한다.

---

# 140. MVP Minimum Context

Recommendation을 위한 최소 사용자 Context:

```text
Runner Type
Running Experience
Runs / Week
Weekly Distance
Current Shoe
Gear Need
Priority
```

Activity가 존재하면 추가 사용.

---

# 141. 추가 데이터 수집 우선순위

새 데이터 필드 제안 시 다음 기준으로 판단한다.

## Priority A
Recommendation에 즉시 사용

## Priority B
H1/H3/H4/H5 분석에 사용

## Priority C
사용자 화면에 가치 제공

위 세 가지 중 하나도 아니면 MVP 제외.

---

# 142. 향후 신체 데이터

예:

- Height
- Weight
- Foot Width
- Injury History

등은 Recommendation에 도움이 될 수 있지만  
MVP에서 무조건 받지 않는다.

특히 건강·신체 관련 데이터는  
필요성과 민감도를 별도로 검토해야 한다.

---

# 143. 데이터가 서비스 방향을 결정하는 방식

MVP 이후 데이터에 따라 다음이 달라진다.

## Runner Card 행동 강함

```text
Identity
→ Avatar
→ Social Profile
→ Community
```

## Activity 행동 강함

```text
Manual Run
→ Auto Sync
→ Multi-shoe
→ Gear History
```

## Recommendation 행동 강함

```text
Direction
→ Compare
→ Similar Runner
→ Commerce
```

---

# 144. Data Decision Matrix

| Signal | 의미 | 후속 방향 |
|---|---|---|
| Card Save/Share 높음 | Identity 가치 | Avatar/Social |
| D7 높음 | 지속 서비스 가능성 | Retention 강화 |
| Repeat Run 높음 | Activity Utility | Auto Sync 검토 |
| Shoe Mileage 사용 높음 | Gear Management 가치 | Multi-shoe |
| Product View 높음 | 추천 관심 | Recommendation 고도화 |
| Purchase Intent 높음 | Commerce 가능성 | Outbound/Affiliate |
| Other Runner 요구 반복 | Social 가치 | Community |

---

# 145. MVP Data Non-goals

MVP 데이터 기획에서 하지 않는다.

- 모든 미래 기능의 Table 미리 생성
- Big Data Architecture
- Data Lake
- 실시간 ML Pipeline
- 복잡한 Feature Store
- 모든 행동 Event 수집
- 필요 없는 개인정보 저장

---

# 146. Current MVP Data Stack Concept

기술 스택 자체는 DEV 문서에서 확정한다.

개념적으로는 다음 정도면 충분하다.

```text
Frontend
  ↓
API
  ↓
Relational DB
  ↓
Event / Analytics
```

Recommendation은

```text
Product DB
+
Rule/Score Logic
+
Explanation Layer
```

로 분리한다.

---

# 147. Final Data Model Summary

```text
USER
 ├── Runner Identity
 │     └── Test Answers
 │
 ├── Runner Profile
 │
 ├── Current Gear
 │     └── Gear Usage
 │
 ├── Activity
 │
 ├── Recommendation
 │     ├── Direction A
 │     │     └── Product
 │     ├── Direction B
 │     │     └── Product
 │     └── Direction C
 │           └── Product
 │
 ├── Recommendation Feedback
 ├── Purchase Intent
 └── Events / Sessions
```

---

# 148. Final Data Statement

> **GearMatch AI의 MVP 데이터 경쟁력은  
> 많은 사용자 정보를 모으는 데 있지 않다.**

핵심은 한 사용자 단위로

> **Runner Identity  
> → 실제 Activity  
> → Gear Usage  
> → Recommendation  
> → Product Consideration  
> → Feedback**

을 연결하는 것이다.

이 구조가 반복적으로 쌓이면  
GearMatch AI는 단순 러닝화 추천 서비스에서

> **Runner와 Gear의 관계를 이해하는 데이터 서비스**

로 발전할 수 있다.

---

# 149. MVP 필수 데이터 요약

## P0 User Data

```text
user_id
nickname
market
language
```

## P0 Identity

```text
5 test answers
runner_type
type_logic_version
```

## P0 Profile

```text
running_experience
runs_per_week
weekly_distance_band
```

## P0 Gear

```text
current_gear
shoe_mileage
```

## P0 Activity

```text
date
distance
gear
```

## P0 Recommendation

```text
gear_need
priority
context_snapshot
3 directions
products
reasons
logic_version
```

## P0 Validation

```text
recommendation_feedback
purchase_intent
events
sessions
```

---

# 150. Next Document Connection

## 07_Recommendation & AI Gear Coach 정의서

본 문서의

- Runner Context
- Product Attribute
- Gear Need
- Priority
- Recommendation
- Direction
- RecommendationItem
- Feedback

을 사용해 실제 추천 Logic을 정의한다.

특히 다음을 확정해야 한다.

```text
Input
→ Filter
→ Score
→ Direction
→ Product Candidate
→ Reason
→ Current Shoe Difference
→ Trade-off
→ AI Explanation
```

---

# 151. 데이터 기획 최종 체크

MVP 개발 전에 반드시 답할 수 있어야 한다.

1. 어떤 데이터가 User 원본인가?
2. 어떤 값이 계산값인가?
3. Recommendation 생성 시 어떤 Context를 저장하는가?
4. Logic 버전을 어떻게 남기는가?
5. User와 Session을 어떻게 구분하는가?
6. Returning User를 어떻게 동일 사용자로 연결하는가?
7. Run Add가 Gear Usage와 어떻게 연결되는가?
8. H1/H3/H4/H5를 어떤 Event로 계산하는가?
9. Test User를 어떻게 제외하는가?
10. 삭제 요청 시 어떤 데이터를 제거할 수 있는가?

이 열 가지가 구현 가능하면  
GearMatch AI MVP의 데이터 기반은 최소 수준에서 준비된 것으로 본다.
