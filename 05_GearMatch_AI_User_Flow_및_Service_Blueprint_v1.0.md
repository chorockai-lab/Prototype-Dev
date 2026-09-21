# 05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0

> **문서 목적**  
> 본 문서는 GearMatch AI MVP에서 사용자가 실제로 어떤 순서로 서비스를 경험하고,  
> 각 단계에서 시스템이 어떤 데이터를 저장·처리하며, 어떤 Event를 기록해야 하는지 정의한다.  
> Prototype의 현재 화면 흐름을 기반으로 하되, `04_MVP Scope 정의서`의 P0 기능을 실제 서비스 흐름으로 전환하는 것을 목표로 한다.

- 문서 버전: v1.0
- 기준 시점: 2026-09-04
- 서비스 정식 명칭: **GearMatch AI**
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1`
- 기준 Prototype:
  - `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` (정본)
  - 이전 기준: `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html` (v1.6 -> v1.7로 승계)
- 핵심 가설:
  - H1 Runner Identity
  - H3 Recommendation Value
  - H4 Retention
  - H5 Purchase Consideration

---

# 1. User Flow 설계 원칙

GearMatch AI의 MVP Flow는 단순히 화면을 순서대로 연결하는 것이 아니다.

서비스 경험은 다음 구조를 유지해야 한다.

```text
Identity
→ Profile
→ Activity
→ Gear
→ Recommendation
→ Feedback
→ Return
```

핵심 철학은 다음과 같다.

## Principle 1. Identity First

사용자가 처음 들어왔을 때  
바로 “어떤 신발을 원하세요?”라고 묻지 않는다.

먼저

> “나는 어떤 러너인가”

를 확인하게 한다.

---

## Principle 2. Progressive Profiling

처음부터 모든 데이터를 받지 않는다.

```text
5개 질문
→ Runner Card
→ 최소 Profile
→ Current Shoe
→ 이후 Activity
```

순서로 정보를 받는다.

---

## Principle 3. Existing Context Reuse

Gear Recommendation에서  
사용자에게 이미 받은 정보를 다시 묻지 않는다.

이미 존재하는

- Runner Type
- Running Experience
- Runs / Week
- Weekly Distance
- Current Shoe
- Activity

를 Recommendation Context로 재사용한다.

---

## Principle 4. Minimum Input

MVP에서는 Recommendation 정확도를 높이기 위해  
질문을 계속 추가하는 방식을 지양한다.

필요한 경우에만 Follow-up Question을 사용한다.

---

## Principle 5. Every Step Has a Reason

사용자가 데이터를 입력할 때는

> “왜 이 정보를 입력하는가”

를 UX상 이해할 수 있어야 한다.

---

# 2. MVP Primary User Flow

MVP의 기본 진입 흐름은 **Identity First**다.

```text
[Landing]
   ↓
[신규 / 기존 사용자 선택]
   ↓
 ┌───────────────────┐
 │      신규 사용자     │
 └───────────────────┘
   ↓
[5 Questions]
   ↓
[Runner Type Reveal]
   ↓
[Runner Card Lite]
   ↓
[Runner Profile]
   ↓
[Current Shoe]
   ↓
[Runner Card Complete]
   ↓
 ┌────────────┬─────────────┐
 │            │             │
[RUN 기록]   [GEAR 탐색]   [Card 확인]
 │            │
 ↓            ↓
Activity     Gear Need
Update        ↓
 │          Priority
 ↓            ↓
Card Update  Follow-up if needed
              ↓
         3 Gear Directions
              ↓
         Product Candidates
              ↓
       Recommendation Reason
              ↓
      Purchase Consideration
              ↓
          Feedback
```

---

# 3. Future Entry Path

향후 마케팅에서 Gear Need가 강한 사용자를 위해  
다음 진입 경로를 검토할 수 있다.

```text
Gear Need
→ 최소 Runner Context 확보
→ Gear Direction
→ Recommendation
```

그러나 **MVP 기본 Flow는 Identity First로 유지**한다.

이유:

- H1을 먼저 검증해야 함
- Runner Profile을 확보해야 Recommendation의 차별화가 가능함
- 현재 Prototype 구조와 일관됨

---

# 4. Screen Architecture

현재 Prototype을 기준으로 화면 흐름을 다음과 같이 정리한다.

| 단계 | Prototype Screen | MVP 역할 |
|---|---|---|
| Landing | s01 | 신규 / 기존 사용자 분기 |
| Returning Login | s02 | Nickname + PIN |
| Questions | s03~s04 | Runner Test |
| Optional Distance | s05 | Type 판별 보조 |
| Type Reveal | s06 | 결과 Reveal |
| Runner Card Lite | s07 | Identity 결과 |
| Profile | s08 | 러닝 경력 / 횟수 / 거리 |
| Current Shoe | s09 | 현재 러닝화 |
| Runner Card Complete | s10 | Activity + Gear 허브 |
| Run Add | s11 | 수기 러닝 입력 |
| Gear Need | s12 | 장비 탐색 목적 |
| Gear Priority | s13 | 우선순위 |
| Follow-up | s14 | 필요한 경우 추가 질문 |
| Missing Weekly Distance | s15 | Context 보완 |
| Gear Recommendation | s16 | 3 Directions + Product |

MVP 개발 시 Screen ID 자체는 변경 가능하지만  
**Flow의 의미는 유지**한다.

---

# 5. Entry Flow

## 5.1 Landing

### 사용자 목표

> “이게 무슨 서비스인지 빠르게 이해하고, 해볼지 결정한다.”

### 화면 요소

- GearMatch AI 로고 / 브랜드
- Runner Test 가치 문장
- 5개 질문이라는 낮은 부담
- 신규 사용자 CTA
- 기존 사용자 진입

### 핵심 CTA

**“Runner Card 만들기”**

또는 동일한 의미의 문구.

### 기존 사용자

**“이미 Runner Card가 있어요”**

---

# 6. Landing에서 전달해야 하는 정보

사용자는 첫 화면에서 최소한 다음 세 가지를 이해해야 한다.

1. 나는 어떤 Runner Type인지 확인할 수 있다.
2. Runner Card가 만들어진다.
3. 이후 장비 방향까지 연결된다.

초기 문구는 너무 많은 기능을 설명하지 않는다.

---

# 7. Landing Event

```text
landing_view
test_start
returning_entry_click
```

### H1 측정

```text
Test Start / Landing View
```

---

# 8. New User Flow

신규 사용자의 기본 흐름:

```text
Landing
→ Test Start
→ Q1
→ Q2
→ Q3
→ Q4
→ Q5
→ Type Calculation
→ Reveal
→ Runner Card Lite
```

---

# 9. Runner Test Flow

## 사용자 목표

> “나는 어떤 Runner Type일까?”

## 질문 수

**5개 유지**

## UX 원칙

- 한 화면에 한 질문
- 선택 즉시 다음 단계 가능
- Back 지원
- Progress 표시
- 선택지 문장은 짧고 본인 판단이 쉬워야 함

---

# 10. Runner Test Data

각 질문 응답은 다음 형태로 저장한다.

```text
user/temp_session_id
question_id
selected_option
answer_value
timestamp
```

가입 전에는 Temporary Session으로 저장 가능하다.

Runner Card 생성 후 User와 연결한다.

---

# 11. Runner Test Event

```text
question_view
question_answer
test_complete
```

공통 속성:

```text
question_id
question_index
selected_option
```

---

# 12. Optional Distance Step

현재 Prototype에서는 Runner Type 판별 과정에서  
필요한 경우 러닝 거리 질문을 추가로 사용할 수 있다.

## 원칙

이 화면은 **모든 사용자에게 강제하지 않는다.**

Type 판별에 실제 필요할 때만 사용한다.

## 목적

특정 Type 간 경계에서 추가 정보를 얻기 위한 보조 질문.

---

# 13. Runner Type Calculation

5개 질문 완료 후 Type을 계산한다.

## 현재 6종

- ROUTINE RUNNER
- EXPLORE RUNNER
- DISTANCE RUNNER
- PACE RUNNER
- RACE RUNNER
- ALL-AROUND RUNNER

## 시스템 처리

```text
Answers
→ Score
→ Type Rule
→ Runner Type
```

## MVP 원칙

한 번 결정된 Type은 자동 변경하지 않는다.

---

# 14. Runner Type Reveal

## 목적

결과를 바로 Card로 보여주기 전에  
짧은 Reveal을 통해 기대감을 만든다.

## 화면

- Type Name
- Visual Transition
- 짧은 결과 노출

## Event

```text
runner_type_reveal
```

---

# 15. Runner Card Lite

## 정의

Runner Test 직후 처음 제공되는 Card.

아직 Profile이 완성되지 않은 상태다.

---

## 표시 정보

### Identity Layer

- Runner Type
- Main Copy
- Flow
- Style
- Motivation
- Direction
- Description

### Empty / Pending Layer

- Weekly Distance
- Runs / Week
- Running Since
- Current Gear

---

# 16. Runner Card Lite의 UX 목적

사용자가

> “내 Card가 만들어졌다.”

는 보상을 먼저 느낀 뒤

> “여기에 실제 내 러닝 데이터를 채우고 싶다.”

는 동기를 갖게 한다.

즉

```text
Reward First
→ Data Request Second
```

구조다.

---

# 17. Runner Card Lite CTA

## P0

**“내 Runner Profile 완성하기”**

## P1

- 카드 저장
- 카드 공유

MVP 초기 P0 검증에서는  
Save/Share가 없어도 다음 단계로 이동 가능해야 한다.

---

# 18. Runner Card Lite Event

```text
runner_card_view
profile_start
card_save   # P1
card_share  # P1
```

### H1 핵심 Funnel

```text
Test Start
→ Test Complete
→ Runner Card
→ Profile Start
```

---

# 19. Account Creation Timing

MVP에서는 회원가입 Form을 앞에 두지 않는다.

권장 시점:

```text
Runner Card Lite
→ Profile Complete 과정
→ Nickname + PIN 설정
```

또는 Card 저장 시점에 생성한다.

---

# 20. 왜 가입을 뒤로 미루는가

처음부터 가입을 요구하면  
H1 Hook 자체와 회원가입 장벽이 섞인다.

사용자가 Runner Card라는 보상을 먼저 경험한 뒤  
데이터 저장을 위해 최소 계정을 생성하도록 한다.

---

# 21. Account Data

## 사용자 입력

- Nickname
- 4-digit PIN

## 시스템

- Internal User ID 생성
- PIN 안전 저장
- Session 연결
- Runner Identity 연결

---

# 22. Account Edge Case

## Nickname 중복

사용자가 동일 Nickname을 입력한 경우  
동일 사용자라고 판단하지 않는다.

반드시 Internal User ID를 기준으로 관리한다.

필요 시:

- Nickname 중복 허용
- 또는 숫자 suffix 표시

중 하나를 개발 단계에서 확정한다.

---

# 23. Runner Profile Flow

Runner Card Lite 이후  
사용자는 최소 Profile을 입력한다.

## 입력

1. Running Experience
2. Runs / Week
3. Weekly Distance

---

# 24. Profile UX

한 번에 많은 폼을 보여주지 않는다.

가능하면 선택형 UI를 사용한다.

예:

### Running Experience

- 6개월 미만
- 6개월~1년
- 1~3년
- 3년 이상

### Runs / Week

- 주 1회 이하
- 주 1~2회
- 주 3~4회
- 주 5회 이상

### Weekly Distance

- 5km 미만
- 5~15km
- 15~30km
- 30km 이상
- 잘 모르겠음

---

# 25. Profile Data

저장:

```text
running_experience
runs_per_week
weekly_distance
```

## Event

```text
profile_step_view
profile_answer
profile_complete
```

---

# 26. Current Shoe Flow

Profile 이후 현재 러닝화를 등록한다.

## MVP

현재 신발 **1개**

## 사용자 입력

- 검색 / 선택
- 또는 “잘 모르겠어요”
- 또는 “현재 별도 러닝화가 없어요”

---

# 27. Current Shoe 검색 UX

가능하면

```text
Brand / Model Search
→ Candidate List
→ Select
```

형태로 구현한다.

자유 텍스트만 저장하면  
제품 DB와 연결하기 어려워진다.

---

# 28. Current Shoe Data

저장:

```text
gear_id
brand
model
version
status
```

가능하면 `gear_id`를 제품 DB와 연결한다.

---

# 29. Current Shoe Event

```text
shoe_search
shoe_select
shoe_register
shoe_unknown
shoe_none
```

---

# 30. Runner Card Complete

Profile과 Current Shoe가 입력되면  
Runner Card가 Complete 상태가 된다.

## 표시

### Identity
- Runner Type

### Profile
- Running Experience
- Runs / Week
- Weekly Distance

### Activity
- Weekly KM
- Weekly Runs
- Last Run
- Total KM

### Gear
- Current Shoe
- Shoe Mileage

---

# 31. Runner Card Complete의 역할

이 화면은 단순 결과 페이지가 아니라  
MVP의 **Home / Hub** 역할을 한다.

사용자는 여기에서 세 행동 중 하나를 선택한다.

```text
RUN 추가
GEAR 탐색
Card 확인
```

---

# 32. Main Hub CTA

## Primary

### + RUN

활동 기록 추가

### EXPLORE GEAR

장비 탐색

## Secondary

- Profile 확인
- Current Gear 확인

---

# 33. Runner Card Complete Event

```text
home_view
run_entry_click
gear_start
```

재방문 시 `home_view`는 Retention 분석의 주요 이벤트가 된다.

---

# 34. Run Add Flow

```text
Runner Card Complete
→ + RUN
→ Distance 입력
→ Save
→ Activity 생성
→ Stats 업데이트
→ Shoe Mileage 업데이트
→ Feedback
→ Runner Card Complete
```

---

# 35. Run Input

MVP 최소 입력:

- Distance

자동 처리:

- Date / Time
- User
- Current Shoe 연결

필요 시 사용자가 현재 신발 사용 여부를 선택할 수 있다.

---

# 36. Run Data

```text
activity_id
user_id
date
distance_km
gear_id
created_at
```

---

# 37. Run Save System Logic

저장 후:

```text
weekly_distance += run_distance
weekly_runs += 1
total_distance += run_distance
last_run = run_distance
```

현재 신발 사용 시:

```text
shoe_mileage += run_distance
```

---

# 38. Run Feedback

저장 직후 사용자가 변화가 반영됐음을 보여준다.

예:

> 5.0 km가 추가됐어요.

> 이번 주 12.4 km → 17.4 km

> 현재 신발 누적 거리에도 5.0 km가 반영됐어요.

이 Feedback은 H4의 작은 보상 구조다.

---

# 39. Run Event

```text
run_entry_view
run_add
shoe_mileage_update
```

속성:

```text
distance
gear_id
weekly_before
weekly_after
shoe_mileage_before
shoe_mileage_after
```

---

# 40. Run Edge Case

## Distance 0 / Invalid

저장하지 않음.

## Current Shoe 없음

Activity는 저장하되 Shoe Mileage는 업데이트하지 않음.

## 이전 날짜 Run 입력

MVP에서는 Optional.

초기에는 현재 날짜를 기본으로 처리해도 된다.

---

# 41. Shoe Mileage UX

Runner Card Complete에서 항상 확인 가능하도록 한다.

## 목적

사용자가

> “내가 이 신발을 얼마나 썼는가”

를 즉시 확인하게 한다.

---

# 42. Shoe Mileage에서 하지 않는 것

MVP에서는

- 교체 알림
- 위험 경고
- 마모 진단

을 제공하지 않는다.

이후 데이터와 사용자 요구가 있을 때 확장한다.

---

# 43. Gear Entry Flow

```text
Runner Card Complete
→ Explore Gear
→ Gear Need
→ Priority
→ Follow-up if needed
→ Recommendation
```

---

# 44. Gear Need

사용자가 이번 탐색에서 원하는 방향을 선택한다.

예:

- 편하게
- 빠르게
- 더 멀리
- 대회 준비
- 아직 잘 모르겠음

정확한 문구는 07 Recommendation 문서에서 확정한다.

---

# 45. Gear Need System Use

Gear Need는 기존 Runner Context와 결합한다.

```text
Runner Type
+
Profile
+
Activity
+
Current Shoe
+
Gear Need
```

---

# 46. Gear Need Event

```text
gear_start
gear_need_select
```

---

# 47. Priority Flow

사용자가 무엇을 더 중요하게 보는지 선택한다.

예:

- Comfort
- Stability
- Responsiveness
- Versatility
- Performance

실제 Priority는 제품 DB와 Recommendation Logic에 맞춰 확정한다.

---

# 48. Priority Event

```text
gear_priority_select
```

---

# 49. Follow-up Question

모든 사용자에게 추가 질문하지 않는다.

## 조건

- Gear Need가 “잘 모르겠음”
- 기존 Profile에 Recommendation에 필요한 데이터가 없음
- 후보 간 구분이 어려움

인 경우에만 사용한다.

---

# 50. Follow-up 원칙

```text
If Needed → Ask
If Known → Skip
```

사용자가 이미 입력한 값을 다시 묻지 않는다.

---

# 51. Missing Context Flow

예:

Weekly Distance가 없는 경우

```text
Gear Need
→ Priority
→ Missing Weekly Distance
→ Recommendation
```

이 화면은 Recommendation을 위해 필요한 최소 Context 보완용이다.

---

# 52. 3 Gear Directions Screen

GearMatch AI Recommendation의 핵심 화면.

## 사용자 목표

> “내가 어떤 방향을 비교해야 하는지 알고 싶다.”

---

# 53. Direction Display

각 Direction은 최소 다음을 포함한다.

- Direction Name
- 한 문장 설명
- 왜 이 Direction이 나왔는지
- 어떤 사용자/러닝 상황에 적합한지
- 대표 Product Candidate

---

# 54. Direction UX Principle

첫 화면에서 제품 3개를 단순 나열하지 않는다.

우선 사용자가

> “제품보다 선택 방향”

을 이해하도록 한다.

---

# 55. Recommendation Input

시스템 입력:

```text
runner_type
running_experience
runs_per_week
weekly_distance
current_shoe
shoe_mileage
gear_need
priority
followup
```

---

# 56. Recommendation Processing

구조:

```text
Context Validation
→ Product Filter
→ Direction Match
→ Candidate Score
→ 3 Directions
→ Product Candidates
→ Reason Generation
```

정확한 Logic은 07에서 정의한다.

---

# 57. Recommendation Output

최소 출력:

```text
Direction A
  Product
  Why
  Current Shoe Difference
  Best Use
  Trade-off

Direction B
  ...

Direction C
  ...
```

---

# 58. Recommendation Event

```text
gear_direction_view
recommendation_view
```

속성:

```text
recommendation_id
direction_ids
product_ids
gear_need
priority
```

---

# 59. Product Candidate Interaction

사용자가 후보를 선택하면  
Product Detail을 확인한다.

## 최소 표시

- Image
- Brand
- Model
- Recommendation Direction
- 핵심 특징
- Why
- Current Shoe Difference
- Trade-off

---

# 60. Product Event

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

# 61. Recommendation Reason UX

추천 이유는 텍스트만 길게 보여주지 않는다.

구조화:

### WHY THIS
왜 추천됐는지

### VS YOUR SHOE
현재 신발과 무엇이 다른지

### BEST FOR
어떤 상황에 적합한지

### KEEP IN MIND
Trade-off

---

# 62. Recommendation Feedback Flow

제품 또는 Recommendation 결과 확인 후  
짧은 Feedback을 받는다.

```text
Recommendation
→ Helpful?
→ Purchase Consideration
```

---

# 63. Helpful Feedback

질문:

> 이 추천이 도움이 되었나요?

선택:

- 도움이 됐어요
- 잘 모르겠어요
- 맞지 않아요

Event:

```text
recommendation_feedback
```

---

# 64. Purchase Consideration

질문:

> 이 제품을 다음 러닝화 후보로 고려하시겠어요?

선택:

- 적극 고려
- 후보에 넣어볼 것 같음
- 아직 모르겠음
- 고려하지 않음

Event:

```text
purchase_consideration
```

---

# 65. AI Gear Coach Flow — P1

추천 결과 이후만 노출한다.

```text
Recommendation
→ AI Gear Coach
→ Suggested Questions
→ Answer
```

---

# 66. Suggested Questions

예:

- 지금 신발과 뭐가 달라?
- 세 후보 중 가장 편한 건?
- 긴 거리에는 어떤 차이가 있어?
- 대회용으로도 괜찮아?

---

# 67. AI Gear Coach 역할

AI는 Recommendation을 새로 결정하지 않는다.

이미 생성된 Recommendation과 User Context를 바탕으로  
설명한다.

---

# 68. Returning User Flow

```text
Landing
→ Existing User
→ Nickname
→ PIN
→ Authentication
→ Runner Card Complete
```

---

# 69. Returning User Goal

사용자는 다시 Test를 하지 않는다.

바로 자신의 최신 Runner Card와 Activity/Gear 상태로 이동한다.

---

# 70. Returning Login Data

입력:

```text
nickname
pin
```

시스템:

```text
user lookup
pin verify
session create
user data load
```

---

# 71. Returning Login Event

```text
returning_entry_click
login_attempt
login_success
login_fail
return_session
```

---

# 72. Returning User Home

Returning User가 확인해야 하는 핵심 변화:

- This Week Distance
- Runs
- Last Run
- Shoe Mileage
- Current Gear

사용자는

> “지난번 이후 무엇이 달라졌는가”

를 즉시 볼 수 있어야 한다.

---

# 73. Returning User Primary Actions

### + RUN
오늘 활동 추가

### EXPLORE GEAR
새 장비 탐색

---

# 74. H4 Retention Flow

```text
Profile Complete
→ First Run
→ Leave
→ Return
→ Runner Card
→ Run Add or Gear
```

H4는 단순 `login_success`만으로 보지 않는다.

Return 후 실제 Action을 본다.

---

# 75. Return Reason Tracking

가능하면 Return Session에서  
행동을 기반으로 자동 추론한다.

예:

- Run Add → Activity Return
- Gear Start → Gear Return
- Card only → Identity Return

필요하면 정성 인터뷰에서 직접 묻는다.

---

# 76. User State Model

## Visitor
Landing만 확인

## Test User
Test 시작

## Card User
Runner Card 생성

## Activated User
Profile Complete

## Active Runner
Run 1회 이상

## Returning User
다음 Session 재방문

## Gear User
Recommendation 확인

## Commercial User
Purchase Consideration / Save / Outbound

---

# 77. State Transition

```text
Visitor
  ↓
Test User
  ↓
Card User
  ↓
Activated User
  ↓
Active Runner
  ↓
Returning User
  ↓
Gear User
  ↓
Commercial User
```

모든 사용자가 순서대로 갈 필요는 없지만  
분석에서는 이 상태를 구분한다.

---

# 78. Service Blueprint Layer

GearMatch AI의 Service Blueprint는 5개 Layer로 구성한다.

```text
User Action
Frontstage
Backstage
Data
Measurement
```

---

# 79. Service Blueprint — New User

| Stage | User Action | Frontstage | Backstage | Data | Event |
|---|---|---|---|---|---|
| Landing | 서비스 확인 | Landing | Session 생성 | source/session | landing_view |
| Test | 5문항 응답 | Question UI | 답변 저장 | test_answer | question_answer |
| Type | 결과 확인 | Reveal | Type 계산 | runner_type | runner_type_reveal |
| Card | Card 확인 | Card Lite | Identity 저장 | identity | runner_card_view |
| Profile | 러닝 정보 입력 | Profile UI | Profile 저장 | profile | profile_complete |
| Gear | 현재 신발 선택 | Shoe Search | Gear DB 연결 | user_gear | shoe_register |
| Complete | Card 확인 | Complete Card | Aggregate | profile/activity | home_view |

---

# 80. Service Blueprint — Activity

| Stage | User Action | Frontstage | Backstage | Data | Event |
|---|---|---|---|---|---|
| Run Entry | +RUN 선택 | Distance UI | Input validation | temp input | run_entry_view |
| Save | 거리 저장 | Success feedback | Activity 생성 | activity | run_add |
| Stats | 변화 확인 | Weekly/Run update | Aggregate update | stats | activity_view |
| Gear Usage | Mileage 확인 | Shoe Mileage | GearUsage update | gear_usage | shoe_mileage_update |

---

# 81. Service Blueprint — Gear Recommendation

| Stage | User Action | Frontstage | Backstage | Data | Event |
|---|---|---|---|---|---|
| Need | 목적 선택 | Gear Need | Context append | intent | gear_need_select |
| Priority | 기준 선택 | Priority | Context append | priority | gear_priority_select |
| Direction | 3방향 확인 | Direction UI | Rule/Score | recommendation | gear_direction_view |
| Product | 후보 확인 | Product UI | Product fetch | recommendation_item | product_view |
| Reason | 이유 이해 | Why/VS/Trade-off | Explanation assemble | reason | recommendation_view |
| Feedback | 평가 | Feedback UI | Feedback save | feedback | recommendation_feedback |
| Intent | 구매 후보 평가 | Consideration UI | Intent save | purchase_intent | purchase_consideration |

---

# 82. Service Blueprint — Returning User

| Stage | User Action | Frontstage | Backstage | Data | Event |
|---|---|---|---|---|---|
| Entry | 기존 사용자 선택 | Login | Session start | session | returning_entry_click |
| Login | Nickname/PIN | Login Form | User verify | user | login_success |
| Load | Card 확인 | Complete Card | User context load | profile/activity/gear | return_session |
| Action | RUN/Gear | Hub | Route | action | run_entry_click/gear_start |

---

# 83. Frontstage Responsibilities

사용자에게 직접 보이는 영역.

## Identity
- Test
- Type
- Card

## Activity
- Run Input
- Stats
- Shoe Mileage

## Gear
- Need
- Direction
- Product
- Reason

## Feedback
- Helpful
- Purchase Consideration

---

# 84. Backstage Responsibilities

사용자에게 보이지 않지만 반드시 작동해야 하는 영역.

- User Session
- Authentication
- Type Calculation
- Profile Persistence
- Activity Aggregation
- Gear Usage Calculation
- Product DB
- Recommendation Logic
- Reason Generation
- Feedback Storage
- Event Tracking

---

# 85. Data Objects by Flow

## Identity

```text
RunnerIdentity
TestAnswer
```

## Profile

```text
RunnerProfile
```

## Gear

```text
Gear
UserGear
GearUsage
```

## Activity

```text
Activity
```

## Recommendation

```text
Recommendation
RecommendationItem
```

## Feedback

```text
RecommendationFeedback
PurchaseIntent
```

## Analytics

```text
Event
Session
```

---

# 86. Error / Empty State Principles

MVP는 정상 Flow만 설계하지 않는다.

다음 상태를 반드시 처리한다.

---

# 87. Login Fail

상황:

- Nickname 없음
- PIN 불일치

UX:

> 입력한 정보를 다시 확인해주세요.

보안상 구체적으로

> “닉네임은 맞고 PIN만 틀렸습니다.”

처럼 과도한 정보를 주지 않는다.

---

# 88. Current Shoe Unknown

사용자가 모델을 모르는 경우

> “잘 모르겠어요”

선택 허용.

Recommendation에서는 Current Shoe 비교 기능이 제한될 수 있음을 표시한다.

---

# 89. No Current Shoe

> “현재 러닝화가 없어요”

선택 가능.

Shoe Mileage는 비활성.

---

# 90. Missing Recommendation Context

필수 Context가 없다면  
Recommendation 직전 필요한 정보만 요청한다.

기존 Profile 전체를 다시 받지 않는다.

---

# 91. No Product Candidate

추천 조건에 맞는 제품이 없을 경우  
억지로 제품을 보여주지 않는다.

예:

> 현재 조건에 맞는 후보를 충분히 찾지 못했어요.  
> 기준을 조금 넓혀 다시 볼 수 있습니다.

---

# 92. Recommendation Failure

Backend/API 오류 시:

- Random Product를 대체 노출하지 않음
- Recommendation을 재시도할 수 있게 함
- 오류 Event 기록

---

# 93. Run Save Failure

Activity 저장에 실패하면

- UI Stats를 먼저 증가시키고 나중에 실패하는 구조 지양
- 서버 저장 성공 후 최종 반영

---

# 94. Feedback Optionality

Recommendation Feedback은 중요하지만  
강제로 제출해야 다음 화면으로 이동하는 구조는 피한다.

사용자는 Skip 가능.

---

# 95. P1 Flow — Card Save

```text
Runner Card
→ Save
→ Image Render
→ Device Save
```

Event:

```text
card_save
```

Mock Toast만 띄우는 것은 실제 Save로 계산하지 않는다.

---

# 96. P1 Flow — Card Share

```text
Runner Card
→ Share
→ Native/Web Share
→ Share Complete
```

Event:

```text
card_share
```

가능하면 실제 Share 완료 여부와 버튼 클릭을 구분한다.

---

# 97. P1 Flow — Product Save

```text
Product
→ Save
→ Saved Products
```

Saved Products 전체 화면은 P1 후순위.

최소한 Saved 상태와 DB 기록은 가능해야 한다.

---

# 98. P1 Flow — Outbound

```text
Product
→ 판매처/정보 보기
→ External Site
```

Event:

```text
outbound_click
```

H5의 강한 행동 신호.

---

# 99. P2 Future Flow — Other Runner

```text
My Runner Profile
→ Runner Discovery
→ Other Runner Profile
→ Gear / Activity 확인
```

MVP 이후.

---

# 100. P2 Future Flow — Community

```text
Other Runner
→ Follow / Reaction
→ Group
→ Running Together
→ Challenge / Competition
```

개인 Profile의 가치가 확인된 이후 검토한다.

---

# 101. P2 Future Flow — Avatar

```text
Runner Card
→ Avatar
→ Outfit / Gear
→ Activity 변화
→ Social Profile
```

Runner Card 사용률과 꾸미기 요구가 확인될 때 검토한다.

---

# 102. Screen별 핵심 질문

각 화면은 하나의 핵심 질문에 답해야 한다.

| 화면 | 사용자 질문 |
|---|---|
| Landing | 이게 뭔데? |
| Test | 나는 어떤 러너지? |
| Reveal | 결과가 뭘까? |
| Card Lite | 이게 나 같나? |
| Profile | 내 실제 러닝은 어떤 상태지? |
| Current Shoe | 지금 뭘 신고 있지? |
| Complete Card | 지금의 나는 어떤 상태지? |
| Run | 오늘 얼마나 뛰었지? |
| Gear Need | 이번엔 무엇을 바꾸고 싶지? |
| Direction | 어떤 방향을 봐야 하지? |
| Product | 어떤 제품이 후보지? |
| Reason | 왜 이 제품이지? |
| Feedback | 이 추천이 맞았나? |

---

# 103. CTA Hierarchy

한 화면에 핵심 CTA를 과도하게 많이 두지 않는다.

## Runner Card Lite

Primary:
> Profile 완성

Secondary:
> Save / Share

## Runner Card Complete

Primary:
> + RUN

Primary/Parallel:
> Explore Gear

## Recommendation

Primary:
> Product View

Secondary:
> AI Gear Coach / Feedback

---

# 104. Navigation Principle

MVP에서 Bottom Navigation을 크게 확장하지 않는다.

핵심은 Hub 중심 구조.

```text
Runner Card Complete
├── RUN
└── GEAR
```

Community/Discover 탭은 MVP 이후 검토한다.

---

# 105. Back Navigation

사용자는 Test / Profile / Gear Flow에서  
이전 단계로 돌아갈 수 있어야 한다.

단,

- 이미 저장된 Runner Type
- Activity
- Recommendation History

가 의도치 않게 삭제되지 않도록 한다.

---

# 106. Data Save Timing

## Test

각 답변 시 임시 저장 가능.

## Runner Type

결과 생성 시 저장.

## Profile

각 Step 또는 완료 시 저장.

## Run

Save 버튼 시 Transaction.

## Gear

Recommendation 생성 시 Input Context 저장.

## Feedback

선택 즉시 저장.

---

# 107. Session Model

최소:

```text
session_id
user_id nullable
started_at
ended_at
source
campaign
market
language
```

신규 사용자는 초기에 `user_id = null`일 수 있다.

Account 생성 후 Session과 User를 연결한다.

---

# 108. Market / Language

한국 1차 검증 이후 미국 테스트를 고려하므로  
초기부터 Event에 다음 값을 포함하는 것을 권장한다.

```text
market
language
```

UI 번역은 별도 Localization 관리.

---

# 109. H1 Measurement Points

```text
Landing View
↓
Test Start
↓
Test Complete
↓
Runner Card
↓
Profile Start
↓
Profile Complete
```

이 Funnel은 화면 이동만으로 추정하지 말고 Event로 직접 기록한다.

---

# 110. H3 Measurement Points

```text
Gear Start
↓
Direction View
↓
Recommendation View
↓
Product View
↓
Helpful Feedback
```

---

# 111. H4 Measurement Points

```text
Profile Complete
↓
Run Add
↓
Leave
↓
Return Session
↓
Run Add / Gear Start
```

---

# 112. H5 Measurement Points

```text
Recommendation
↓
Product View
↓
Purchase Consideration
↓
Product Save / Outbound [P1]
```

---

# 113. UX Test Observation Points

Prototype UX Test에서는 다음을 관찰한다.

## Landing
사용자가 설명 없이 서비스 목적을 이해하는가?

## Test
질문에서 멈추거나 답을 찾지 못하는가?

## Card
결과를 읽는가? 웃거나 반응하는가?

## Profile
왜 입력하는지 이해하는가?

## Run
Shoe Mileage 연결을 이해하는가?

## Gear
3 Directions의 의미를 이해하는가?

## Recommendation
현재 신발과의 차이를 찾는가?

---

# 114. Prototype → MVP 주요 변경

## Prototype

- Local State
- Mock Existing User
- Mock Product Action
- Mock AI Coach
- Save/Share Placeholder

## MVP

- Database
- Real User Persistence
- Real Activity
- Real Shoe Mileage
- Real Product DB
- Real Recommendation
- Real Feedback
- Real Event Tracking

---

# 115. MVP Flow Definition of Done

## 신규 사용자

혼자 다음을 완료할 수 있어야 한다.

```text
Landing
→ Test
→ Runner Card
→ Profile
→ Shoe
→ Complete Card
```

---

## Returning User

```text
Landing
→ Login
→ Existing Card
```

---

## Activity

```text
+ RUN
→ Save
→ Card Update
→ Shoe Mileage Update
```

---

## Gear

```text
Explore Gear
→ Need
→ Priority
→ Direction
→ Product
→ Reason
→ Feedback
```

---

# 116. Service Blueprint Definition of Done

각 P0 화면은 다음 중 하나 이상의 Backend Action과 연결되어 있어야 한다.

- Create
- Read
- Update
- Calculate
- Recommend
- Track

단순 Mock Screen은 MVP 완료로 보지 않는다.

---

# 117. MVP 핵심 User Loop

```text
Runner Card
    ↓
Run
    ↓
Card Update
    ↓
Return
    ↓
Gear Need
    ↓
Recommendation
    ↓
Feedback
    ↓
More Context
```

장기적으로 이 Loop가 쌓일수록 Recommendation Context가 개선된다.

---

# 118. 장기 Community 연결

MVP 이후의 Flow는 개인 데이터에서 시작한다.

```text
My Runner Identity
        +
My Activity
        +
My Gear
        ↓
Other Runner Curiosity
        ↓
Runner Discovery
        ↓
Compare
        ↓
Connect
        ↓
Run Together / Compete
```

즉 Community는 별도 SNS를 붙이는 것이 아니라  
**현재 MVP에서 쌓는 Runner Profile을 사회적 관계로 확장하는 것**이다.

---

# 119. Flow 변경 원칙

MVP 테스트 도중 다음은 변경 가능하다.

- 문구
- CTA Label
- 순서상 작은 UX 개선
- 입력 옵션
- Error Message

하지만 다음은 Cohort 분석을 위해 가능하면 유지한다.

- 5개 Runner Test
- Runner Card 생성 시점
- Profile Complete 정의
- Main Activity Flow
- 3 Gear Direction 구조
- Recommendation Feedback 구조

---

# 120. 최종 User Flow 요약

## New User

```text
Landing
→ Runner Test
→ Runner Type
→ Runner Card Lite
→ Account / Profile
→ Current Shoe
→ Runner Card Complete
→ Run / Gear
```

## Returning User

```text
Landing
→ Nickname + PIN
→ Runner Card Complete
→ Run / Gear
```

## Gear Decision

```text
Gear Need
→ Priority
→ Context Supplement
→ 3 Gear Directions
→ Product Candidates
→ Recommendation Reason
→ Purchase Consideration
→ Feedback
```

## Retention

```text
Run
→ Card Update
→ Leave
→ Return
→ Run / Gear
```

---

# 121. Final Blueprint Statement

> **GearMatch AI의 MVP User Flow는  
> “테스트 → 추천”으로 끝나는 Funnel이 아니다.**

핵심은

> **Runner Identity를 만든 뒤  
> 실제 러닝과 장비 정보를 Profile에 쌓고,  
> 다시 돌아온 사용자가 그 Context를 장비 선택에 활용하는 Loop**

를 만드는 것이다.

따라서 User Flow의 최종 목적은  
화면을 끝까지 이동시키는 것이 아니라

```text
Identity
→ Ownership
→ Activity
→ Return
→ Gear Decision
```

의 연결을 만드는 데 있다.

---

# 122. Next Document Connection

## 06_데이터 기획서

본 Flow에서 발생하는

- User
- Session
- Runner Identity
- Profile
- Activity
- Gear
- Gear Usage
- Recommendation
- Feedback
- Event

를 실제 데이터 Schema로 정의한다.

## 07_Recommendation & AI Gear Coach 정의서

Gear Flow에서 사용하는

- Gear Need
- Priority
- Follow-up
- Gear Direction
- Candidate
- Reason
- Trade-off
- AI Explanation

을 상세 정의한다.
