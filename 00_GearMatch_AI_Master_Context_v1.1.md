# 00_GearMatch_AI_Master_Context_v1.1

> **문서 목적**  
> 본 문서는 GearMatch AI의 사업·서비스·사용자·MVP·데이터·추천·AI·개발 방향을 한 문서에서 확인할 수 있도록 정리한 **최상위 기준 문서(Single Source of Truth)** 다.
>
> 개별 문서가 세부사항을 정의하지만, 문서 간 해석이 충돌할 경우 본 문서의 서비스 철학·MVP 우선순위·핵심 원칙을 우선 확인한다.
>
> 본 문서는 모든 세부 내용을 반복하지 않는다.  
> 대신 GearMatch AI가 **무엇을 만들고 있는지, 왜 그렇게 만들고 있는지, 무엇을 아직 만들지 않는지, 어떤 방향으로 확장할지**를 고정한다.

- 문서 버전: v1.1
- 기준 시점: 2026-09-04
- 서비스명: **GearMatch AI**
- 현재 단계: **Prototype 완료 → Closed MVP 개발 준비**
- 현재 Product DB:
  - `product_db_v1.5`
- 현재 Recommendation Rule:
  - `gear_reco_v1.1`
- Product Normalization:
  - `product_norm_v1.1`

---

# 1. GearMatch AI 한 줄 정의

> **GearMatch AI는 Runner Identity와 실제 러닝 Context를 바탕으로 사용자가 자신에게 맞는 장비 선택 기준을 이해하고, 비교하고, 확신을 가질 수 있도록 돕는 Gear Decision Support Service다.**

핵심 구조는 다음과 같다.

```text
나는 어떤 러너인가
        ↓
나는 지금 어떻게 뛰고 있는가
        ↓
나는 어떤 장비를 사용하고 있는가
        ↓
지금의 나에게 어떤 장비 방향이 맞을 수 있는가
        ↓
왜 그런 선택지가 나왔는가
        ↓
장비 선택의 확신
```

---

# 2. GearMatch AI가 해결하려는 문제

러닝화 선택은 생각보다 어렵다.

사용자는 다음과 같은 문제를 반복적으로 경험한다.

- 제품이 너무 많다.
- 각 브랜드 설명이 비슷하다.
- 리뷰마다 평가가 다르다.
- 다른 러너에게 좋은 신발이 나에게도 좋은지 모르겠다.
- 현재 신는 신발에서 무엇을 바꿔야 할지 모르겠다.
- “좋은 신발”과 “나에게 맞는 선택”을 구분하기 어렵다.
- AI에게 물어봐도 일반적인 추천이 나오거나 이유가 약하다.

GearMatch AI는 이를:

> **검색을 더 많이 시키는 방식**

이 아니라

> **사용자 Context를 먼저 이해하고, 선택지를 구조화해주는 방식**

으로 해결하려 한다.

---

# 3. 핵심 사용자 가치

## Primary Value

> **장비 선택의 확신**

사용자가 최종적으로 느껴야 하는 것은:

> “이 신발이 무조건 최고다.”

가 아니라

> **“내 상황에서는 왜 이 후보들을 보면 되는지 이해했다.”**

이다.

---

# 4. 서비스가 제공해야 하는 감정 흐름

```text
Curiosity
→ Recognition
→ Relevance
→ Trust
→ Confidence
→ Continuity
```

### Curiosity

> 나는 어떤 러너일까?

### Recognition

> 이게 지금의 나구나.

### Relevance

> 이 정보는 내 상황과 연결되어 있다.

### Trust

> 왜 이런 추천이 나왔는지 이해된다.

### Confidence

> 이 후보들을 기준으로 보면 되겠다.

### Continuity

> 다음에 다시 와도 내 데이터가 이어진다.

---

# 5. 왜 러닝인가

GearMatch AI는 러닝 자체를 가르치기 위해 시작한 서비스가 아니다.

현재 러닝은 국내에서도 단기 유행을 넘어 점차 문화적 활동으로 자리 잡아가고 있으며, 해외에서는 이미 운동·라이프스타일·커뮤니티가 결합된 형태로 확장되어 있다.

러닝 인구가 늘면서:

- 러닝화 구매
- 훈련 목적별 신발 구분
- 대회
- 장거리
- 기록
- Shoe Rotation
- 장비 관심

도 함께 증가한다.

반면 무리한 훈련·통증·부상에 대한 관심도 커지고 있다.

GearMatch AI는:

> 달리는 법을 가르치거나  
> 의료·훈련 전문가 역할을 하는 것

보다,

> **회사가 더 잘할 수 있는 데이터·추천·AI 기술을 이용해 장비 선택을 돕는 것**

에 집중한다.

---

# 6. GearMatch AI가 하지 않는 것

MVP와 핵심 서비스 방향에서 다음을 중심으로 하지 않는다.

- 의료 진단
- 부상 원인 판정
- 치료 조언
- 전문 훈련 프로그램
- 영양 코칭
- 범용 러닝 AI Chatbot
- “가장 좋은 신발” 단일 추천
- Fit 확률 97% 같은 가짜 정밀도
- 광고비로 Organic Recommendation 순위 변경
- 초기부터 완전한 Community
- 초기부터 복잡한 Avatar/Game Economy

---

# 7. Core Product Loop

```text
Landing
→ Runner Test
→ Runner Type
→ Runner Card
→ Profile
→ Current Shoe
→ Runner Home
→ Run
→ Shoe Mileage
→ Revisit
→ Gear Need
→ Priority
→ 3 Gear Directions
→ Product Candidates
→ Recommendation Reason
→ Current Shoe Comparison
→ Feedback
→ Purchase Consideration
→ Revisit
```

---

# 8. Prototype의 역할

Prototype은 완성 제품이 아니다.

목적:

- User Flow 이해
- Runner Test 부담
- Runner Card 반응
- Gear Recommendation Flow
- CTA 이해
- 디자인 감도
- 모바일 UX

를 확인하기 위한 것이다.

현재 Prototype은 MVP의 Visual / UX Reference다.

> **MVP 개발 시 Prototype을 임의로 재디자인하지 않는다.**

---

# 9. 현재 Prototype 기준 UX

현재 기준:

```text
Landing
↓
신규 / 기존 사용자
↓
5 Questions
↓
Runner Type Reveal
↓
Runner Card Lite
↓
Profile
↓
Current Shoe
↓
Runner Card Complete
↓
+ RUN / EXPLORE GEAR
```

Gear Flow:

```text
Gear Need
↓
Priority
↓
필요한 경우 Follow-up
↓
3 Gear Directions
↓
Product
↓
WHY THIS
VS YOUR SHOE
BEST FOR
KEEP IN MIND
↓
Feedback
↓
Purchase Consideration
```

---

# 10. Runner Identity

Runner Identity는 사용자를 장비 Recommendation으로 연결하는 **Activation / Context Layer**다.

목적은:

> 사용자를 재미있게 분류하는 것

만이 아니라,

> **사용자가 자신의 현재 러닝을 이해하고 Profile을 만들어가는 시작점**

을 제공하는 것이다.

---

# 11. Runner Test

MVP의 핵심 Runner Test는 **5 Questions**다.

현재 질문:

1. 요즘 뛰러 나갈 때 제일 먼저 드는 생각은?
2. 최근 한두 달, 내 러닝에서 가장 달라진 건?
3. 뛰고 나서 가장 기분 좋은 순간은?
4. 주말에 러닝할 시간이 넉넉하다면 제일 하고 싶은 건?
5. 2~3개월 뒤, 어떤 변화가 제일 마음에 들 것 같아?

원칙:

- 짧아야 한다.
- 가입 설문처럼 보이면 안 된다.
- 자기 해석의 재미가 있어야 한다.
- Recommendation을 직접 결정하는 설문이 아니다.

---

# 12. Runner Type v1

현재 6개 Type:

```text
ROUTINE RUNNER
EXPLORE RUNNER
DISTANCE RUNNER
PACE RUNNER
RACE RUNNER
ALL-AROUND RUNNER
```

---

## 12.1 ROUTINE RUNNER

> 꾸준히 달리는 과정 자체를 즐기는 러너

핵심:

```text
DAILY
끊기지 않게
```

---

## 12.2 EXPLORE RUNNER

> 러닝의 범위와 관심을 넓혀가는 러너

핵심:

```text
EXPLORE
다양하게
```

---

## 12.3 DISTANCE RUNNER

> 더 오래, 더 멀리 달리는 과정에서 성취감을 느끼는 러너

핵심:

```text
LONG RUN
더 멀리
```

---

## 12.4 PACE RUNNER

> 페이스와 기록이 개선되는 과정에 관심이 큰 러너

핵심:

```text
SPEED
더 빠르게
```

---

## 12.5 RACE RUNNER

> 대회·목표가 생기면 러닝이 더 구체화되는 러너

핵심:

```text
RACE PREP
목표에 맞춰
```

---

## 12.6 ALL-AROUND RUNNER

> 특정 방식 하나보다 여러 형태의 러닝을 즐기는 러너

핵심:

```text
MIXED
자유롭게
```

---

# 13. Runner Type의 역할 제한

Runner Type은:

> **Identity Hook**

이다.

Runner Type은 특정 Product를 직접 결정하지 않는다.

즉:

```text
PACE RUNNER
≠
Speed Shoe 자동 추천
```

실제 Recommendation은 별도 Context를 사용한다.

---

# 14. Runner Card

Runner Card는 GearMatch AI의 핵심 Identity Surface다.

역할:

```text
Identity
+
Home
+
Data Summary
+
Gear Entry Point
```

---

# 15. Runner Card MVP 원칙

MVP에서 Runner Type은 최초 테스트 이후 기본적으로 유지한다.

다음 데이터는 계속 변화한다.

- Weekly KM
- Runs
- Total KM
- Last Run
- Current Shoe
- Shoe Mileage

즉:

> **Type은 비교적 안정적이고, Card Data는 계속 업데이트된다.**

---

# 16. Runner Card의 장기 확장

MVP Engagement가 확인되면 검토:

- Badge
- Milestone
- Seasonal Card
- Visual Evolution
- Card Customization
- Avatar
- Gear / Outfit 표현

하지만 MVP에서는 구현하지 않는다.

---

# 17. Target User

초기 테스트 감도는 20~30대를 중요하게 보지만, Target을 나이만으로 정의하지 않는다.

핵심 조건:

```text
Running Continuity
+
Self Interest
+
Gear Decision Need
```

---

# 18. Primary Target Hypothesis

초기 Core User 후보:

- 최근 약 1개월 이상 러닝 지속
- 최소 주 1회 수준 러닝
- 현재 러닝화 보유
- 자신의 기록·성장·장비에 어느 정도 관심
- Runner Identity 결과에 거부감이 낮음
- 지금 또는 향후 러닝화 선택 가능성 존재

---

# 19. 핵심 JTBD

> **러닝을 계속하다 보니 내 러닝 방식과 장비가 신경 쓰이기 시작했을 때, 나는 현재 나의 러닝 상태를 이해하고 다음 장비를 어떤 기준으로 선택해야 하는지 알고 싶다. 그래야 많은 정보 속에서도 나에게 맞는 선택을 했다는 확신을 가질 수 있다.**

---

# 20. Trigger

Gear Recommendation은 사용자가 서비스를 처음 접하는 순간 반드시 필요한 것은 아니다.

구조:

```text
Runner Identity
→ Profile
→ Activity
→ 변화 인식
→ Gear / Purchase Trigger
→ Recommendation
→ Decision
```

---

# 21. Core Hypotheses

현재 MVP는 다음 네 개를 우선 검증한다.

```text
H1 Runner Identity
H3 Recommendation Value
H4 Retention
H5 Purchase Consideration
```

---

# 22. H1 — Runner Identity

질문:

> 사용자는 자신의 Runner Type / Runner Card를 확인하기 위해 Test를 완료하는가?

행동:

- Test Start
- Test Complete
- Runner Card View
- Profile Complete
- Save / Share P1

---

# 23. H3 — Recommendation Value

질문:

> 사용자는 GearMatch의 Recommendation이 일반적인 추천보다 자신의 상황에 더 관련 있다고 느끼는가?

중요 행동:

- Recommendation View
- Product View
- Helpful
- Current Shoe Compare
- Recommendation Revisit

---

# 24. H4 — Retention

질문:

> 사용자는 자신의 Runner Data, Activity, Shoe Mileage, Gear Context를 업데이트하거나 확인하기 위해 돌아오는가?

중요:

> 단순 Return Rate보다 **왜 돌아오는지**를 본다.

---

# 25. H5 — Purchase Consideration

질문:

> GearMatch의 Product가 실제 구매 후보군에 들어가는가?

행동:

- Product View
- Consider
- Strong Consider
- Save P1
- Outbound P1

---

# 26. Hypothesis 관계

```text
H1 Runner Identity
        ↓
Runner Context
        ↓
H3 Recommendation Value
        ↓
H5 Purchase Consideration

Runner Card
+
Activity
+
Gear Usage
        ↓
H4 Retention
```

---

# 27. MVP Scope

## P0

```text
Landing
New / Returning Entry
5-question Runner Test
6 Runner Types
Runner Card
Nickname + 4-digit PIN
Runner Profile
Current Shoe 1개
Run Add
Weekly Activity
Shoe Mileage
Gear Need
Priority
3 Gear Directions
Product Candidates
Recommendation Reason
Current Shoe Comparison
Trade-off
Feedback
Purchase Consideration
Data Persistence
Analytics
Recommendation History
```

---

# 28. P1

```text
Runner Card Save
Runner Card Share

Product Save
External Product Link

AI Gear Coach Lite

Retention Reminder Experiment
```

---

# 29. P2 / Post-MVP

> **2026-09-22 개정 (D-09 / Prototype v1.7).** `Similar Runner` 를 목록에서 뺐다.
> **Gear Discovery 한정으로 P0** 가 됐기 때문이다 (v1.7 `RUNNERS LIKE YOU` 화면).
> 사람 탐색(`Other Runner Profile`, `Runner Discovery`)과 Community는 그대로 P2다.

```text
Avatar
Card Customization
Badge
Milestone

Multi-shoe
Shoe Rotation

Other Runner Profile
Runner Discovery

Community
Follow
Reaction

Running Together
Group
Competition

Auto Activity Sync

More Gear Categories
Advanced Recommendation Learning
```

---

# 30. OUT

현재 핵심 제품 범위에서 제외:

- 의료
- 전문 훈련
- 자체 쇼핑 결제
- 복잡한 SNS
- DM 중심 서비스
- 복잡한 Ranking Economy
- Multi-sport
- Digital Twin
- Autonomous Shopping Agent

---

# 31. Current Shoe

MVP Business Rule:

> **한 명의 사용자에게 Active Current Shoe는 1개**

이다.

데이터 Schema는 향후 Multi-shoe 확장이 가능하도록 여러 UserGear Row를 지원할 수 있다.

---

# 32. Activity

MVP Activity Input:

```text
date
distance
current shoe
```

복잡한 운동 데이터는 받지 않는다.

MVP에서 제외:

- GPS Track
- Pace
- Heart Rate
- Cadence
- Elevation
- Training Load

---

# 33. Activity Source of Truth

```text
Activity
= Raw Source

GearUsage
= Aggregate
```

Activity를 저장하면:

```text
Weekly KM
Weekly Runs
Total KM
Last Run
Shoe Mileage
```

를 계산한다.

---

# 34. Product DB Strategy

GearMatch의 Product DB는:

> 제품 목록

이 아니라

> **Recommendation 근거 데이터**

다.

---

# 35. Product Unit

```text
1 Row
=
1 Product Model + Version
```

---

# 36. MVP Market

```text
KR first
```

한국 판매·제품 확인이 가능한 Product를 우선한다.

---

# 37. Product Status

```text
DRAFT
VERIFIED
STALE
EXCLUDED
```

Recommendation에는 원칙적으로:

> **VERIFIED Product만 사용**

한다.

---

# 38. Product DB 현재 상태

현재:

```text
35 normalized products
10 recalibrated / verified
25 draft
```

Closed MVP Release 전 권장:

```text
약 24~28개 이상 VERIFIED
```

Role Coverage 목표:

```text
DAILY           5+
CUSHION_LONG    4+
STABILITY       3+
SPEED_TRAINING  4+
SUPER_TRAINER   4+
RACE            4+
```

---

# 39. Product Primary Roles

```text
DAILY
CUSHION_LONG
STABILITY
SPEED_TRAINING
SUPER_TRAINER
RACE
```

---

# 40. Recommendation Core Attributes

P0 Numeric Attribute:

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

Internal Range:

```text
0~100
```

가능하면 5점 단위 Calibration.

사용자에게 숫자를 직접 노출하지 않는다.

---

# 41. Attribute 정의

## daily

일상 조깅·기본 훈련에서 한 켤레로 사용하기 쉬운 정도.

---

## comfort

실제 러닝 시 편안함과 보호감의 제품 성격.

---

## stability

> **Platform Stability**

제품 플랫폼 자체의 안정감.

STABILITY 제품 역할과 동일하지 않다.

---

## responsiveness

신발의 Ride Feel / 전환감 / 에너지감.

---

## long_run

긴 거리에서 지속적으로 사용하기 좋은 제품 역할.

---

## speed

Tempo / Interval / 빠른 Training 적합성.

---

## race

> **Race 가능성**이 아니라  
> **Competition / Race 특화도**

---

## versatility

여러 다른 러닝 목적을 한 켤레로 커버하는 정도.

일상생활 범용성과 구분한다.

---

# 42. Recommendation Philosophy

GearMatch Recommendation은:

> **Choice Support**

다.

하나의 Best Product를 고르지 않는다.

구조:

```text
User Context
↓
Eligibility
↓
Rule / Score
↓
3 Directions
↓
Product
↓
Reason
↓
Trade-off
```

---

# 43. Recommendation Input

우선순위:

```text
Gear Need
Priority
Current Shoe
Weekly Distance
Runs / Week
Experience
Runner Type
Activity Detail
```

Runner Type 영향은 낮다.

---

# 44. Gear Need

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

---

# 45. Priority

```text
COMFORT
STABILITY
RESPONSIVENESS
VERSATILITY
PERFORMANCE
```

---

# 46. Recommendation Base Score v1.1

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

# 47. Current Shoe Transition

GearMatch의 중요한 차별점이다.

질문:

> 현재 신발보다 후보가 더 좋은가?

가 아니라:

> **사용자가 원하는 방향으로 의미 있게 달라지는가?**

다.

---

# 48. Current Shoe Unknown

Current Shoe가 없거나 DB에서 비교할 수 없으면:

```text
Transition = 50
```

같은 임의값을 넣지 않는다.

대신:

> 나머지 80% Component를 100%로 재정규화한다.

---

# 49. Recommendation Directions

현재 Direction Code:

```text
DAILY_COMFORT
BALANCED_ALLROUND
STABILITY_SUPPORT
LONG_DISTANCE
SPEED_TRAINING
PERFORMANCE_STEPUP
RACE_FOCUS
```

---

# 50. 사용자에게 보이는 Direction 의미

### DAILY_COMFORT

> 편안한 Easy / Daily 선택

---

### BALANCED_ALLROUND

> 한 켤레로 여러 러닝을 커버하는 선택

---

### STABILITY_SUPPORT

> 안정감을 더 중요하게 보는 선택

---

### LONG_DISTANCE

> 오래 달리는 상황에 집중

---

### SPEED_TRAINING

> Tempo / Interval 등 빠른 훈련

---

### PERFORMANCE_STEPUP

> 현재 신발의 범용성을 크게 잃지 않으며 성능 방향을 높이는 선택

---

### RACE_FOCUS

> Competition / Race Day 특화 선택

---

# 51. Direction Role Filter

Score만으로 모든 제품을 경쟁시키지 않는다.

```text
DAILY_COMFORT
→ DAILY | CUSHION_LONG | STABILITY

BALANCED_ALLROUND
→ DAILY | CUSHION_LONG | SPEED_TRAINING | SUPER_TRAINER

STABILITY_SUPPORT
→ STABILITY only

LONG_DISTANCE
→ CUSHION_LONG | DAILY | SUPER_TRAINER

SPEED_TRAINING
→ SPEED_TRAINING | SUPER_TRAINER

PERFORMANCE_STEPUP
→ DAILY | SPEED_TRAINING | SUPER_TRAINER

RACE_FOCUS
→ RACE only
```

목적:

> 만능 Score가 높은 신발 하나가 모든 Direction을 지배하는 것을 막는다.

---

# 52. Penalty v1.1

```text
DIRECTION_ROLE_MISMATCH
→ HARD EXCLUDE

INSUFFICIENT_EVIDENCE
→ HARD EXCLUDE

SPECIALIZED_UNREQUESTED
→ -20

PRIORITY_MISMATCH
→ -10

DISTANCE_MISMATCH
→ -15

RACE_MISMATCH
→ -20

NO_MEANINGFUL_TRANSITION
→ -10
```

---

# 53. Candidate Diversity

Recommendation 3개는 서로 달라야 한다.

원칙:

- 동일 Product 중복 금지
- 동일 Series 반복 최소화
- 가능한 경우 동일 Brand 3개 방지
- Brand 다양성을 위해 적합도가 낮은 제품을 강제로 넣지 않음
- 세 후보가 실제 Trade-off로 설명 가능해야 함

---

# 54. Recommendation UI

사용자에게:

```text
1위
2위
3위
```

를 보여주지 않는다.

대신:

> 서로 다른 선택 방향

을 보여준다.

---

# 55. Recommendation Reason

각 Product는 최소 다음 구조를 가진다.

```text
WHY THIS
VS YOUR SHOE
BEST FOR
KEEP IN MIND
```

---

# 56. WHY THIS

사용자 Context와 Product Strength를 연결한다.

예:

> 빠른 러닝에 관심이 있고 반응성을 중요하게 보고 있어, 현재 신발보다 템포 훈련 성격을 높일 수 있는 후보입니다.

---

# 57. VS YOUR SHOE

비교 Axis:

```text
Comfort
Platform Stability
Responsiveness
Long Run
Speed
Versatility
```

---

# 58. Delta v1.1

```text
>= +20
→ 더 높은 편

+10 ~ +19
→ 조금 높은 편

-9 ~ +9
→ 비슷한 편

-19 ~ -10
→ 조금 낮은 편

<= -20
→ 더 낮은 편
```

가짜 정밀도를 피하기 위해 작은 차이는 사용자에게 차이로 표현하지 않는다.

---

# 59. BEST FOR

Product Role과 사용자의 Need를 연결.

---

# 60. KEEP IN MIND

제품의 단점이 아니라:

> **선택 전 알아야 할 Trade-off**

를 설명한다.

---

# 61. Recommendation에서 하지 않는 것

- Best Shoe
- Perfect Match
- 97% Fit
- 치료 효과
- 부상 예방 보장
- 브랜드 마케팅 문장 복사
- LLM이 제품 임의 생성

---

# 62. AI Gear Coach

MVP P1.

Core Recommendation Engine이 아니다.

---

# 63. AI Role

```text
Understand
→ Explain
→ Compare
→ Guide
```

---

# 64. AI가 할 수 있는 것

- Recommendation 이유 설명
- Current Shoe 비교
- 후보 간 Trade-off 설명
- 상황별 차이 설명
- 모르는 정보가 있으면 부족함 안내

---

# 65. AI가 하면 안 되는 것

- Product Candidate 변경
- Product Rank 변경
- Product Fact 생성
- 없는 Review 생성
- Similar Runner 숫자 생성
- 의료 판단
- 부상 진단
- 범용 Training Coach 역할

---

# 66. AI Architecture

```text
Structured User Context
+
Verified Product Data
+
Recommendation Result
        ↓
Evidence Packet
        ↓
AI Gear Coach
        ↓
Natural Language Explanation
```

---

# 67. AI Fallback

LLM 장애가 발생해도 Recommendation은 보여야 한다.

```text
Recommendation Engine
↓
Structured Result
↓
AI Failure
↓
Template Explanation
```

---

# 68. Data Strategy

GearMatch의 장기 핵심 Data Asset:

> **어떤 Runner가 어떤 상황에서 어떤 Gear를 사용했고 어떤 Experience를 얻었는가**

---

# 69. Data Flywheel

```text
Runner Profile
↓
Recommendation
↓
Product Consideration
↓
Gear Usage
↓
Experience
↓
First-party Evidence
↓
Better Recommendation
```

---

# 70. Data 원칙

- Recommendation에 필요하지 않은 데이터 최소화
- Raw / Derived 분리
- Missing은 Missing
- Recommendation 재현 가능
- Product Fact와 User Experience 분리
- 작은 표본에서 가짜 정밀도 금지
- Version 저장
- 최소 PII

---

# 71. User ID

닉네임은 Primary Key가 아니다.

```text
user_id = UUID
```

닉네임은:

```text
nickname_normalized
```

Unique를 권장한다.

---

# 72. Authentication MVP

```text
Nickname
+
4-digit PIN
```

UI 표현:

- 내 카드 저장
- 내 카드 불러오기

---

# 73. Security

- PIN Hash
- HTTPS
- Rate Limit
- Server Session
- HttpOnly Cookie
- Secure
- SameSite=Lax
- User Authorization

PIN 분실:

> 이메일/전화번호를 받지 않으므로 자동 복구를 제공하지 않는다.

---

# 74. Analytics

MVP 성공은 기능 완성보다 **가설 검증 가능성**이 중요하다.

---

# 75. H1 Events

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

# 76. H4 Events

```text
session_start
return_session
home_view
run_entry_view
run_add
shoe_mileage_update
```

---

# 77. H3 / H5 Events

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

P1:

```text
product_save
outbound_click
card_save
card_share
```

---

# 78. Prototype vs MVP

Prototype:

> 이해·반응·UX를 검증

MVP:

> 실제 데이터 저장·재방문·추천·행동을 검증

따라서 Prototype 반응이 좋았다는 이유만으로 사업 가설이 검증된 것은 아니다.

---

# 79. 한국 → 미국

초기:

```text
Korea first
```

이후 미국/UCF 등의 환경에서 재검증.

두 시장 데이터를 무조건 하나로 합치지 않는다.

비교:

- Identity 반응
- Input Willingness
- Recommendation Trust
- Purchase Behavior

---

# 80. Community 방향

중요:

> **GearMatch AI는 Community를 장기적으로 피하려는 서비스가 아니다.**

다만 Community를 MVP의 시작점으로 만들지 않는다.

---

# 81. Social Expansion Logic

```text
Personal Runner Profile
        ↓
Runner Discovery
        ↓
Gear / Activity Comparison
        ↓
Social Interaction
        ↓
Running Together / Competition
```

---

# 82. 왜 Community를 나중에 하는가

먼저 사용자가:

> 내 Profile

에 가치를 느껴야:

> 다른 Runner Profile

도 궁금해진다.

즉:

```text
Personal Data
→ Personal Identity
→ Personal Value
→ Other Runner Curiosity
→ Social Value
```

---

# 83. Similar Runner

> **2026-09-22 개정 (D-09 / Prototype v1.7).** 기존 서술은 "MVP P0가 아니다" 였다.
> Prototype v1.7에서 **Gear Discovery 한정으로 P0** 가 됐다.

## P0 범위 — Gear Discovery

v1.7 `RUNNERS LIKE YOU` 화면이 답하는 질문은 하나다.

> 나 같은 러너들은 뭘 신고 달릴까?

나와 주간 거리·목표가 비슷한 러너들이 사용 중인 Shoes를 보여준다.
비교 기준(주간 거리 / 목표 거리 / Runner Type / 현재 신발)을 함께 노출한다.

## P0가 아닌 것

사람 목록, Other Runner Profile, Follow, Reaction 등 Community는 그대로 P2다.

확장 순서는 다음을 따른다.

```text
GEAR
→ ACTIVITY
→ PEOPLE
→ COMMUNITY
```

## 장기 역할은 두 가지다

## Recommendation Evidence

> 나와 비슷한 Runner가 이 장비를 어떻게 사용했는가?

## Social Bridge

> 나와 비슷한 Runner는 누구인가?

---

# 84. Similar Runner 숫자 표현

초기에는:

```text
93% Similar
```

같은 표현을 사용자에게 보여주지 않는다.

대신:

> 주간 러닝량과 장거리 목적이 비슷한 Runner

처럼 이유를 설명한다.

---

# 85. Business Model 방향

초기 MVP에서 BM을 강하게 최적화하지 않는다.

가능한 장기 구조:

```text
Affiliate
Sponsored Exposure
Brand Partnership
B2B Recommendation Data
Commerce
Own Gear / Brand
```

---

# 86. Recommendation과 Monetization 분리

중요 원칙:

> 돈을 더 내는 브랜드가 Organic Recommendation Score를 바꾸면 안 된다.

Sponsored가 있다면:

```text
Sponsored
```

명시.

---

# 87. Service Expansion

> **2026-09-22 개정 (D-09 / Prototype v1.7).** `Similar Runner` 의 Gear Discovery를
> Stage 2에서 Stage 1로 옮겼다. v1.7에서 이미 P0 화면으로 들어왔기 때문이다.
> Stage 2에 남은 것은 Activity 비교이고, People은 그대로 Stage 3다.

## Stage 1

```text
Runner Identity
+
Activity
+
Similar Runner (Gear Discovery)
+
Running Shoe Recommendation
```

---

## Stage 2

```text
Gear Management
+
Product Save
+
Price / Inventory
+
Similar Runner (Activity 비교)
```

---

## Stage 3

```text
Runner Discovery
+
Social Profile
+
Community
```

---

## Stage 4

```text
More Gear
+
Commerce
+
Recommendation Learning
```

---

# 88. 현재 개발 Stack 권장

```text
Next.js
React
TypeScript
Managed PostgreSQL
Server-side Recommendation Engine
Product Analytics
Object Storage
Vercel or equivalent
```

---

# 89. Architecture

```text
Browser
↓
Next.js UI
↓
Server Layer
↓
Application Logic
↓
Recommendation Engine
↓
PostgreSQL

Analytics
↘

AI Gear Coach P1
↘
Recommendation Explanation
```

---

# 90. 금지 Architecture

```text
UI
↓
LLM
↓
Product Recommendation
```

LLM이 Recommendation Engine 자체가 되어서는 안 된다.

---

# 91. Development Philosophy

> **Clean Monolith + Managed Services + Explicit Domain Logic**

MVP에서 지양:

- Microservices
- Kubernetes
- 별도 Python Backend를 이유 없이 추가
- 과도한 Abstraction
- 대규모 Traffic 가정
- 복잡한 Event Architecture

---

# 92. Claude Code Role

Claude Code는:

> **Implementation Engineer**

다.

---

# 93. Claude Code가 할 일

- HTML → React
- DB
- API
- State
- Validation
- Recommendation Logic
- Analytics
- Test
- Bug Fix
- Refactor

---

# 94. Claude Code가 독자적으로 결정하지 않을 것

- Runner Questions
- Runner Types
- UI Redesign
- Gear Directions
- Recommendation Philosophy
- 신규 Feature
- Avatar
- Community
- 새로운 Framework
- 데이터 필드 대량 추가

---

# 95. Development Source Priority

기능·Logic:

```text
09 Backlog / Acceptance Criteria
↓
08 Development Spec
↓
05 User Flow
↓
06 Data
↓
07 Recommendation / AI
↓
10 Recommendation Rulebook
↓
10-A Product DB
↓
00 Master Context
```

Visual:

```text
Current Prototype HTML
↓
UI Guide
↓
Other Documents
```

---

# 96. Backlog 방식

MVP 전체를 한 번에 개발하지 않는다.

예:

```text
GM-050 Add Run
GM-052 Shoe Mileage
```

단위로 구현한다.

---

# 97. Definition of Done

P0 Story는 가능한 경우:

```text
UI
+
Server Validation
+
DB Persistence
+
Refresh Persistence
+
Event Logging
+
Error Handling
+
Authorization
+
Tests
+
Staging QA
```

까지 연결돼야 완료다.

---

# 98. Closed MVP Release Gate

핵심:

1. New User Flow PASS
2. Returning User PASS
3. Activity / Mileage PASS
4. Recommendation E2E PASS
5. VERIFIED Product Coverage 확보
6. Direction Role Filter 적용
7. Current Shoe 비교 정상
8. H3 Feedback 저장
9. H5 Purchase Intent 저장
10. H1/H3/H4/H5 분석 가능
11. QA 8 Scenario 실행
12. Security 최소조건 충족

---

# 99. 지금 가장 중요한 것

현재 GearMatch AI에서 가장 중요한 것은:

> 새로운 기능 아이디어를 더 만드는 것

이 아니다.

다음 세 가지다.

```text
1. Product DB 검증 확대
2. MVP 실제 개발
3. 실제 사용자 행동 측정
```

---

# 100. MVP 이후 의사결정

데이터를 보고 방향을 선택한다.

---

## H1 강함

Runner Identity Hook 가능성.

---

## H4 강함

Runner Profile / Activity / Gear Management 가능성.

---

## H3/H5 강함

Gear Decision Platform 가능성.

---

## H1/H4 강함 + Other Runner Curiosity 발생

Community / Runner Discovery 검토.

---

# 101. Earn the Right to Expand

GearMatch AI의 확장 원칙:

> **Earn the right to expand.**

먼저:

```text
Runner Identity
```

가치를 검증하고,

다음:

```text
Activity
```

를 검증하고,

다음:

```text
Gear Decision
```

을 검증한 뒤,

사용자가 실제로 원할 때:

```text
Community
Avatar
Auto Sync
Commerce
More Gear
```

로 확장한다.

---

# 102. 고정해야 하는 것

현재 MVP 개발 중 쉽게 바꾸지 않는다.

- GearMatch AI 이름
- Gear Decision Support 철학
- 5 Questions
- 6 Runner Types
- Runner Card First Experience
- Current Shoe 1 Active
- Run / Mileage
- 3 Direction Recommendation
- Choice Support
- Rule/Score Recommendation
- AI = Explanation Layer
- H1/H3/H4/H5
- P0/P1/P2 범위

---

# 103. 바꿔도 되는 것

Prototype / MVP 데이터를 보고 조정 가능.

- Copy
- Need Weight
- Priority Weight
- Product Score
- Penalty
- Direction Weight
- Product Coverage
- Card Detail
- Profile 질문의 일부
- AI Gear Coach P1 UX
- P1 실행 순서

단:

> 변경 전/후 Version을 남긴다.

---

# 104. 현재 공식 문서 체계

```text
00 Master Context
01 Service Definition
02 Hypothesis & Validation
03 Target User & JTBD
04 MVP Scope
05 User Flow & Service Blueprint
06 Data Planning
07 Recommendation & AI Gear Coach
08 MVP Development Spec
09 MVP Development Backlog & Acceptance Criteria
10 Running Shoe DB & Recommendation Rulebook
10-A Product Recommendation DB
```

---

# 105. 문서 역할

## 00

> 우리는 무엇을 만들고 있는가?

## 01

> 왜 만드는가?

## 02

> 무엇이 가설이며 어떻게 검증하는가?

## 03

> 누구의 어떤 상황을 해결하는가?

## 04

> MVP에서 무엇을 만드는가?

## 05

> 사용자는 어떻게 경험하는가?

## 06

> 어떤 데이터를 저장하는가?

## 07

> 추천과 AI는 어떻게 동작하는가?

## 08

> 기술적으로 어떻게 만드는가?

## 09

> 어떤 순서로 어떤 작업을 완료해야 하는가?

## 10

> Product Recommendation Rule은 무엇인가?

## 10-A

> 실제 Product Data는 무엇인가?

---

# 106. 최종 서비스 문장

> **GearMatch AI는 사용자의 Runner Identity, 실제 러닝 활동, 현재 장비를 연결해 지금의 자신에게 맞는 장비 선택 방향을 이해하도록 돕고, 여러 후보의 차이와 이유를 설명해 장비 선택의 확신을 만드는 서비스다.**

---

# 107. 최종 MVP 문장

> **GearMatch AI MVP는 Runner Card를 만드는 테스트 서비스가 아니라, Runner Identity를 시작점으로 실제 Runner Context를 축적하고 그 Context가 재방문과 장비 선택 행동으로 이어지는지를 검증하는 제품이다.**

---

# 108. 최종 Recommendation 문장

> **Verified Product Data → Deterministic Rule / Score → 3 Trade-off Directions → Explainable Recommendation**

---

# 109. 최종 AI 문장

> **AI decides가 아니라 AI explains.**

---

# 110. 최종 Community 문장

> **Community는 지금 만들지 않지만, Runner Identity와 Gear/Activity Data가 충분한 가치를 만들면 자연스럽게 연결될 수 있는 중요한 장기 확장 방향이다.**

---

# 111. 최종 개발 원칙

> **Prototype의 Visual Identity를 보호하고, P0 Backlog를 하나씩 실제 데이터와 연결하고, 가설을 측정할 수 있는 상태까지 구현한 뒤 확장한다.**

---

# 112. Final Master Statement

GearMatch AI의 현재 전략은 다음으로 요약한다.

```text
Acquire with Identity
        ↓
Retain with Runner Context
        ↓
Create Value with Gear Decision
        ↓
Learn from Behavior
        ↓
Expand only when earned
```

즉:

> **Runner Card로 사용자를 끌어오고,  
> 실제 Runner Context를 축적하며,  
> Gear Decision으로 실질적 가치를 만들고,  
> 행동 데이터가 확인될 때 다음 기능으로 확장한다.**
