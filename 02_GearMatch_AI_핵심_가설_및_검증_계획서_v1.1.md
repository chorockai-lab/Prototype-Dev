# 02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1

> **문서 목적**  
> 본 문서는 GearMatch AI에서 **무엇이 사실이고 무엇이 아직 가설인지 분리**하고, Prototype과 Closed MVP에서 어떤 행동과 데이터를 통해 가설을 검증할지 정의한다.
>
> 이 문서의 목적은 지표를 많이 만드는 것이 아니다.  
> **어떤 결과가 나오면 계속 만들고, 어떤 결과가 나오면 수정하거나 중단할지 판단할 수 있게 하는 것**이 목적이다.

- 문서 버전: v1.1
- 기준 시점: 2026-09-04
- 서비스명: **GearMatch AI**
- 상위 기준:
  - `00_GearMatch_AI_Master_Context_v1.1.md`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1.md`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1.md`
- 현재 단계:
  - Prototype UX/UI 거의 완료
  - Closed MVP 개발 준비
- 현재 핵심 검증 가설:
  - **H1 Runner Identity**
  - **H3 Recommendation Value**
  - **H4 Retention**
  - **H5 Purchase Consideration**

---

# 1. 검증의 기본 원칙

GearMatch AI는 지금:

> 좋은 아이디어인지 증명하는 단계

가 아니라:

> **실제 사용자 행동으로 틀린 부분을 빨리 찾는 단계**

다.

따라서 다음 원칙을 따른다.

```text
Behavior > Stated Preference
Actual Use > “좋아요”
Return > One-time Wow
Purchase Consideration > Product Like
```

---

# 2. Fact / Hypothesis 구분 원칙

## Fact

현재 우리가 실제로 확인했거나 이미 구현·정의된 것.

예:

- Prototype에 5문항 Runner Test가 존재
- Runner Type은 6개로 정의
- Runner Card가 존재
- Current Shoe를 Recommendation Context로 사용하기로 결정
- Product DB에 35개 normalized product가 존재
- Recommendation은 3 Direction 구조를 사용하기로 결정

---

## Hypothesis

실제 사용자 행동으로 아직 충분히 검증되지 않은 것.

예:

- Runner Card가 Acquisition Hook으로 충분하다
- Shoe Mileage가 Return Reason이 된다
- 3 Direction 구조가 이해하기 쉽다
- Current Shoe Compare가 Recommendation 신뢰를 높인다
- 추천 제품이 실제 구매 후보가 된다

---

# 3. 현재 확인된 사실

## Product / Service Fact

- GearMatch AI는 Running Shoe부터 시작한다.
- Runner Test는 5문항이다.
- Runner Type은 6개다.
- Current Shoe는 MVP에서 1 Active Shoe다.
- Recommendation은 Rule / Score 기반이다.
- AI는 Recommendation Explanation Layer다.
- Recommendation 결과는 3 Gear Direction 구조다.
- 내부 Score는 사용자에게 노출하지 않는다.
- Community는 MVP 밖이다.

---

# 4. 아직 사실로 보면 안 되는 주장

다음은 현재 가설이다.

- 국내 러너 대부분이 Runner Card를 원한다.
- 20~30대가 특히 강한 Retention을 보인다.
- 사용자는 Manual Run Add를 지속한다.
- Shoe Mileage가 충분한 Utility다.
- AI Gear Coach가 Recommendation 신뢰를 높인다.
- Similar Runner가 구매결정에 강한 영향을 준다.
- GearMatch Recommendation이 기존 검색보다 더 낫다.
- 사용자는 3 Direction을 한 번에 이해한다.

---

# 5. 핵심 검증 구조

```text
H1 Runner Identity
        ↓
Profile Creation
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

# 6. H1 — Runner Identity

## 가설

> 사용자는 자신의 Runner Type과 Runner Card를 확인하기 위해 5문항 Test를 완료하고, 결과를 자신의 Profile로 이어갈 의향을 보일 것이다.

---

## 핵심 질문

- Test를 시작하는가?
- 5문항을 완료하는가?
- Result를 보는가?
- Runner Card를 충분히 가치 있게 느끼는가?
- Profile Complete까지 이어지는가?

---

# 7. H1 행동 지표

```text
landing_view
test_start
test_complete
runner_type_reveal
runner_card_view
profile_start
profile_complete
```

---

# 8. H1 주요 Funnel

```text
Landing
→ Test Start
→ Test Complete
→ Runner Card
→ Profile Complete
```

---

# 9. H1 Prototype 검증

Prototype에서는 숫자보다 다음을 본다.

- 첫 화면에서 무엇을 하는 서비스인지 이해
- Test 시작 CTA 이해
- 문항 피로도
- Runner Type 결과 납득
- Runner Card 소유 욕구
- Profile 입력에 대한 거부감

---

# 10. H1 정성 질문

예:

- 결과를 보기 전 어떤 서비스라고 생각했는가?
- Runner Type 결과가 본인답다고 느껴졌는가?
- Runner Card를 저장하거나 공유하고 싶은가?
- 이 결과를 다시 볼 이유가 있는가?
- Profile을 더 입력하라고 할 때 부담스러운가?

---

# 11. H1 MVP 판단

초기 Closed MVP에서는 절대 Gate라기보다 방향성을 본다.

예시 Internal Working Gate:

```text
Test Completion
높을수록 긍정

Runner Card → Profile Complete
핵심 Activation Signal
```

정확한 절대값은 첫 30~50명의 실제 데이터를 보고 보정한다.

---

# 12. H2 — Profile Data Willingness

H2는 Primary Hypothesis보다 **진단용 가설**로 본다.

## 가설

> 사용자는 Recommendation이나 Runner Profile을 더 개인화하기 위해 최소한의 러닝 정보를 입력할 의향이 있다.

---

# 13. H2 확인 항목

- running_experience
- runs_per_week
- weekly_distance_band
- current_shoe

---

# 14. H2 목적

어떤 데이터까지 사용자에게 자연스럽게 요청할 수 있는지 확인한다.

이 결과는 향후:

- Recommendation
- Similar Runner
- Profile
- Community

의 데이터 전략에 영향을 준다.

---

# 15. H3 — Recommendation Value

## 가설

> 사용자는 자신의 Runner Context, Current Shoe, Gear Need가 반영된 3 Direction Recommendation을 일반적인 인기순·브랜드 중심 추천보다 더 유용하게 느낄 것이다.

---

# 16. H3의 핵심

H3는:

> 추천 제품을 좋아했는가?

만 보면 안 된다.

다음을 따로 본다.

```text
Direction 이해
Reason 이해
Current Shoe Compare 가치
Product Interest
Trade-off 이해
```

---

# 17. H3 행동 지표

```text
gear_start
gear_need_select
gear_priority_select
gear_direction_view
recommendation_view
product_view
recommendation_feedback
```

---

# 18. H3 초기 Working Gate

Closed MVP 초기 운영 기준:

```text
Recommendation Result → Product Exploration
목표 예시: 40%+

Helpful
목표 예시: 60%+
```

이 수치는 사업 KPI 확정치가 아니다.

> 초기 30~50 User 이후 보정하는 Internal Gate

다.

---

# 19. H3 정성 검증

사용자에게 다음을 묻는다.

- 왜 이 세 제품이 나왔는지 이해되는가?
- 세 Direction이 서로 다르다고 느껴지는가?
- 1위 하나를 주는 방식과 비교하면 어떤가?
- Current Shoe Compare가 도움이 되는가?
- Recommendation에서 가장 신뢰되는 부분은 무엇인가?
- 가장 이해되지 않는 부분은 무엇인가?

---

# 20. H3 실패 신호

- 세 Direction이 사실상 비슷하게 보임
- Product가 반복적으로 등장
- Current Shoe Compare가 의미 없음
- Reason이 일반적인 마케팅 문장처럼 보임
- 사용자가 “그래서 뭘 사라는 건데?”라고 느낌
- User Context가 실제 Recommendation에 반영됐다는 느낌이 없음

---

# 21. H4 — Retention

## 가설

> 사용자는 Runner Card, Activity, Shoe Mileage, Gear Context 중 하나 이상의 이유로 다시 돌아올 것이다.

---

# 22. H4에서 중요한 것

Return 자체만 보면 부족하다.

반드시:

> **왜 돌아왔는가**

를 확인해야 한다.

---

# 23. 예상 Return Reason

후보:

```text
Activity 기록
Shoe Mileage 확인
Runner Card 확인
Gear Recommendation 재확인
새 Gear Need 발생
```

---

# 24. H4 Event

```text
session_start
return_session
home_view
run_entry_view
run_add
shoe_mileage_update
gear_start
```

---

# 25. Retention 기준

초기 참고:

```text
D7

25% 이상
→ Promising

15~24%
→ Watch

15% 미만
→ Weak
```

단:

> 이 수치를 업계 Benchmark처럼 사용하지 않는다.

첫 Cohort의 내부 판단 기준이다.

---

# 26. H4에서 더 중요한 분석

D7만 보는 대신:

```text
D7 Return User 중
무엇을 했는가?
```

를 본다.

예:

- Run Add
- Mileage
- Gear
- Runner Card

---

# 27. H4 실패 시 해석

## Return 없음

Runner Profile Utility가 약할 가능성.

## Recommendation만 재방문

Gear Utility 중심 가능성.

## Activity만 재방문

Gear Management / Running Profile 가능성.

---

# 28. H5 — Purchase Consideration

## 가설

> Recommendation Candidate 중 적어도 하나는 사용자의 실제 구매 고려군에 들어갈 수 있다.

---

# 29. H5 MVP Signal

P0:

```text
Product View
Purchase Consideration
```

P1:

```text
Product Save
Outbound Click
```

---

# 30. Purchase Consideration 단계

```text
STRONG_CONSIDER
CONSIDER
UNSURE
NO_CONSIDER
```

---

# 31. H5 초기 Working Gate

예:

```text
Product Detail Reach
35%+

Save / Outbound
15%+   [P1]

Explicit Consider / Strong Consider
25%+
```

첫 Cohort 이후 보정.

---

# 32. H5에서 주의할 점

사용자가 Product를 좋아하는 것과 구매 후보에 넣는 것은 다르다.

따라서:

```text
“마음에 드나요?”
```

보다:

```text
“실제로 다음 러닝화 후보로 고려할 수 있나요?”
```

를 묻는다.

---

# 33. H6 — Data Asset Potential

H6는 장기 진단 가설.

## 가설

> Runner Context, Gear Usage, Recommendation, Feedback이 반복적으로 쌓이면 단순 구매이력과 다른 Recommendation Data Asset을 만들 수 있다.

---

# 34. H6는 MVP 성공조건이 아님

MVP에서 Data Moat를 증명할 수는 없다.

확인할 것은:

- 데이터가 실제로 쌓이는가?
- 사용자가 지속 입력하는가?
- Recommendation과 Behavior가 연결되는가?

정도다.

---

# 35. Prototype vs MVP 검증 구분

## Prototype

검증:

```text
이해
첫인상
Flow
Copy
Runner Card 반응
입력 피로
Recommendation UX
```

---

## MVP

검증:

```text
실제 저장
Return
Repeat
Recommendation Behavior
Purchase Consideration
```

---

# 36. Prototype에서 검증하면 안 되는 것

Prototype만 보고:

- Retention 검증
- Purchase Behavior 검증
- Recommendation 정확도 검증
- Data Asset 검증

을 완료했다고 판단하면 안 된다.

---

# 37. Prototype Test 권장 규모

Moderated Test:

```text
8~12명
```

정도.

목적은 통계가 아니라:

> 반복적으로 나타나는 UX 문제 발견

이다.

---

# 38. Closed MVP 1차 규모

초기:

```text
20~30명
```

정성 + 기술 안정화.

---

# 39. MVP 1차 의미 있는 Cohort

그 다음:

```text
Activated User 50~100명
```

정도에서:

- Funnel
- Retention
- Recommendation
- Consideration

을 보기 시작한다.

---

# 40. Activated User 정의

현재:

> **Profile Complete**

를 Activation 기준으로 사용한다.

---

# 41. 왜 Test Complete가 Activation이 아닌가

Test Complete는:

> Curiosity

일 수 있다.

Profile Complete는:

> 사용자가 자신의 Runner Context를 서비스에 남기기 시작했다는 행동

이므로 더 강한 Signal이다.

---

# 42. 마케팅 테스트

소규모 Instagram 유입 테스트를 할 수 있다.

목적:

- Card Hook
- Landing 이해
- CTA
- 유입 후 Completion

---

# 43. 마케팅에서 봐야 할 것

- Impression
- Click
- Landing → Test
- Test Complete
- Card
- Profile

---

# 44. 외부 유입에서 주의

광고 CTR이 높아도:

```text
Runner Card까지 안 감
```

이면 Acquisition Hook이 약할 수 있다.

---

# 45. Interview의 역할

Interview는:

> 가설을 증명하는 수단

이 아니라:

> 행동 데이터의 이유를 이해하는 수단

이다.

---

# 46. 정량 + 정성 결합

예:

```text
D7 낮음
```

→ Interview:

> 왜 다시 안 왔는가?

---

# 47. Recommendation Feedback 설계

Recommended:

```text
HELPFUL
UNSURE
NOT_FIT
```

---

# 48. Positive Reason

```text
DIRECTION_HELPFUL
CURRENT_SHOE_COMPARE_HELPFUL
PRODUCT_DISCOVERY_HELPFUL
CRITERIA_HELPFUL
```

---

# 49. Negative Reason

```text
NOT_MY_RUNNING
PRODUCT_NOT_INTERESTING
REASON_NOT_CONVINCING
INSUFFICIENT_INFO
OTHER
```

---

# 50. Current Shoe Compare 별도 확인

H3에서 반드시 분리해서 본다.

질문:

> Recommendation 전체가 좋았나요?

만 하면:

Current Shoe 기능의 가치가 분리되지 않는다.

---

# 51. Recommendation QA와 User Validation 분리

## QA

> Logic이 의도대로 동작하는가?

## User Validation

> 사용자가 결과를 가치 있게 느끼는가?

둘은 다르다.

---

# 52. Product DB Validation

MVP Release 전 Recommendation 품질의 전제.

현재:

```text
35 Product
10 Verified / Recalibrated
25 Draft
```

---

# 53. Release 전 Product Coverage 목표

권장:

```text
24~28 VERIFIED
```

Role:

```text
DAILY           5+
CUSHION_LONG    4+
STABILITY       3+
SPEED_TRAINING  4+
SUPER_TRAINER   4+
RACE            4+
```

---

# 54. Product Coverage가 부족하면 발생하는 Bias

- 같은 제품 반복
- 특정 브랜드 반복
- 특정 Direction 빈약
- Recommendation Rule을 잘못 평가

---

# 55. Recommendation Logic Version

현재:

```text
gear_reco_v1.1
```

Weight나 Rule이 바뀌면 Version을 남긴다.

---

# 56. Product DB Version

현재:

```text
product_db_v1.5
```

Recommendation Snapshot에 저장.

---

# 57. Experiment Versioning

최소:

```text
runner_test_version
recommendation_rule_version
product_db_version
copy_version
```

을 남길 수 있어야 한다.

---

# 58. First Cohort에서 자주 바꾸지 않을 것

- 5 Questions
- 6 Runner Types
- Runner Card 시점
- Profile Complete Activation
- 3 Direction 구조
- Feedback 구조

---

# 59. 수정 가능한 것

- Copy
- Weight
- Penalty
- Direction Weight
- Product Score
- Product Coverage
- Follow-up 질문

단 Version 기록.

---

# 60. Initial Gate

MVP 개발 전 Prototype에서 반드시 봐야 할 것:

- Landing 이해
- Test 부담
- Result 이해
- Card 가치
- Profile 입력 거부감
- Gear Flow 이해

---

# 61. MVP Release Gate

기술적으로:

- New User E2E
- Returning User E2E
- Activity E2E
- Recommendation E2E
- Analytics
- Product Coverage

가 필요하다.

---

# 62. H1 Decision Rule 예시

## Strong

- Test Completion 높음
- Profile Complete 자연스러움
- Card에 대한 자발적 소유/공유 반응

## Weak

- Result는 보지만 Profile로 안 감
- Card를 Screenshot 결과 정도로만 봄
- 다시 볼 이유 없음

---

# 63. H3 Decision Rule 예시

## Strong

- Recommendation Result → Product View 높음
- Helpful 높음
- Current Shoe Compare 언급
- 사용자가 Direction 차이를 스스로 설명 가능

## Weak

- “다 비슷하다”
- Product만 보고 Direction 무시
- Why This가 Generic
- Current Shoe 비교가 신뢰를 높이지 않음

---

# 64. H4 Decision Rule 예시

## Strong

- 자발적 Return
- Repeat Run
- Mileage / Gear / Card 등 명확한 Return Reason

## Weak

- Reminder 없으면 안 돌아옴
- 첫 체험으로 끝남

---

# 65. H5 Decision Rule 예시

## Strong

- Consider / Strong Consider 발생
- 제품 상세 탐색
- P1에서 Save / Outbound 행동

## Weak

- “재미있지만 살 생각은 없음”
- 추천 제품이 구매 후보로 연결되지 않음

---

# 66. 결과 조합별 전략

## H1 Strong / H4 Weak

Identity Hook은 있지만 Utility 약함.

---

## H1/H4 Strong / H3 Weak

Runner Profile Product 가능성.

Recommendation 재설계 검토.

---

## H3/H5 Strong / H4 Weak

구매 Trigger형 Gear Tool 가능성.

---

## H1/H4/H3 Strong

Core Loop 가능성 높음.

---

# 67. Community 관련 검증

Community는 MVP 기능으로 넣지 않는다.

대신 Interview에서:

- 다른 Runner Card 궁금한가?
- 비슷한 Runner Gear가 궁금한가?
- 다른 Runner Activity가 궁금한가?
- 함께 뛰고 싶은가?

등을 탐색 가능.

---

# 68. Community를 바로 만들지 않는 이유

설문에서:

> “있으면 쓸 것 같다.”

는 약한 Signal이다.

더 강한 Signal:

- 다른 Runner 정보를 실제로 요청
- Similar Runner를 클릭
- Share / Profile View 수요
- Repeat visit

---

# 69. AI Gear Coach 검증

P1.

Structured Recommendation 자체의 H3를 먼저 본다.

그 다음:

```text
AI 있음
vs
AI 없음
```

에서 설명 만족도 차이를 볼 수 있다.

---

# 70. AI Trust 질문

- AI라서 더 신뢰되는가?
- 근거가 보여서 신뢰되는가?
- AI 문장이 없어도 이해되는가?

---

# 71. Price 검증

현재 Price는 Recommendation Score에 넣지 않는다.

향후 확인:

- 가격이 Product 선택에 얼마나 중요한가?
- 가격 Filter가 필요한가?

---

# 72. Similar Runner 검증

아직 실제 유사 러너 통계를 노출하지 않는다.

먼저:

> 사용자가 그런 정보 자체를 원하는가?

를 확인.

---

# 73. 데이터 수집 최소화

검증에 필요하지 않은 정보는 받지 않는다.

특히:

- Injury
- Medical
- 민감한 신체 정보

등을 초기 Recommendation에 과도하게 사용하지 않는다.

---

# 74. 데이터 품질

Unknown을 허용한다.

사용자가 모르는 값을:

> 모델이 추정

하지 않는다.

---

# 75. Metric Dashboard 최소 구성

## Acquisition / Identity

- Landing
- Test Start
- Test Complete
- Card
- Profile Complete

## Retention

- D1
- D7
- Return Session
- Run Add
- Repeat Run

## Recommendation

- Gear Start
- Recommendation
- Product View
- Helpful

## Purchase

- Consider
- Strong Consider
- Save P1
- Outbound P1

---

# 76. 가장 중요한 분석 단위

단순 Page View보다:

> **User Journey**

를 본다.

---

# 77. Session과 User 구분

가입 전:

```text
anonymous_session_id
```

가입 후:

```text
user_id
```

를 연결.

---

# 78. Test User 분리

내부 QA / 개발자 / 지인은:

```text
is_test_user
```

등으로 분리 가능해야 한다.

운영 지표에 섞이지 않도록 한다.

---

# 79. 정성 인터뷰 Sampling

가능하면:

- H1 강한 사용자
- H1 약한 사용자
- Return User
- Non-return User
- Recommendation Helpful
- Recommendation Not Fit

을 나눠 인터뷰.

---

# 80. Survey만으로 결론 내리지 않기

예:

> “Runner Card 갖고 싶나요?”

보다:

> 실제 Card 생성 완료율

이 더 중요.

---

# 81. 구매의향도 과신하지 않기

Survey:

> “살 의향 있다.”

는 실제 구매보다 약한 Signal.

P1 Outbound가 더 강한 Signal.

---

# 82. MVP First Cohort 운영

초기에는 작은 Cohort에서:

- Bug
- Logic Error
- Data Error

를 먼저 잡는다.

바로 대규모 유입시키지 않는다.

---

# 83. Recommendation Error가 특히 위험한 이유

초기 사용자에게:

> 이상한 신발 추천

이 나오면 H3 자체를 잘못 평가하게 된다.

그래서 Product DB와 QA가 Release Blocker다.

---

# 84. Recommendation QA 8 Context

```text
Comfort
Speed
Distance
Race
Unsure
Unknown Current Shoe
Fast/Race Shoe → Comfort
Low Data
```

---

# 85. Success의 정의

MVP의 Success는:

> 모든 KPI가 높음

이 아니다.

가장 중요한 것은:

> 어떤 Product Direction이 살아있는지 판단 가능함

이다.

---

# 86. Failure도 의미가 있다

예:

```text
Runner Card Strong
Recommendation Weak
```

이면:

> Identity Product로 수정

할 근거가 생긴다.

---

# 87. Stop / Pivot Signal

다음이 반복되면 큰 방향 수정 검토.

- Runner Card 반응 약함
- Profile 입력 강한 이탈
- Return 거의 없음
- Recommendation 일반 검색과 차이 없음
- 구매 후보 행동 없음

---

# 88. Continue Signal

- Card에서 Profile까지 자연스럽게 이동
- 자발적 Return
- Current Shoe Compare 언급
- Product Consider
- 사용자 스스로 Direction 차이를 이해

---

# 89. MVP 이후 Test

MVP 데이터 기반으로만 다음을 판단한다.

- Auto Sync
- Multi-shoe
- Similar Runner
- Community
- Commerce
- AI Gear Coach 확대

---

# 90. 최종 검증 원칙

```text
Prototype에서
“좋아한다”를 듣고

MVP에서
“사용한다”를 보고

이후
“돌아온다 / 구매한다”를 확인한다.
```

---

# 91. Final Validation Statement

> **GearMatch AI의 첫 MVP에서 가장 중요한 것은 제품을 완성하는 것이 아니라, Runner Identity가 실제 Profile 생성으로 이어지고, Runner Context가 재방문과 Gear Recommendation 행동으로 이어지며, Recommendation이 실제 구매 고려까지 영향을 주는지를 행동 데이터로 판단하는 것이다.**
