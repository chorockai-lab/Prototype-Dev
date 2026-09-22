# 04_GearMatch_AI_MVP_Scope_정의서_v1.1

> **문서 목적**  
> 본 문서는 GearMatch AI가 Closed MVP에서 **반드시 구현할 것(P0), 가능하면 구현할 것(P1), 이후 검토할 것(P2), 현재 범위에서 제외할 것(OUT)**을 명확히 구분한다.
>
> MVP의 목적은 많은 기능을 보여주는 것이 아니라,  
> **Runner Identity → Activity → Gear Decision** 흐름이 실제 사용자 행동으로 이어지는지를 검증하는 것이다.
>
> 따라서 본 문서는 “좋아 보이는 기능 목록”이 아니라  
> **가설 검증에 필요한 최소 제품 범위**를 정의한다.

- 문서 버전: v1.1 (2026-09-21 Prototype v1.7 반영 개정)
- 기준 시점: 2026-09-04 / 개정 2026-09-21
- 서비스명: **GearMatch AI**
- 현재 단계: Prototype 완료 → Closed MVP 개발 준비
- 기준 Prototype:
  - `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` (정본)
  - 이전 기준: `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html` (v1.6 -> v1.7로 승계)
- 기준 Product DB:
  - `product_db_v1.5`
- Recommendation Rule:
  - `gear_reco_v1.1`
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1.md`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1.md`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1.md`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1.md`
- 실행 연결 문서:
  - `05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0.md`
  - `06_GearMatch_AI_데이터_기획서_v1.0.md`
  - `07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서_v1.0.md`
  - `08_GearMatch_AI_MVP_개발_명세서_v1.0.md`
  - `09_GearMatch_AI_MVP_개발_Backlog_및_Acceptance_Criteria_v1.0.md`
  - `10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx`

> 참고: `10_..._Rulebook_v1.0.md`는 작성된 적이 없어 참조에서 제거했다 (2026-09-21).
> Recommendation Rule은 `07` 문서와 `10-A v1.5`를 정본으로 본다.

---

# 1. MVP 한 줄 정의

> **GearMatch AI MVP는 Runner Card를 만드는 서비스가 아니라, Runner Identity를 시작점으로 사용자의 실제 러닝과 장비 Context를 축적하고, 그 Context가 재방문과 장비 구매 후보 형성으로 이어지는지를 검증하는 제품이다.**

---

# 2. MVP가 검증해야 하는 것

MVP의 핵심은 다음 4개 가설이다.

```text
H1 Runner Identity
H3 Recommendation Value
H4 Retention
H5 Purchase Consideration
```

---

# 3. H1 — Runner Identity

질문:

> 사용자는 자신의 Runner Type과 Runner Card를 확인하기 위해 Test를 완료하는가?

MVP에서 필요한 기능:

- Landing
- Runner Test
- Runner Type
- Runner Card
- Profile Complete

---

# 4. H3 — Recommendation Value

질문:

> 사용자는 자신의 Runner Context와 Current Shoe를 반영한 추천이 일반적인 추천보다 더 관련 있다고 느끼는가?

필요 기능:

- Gear Need
- Priority
- 3 Gear Directions
- Product Candidate
- Recommendation Reason
- Current Shoe Comparison
- Trade-off
- Feedback

---

# 5. H4 — Retention

질문:

> 사용자는 자신의 Runner Data와 Shoe Mileage를 업데이트하거나 확인하기 위해 다시 돌아오는가?

필요 기능:

- Nickname + PIN
- Returning Login
- Runner Home
- Run Add
- Activity
- Shoe Mileage
- Data Persistence

---

# 6. H5 — Purchase Consideration

질문:

> GearMatch 추천 제품이 실제 구매 후보에 들어가는가?

필요 기능:

- Product View
- Purchase Consideration
- Recommendation Feedback

P1:

- Product Save
- External Product Link

---

# 7. MVP Scope Principle

기능은 다음 질문으로 판단한다.

> 이 기능이 없으면 H1/H3/H4/H5 중 하나를 제대로 검증할 수 없는가?

YES:

> P0

NO지만 검증력을 크게 높임:

> P1

좋은 아이디어지만 현재 검증과 직접 연결되지 않음:

> P2 / OUT

---

# 8. Scope Summary

## P0

```text
Landing
New / Returning Entry
Runner Test
Runner Type
Runner Card
Nickname + PIN
Runner Profile
Current Shoe 1개
Today's Run (수동 입력 · 거리 · 시간 · Pace 자동 · 날짜)
Today's Run Photo (1장)
Today's Run Share Card (Photo-first)
Running Insight (최근 4주)
Shoe Mileage
Runner Home
Runners Like You — Shoes
Gear Need
Priority
3 Gear Directions
Verified Product Candidate
Recommendation Reason
Current Shoe Comparison
Trade-off
Recommendation Feedback
Purchase Consideration
Recommendation History
Persistence
Analytics
QA / Release
```

---

## P1

```text
Runner ID Card Save
Runner ID Card Share

Visual Mood (Share Card 표현 4종)
Style Concept Preview (Mock)

Product Save
External Product Link

AI Gear Coach Lite

Retention Reminder Experiment
```

---

## P2

```text
Avatar
Runner Card Customization
Badge
Milestone

Multi-shoe
Shoe Rotation

Other Runner Profile
Runner Discovery
Similar Runner — People / Activity 탐색

Community
Follow
Reaction

Running Together
Group
Competition

Auto Activity Sync

Advanced Recommendation Learning
More Gear Categories
```

---

## OUT

```text
Medical / Injury Diagnosis
Professional Training Program
Nutrition Coaching

Own Marketplace
Payment

DM-centric SNS
Complex Ranking Economy
Multi-sport

Digital Twin
Autonomous Shopping Agent
Large-scale ML Infrastructure
```

---

# 9. P0 — Landing

## 목적

사용자가 서비스 가치를 이해하고:

```text
New User
or
Returning User
```

로 진입한다.

---

## P0 기능

- Hero
- Runner Card Hook
- New User CTA
- Returning User Entry
- KR / EN 구조 고려

> **2026-09-21 개정 (Prototype v1.7).** Landing의 첫 번째 약속은 Gear 추천이 아니다.
> 「나는 어떤 러너일까? / 내 러닝 스타일을 발견하고 오늘의 러닝을 나답게 기록해보세요」가 Hero다.
> 지표 스트립은 `05 QUESTIONS / 01 RUNNER ID / TODAY RUN & SHARE`이며,
> `03 GEAR OPTIONS`는 첫인상이 다시 러닝화 추천으로 고정되므로 쓰지 않는다.
> Gear는 CTA 바로 위 보조 문구("나와 비슷한 러너가 무엇을 신고 뛰는지도 확인할 수 있어요")로만 언급한다.

---

## Acceptance Scope

신규:

```text
Landing
→ Runner Test
```

기존:

```text
Landing
→ Login
→ Runner Home
```

---

# 10. P0 — Runner Test

현재:

```text
5 Questions
```

고정.

목적:

> Identity Hook

추천 제품을 직접 결정하기 위한 Form이 아니다.

---

# 11. P0 — Runner Types

6개:

```text
ROUTINE RUNNER
EXPLORE RUNNER
DISTANCE RUNNER
PACE RUNNER
RACE RUNNER
ALL-AROUND RUNNER
```

---

# 12. Runner Type Scope Rule

MVP에서 Runner Type은:

```text
Identity
+
Recommendation Context
```

다.

다음은 금지:

```text
PACE RUNNER
→ 자동 Speed Shoe

RACE RUNNER
→ 자동 Carbon Shoe
```

---

# 13. P0 — Runner Card

Runner Card는:

```text
Identity Surface
+
Profile Entry
+
Runner Home
```

역할.

---

# 14. Runner Card Lite

Test 직후:

- Runner Type
- Main Identity Copy
- Visual Asset
- Profile CTA

를 보여준다.

---

# 15. Runner Card Complete / Home

Profile과 Current Shoe 이후:

- Runner Type
- Weekly KM
- Weekly Runs
- Total KM
- Last Run
- Current Shoe
- Shoe Mileage

를 보여준다.

> **2026-09-21 개정 (Prototype v1.7).** 재방문 Home의 우선순위를 아래로 고정한다.
> 기존 사용자에게 Runner Test를 다시 보여주지 않는다.

```text
1. RECENT RUN        최근 러닝 거리 / 시간 / Pace + [오늘의 Run Card 만들기]
2. MY RUNNING INSIGHT 최근 4주 총거리 / 횟수 / 평균 + 한 줄 해석
3. MY RUNNER IDENTITY Runner Type 카드 (기존 Runner Card Visual 유지)
4. RUNNERS LIKE YOU   나와 비슷한 러너가 쓰는 Shoes
5. GEAR EXPLORE       "새로운 장비가 궁금해졌나요?" — 보조 버튼
```

Primary CTA:

```text
오늘의 Run Card 만들기
```

Gear는 홈의 첫 번째 콘텐츠가 아니다. Secondary CTA로 내린다.

---

# 16. P0 — Account / Persistence

정식 회원가입 대신:

```text
Nickname
+
4-digit PIN
```

---

# 17. Account 원칙

- Internal UUID
- Nickname Unique 권장
- PIN Hash
- Session
- Returning Login
- Logout
- 기존 Context 복원

---

# 18. MVP에서 제외

- Email
- OAuth
- SMS
- Password Reset
- PIN Recovery
- 복잡한 Settings

---

# 19. P0 — Runner Profile

MVP 최소 Profile:

```text
running_experience
runs_per_week
weekly_distance_band
```

---

# 20. Profile 목적

두 가지:

## Recommendation Context

사용자의 현재 러닝 수준 이해.

## Segmentation

MVP 이후 Core User를 찾기 위한 분석.

---

# 21. P0 — Current Shoe

MVP Business Rule:

> **한 명당 Active Current Shoe 1개**

---

# 22. Current Shoe State

```text
ACTIVE
UNKNOWN_MODEL
NO_RUNNING_SHOE
```

---

# 23. Current Shoe의 역할

Current Shoe는 단순 Profile 정보가 아니다.

Recommendation에서:

> **새 후보가 지금 신발과 무엇이 다른지**

설명하는 핵심 Context다.

---

# 24. P0 — Activity (Today's Run)

Manual Run Add. **자동 연동은 MVP 범위 밖이다** (Strava / NRC / Garmin / Apple Health, OCR 포함).
단, UI에서 향후 연동 가능성은 작은 보조 문구로 보여줄 수 있다.

Input (필수):

```text
distance_km
duration
```

Input (선택):

```text
date          기본값 오늘
photo         1장, Browser Object URL Preview로 충분
current_shoe
```

Derived:

```text
pace          distance_km + duration으로 자동 계산
```

> **2026-09-21 개정 (Prototype v1.7).** `duration` / `pace` / `photo`가 추가됐다.
> 사진은 Today's Run Share Card의 메인 Visual이므로 P0다.
> 입력 화면은 전문 Training Log처럼 보이지 않게 한다.

---

# 25. Activity에서 계산

```text
weekly_km
weekly_runs
total_km
last_run
```

Running Insight (최근 4주, **분석 수준은 B로 제한**):

```text
recent_4w_km
recent_4w_runs
recent_4w_avg_km
recent_4w_longest_km
weekly_trend       주차별 4개 구간
prev_period_delta  이전 4주 대비 간단 비교
```

한 줄 Insight를 함께 제시한다. 사용자가 숫자를 해석하게 두지 않는다.

하지 않는 것: VO2max 추정 / 부상 위험 진단 / Recovery 진단 / Training Plan 자동 생성 /
전문 운동 처방. GearMatch는 Strava · Garmin을 복제하지 않는다.

---

# 26. P0 — Shoe Mileage

Current Shoe로 Run 저장 시:

```text
shoe_mileage += distance
```

---

# 27. Shoe Mileage의 MVP 목적

교체 알림이 핵심이 아니다.

목적:

> 사용자가 자신의 신발 사용 Context를 지속적으로 업데이트할 이유가 있는지 검증

---

# 28. MVP에서 하지 않는 Mileage 기능

- 자동 수명 판정
- “이제 교체해야 합니다” 강제
- 부상 위험
- 제품별 수명 예측
- Auto Sync

---

# 29. P0 — Gear Exploration Entry

Runner Home에서:

```text
EXPLORE GEAR
```

로 시작.

---

# 30. P0 — Gear Need

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

---

# 31. P0 — Priority

```text
COMFORT
STABILITY
RESPONSIVENESS
VERSATILITY
PERFORMANCE
```

---

# 32. Follow-up

필요할 경우 최소 질문만 추가.

원칙:

> 이미 Profile에서 알고 있는 정보를 다시 묻지 않는다.

---

# 33. P0 — Recommendation Architecture

```text
Runner Context
+
Current Shoe
+
Gear Need
+
Priority
+
Verified Product DB
        ↓
Eligibility Filter
        ↓
Rule / Score
        ↓
Direction
        ↓
Product
```

---

# 34. Recommendation의 핵심 원칙

> **한 개의 Best Product가 아니라 3개의 Gear Direction**

---

# 35. P0 — 3 Gear Directions

Direction Code:

```text
DAILY_COMFORT
BALANCED_ALLROUND
STABILITY_SUPPORT
LONG_DISTANCE
SPEED_TRAINING
PERFORMANCE_STEPUP
RACE_FOCUS
```

사용자에게는 상황에 맞는 3개를 보여준다.

---

# 36. Direction Role

## DAILY_COMFORT

편안한 Easy / Daily.

## BALANCED_ALLROUND

한 켤레 범용.

## STABILITY_SUPPORT

안정감 중심.

## LONG_DISTANCE

장거리.

## SPEED_TRAINING

빠른 훈련.

## PERFORMANCE_STEPUP

현재 신발 대비 Performance 상승.

## RACE_FOCUS

Race Day.

---

# 37. P0 — Direction Candidate Role Filter

모든 Product가 모든 Direction에서 경쟁하지 않는다.

```text
DAILY_COMFORT
→ DAILY | CUSHION_LONG | STABILITY

BALANCED_ALLROUND
→ DAILY | CUSHION_LONG | SPEED_TRAINING | SUPER_TRAINER

STABILITY_SUPPORT
→ STABILITY

LONG_DISTANCE
→ CUSHION_LONG | DAILY | SUPER_TRAINER

SPEED_TRAINING
→ SPEED_TRAINING | SUPER_TRAINER

PERFORMANCE_STEPUP
→ DAILY | SPEED_TRAINING | SUPER_TRAINER

RACE_FOCUS
→ RACE
```

---

# 38. 이 Rule이 P0인 이유

Role Filter가 없으면:

- Daily Shoe가 Stability Direction 1위
- Race Shoe가 Comfort Direction에 등장
- 만능 Score 제품이 모든 Direction 장악

가능성이 높다.

따라서 Recommendation Quality의 핵심 P0다.

---

# 39. P0 — Product DB

추천 제품은:

> **VERIFIED Product만**

사용한다.

---

# 40. Product DB 기준

현재:

```text
35 normalized
10 verified / recalibrated
25 draft
```

---

# 41. Closed MVP Release Data Gate

권장:

```text
24~28개 이상 VERIFIED
```

Role별:

```text
DAILY           5+
CUSHION_LONG    4+
STABILITY       3+
SPEED_TRAINING  4+
SUPER_TRAINER   4+
RACE            4+
```

---

# 42. Data Gate의 의미

기능 개발이 끝났다고 출시 가능한 것이 아니다.

Product Coverage 부족 시:

> 같은 제품 반복 추천

이 발생하므로 Product Data도 Release Blocker다.

---

# 43. P0 Product Attributes

```text
daily
comfort
stability
responsiveness
long_run
speed
race
versatility
```

---

# 44. Score User Exposure

내부:

```text
0~100
```

사용자:

> 숫자 미노출.

---

# 45. Stability 정의

```text
stability
=
Platform Stability
```

STABILITY 제품 분류와 동일하지 않다.

STABILITY_SUPPORT는:

> Product Role Filter로 먼저 제한.

---

# 46. Race 정의

```text
race
=
Race 가능 여부
```

가 아니라:

> **Race / Competition 특화도**

---

# 47. P0 — Recommendation Score v1.1

```text
Need Match                30%
Priority Match            25%
Usage / Distance Fit      15%
Current Shoe Transition   20%
Profile Fit               10%
-
Penalty
```

---

# 48. Current Shoe Transition P0

GearMatch 차별점이므로 P0.

질문:

> 지금 신발보다 후보가 좋은가?

가 아니라:

> **이번 Need에 맞는 방향으로 의미 있게 달라지는가?**

---

# 49. Current Shoe Unknown

Unknown 시:

```text
Transition = 50
```

금지.

대신:

> 나머지 Weight 재정규화.

---

# 50. P0 — Candidate Diversity

3 Direction 결과:

- 동일 Product 금지
- 동일 Series 최소화
- 가능하면 Brand 분산
- Trade-off 차이 필수

---

# 51. P0 — Recommendation Result

각 Direction:

- Direction Name
- Short Summary
- Primary Product
- Product Image
- Product Name
- Short Why

---

# 52. 사용자 UI에서 금지

```text
1위
2위
3위

BEST
PERFECT MATCH
97% FIT
```

---

# 53. P0 — Recommendation Reason

각 Product:

```text
WHY THIS
VS YOUR SHOE
BEST FOR
KEEP IN MIND
```

---

# 54. WHY THIS

User Context + Product Strength 연결.

---

# 55. VS YOUR SHOE

Current Shoe가 Verified DB에 있을 때만.

Axis:

```text
Comfort
Platform Stability
Responsiveness
Long Run
Speed
Versatility
```

---

# 56. Comparison Delta

```text
>= +20
더 높은 편

+10 ~ +19
조금 높은 편

-9 ~ +9
비슷한 편

-19 ~ -10
조금 낮은 편

<= -20
더 낮은 편
```

---

# 57. BEST FOR

제품이 어떤 러닝 상황에 더 맞는지 설명.

---

# 58. KEEP IN MIND

제품의:

> Trade-off

를 설명.

단순 단점 리스트가 아니다.

---

# 59. P0 — Recommendation Feedback

질문:

> 추천이 도움이 되었나요?

```text
HELPFUL
UNSURE
NOT_FIT
```

---

# 60. Feedback Reason

Positive:

```text
DIRECTION_HELPFUL
CURRENT_SHOE_COMPARE_HELPFUL
PRODUCT_DISCOVERY_HELPFUL
CRITERIA_HELPFUL
```

Negative:

```text
NOT_MY_RUNNING
PRODUCT_NOT_INTERESTING
REASON_NOT_CONVINCING
INSUFFICIENT_INFO
OTHER
```

---

# 61. P0 — Purchase Consideration

```text
STRONG_CONSIDER
CONSIDER
UNSURE
NO_CONSIDER
```

---

# 62. Purchase Consideration이 P0인 이유

External Purchase Click이 없어도:

> H5를 최소한 측정

할 수 있기 때문이다.

---

# 63. P0 — Recommendation History

Recommendation Session에 저장:

- User Context Snapshot
- Current Shoe
- Need
- Priority
- Logic Version
- Product DB Version
- Directions
- Products
- Feedback

---

# 64. 왜 History가 필요한가

Weight나 DB 변경 후:

> 과거 추천을 재현하고 비교

하기 위해서다.

---

# 65. P0 — Analytics

Analytics는 부가기능이 아니다.

> MVP 검증 목적 자체.

---

# 66. H1 Events

```text
landing_view
test_start
question_view
question_answer
test_complete
runner_type_reveal
runner_card_view
profile_start
profile_complete
```

---

# 67. H4 Events

```text
session_start
return_session
home_view
run_entry_view
run_add
shoe_mileage_update
```

---

# 68. H3 / H5 Events

```text
gear_start
gear_need_select
gear_priority_select
gear_direction_view
recommendation_view
product_view
recommendation_feedback
purchase_consideration
```

---

# 69. P0 — QA

QA도 Scope에 포함한다.

최소:

- New User
- Returning User
- Activity
- Recommendation
- Product DB
- Analytics
- Mobile

---

# 70. Recommendation QA Persona

최소 8개:

```text
Comfort Runner
Speed Runner
Distance Runner
Race Runner
Unsure
Unknown Current Shoe
Race/Fast Shoe → Comfort
Low Data
```

---

# 71. P1 — Runner Card Save

H1 강화.

실제 이미지 저장.

Mock Toast만 제공하는 것은 P1 완료가 아니다.

---

# 72. P1 — Runner Card Share

목적:

- Acquisition
- Identity Ownership
- H1 Social Signal

---

# 73. P1 — Product Save

목적:

> 구매 후보 행동을 더 강하게 측정.

---

# 74. P1 — External Product Link

목적:

> H5 Commercial Signal.

가능하면 초기 MVP에 빠르게 추가할 가치가 높다.

하지만 P0 Recommendation Flow가 깨지면 우선순위에서 밀린다.

---

# 75. P1 — AI Gear Coach Lite

AI는 Recommendation Engine이 아니다.

---

# 76. AI Gear Coach 역할

```text
Recommendation Result
↓
Explain
Compare
Guide
```

---

# 77. AI가 P1인 이유

AI가 없어도:

```text
Structured Recommendation
+
Template Explanation
```

으로 H3를 검증할 수 있다.

이를 먼저 검증해야:

> AI 설명이 실제 추가 가치를 만드는지

분리해서 볼 수 있다.

---

# 78. 권장 Release Sequence

```text
MVP v0.1
Structured Recommendation

→

MVP v0.2
AI Gear Coach Lite
```

---

# 79. P1 — Reminder Experiment

Retention Reminder는 P1.

이유:

초기부터 Push/Reminder를 사용하면:

> Organic Retention

을 측정하기 어렵다.

---

# 80. P2 — Avatar

장기 Identity 확장.

MVP에서는 제외.

---

# 81. P2 — Badge / Milestone

Activity Retention이 확인되면 검토.

---

# 82. P2 — Multi-shoe

장기적으로 가치가 높을 가능성이 있다.

그러나 MVP에서는:

> Active Current Shoe 1개

로 단순화.

---

# 83. P0 — Similar Runner (Gear Discovery 한정)

> **2026-09-21 개정 (D-09).** Prototype v1.7에서 Similar Runner를 P2에서 **P0 전용 화면**으로 올렸다.
> 단, 올라온 것은 **Gear Discovery**뿐이다. 사람 탐색은 그대로 P2다.

첫 화면의 질문은 이것이다.

```text
나 같은 러너들은 뭘 신고 달릴까?
```

## P0 범위

- 나와 조건이 비슷한 러너들이 사용 중인 **Shoes** 목록
- 비교 기준 노출: 주간 거리 / 목표 거리 / Runner Type / 현재 신발
- 제품별 한 줄 사용 맥락 + 간단한 Gear 특징

## P0가 아닌 것

- 사람 목록 / Other Runner Profile / Follow / Reaction
- Similarity Score 숫자 노출

## 표현 규칙

초기 Seed Data가 작다는 점을 전제한다.

금지:

```text
93% MATCH
87% SATISFACTION
```

권장:

```text
주간 거리와 10K 목표가 비슷한 러너들이 사용 중인 Shoes
현재 패널에서 나와 조건이 비슷한 러너들이 사용하는 장비
```

---

# 84. Similar Runner의 장기 역할

확장 순서는 아래를 따른다.

```text
GEAR
→ ACTIVITY
→ PEOPLE
→ COMMUNITY
```

```text
Recommendation Evidence
+
Gear Discovery
+
Social Discovery (장기)
```

---

# 85. P2 — Other Runner Profile

Runner Card/Profile 가치가 먼저 검증된 뒤.

---

# 86. P2 — Community

Community는 장기적으로 배제하지 않는다.

단:

> MVP에 넣지 않는다.

---

# 87. Community 확장 구조

```text
Personal Runner Profile
→ Runner Discovery
→ Gear / Activity Comparison
→ Social Interaction
→ Running Together / Competition
```

---

# 88. P2 — Auto Activity Sync

후보:

- Strava
- Garmin
- NRC 등

하지만 수기 입력 Retention 자체도 MVP에서 검증 대상.

---

# 89. P2 — Advanced Recommendation

향후:

- Similar Runner Evidence
- User Experience
- Behavioral Feedback
- Learning-to-rank
- ML Personalization

---

# 90. 지금 하지 않는 이유

초기 데이터가 적을 때 ML을 도입하면:

> 정교해 보이지만 검증 불가능한 시스템

이 될 가능성이 높다.

---

# 91. OUT — Medical

GearMatch는 다음을 하지 않는다.

- 통증 진단
- 부상 위험 판정
- 치료
- 처방
- 신체 교정

---

# 92. OUT — Professional Training

- 훈련 스케줄
- 페이스 처방
- 대회 Training Plan

은 Core Scope 밖.

---

# 93. OUT — Commerce

MVP에서는:

- Cart
- Checkout
- Payment
- Inventory Management

하지 않는다.

---

# 94. OUT — Full SNS

MVP에서:

- Feed
- DM
- Comment
- Follower Network
- Ranking

구현하지 않는다.

---

# 95. MVP의 핵심 화면

Closed MVP 기준:

```text
01 Landing
02 Runner Test
03 Runner Type Reveal
04 Runner Card Lite
05 Save / Login
06 Profile
07 Current Shoe
08 Runner Home
09 Run Entry
10 Gear Need
11 Priority
12 Recommendation
13 Product Detail
14 Feedback
15 Purchase Consideration
```

---

# 96. MVP의 핵심 Backend

```text
Auth
Session
Runner Identity
Runner Profile
Current Gear
Activity
Gear Usage
Product DB
Recommendation
Feedback
Purchase Intent
Analytics
```

---

# 97. MVP의 핵심 Data Entity

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

# 98. Release Blocker

다음이 완료되지 않으면 Closed MVP 출시를 권장하지 않는다.

---

## Product Flow

- New User E2E
- Returning User E2E
- Activity E2E
- Recommendation E2E

---

## Product Data

- VERIFIED 약 24~28개 이상
- Role Coverage
- Review Conflict 처리
- DRAFT Recommendation 제외

---

## Recommendation

- Direction Role Filter
- Penalty
- Current Shoe Transition
- Diversity
- Explainable Result

---

## Analytics

H1/H3/H4/H5 계산 가능.

---

## Security

- PIN Hash
- Rate Limit
- Authorization
- Secure Session

---

# 99. MVP Success를 기능 수로 판단하지 않는다

다음이 더 중요하다.

> 사용자가 무엇을 했는가?

---

# 100. Prototype 성공 ≠ MVP 성공

Prototype에서:

> “재미있다.”

가 나와도,

MVP에서:

- 다시 안 돌아오고
- 추천을 안 보고
- 구매 후보로 안 느끼면

핵심 가설은 약하다.

---

# 101. MVP 이후 확장 판단

## H1 Strong

Identity 확장 가능.

---

## H4 Strong

Activity / Gear Management 확장 가능.

---

## H3/H5 Strong

Gear Decision Platform 강화.

---

## Other Runner Curiosity Strong

Runner Discovery / Community 검토.

---

# 102. Scope 변경 원칙

개발 중 새 아이디어가 나와도 바로 P0로 넣지 않는다.

기준:

```text
Related Hypothesis
User Evidence
Implementation Cost
Measurement Value
Scope Risk
```

---

# 103. P0 추가 조건

다음 중 하나 이상이어야 한다.

- 핵심 Flow Blocker
- H1/H3/H4/H5 측정 불가
- 데이터 정합성
- Recommendation 오류
- Security 문제

---

# 104. UI Polish 추가

예:

- Animation
- Decorative Motion
- 추가 Card Variant

는 P0가 아니다.

---

# 105. MVP 디자인 원칙

Prototype Visual Identity를 유지한다.

Claude Code / 개발자가:

> 개발하기 편하다는 이유로 디자인을 새로 만들지 않는다.

---

# 106. Mobile First

P0:

- iPhone Safari
- Android Chrome

정상 사용.

Desktop도 정상 표시.

---

# 107. Language

한국 1차 테스트:

```text
ko-KR
```

영문 구조는 유지.

미국 테스트:

```text
en-US
```

---

# 108. MVP Development Principle

```text
P0 first
↓
Measure
↓
Fix
↓
P1
↓
Measure
↓
Earn the right to expand
```

---

# 109. Claude Code Scope Rule

Claude Code는:

> 09 Backlog ID 단위로 구현.

전체 MVP를 한 번에 맡기지 않는다.

---

# 110. 개발 중 Claude가 추가하면 안 되는 것

- Community
- Avatar
- Similar Runner
- New Runner Types
- Question 변경
- New Recommendation Direction
- New Framework
- 과도한 Data Field

명시 요청 없이는 추가하지 않는다.

---

# 111. MVP Definition of Done

GearMatch AI Closed MVP가 완성되었다는 의미:

```text
사용자가

Runner Card를 만들고
Profile을 저장하고
현재 신발을 등록하고
Run을 기록하고
다시 돌아오고
자신의 Context를 기반으로
검증된 Product DB에서
서로 다른 3개 Gear Direction을 받고
현재 신발과 차이를 이해하고
추천 반응과 구매 고려 의사를 남기며

운영자가
H1/H3/H4/H5를
실제 행동 데이터로 분석할 수 있는 상태.
```

---

# 112. Final Scope Statement

> **GearMatch AI MVP의 범위는 Runner Identity를 만들고 끝나는 것이 아니라, Runner Context를 저장하고 다시 불러오며, 그 Context가 실제 Gear Decision으로 연결되는지 검증하는 데 필요한 최소 기능까지다.**

---

# 113. Scope Summary — P0

```text
IDENTITY

Landing
Runner Test
Runner Type
Runner Card

↓

PERSISTENCE

Nickname + PIN
Runner Profile
Current Shoe

↓

RETENTION

Run
Activity
Shoe Mileage
Runner Home

↓

GEAR DECISION

Gear Need
Priority
3 Directions
Verified Product
Reason
Current Shoe Comparison
Trade-off

↓

VALIDATION

Feedback
Purchase Consideration
Analytics
QA
```

---

# 114. Scope Summary — Not Yet

```text
Identity Customization
Avatar
Multi-shoe
Similar Runner
Community
Auto Sync
Commerce
Advanced ML
```

---

# 115. Final Principle

> **MVP에서 중요한 것은 더 많은 기능이 아니라, 핵심 Loop 하나가 처음부터 끝까지 실제 데이터로 연결되고 측정되는 것이다.**
