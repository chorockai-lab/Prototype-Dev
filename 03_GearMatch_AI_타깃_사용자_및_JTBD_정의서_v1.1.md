# 03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1

> **문서 목적**  
> 본 문서는 GearMatch AI가 초기 단계에서 **누구를 우선 대상으로 하고, 그 사용자가 어떤 상황에서 어떤 진전을 이루기 위해 서비스를 사용하는지**를 정의한다.
>
> 타깃은 나이·성별 같은 인구통계보다 **러닝 지속성, 장비 관심, 현재 고민, 행동 상태**를 중심으로 정의한다.
>
> 본 문서는 Persona를 과도하게 세분화하기보다, MVP에서 실제 모집·인터뷰·분석에 사용할 수 있는 수준의 Target Spectrum과 JTBD를 제공한다.

- 문서 버전: v1.1
- 기준 시점: 2026-09-04
- 서비스명: **GearMatch AI**
- 상위 기준:
  - `00_GearMatch_AI_Master_Context_v1.1.md`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1.md`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1.md`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1.md`

---

# 1. 타깃 정의 원칙

GearMatch AI의 초기 타깃은:

> “20~30대 러너”

로만 정의하지 않는다.

20~30대는 디자인·마케팅 감도에서 중요하지만, 실제 Product Fit은 다음이 더 중요하다.

```text
Running Continuity
+
Self Interest
+
Gear Interest
+
Decision Need
```

---

# 2. Primary Target 한 줄 정의

> **러닝을 어느 정도 지속하면서 자신의 러닝 방식과 장비에 관심이 생기기 시작했고, 현재 신발을 계속 신을지 혹은 다음 장비를 어떤 기준으로 선택할지 고민하는 러너.**

---

# 3. 초기 Target 조건

권장 Core 기준:

- 최근 약 1개월 이상 러닝을 지속
- 최소 주 1회 수준
- 현재 러닝화를 보유
- 자신의 러닝 기록·성장·장비 중 하나 이상에 관심
- Runner Type / Profile 결과에 거부감이 낮음
- 지금 또는 향후 러닝화 구매 가능성이 존재

---

# 4. 반드시 지금 구매 예정일 필요는 없음

GearMatch AI의 타깃은:

> 이번 주 러닝화를 살 사람

으로만 제한하지 않는다.

이유:

GearMatch는:

```text
Identity
→ Activity
→ Context
→ Gear Decision
```

구조이므로,

현재 구매 계획이 없어도:

- Running Context
- Shoe Mileage
- Gear Interest

가 쌓일 수 있다.

---

# 5. 다만 Gear 관심은 필요

다음 사용자는 Core와 거리가 있다.

> “러닝화는 아무거나 신으면 되고 장비에는 전혀 관심이 없다.”

GearMatch의 핵심 가치가:

> 장비 선택의 확신

이기 때문이다.

---

# 6. Core Target

## 행동 상태

```text
러닝을 시작한 지 1개월 이상
주 1회 이상
현재 신발 있음
장비/성장 관심 있음
```

---

## 주요 생각

- 지금 신발이 나에게 맞는지 모르겠다.
- 다음에는 다른 신발을 사보고 싶다.
- 유명한 제품이 많은데 차이를 모르겠다.
- 내 러닝에는 어떤 방향이 맞는지 궁금하다.
- 기록이나 러닝량이 늘면서 장비가 신경 쓰인다.

---

# 7. Core Target의 Trigger

대표 Trigger:

```text
현재 신발이 아쉬움
주간 러닝량 증가
장거리 시작
기록 목표 발생
대회 준비
새 러닝화 구매 관심
현재 신발 Mileage 증가
다른 러너 장비를 보며 관심 발생
```

---

# 8. Core Target의 기대 결과

> “나한테 맞는 신발 하나를 AI가 골라줬다.”

보다:

> **“내가 지금 무엇을 바꾸고 싶은지 정리됐고, 어떤 종류의 제품을 비교해야 하는지 알겠다.”**

---

# 9. Adjacent Target

GearMatch의 Core는 아니지만 초기 실험에 포함할 수 있다.

---

## 9.1 입문 러너

- 러닝 시작 1개월 미만
- 장비 지식 적음
- 현재 러닝화가 명확하지 않을 수 있음

관심:

> 뭐부터 사야 하지?

---

## 9.2 구매 관심이 높은 비정기 러너

러닝 빈도는 낮지만:

- 신발
- 패션
- 브랜드
- 장비

관심이 높음.

---

## 9.3 기록 중심 러너

- Pace
- Race
- PB
- Performance Shoe

에 관심이 높음.

Recommendation H3/H5에는 유용한 사용자.

---

# 10. Extreme User

제품 방향을 날카롭게 확인하기 위한 사용자.

예:

- 풀코스 경험 다수
- Shoe Rotation 3개+
- Workout별 신발 구분
- Running Shoe Review를 자주 봄
- Mileage 관리 경험 있음

---

# 11. Extreme User의 역할

Extreme User는:

> 평균 사용자 대표

가 아니다.

대신:

- Product Classification
- Recommendation Edge Case
- Advanced Need
- Gear Vocabulary

검증에 도움이 된다.

---

# 12. Non-user

초기 핵심 대상이 아닌 사람.

---

## 대표 조건

- 러닝 의향 없음
- 장비 관심 없음
- 일회성 러닝
- Runner Identity에 관심 없음
- 장비 선택을 남에게 완전히 맡기는 사용자

---

# 13. Persona Spectrum

```text
Non-user
    ↓
Adjacent
    ↓
Core
    ↓
Extreme
```

---

# 14. 왜 Persona보다 Spectrum을 쓰는가

초기에는:

> “28세 직장인 민수”

같은 가상의 Persona보다,

> **행동 상태와 Gear Need**

가 더 중요하다.

MVP 데이터가 쌓인 뒤 실제 Segment를 만든다.

---

# 15. Main JTBD

> **러닝을 계속하다 보니 내 러닝 방식과 장비가 신경 쓰이기 시작했을 때, 나는 현재 나의 러닝 상태를 이해하고 다음 장비를 어떤 기준으로 선택해야 하는지 알고 싶다. 그래야 많은 정보 속에서도 나에게 맞는 선택을 했다는 확신을 가질 수 있다.**

---

# 16. JTBD 구조

```text
Situation
러닝을 지속하고 있음

Trigger
장비 / 러닝 변화가 신경 쓰임

Motivation
내 상황을 이해하고 싶음

Job
다음 Gear 선택 기준을 만들고 싶음

Outcome
선택에 확신을 가지고 싶음
```

---

# 17. Functional Job

> 지금 내 러닝 상황에 맞는 장비 방향과 후보를 비교하고 싶다.

---

# 18. Emotional Job

> 괜히 잘못 산 것 같은 불안 없이 선택하고 싶다.

---

# 19. Social Job

> 러너로서 내가 어떤 스타일인지 표현하고 싶다.

이 Social Job이 Runner Card와 연결된다.

---

# 20. Identity JTBD

> **내가 어떤 방식으로 러닝을 즐기는 사람인지 재미있고 이해하기 쉬운 형태로 확인하고 싶다.**

---

# 21. Profile JTBD

> **내 러닝이 얼마나 이어지고 있고, 현재 어떤 장비를 쓰고 있는지 한 곳에서 보고 싶다.**

---

# 22. Gear Decision JTBD

> **현재 신발에서 무엇을 바꾸고 싶은지 기준을 정하고, 다음 후보의 차이를 이해하고 싶다.**

---

# 23. Current Shoe JTBD

> **새 신발이 그냥 좋은지보다, 내가 지금 신는 신발과 어떻게 다른지 알고 싶다.**

---

# 24. Activity JTBD

> **복잡하게 기록하지 않더라도 내가 얼마나 뛰었고 신발을 얼마나 사용했는지 보고 싶다.**

---

# 25. Future Social JTBD

MVP 이후 탐색:

> **나와 비슷한 러너가 어떤 장비를 사용하고 어떻게 뛰는지 보고 싶다.**

---

# 26. Buying Journey

Gear Purchase Journey를 단순화하면:

```text
Running
↓
Current Gear Awareness
↓
Trigger
↓
Information Search
↓
Comparison
↓
Consideration
↓
Purchase
↓
Usage
```

GearMatch가 개입하고 싶은 지점:

```text
Current Gear Awareness
↓
Trigger
↓
Comparison
↓
Consideration
```

---

# 27. GearMatch Customer Journey

## Stage 1 — Discovery

사용자 생각:

> 이게 뭐지?

GearMatch:

> Runner Type Hook

---

# 28. Stage 2 — Identity

사용자:

> 나는 이런 러너구나.

GearMatch:

> Runner Card

---

# 29. Stage 3 — Context

사용자:

> 지금 나는 이렇게 뛰고 있구나.

GearMatch:

> Profile / Activity / Current Shoe

---

# 30. Stage 4 — Trigger

사용자:

> 신발을 좀 바꾸고 싶다.

예:

- 더 편하게
- 더 빠르게
- 더 멀리
- 대회
- 잘 모르겠음

---

# 31. Stage 5 — Decision Support

GearMatch:

```text
3 Directions
+
Product
+
Reason
+
Current Shoe Comparison
+
Trade-off
```

---

# 32. Stage 6 — Consideration

사용자:

> 이건 실제 후보로 볼 수 있겠다.

GearMatch:

> Purchase Consideration

---

# 33. Stage 7 — Return

사용자:

- 다시 기록
- Mileage 확인
- Recommendation 재방문
- 새로운 Gear Need

---

# 34. Trigger 위치의 중요성

Trigger는 Journey 초반이 아니다.

사용자는:

> 서비스에 들어오기 전에 반드시 구매 고민이 있어야 하는 것

이 아니다.

GearMatch 내부에서:

```text
Identity
→ Context
→ Trigger
```

가 생길 수도 있다.

---

# 35. Early Beginner의 JTBD

입문 러너:

> **정보가 너무 많아서 무엇을 기준으로 봐야 할지 모르겠다.**

필요:

- 어려운 용어 줄이기
- Easy Direction
- Product Trade-off

---

# 36. Intermediate Runner의 JTBD

> **지금 신발은 나쁘지 않지만 다음 신발에서 무엇을 바꿀지 알고 싶다.**

GearMatch Core와 가장 잘 맞는 가능성이 높다.

---

# 37. Advanced Runner의 JTBD

> **내가 원하는 역할을 이미 알고 있고 제품 간 미세한 차이를 확인하고 싶다.**

GearMatch가 너무 단순하면 만족하지 않을 수 있다.

하지만 DB QA에는 중요한 사용자.

---

# 38. Purchase Failure Experience

특히 중요한 후보 Segment.

경험:

- 인기 제품 구매
- 생각보다 안 맞음
- 사용 목적과 다름
- 기대했던 느낌과 다름

JTBD:

> 다음에는 이유를 알고 사고 싶다.

---

# 39. Runner Card 관심 Segment

구매 Need와 별개로:

- 자기 유형
- Card
- 공유
- Profile

에 관심이 높은 사용자.

H1 검증에 중요.

---

# 40. Retention Segment

다음 사용자가 H4에 중요하다.

- 주 2~4회 러닝
- 주간 거리 변화 있음
- 기록에 관심
- Shoe Mileage 관심

---

# 41. Recommendation Segment

H3에 특히 중요한 사용자:

- 최근 러닝화 검색
- 현재 신발 아쉬움
- 다른 카테고리 관심
- Race / Long / Speed 등 Need 존재

---

# 42. Purchase Segment

H5 검증을 위해:

> 향후 1~3개월 내 구매 가능성이 있는 사용자

를 일부 포함하는 것이 좋다.

---

# 43. 단, Target을 구매 예정자만으로 제한하지 않는다

왜냐하면:

> Retention Product 가능성

도 함께 검증하기 때문이다.

---

# 44. Target 모집 기준

Closed MVP 모집 시 최소 질문:

- 최근 러닝 기간
- 주 평균 러닝 횟수
- 현재 러닝화 보유 여부
- 신발 관심도
- 최근 구매 관심 여부

---

# 45. 권장 Cohort Mix

예시:

```text
Core 지속 러너        50~60%
구매 Trigger 사용자   20~30%
Beginner / Adjacent   10~20%
Advanced              일부
```

정확한 비율은 고정 KPI가 아니다.

---

# 46. 20~30대의 의미

디자인 초기 타깃.

이들의 특성 가설:

- Self Identity Content에 익숙
- Card / Share 경험에 익숙
- Running Culture / Fashion 관심 가능
- Mobile First

하지만 실제 행동으로 검증해야 한다.

---

# 47. 사용자에게 처음부터 묻지 않을 것

MVP에서 과도한 입력은 이탈 위험.

초기에는:

- 몸무게
- 키
- Foot Strike
- Injury History
- Cadence
- Heart Rate
- Race PB

등을 필수로 받지 않는다.

---

# 48. Progressive Profiling

원칙:

```text
Reward
→ Data Request
```

---

# 49. 첫 Data Request

Runner Test는:

> 가입 Form

처럼 느껴지면 안 된다.

---

# 50. Runner Card 이후 Data

사용자가 결과를 본 뒤:

- Experience
- Runs
- Weekly Distance
- Current Shoe

를 받는다.

---

# 51. Unknown 허용

사용자가 모르면:

```text
UNKNOWN
```

허용.

억지 입력 금지.

---

# 52. Current Shoe 없는 사용자

`NO_RUNNING_SHOE` 또는 `UNKNOWN_MODEL`.

Recommendation은 가능하되:

> VS YOUR SHOE

는 생략.

---

# 53. User Need 유형

Gear Need:

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

이는 Persona가 아니라:

> **현재의 상황성 Need**

다.

---

# 54. Persona와 Need 분리

예:

PACE RUNNER도:

> COMFORT

가 필요할 수 있다.

RACE RUNNER도:

> DAILY

성격을 원할 수 있다.

따라서 Runner Type으로 Need를 추정하지 않는다.

---

# 55. Runner Type 역할

```text
Identity
+
Context
+
Tie-break / Explanation
```

---

# 56. Runner Type이 하지 않는 것

```text
Type
→ Product 자동 결정
```

---

# 57. Segment 분석 변수

MVP에서 분석:

- runner_type
- experience
- runs_per_week
- weekly_distance
- current_shoe_role
- gear_need
- priority
- purchase_interest
- return_behavior

---

# 58. 실제 Persona는 나중에 만든다

MVP 이후 실제 Cluster 예:

- Identity-driven Runner
- Mileage-driven Runner
- Gear Explorer
- Purchase-driven Runner

등이 나올 수 있다.

현재는 가정하지 않는다.

---

# 59. Core User Success

Core User가 성공했다는 의미:

> **내 러닝이 어떤 상태인지 이해했고, 현재 신발과 비교해서 다음 Gear를 어떤 방향으로 볼지 알게 됐다.**

---

# 60. Beginner Success

> **어려운 러닝화 용어를 다 모르더라도 후보군을 좁힐 수 있었다.**

---

# 61. Advanced User Success

> **내가 알고 있던 제품을 다른 관점에서 비교하거나 새로운 후보를 발견했다.**

---

# 62. User Failure

다음은 실패 경험.

- Test가 너무 뻔함
- Card가 유치함
- Profile이 귀찮음
- Recommendation이 유명 제품 나열
- Current Shoe 차이가 없음
- 이유가 AI 마케팅 문장 같음

---

# 63. Identity와 Utility의 균형

Runner Card만 강하면:

> 재미있는 테스트

로 끝날 수 있다.

Recommendation만 강하면:

> 구매할 때만 쓰는 Tool

로 끝날 수 있다.

GearMatch는 둘을 연결하려 한다.

---

# 64. Retention Job

> “내가 지금 어떻게 뛰고 있고 신발을 얼마나 쓰고 있는지 계속 보고 싶다.”

이 Job이 실제로 존재하는지 H4에서 검증.

---

# 65. Community Job은 아직 가설

> 다른 Runner를 보고 싶다.

라는 니즈는 존재 가능성이 있지만:

MVP에서는 기능 구현보다 정성 탐색.

---

# 66. Similar Runner Job

> 나와 비슷한 Runner가 어떤 신발을 쓰는지 알고 싶다.

장기 Recommendation 신뢰 Layer가 될 수 있다.

---

# 67. Social Comparison Job

> 나와 비슷한 러너보다 더 뛰고 싶은가?

경쟁 요소 가능.

하지만 지금은 P2.

---

# 68. 러닝 문화와 장비

일부 Runner에게 장비는:

> 기능 제품

뿐 아니라:

> 자기 표현

이다.

이 점이 Runner Card와 Gear Profile의 장기 확장에 연결될 수 있다.

---

# 69. 하지만 MVP에서 Fashion Service가 되지 않는다

Gear Recommendation의 첫 기준은:

> User Running Context

다.

Style / Color / Brand Mood는 향후 보조 요소.

---

# 70. 구매 기준의 다양성

실제 구매에는:

- 기능
- 가격
- 디자인
- 브랜드
- 착화감

등이 영향을 준다.

MVP는 모든 변수를 설명하지 않는다.

---

# 71. GearMatch가 우선 책임지는 부분

> **기능적 선택 방향과 Current Shoe 대비 차이**

---

# 72. Fit에 대한 한계

온라인 데이터만으로:

> 실제 발에 완벽히 맞는다.

는 판단 불가.

따라서:

- Perfect Fit
- Size Guarantee

등을 말하지 않는다.

---

# 73. JTBD Interview 질문 예시

## Situation

- 언제부터 러닝했는가?
- 최근 러닝은 어떤가?

## Trigger

- 언제 신발을 바꾸고 싶다고 느꼈는가?

## Existing Solution

- 지금은 어떻게 찾아보는가?

## Pain

- 가장 어려운 점은 무엇인가?

## Outcome

- 어떤 정보가 있으면 확신이 생길까?

---

# 74. Runner Identity Interview

- 자기 러닝 스타일을 설명할 수 있는가?
- Runner Type 결과가 자신답다고 느끼는가?
- Card를 갖고 싶은가?
- 다른 사람 Card도 궁금한가?

---

# 75. Gear Interview

- 현재 신발을 왜 샀는가?
- 만족 / 불만족 이유?
- 다음 신발에서 바꾸고 싶은 것?
- Review를 얼마나 보는가?
- 누구의 의견을 믿는가?

---

# 76. Retention Interview

- Run을 수기로 기록할 의향이 있는가?
- Mileage를 알고 싶은가?
- 무엇 때문에 다시 들어올까?

---

# 77. Purchase Interview

- 추천 제품 중 실제로 볼 후보가 있었는가?
- 그 이유는?
- 가격이 얼마면 고려하는가?
- 외부 구매 페이지로 갈 의향이 있는가?

---

# 78. Target Validation

초기 Target이 맞는지는:

> 가입자 Profile

보다:

> **누가 Activation / Return / Recommendation / Purchase를 만드는지**

로 판단한다.

---

# 79. 실제 Core User 발견

MVP 이후:

```text
Profile Complete Rate
Retention
Recommendation Helpful
Purchase Consideration
```

을 Segment별로 비교.

---

# 80. Target이 바뀔 가능성

가능하다.

예:

20대보다 30~40대에서:

- Retention
- Purchase
- Gear Need

가 훨씬 강할 수 있다.

그렇다면 Target을 수정해야 한다.

---

# 81. Product 방향도 Target에 따라 달라질 수 있다

예:

## Retention Strong

Runner Profile 방향.

## Purchase Strong

Gear Decision Utility 방향.

## Social Curiosity Strong

Runner Discovery 방향.

---

# 82. 초기 Product Copy

권장:

> 내 러닝 스타일을 확인하고, 지금 신발에서 다음 선택 방향을 찾아보세요.

---

# 83. 피해야 할 Copy

> AI가 당신에게 딱 맞는 러닝화를 찾아드립니다.

이유:

- 과장
- Fit 단정
- AI 중심
- GearMatch 핵심 철학과 다름

---

# 84. 사용자 가치 순서

```text
나를 이해
↓
내 상황을 정리
↓
선택 기준을 이해
↓
후보 비교
↓
확신
```

---

# 85. Target과 Product Data의 관계

Advanced User의 리뷰나 사용 경험은:

> Product DB 검증

에 도움.

Core User의 행동은:

> Product Value 검증

에 도움.

둘을 혼동하지 않는다.

---

# 86. Closed MVP에서 가장 중요한 Core 사용자

> **이미 러닝을 어느 정도 지속하고 있고, 현재 신발이 있으며, 자신의 러닝과 장비에 관심이 생긴 일반적인 지속 러너**

다.

---

# 87. 너무 초보만 모집하면 안 되는 이유

Current Shoe Compare와 Gear Need가 약해질 수 있다.

---

# 88. Advanced만 모집하면 안 되는 이유

제품 지식이 너무 높아 일반 UX를 대표하지 않을 수 있다.

---

# 89. Balanced Recruitment

Core 중심 + Beginner + Advanced 일부.

---

# 90. Final Target Statement

> **GearMatch AI의 초기 핵심 사용자는 러닝을 어느 정도 지속하면서 자신의 러닝 방식과 현재 장비에 관심이 생기기 시작했고, 다음 장비를 무엇을 기준으로 선택해야 할지 고민하는 러너다. 이 사용자는 반드시 당장 구매 예정일 필요는 없지만, 자신의 Runner Identity와 활동을 이해하고 장비 선택을 더 잘하고 싶은 동기가 있어야 한다.**

---

# 91. Final JTBD Statement

> **러닝을 계속하다 보니 내 러닝 방식과 장비가 신경 쓰이기 시작했을 때, 나는 현재 나의 러닝 상태를 이해하고 다음 장비를 어떤 기준으로 선택해야 하는지 알고 싶다. 그래야 많은 정보 속에서도 나에게 맞는 선택을 했다는 확신을 가질 수 있다.**

---

# 92. Final User Journey Statement

```text
나는 어떤 러너인가
↓
지금 나는 어떻게 뛰고 있는가
↓
현재 어떤 신발을 쓰고 있는가
↓
무엇을 바꾸고 싶은가
↓
어떤 방향을 보면 되는가
↓
왜 이 후보인가
↓
실제 구매 후보인가
↓
다시 돌아올 이유가 있는가
```
