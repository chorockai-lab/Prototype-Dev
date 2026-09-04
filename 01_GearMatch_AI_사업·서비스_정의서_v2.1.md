# 01_GearMatch_AI_사업·서비스_정의서_v2.1

> **문서 목적**  
> 본 문서는 GearMatch AI가 **왜 존재하는 서비스인지, 어떤 문제를 해결하려는지, 사용자에게 어떤 가치를 제공하는지, 장기적으로 어떤 사업적 가능성을 가질 수 있는지**를 정의한다.
>
> 00 Master Context가 전체 기준 문서라면, 본 문서는 그중에서도 **사업·서비스의 존재 이유와 핵심 가치**를 구체화한다.
>
> 기능 정의는 04 이후 문서를 따른다.  
> 본 문서는 기능 목록보다 **문제 → 가치 → 서비스 구조 → 사업 방향**에 집중한다.

- 문서 버전: v2.1
- 기준 시점: 2026-09-04
- 서비스명: **GearMatch AI**
- 현재 단계: Prototype 완료 → Closed MVP 개발 준비
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1.md`
- 연결 문서:
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1.md`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1.md`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1.md`

---

# 1. 서비스 한 줄 정의

> **GearMatch AI는 Runner Identity와 실제 러닝 Context를 바탕으로 사용자가 자신에게 맞는 장비 선택 기준을 이해하고, 여러 후보의 차이와 Trade-off를 비교해 장비 선택의 확신을 가질 수 있도록 돕는 Gear Decision Support Service다.**

---

# 2. 우리가 해결하려는 문제

러닝화 시장은 제품이 부족해서 어려운 것이 아니다.

오히려:

- 제품이 너무 많고
- 브랜드 설명이 비슷하며
- 리뷰가 많고
- 리뷰마다 평가가 다르고
- 사용자 Context가 반영되지 않기 때문에

선택이 어렵다.

사용자는 실제로 다음 질문을 가진다.

```text
지금 나에게 어떤 신발이 필요한가?
내가 신는 신발과 무엇이 다른가?
왜 이 후보가 나한테 맞는 선택지가 될 수 있는가?
비슷한 제품 중 무엇을 기준으로 골라야 하는가?
```

현재 시장의 많은 정보는:

```text
제품 중심
```

으로 구성되어 있다.

GearMatch AI는 이를:

```text
Runner Context 중심
```

으로 재배치하려 한다.

---

# 3. 문제 정의 — 사용자 관점

## 3.1 선택 기준 부족

사용자는 러닝화를 사고 싶어도:

- Cushion
- Stability
- Tempo
- Race
- Carbon
- Super Trainer
- Daily Trainer

등의 용어를 자신의 상황과 연결하기 어렵다.

결과적으로:

- 판매순위
- 유명 브랜드
- 커뮤니티 인기
- 리뷰어 추천
- 주변 지인 추천

에 의존한다.

---

## 3.2 리뷰는 많지만 나와의 연결이 약함

리뷰는 제품 설명에는 도움이 된다.

하지만 사용자가 정말 알고 싶은 것은:

> **“이 리뷰가 나에게도 해당되는가?”**

이다.

동일한 제품도:

- 러닝량
- 경력
- 목적
- 현재 신발
- 러닝 빈도
- 장거리 여부
- 기록 목표

에 따라 의미가 달라질 수 있다.

---

## 3.3 현재 신발과의 비교가 부족함

많은 추천은:

> 좋은 신발인가?

를 설명한다.

하지만 구매자의 실제 질문은:

> **내가 지금 신는 신발에서 무엇을 바꾸는 선택인가?**

에 가깝다.

GearMatch AI는 이 차이를 핵심 Recommendation Context로 본다.

---

# 4. 문제 정의 — 사업 관점

현재 온라인 추천은 주로 다음 자산을 기반으로 한다.

```text
검색이력
구매이력
판매량
광고
단순 설문
```

대형 Commerce Platform은 이러한 데이터에서 강하다.

GearMatch AI가 동일한 방식으로 경쟁하면 차별성이 약하다.

따라서 GearMatch AI는:

> **운동 Context와 장비 사용 Context를 연결한 First-party Data**

를 장기 자산으로 본다.

---

# 5. 우리가 만들고자 하는 가치

핵심 가치는:

> **장비 선택의 확신**

이다.

사용자가 GearMatch AI를 이용하고 나서 느껴야 하는 것은:

```text
“이게 정답이다.”
```

가 아니라:

```text
“내 상황에서는 이 세 방향을 보면 되는구나.”
“지금 신발보다 무엇이 달라지는지 이해했다.”
“내가 어떤 기준으로 선택해야 하는지 알겠다.”
```

이다.

---

# 6. GearMatch AI의 Recommendation 철학

GearMatch AI는:

> Product Ranking Service

보다:

> **Choice Support Service**

에 가깝다.

---

# 7. Recommendation Structure

```text
Runner Identity
+
Runner Profile
+
Activity
+
Current Shoe
+
Gear Need
+
Priority
        ↓
Recommendation Context
        ↓
Eligibility / Rule / Score
        ↓
3 Gear Directions
        ↓
Product Candidates
        ↓
Reason / Comparison / Trade-off
```

---

# 8. 하나의 Best Shoe를 주지 않는 이유

하나의 신발이 모든 기준에서 최선인 경우는 드물다.

예를 들어:

```text
Comfort
vs
Speed

Stability
vs
Weight

Versatility
vs
Race Specificity
```

처럼 Trade-off가 존재한다.

따라서 GearMatch AI는:

> 1위 / 2위 / 3위

가 아니라:

> **서로 다른 선택 방향**

을 보여준다.

---

# 9. Runner Identity를 앞에 두는 이유

Runner Test와 Runner Card는 단순 재미 요소가 아니다.

역할:

```text
Acquisition Hook
+
Self Recognition
+
Profile Entry
+
Recommendation Context
```

사용자는 처음부터:

> 몸무게, 주간거리, 구매예산을 입력하세요.

라는 Form보다,

> 나는 어떤 러너인가?

라는 질문에 더 자연스럽게 참여할 가능성이 있다.

---

# 10. Runner Card의 의미

Runner Card는:

> 결과 이미지

가 아니라:

> **사용자의 Runner Profile을 계속 돌아보는 Home Surface**

로 발전한다.

MVP에서는:

- Runner Type
- Weekly KM
- Runs
- Total KM
- Last Run
- Current Shoe
- Shoe Mileage

가 연결된다.

---

# 11. Activity를 넣는 이유

GearMatch AI가 Recommendation만 제공한다면 사용자는:

```text
신발 살 때만 접속
```

할 가능성이 높다.

Activity와 Shoe Mileage는:

> 구매가 없는 기간에도 사용자 Context가 쌓이는 구조

를 만든다.

이를 통해 H4 Retention을 검증한다.

---

# 12. Current Shoe가 중요한 이유

현재 신발은 GearMatch AI의 차별점 중 하나다.

Recommendation은:

```text
이 제품의 장점
```

만 설명하지 않는다.

대신:

```text
현재 신발 대비
어떤 특성이 올라가고
어떤 특성이 낮아지는가
```

를 설명한다.

---

# 13. Product DB의 역할

GearMatch AI의 Product DB는:

> Catalogue

가 아니다.

> **Recommendation Evidence Layer**

다.

Product마다:

- Primary Use
- Secondary Use
- Specialization
- Plate Fact
- 8 Recommendation Attributes
- Evidence
- Review Conflict
- Verification Status

를 관리한다.

---

# 14. Product DB 원칙

Recommendation에는:

> VERIFIED Product만 사용

한다.

DRAFT를 많이 쌓는 것보다:

> 적은 제품이라도 검증된 후보를 사용하는 것

이 중요하다.

---

# 15. AI의 역할

GearMatch AI라는 이름이 있지만, MVP에서 AI는 중심 Recommendation Engine이 아니다.

핵심 구조:

```text
Rule / Score
→ Recommendation
→ AI Explanation
```

---

# 16. AI가 하지 않는 것

- Product 자유 선택
- Product 순위 변경
- 없는 Product Fact 생성
- 의료 판단
- 부상 진단
- 훈련 처방
- 사용자 적합도 확률 생성

---

# 17. AI가 하는 것

- 추천 이유 설명
- Current Shoe 비교 설명
- Trade-off 설명
- 사용 상황별 차이 설명
- 추가 질문 대응

---

# 18. 왜 러닝을 첫 카테고리로 선택했는가

GearMatch AI는 Multi-sport Platform으로 시작하지 않는다.

러닝을 첫 카테고리로 선택한 이유는:

- 참여 장벽이 낮고
- 장비 선택이 중요하며
- 반복 사용이 존재하고
- 기록과 장비 사용이 연결되며
- 문화·커뮤니티 확장이 가능하기 때문이다.

또한 러닝은:

> 사용자의 운동 Context와 제품 Context를 연결하는 실험에 적합한 카테고리

다.

---

# 19. 러닝화에서 시작하는 이유

러닝 장비 중 러닝화는:

- 제품 차이가 큼
- 구매 빈도 존재
- 사용 목적에 따라 제품군이 다름
- 리뷰와 정보가 많음
- 사용자의 현재 신발이 중요함

따라서 Recommendation Validation에 적합하다.

---

# 20. 서비스가 전문성을 과장하지 않는 이유

러닝에는:

- 부상
- 통증
- 주법
- 훈련
- 회복

등 전문 영역이 존재한다.

GearMatch AI는 이 영역을 억지로 해결하지 않는다.

회사의 핵심 강점은:

```text
Data
AI
Recommendation
Service Design
```

에 있다.

따라서:

> 달리는 법

보다:

> **장비 선택**

에 집중한다.

---

# 21. 초기 사용자 경험

```text
1. 나는 어떤 러너인가?
2. 지금 나는 어떻게 뛰고 있는가?
3. 나는 어떤 신발을 신고 있는가?
4. 지금 무엇을 바꾸고 싶은가?
5. 어떤 방향의 제품을 보면 되는가?
```

---

# 22. Core Product Loop

```text
Runner Test
→ Runner Card
→ Profile
→ Current Shoe
→ Run
→ Mileage
→ Revisit
→ Gear Exploration
→ Recommendation
→ Purchase Consideration
→ Revisit
```

---

# 23. 핵심 Product Hypothesis

GearMatch AI는 현재 다음 가능성을 검증 중이다.

```text
Identity
→ Profile Creation

Profile / Activity
→ Return

Runner Context
→ Recommendation Value

Recommendation Value
→ Purchase Consideration
```

이 관계는 아직 가설이다.

---

# 24. 현재 확정된 것과 가설인 것

## 확정된 Product Direction

- Runner Identity 기반 시작
- Gear Decision Support
- Current Shoe 비교
- 3 Direction Recommendation
- AI는 Explanation Layer
- MVP는 Running Shoe
- Recommendation에는 VERIFIED Product 사용
- Community는 MVP 밖

---

## 아직 검증해야 할 가설

- Runner Card가 충분한 Acquisition Hook인가?
- Activity / Mileage가 재방문을 만드는가?
- 3 Direction이 단일 추천보다 유용한가?
- Current Shoe Compare가 실제로 차별적인가?
- 사용자가 구매 후보 행동까지 이어지는가?
- Runner Profile이 장기 Social Layer로 확장 가능한가?

---

# 25. MVP의 역할

MVP의 목적은:

> 완성된 사업을 보여주는 것

이 아니다.

다음을 판단하는 것이다.

```text
이 서비스가 계속 만들어질 이유가 있는가?
```

---

# 26. MVP 이후 의사결정

## H1 강함 / H4 약함

Runner Identity는 매력적이지만 Retention Utility가 약할 수 있다.

검토:

- Card Evolution
- Activity Value
- Mileage Utility

---

## H4 강함

Runner Profile / Gear Management 가능성.

---

## H3/H5 강함

Gear Decision Utility가 강함.

확장:

- Product Coverage
- Compare
- Outbound
- Commerce
- Similar Runner Evidence

---

## Other Runner Curiosity 강함

Social 확장 검토.

---

# 27. Community의 위치

Community는 GearMatch AI와 무관한 기능이 아니다.

장기적으로:

```text
Runner Identity
+
Activity
+
Gear
```

를 다른 사용자와 연결하는 Social Layer다.

---

# 28. Community Expansion

```text
Personal Runner Profile
→ Runner Discovery
→ Gear / Activity Comparison
→ Interaction
→ Running Together
→ Competition
```

단:

> Personal Value가 먼저 검증되어야 한다.

---

# 29. Similar Runner

Similar Runner는 향후 중요한 요소다.

두 가지 역할:

## Recommendation Evidence

> 나와 비슷한 Runner는 어떤 Gear를 사용하는가?

## Social Discovery

> 나와 비슷한 Runner는 누구인가?

---

# 30. 초기 Similar Runner를 넣지 않는 이유

현재 First-party Data가 부족하다.

초기부터:

```text
비슷한 러너 24명 중 18명
```

같은 수치를 만들면 신뢰 문제가 생긴다.

따라서 실제 데이터가 쌓인 이후에 사용한다.

---

# 31. 데이터 자산

장기적으로 가장 중요한 데이터 구조:

```text
Runner
+
Context
+
Gear
+
Usage
+
Experience
+
Decision
```

---

# 32. Data Flywheel

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

# 33. Commerce와의 관계

GearMatch AI는 Commerce로 갈 수 있다.

그러나 초기에는:

> Commerce를 먼저 만들고 추천을 붙이는 것

이 아니라,

> **Recommendation Value를 먼저 검증하고 Commerce를 연결**

한다.

---

# 34. 가능한 Revenue Model

장기 후보:

```text
Affiliate
Sponsored Exposure
Brand Partnership
B2B Recommendation Data
Commerce
Own Brand / Product
```

---

# 35. Monetization Principle

Recommendation과 Monetization은 분리한다.

```text
Organic Recommendation
≠
Paid Ranking
```

Sponsored가 존재하면 명확히 표시한다.

---

# 36. 경쟁에서 피해야 할 방향

GearMatch AI가:

```text
쿠팡보다 많은 구매 데이터
네이버보다 많은 검색 데이터
Amazon보다 많은 Review
```

를 갖는 것은 현실적이지 않다.

따라서 차별화는:

> **운동 Context와 Gear Usage의 연결**

에서 만들어야 한다.

---

# 37. 경쟁 우위 가설

장기적으로 경쟁력이 생기려면 다음 데이터가 필요하다.

```text
어떤 러너가
어떤 상황에서
어떤 Gear를 사용하고
어떤 선택을 했으며
어떤 Experience를 얻었는가
```

---

# 38. 초기 시장 접근

초기에는 대규모 마케팅보다:

- Prototype Test
- Closed MVP
- 소규모 Instagram 유입
- Runner Community / Club
- 정성 Interview

가 적합하다.

---

# 39. 초기 파트너 후보

후보:

- Running Community
- Running Crew
- 소형 Running Shop
- Running Gear Brand
- Running Content Creator

하지만 Partnership 자체가 목표는 아니다.

목표:

> 사용자 Context와 Gear Decision Behavior를 검증.

---

# 40. 초기 시장 범위

```text
Korea First
```

한국에서:

- UX
- 입력 부담
- Retention
- Recommendation

을 먼저 확인한다.

이후 미국 등 다른 시장에서 재검증한다.

---

# 41. 미국 테스트의 의미

미국 테스트는:

> 한국에서 만든 서비스를 그대로 복제

하는 것이 아니다.

비교:

- Runner Identity 반응
- Product Data 차이
- 구매 행동
- Input Willingness
- Recommendation Trust

---

# 42. Target의 핵심

20~30대 감도를 중요하게 보지만:

> 나이 자체가 Core Target 정의는 아니다.

더 중요한 기준:

```text
Running Continuity
+
Self Interest
+
Gear Interest
```

---

# 43. Brand Identity

GearMatch AI가 사용자에게 줘야 하는 느낌:

```text
Performance
+
Culture
+
Editorial
+
Personal
```

AI SaaS처럼 보이면 안 된다.

---

# 44. Visual Direction

```text
Performance Editorial
×
Running Culture
```

참고 감도:

- Sports identity
- Bold typography
- Strong number hierarchy
- Modern editorial curation
- Minimal but energetic motion

단:

> 다른 브랜드 UI를 복제하지 않는다.

---

# 45. 서비스의 언어

과장:

```text
당신에게 완벽한 신발
AI가 찾아낸 최고의 신발
97% 적합
```

금지.

권장:

```text
지금의 러닝에 이런 방향을 볼 수 있어요.
현재 신발보다 반응성을 높이는 선택입니다.
장거리에서는 더 편하지만 빠른 훈련에서는 덜 날카로울 수 있습니다.
```

---

# 46. 서비스 신뢰의 원칙

Trust는:

> AI라는 이름

에서 생기지 않는다.

다음에서 생긴다.

```text
왜?
무엇이 다른가?
무엇을 포기하는가?
근거가 무엇인가?
```

---

# 47. 현재 Recommendation Rule

```text
product_db_v1.5
gear_reco_v1.1
```

---

# 48. Current Recommendation Structure

```text
Need Match               30%
Priority Match           25%
Usage / Distance Fit     15%
Current Shoe Transition  20%
Profile Fit              10%
-
Penalty
```

---

# 49. Current Shoe Transition의 사업적 의미

Current Shoe Compare는 단순 Feature가 아니다.

GearMatch AI가:

> Review Aggregator

와 달라질 수 있는 핵심 Context다.

---

# 50. Product Direction

현재:

```text
DAILY_COMFORT
BALANCED_ALLROUND
STABILITY_SUPPORT
LONG_DISTANCE
SPEED_TRAINING
PERFORMANCE_STEPUP
RACE_FOCUS
```

이 중 상황에 맞는 3개를 보여준다.

---

# 51. Recommendation Interface

사용자에게:

```text
Rank
Score
Fit %
```

를 보여주는 것이 아니라:

> **Direction + Product + Reason + Trade-off**

를 보여준다.

---

# 52. MVP 핵심 지표

MVP는 다음을 본다.

## H1

- Test Start
- Test Complete
- Runner Card View
- Profile Complete

## H4

- Run Add
- Return
- Repeat Run
- D7

## H3

- Recommendation View
- Product View
- Helpful

## H5

- Purchase Consideration
- Product Save P1
- Outbound P1

---

# 53. Prototype의 역할

Prototype은 다음을 확인한다.

- UX 이해
- Card 반응
- 설문 부담
- Recommendation Flow
- Visual Appeal

---

# 54. MVP의 역할

MVP는:

- 데이터 저장
- 재방문
- 반복 사용
- Recommendation Value
- Purchase Consideration

을 실제 행동으로 확인한다.

---

# 55. 서비스 확장 원칙

> **Earn the right to expand.**

즉:

```text
Identity가 가치 있으면
→ Profile 확장

Profile이 가치 있으면
→ Discovery

Gear Recommendation이 가치 있으면
→ Commerce

Activity가 가치 있으면
→ Sync / Gear Management
```

---

# 56. 장기 Vision

GearMatch AI는 장기적으로:

> 운동 데이터를 저장하는 앱

도,

> 단순 러닝화 쇼핑몰

도,

> 일반 러닝 Community

도 아니다.

장기적으로는:

> **Runner Identity, Activity, Gear, Decision, Social Context를 연결하는 Runner Gear Intelligence Layer**

로 확장할 가능성을 본다.

---

# 57. 하지만 현재의 현실적 목표

현재는:

```text
Running Shoe
+
Closed MVP
+
Real User Behavior
```

에 집중한다.

---

# 58. 지금 가장 중요한 질문

다음 질문에 답할 수 있어야 한다.

```text
Runner Card를 원해서 들어오는가?
다시 돌아오는가?
Recommendation을 신뢰하는가?
Product를 실제 구매 후보로 보는가?
```

---

# 59. 사업적으로 지금 하지 말아야 하는 것

- 시장규모 숫자만 크게 제시
- Community를 먼저 만듦
- AI를 핵심 차별점이라고 주장
- 모든 스포츠로 확장
- Commerce를 먼저 개발
- Revenue Model을 과도하게 확정
- Product Score를 과학적 정확도로 표현

---

# 60. 사업적 검증 순서

```text
User Attention
↓
Identity Engagement
↓
Retention
↓
Recommendation Value
↓
Purchase Intent
↓
Commercial Model
```

---

# 61. 회사의 역할

GearMatch AI에서 회사가 경쟁해야 하는 것은:

> 전문 러닝 코치의 지식

보다:

```text
Structured Data
Recommendation Logic
AI Explanation
Service Experience
```

이다.

---

# 62. 초기 Team 현실성

작은 팀에서 운영 가능한 구조를 전제로 한다.

따라서:

- Managed Service
- Simple Web App
- Rule-based Recommendation
- Manual Data Verification

을 우선한다.

---

# 63. 기술 과잉 방지

초기에는 필요 없음:

- Microservices
- Complex ML
- Vector DB 중심 Architecture
- Realtime Streaming
- Native App
- 대규모 Moderation

---

# 64. 초기 데이터 과잉 방지

사용자에게 처음부터:

- 신장
- 체중
- Foot Strike
- Cadence
- Pace
- Injury History
- 세부 Training Plan

등을 강제하지 않는다.

Progressive Profiling을 사용한다.

---

# 65. 사용자 입력 철학

> **Reward First → Data Request Second**

즉:

```text
Test
→ Result
→ Card
→ Profile
```

순서.

---

# 66. 서비스 이름의 의미

GearMatch AI에서 핵심은:

```text
Gear
+
Match
```

다.

AI는 이를 돕는 Technology Layer이지 사용자 가치 그 자체가 아니다.

---

# 67. 성공했을 때의 사용자 인식

사용자가 GearMatch AI를 다음처럼 인식하는 것이 이상적이다.

> “러닝화 살 때 검색하기 전에 한 번 보는 곳.”

그리고 장기적으로:

> “내 러닝과 장비가 쌓이는 곳.”

---

# 68. 성공했을 때의 사업 인식

장기적으로는:

> 어떤 러너가 어떤 장비를 왜 선택하고 어떻게 사용하는지 이해하는 데이터 기반 Gear Platform

가능성을 가진다.

---

# 69. 최종 서비스 정의

> **GearMatch AI는 Runner Identity, 실제 러닝 활동, 현재 장비를 연결해 사용자가 지금의 자신에게 맞는 장비 선택 방향을 이해하도록 돕고, 여러 후보의 차이와 Trade-off를 설명해 장비 선택의 확신을 만드는 서비스다.**

---

# 70. Final Business Principle

```text
Acquire with Identity
↓
Retain with Runner Context
↓
Create Value with Gear Decision
↓
Learn from Behavior
↓
Build Data Advantage
↓
Expand when earned
```

---

# 71. 최종 판단 기준

GearMatch AI가 계속 개발할 가치가 있는지는:

> 우리가 좋은 기획 문서를 만들었는가?

가 아니라:

> **실제 Runner가 들어오고, 돌아오고, Recommendation을 사용하고, Product를 고려하는가?**

로 판단한다.
