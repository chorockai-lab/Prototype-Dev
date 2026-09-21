# 09_GearMatch_AI_MVP_개발_Backlog_및_Acceptance_Criteria_v1.0

> **문서 목적**  
> 본 문서는 GearMatch AI MVP 개발을 실제 실행 단위로 분해한 Backlog와 Acceptance Criteria를 정의한다.  
> 개발자와 기획자가 각 기능의 **시작 조건, 구현 범위, 완료 조건, 테스트 방법, 선후관계**를 동일하게 이해하는 것이 목적이다.
>
> 본 문서는 기능 목록이 아니라 **MVP 검증을 가능하게 만드는 실행 계획**이다.  
> 화면이 존재하거나 버튼이 동작하는 것만으로는 완료로 보지 않는다.  
> P0 기능은 원칙적으로 **UI → Server Validation → DB Persistence → Event → Error Handling → Test**까지 연결되어야 완료다.

- 문서 버전: v1.0
- 기준 시점: 2026-09-04
- 서비스 정식 명칭: **GearMatch AI**
- 기준 Prototype:
  - `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` (정본)
  - 이전 기준: `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html` (v1.6 -> v1.7로 승계)
- 기준 Product DB:
  - `10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx`
- Product DB Version:
  - `product_db_v1.5`
- Recommendation Rule Version:
  - `gear_reco_v1.1`
- Product Normalization Version:
  - `product_norm_v1.1`
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1`
  - `05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0`
  - `06_GearMatch_AI_데이터_기획서_v1.0`
  - `07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서_v1.0`
  - `08_GearMatch_AI_MVP_개발_명세서_v1.0`
  - `10_GearMatch_AI_러닝화_DB_및_Recommendation_Rulebook_v1.0`

---

# 1. Backlog 운영 원칙

## 1.1 MVP의 개발 목적

개발 목적은 Prototype을 더 화려하게 만드는 것이 아니다.

다음 Loop를 실제 데이터로 검증 가능하게 만드는 것이 목적이다.

```text
Runner Test
→ Runner Card
→ Profile
→ Current Shoe
→ Activity
→ Shoe Mileage
→ Return
→ Gear Need
→ 3 Gear Directions
→ Product Candidate
→ Recommendation Reason
→ Feedback
→ Purchase Consideration
```

---

# 2. Core Hypothesis와 개발 연결

| Hypothesis | 검증 질문 | 핵심 개발 영역 |
|---|---|---|
| H1 Runner Identity | 사용자가 Test를 끝내고 Card를 원하는가? | Landing / Test / Runner Card / Profile |
| H3 Recommendation Value | 개인화 추천 이유가 도움이 되는가? | Recommendation / Product / Feedback |
| H4 Retention | 사용자가 다시 돌아와 기록하는가? | Login / Persistence / Activity / Mileage |
| H5 Purchase Consideration | 추천이 실제 구매 후보에 들어가는가? | Product View / Intent / Outbound P1 |

---

# 3. Priority 정의

## P0 — MVP Release Blocker

없으면 핵심 가설을 검증할 수 없는 기능.

> 구현되지 않으면 Closed MVP를 출시하지 않는다.

## P1 — Strongly Recommended

P0 검증을 강화하거나 실제 구매 행동을 더 잘 측정하는 기능.

P0 안정화 후 추가 가능.

## P2 — Post-MVP

MVP 결과가 나온 뒤 검토.

---

# 4. Effort 표기

본 문서에서는 상세 MM 대신 상대 난이도를 사용한다.

```text
XS  몇 시간 수준
S   작은 기능
M   중간 기능
L   복수 Layer 연동
XL  핵심 시스템 / 복수 Story
```

실제 일정은 담당 개발자가 Repository와 기술 Stack을 확인한 뒤 산정한다.

---

# 5. Epic Overview

| Epic | 이름 | Priority | 핵심 목적 |
|---|---|---:|---|
| E00 | Scope Lock & Foundation | P0 | 개발 기준·환경 고정 |
| E01 | Prototype Migration | P0 | 기존 UX를 실제 앱 구조로 이전 |
| E02 | User & Authentication | P0 | Returning User 데이터 연속성 |
| E03 | Runner Test & Identity | P0 | H1 |
| E04 | Runner Profile & Current Shoe | P0 | Recommendation Context 확보 |
| E05 | Activity & Shoe Mileage | P0 | H4 |
| E06 | Product DB Foundation | P0 | Recommendation 근거 데이터 |
| E07 | Recommendation Engine | P0 | H3 |
| E08 | Recommendation Experience | P0 | Choice Support UX |
| E09 | Feedback & Purchase Intent | P0 | H3/H5 |
| E10 | Analytics & Experiment Data | P0 | 가설 측정 |
| E11 | QA / Staging / Release | P0 | 실제 테스트 가능 상태 |
| E12 | Card Save / Share | P1 | H1 강화 |
| E13 | Product Save / Outbound | P1 | H5 강화 |
| E14 | AI Gear Coach Lite | P1 | Recommendation 설명 강화 |

---

# 6. Epic E00 — Scope Lock & Foundation

---

## GM-001 — MVP Scope Lock

**Priority:** P0  
**Effort:** XS  
**Owner:** PM  
**Dependency:** 없음

### User Story

> 개발팀은 하나의 확정된 MVP Scope를 기준으로 개발할 수 있어야 한다.

### Task

- [ ] 00~10 문서 Repository `/docs`에 배치
- [ ] 기준 Prototype 파일 배치
- [ ] P0/P1/P2 Scope 명시
- [ ] `product_db_v1.5`
- [ ] `gear_reco_v1.1`
- [ ] Runner Type Logic Version 명시
- [ ] Scope 변경 책임자 정의

### Acceptance Criteria

- [ ] 개발자가 P0 기능 목록을 하나의 문서에서 확인할 수 있다.
- [ ] Prototype과 문서가 충돌할 때 우선순위가 정의되어 있다.
- [ ] Community / Avatar / Auto Sync가 P0에 포함되지 않는다.
- [ ] AI Gear Coach가 P1임이 명확하다.

### Test

기획자와 개발자가 독립적으로 P0 기능을 적었을 때 차이가 없어야 한다.

---

## GM-002 — Repository & Development Environment

**Priority:** P0  
**Effort:** M

### Task

- [ ] Git Repository 생성
- [ ] Next.js / React / TypeScript 설정
- [ ] Environment Variable 분리
- [ ] `.env.example`
- [ ] Lint
- [ ] Build Script
- [ ] Development README

### Acceptance Criteria

- [ ] 신규 개발자가 README만 보고 Local 실행 가능
- [ ] `npm run build` 또는 동일 Build 정상
- [ ] Secret이 Git에 포함되지 않음
- [ ] `main` Branch가 Build 가능한 상태

---

## GM-003 — Database Foundation

**Priority:** P0  
**Effort:** L

### Task

다음 Table Migration 작성:

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

### Acceptance Criteria

- [ ] 모든 Table Migration으로 생성 가능
- [ ] PK / FK 존재
- [ ] `users.nickname_normalized` Unique
- [ ] `runner_profiles.user_id` Unique
- [ ] UserGear는 향후 복수 Row 가능
- [ ] MVP Business Logic상 Active Current Shoe 1개
- [ ] Recommendation과 Item 추적 가능
- [ ] Migration Roll-forward 재현 가능

### Test

빈 DB → Migration → Seed까지 한 번에 재현.

---

## GM-004 — Local / Staging / Production 분리

**Priority:** P0  
**Effort:** S

### Acceptance Criteria

- [ ] Staging URL 존재
- [ ] Staging DB와 Production DB 분리
- [ ] Analytics도 환경 구분
- [ ] Test Account가 Production 분석에 섞이지 않음

---

# 7. Epic E01 — Prototype Migration

---

## GM-010 — Prototype React Migration

**Priority:** P0  
**Effort:** XL

### User Story

> 사용자는 현재 확정된 Prototype의 시각 경험을 MVP에서도 동일하게 경험한다.

### Task

Prototype의 주요 Screen을 Component화:

```text
Landing
Returning Login
Runner Questions
Type Reveal
Runner Card Lite
Profile
Current Shoe
Runner Card Complete
Run Entry
Gear Need
Gear Priority
Follow-up
Recommendation
Product Detail
Feedback
```

### Acceptance Criteria

- [ ] 주요 UI Hierarchy가 Prototype과 실질적으로 동일
- [ ] Runner Card 6종 Visual Asset 유지
- [ ] CTA 위치가 임의 변경되지 않음
- [ ] Question Copy 변경 없음
- [ ] 6 Runner Type 변경 없음
- [ ] 모바일에서 화면 깨짐 없음
- [ ] Desktop에서도 정상
- [ ] Mock 데이터로 전체 Flow 진행 가능

### 제외

- 새로운 UI Concept
- Bottom Navigation 확대
- Community Tab
- Avatar
- 디자인 시스템 전면 재작성

---

## GM-011 — Loading / Error / Empty State

**Priority:** P0  
**Effort:** M

### Acceptance Criteria

다음에 Loading State가 존재:

- [ ] Login
- [ ] Profile Save
- [ ] Current Shoe Search
- [ ] Run Save
- [ ] Recommendation
- [ ] Feedback

다음 Empty State 존재:

- [ ] Current Shoe 없음
- [ ] Activity 없음
- [ ] Recommendation Candidate 없음

---

# 8. Epic E02 — User & Authentication

---

## GM-020 — New User Account Creation

**Priority:** P0  
**Effort:** M

### User Story

> Runner Card를 만든 신규 사용자는 최소한의 계정을 만들어 다음 방문에도 데이터를 유지할 수 있다.

### Input

```text
nickname
4-digit PIN
market
language
```

### Acceptance Criteria

- [ ] Internal UUID 생성
- [ ] Nickname Trim / Normalize
- [ ] Nickname 중복 방지
- [ ] PIN 형식 4자리 검증
- [ ] PIN 평문 저장 안 함
- [ ] User 생성 성공 후 Session 연결
- [ ] 최초 Runner Context와 동일 user_id 연결

### Negative Test

- [ ] 중복 Nickname
- [ ] 3자리 PIN
- [ ] 문자 PIN
- [ ] 빈 Nickname

---

## GM-021 — PIN Hash & Security

**Priority:** P0  
**Effort:** S

### Acceptance Criteria

- [ ] Argon2 / bcrypt 등 검증된 Hash 사용
- [ ] DB에서 PIN 원문 확인 불가
- [ ] Log에 PIN 미출력
- [ ] API Response에 pin_hash 미포함

---

## GM-022 — Returning Login

**Priority:** P0  
**Effort:** M

### User Story

> 기존 사용자는 Nickname + PIN으로 이전 Runner Data를 불러온다.

### Acceptance Criteria

- [ ] 올바른 입력 → Login 성공
- [ ] 잘못된 PIN → Login 실패
- [ ] 없는 Nickname → Login 실패
- [ ] 성공 시 기존 user_id 사용
- [ ] Runner Identity 복원
- [ ] Profile 복원
- [ ] Current Shoe 복원
- [ ] Activity 복원
- [ ] Shoe Mileage 복원
- [ ] 새 계정이 생성되지 않음

---

## GM-023 — Login Rate Limit

**Priority:** P0  
**Effort:** S

### Acceptance Criteria

- [ ] 반복 실패 시 일시 제한
- [ ] 제한 Event 또는 Server Log 기록
- [ ] 사용자에게 내부 보안정보 비노출

---

## GM-024 — Session

**Priority:** P0  
**Effort:** M

### Acceptance Criteria

Cookie:

```text
HttpOnly
Secure in Production
SameSite=Lax
```

- [ ] Refresh 후 Login 유지
- [ ] Logout 가능
- [ ] Session 만료 후 다시 Login
- [ ] 다른 User Resource 접근 차단

---

# 9. Epic E03 — Runner Test & Identity

---

## GM-030 — 5-question Runner Test

**Priority:** P0  
**Hypothesis:** H1  
**Effort:** M

### Acceptance Criteria

- [ ] 정확히 5개 핵심 질문
- [ ] Question Version 관리
- [ ] Progress 표시
- [ ] 각 질문 한 번 응답
- [ ] 이전 질문 이동 가능
- [ ] 최종 응답 전 결과 생성 안 됨
- [ ] 답변 Event 저장

---

## GM-031 — Runner Type Engine

**Priority:** P0  
**Effort:** M

### Acceptance Criteria

Input:

```text
5 answers
```

Output:

```text
ROUTINE_RUNNER
EXPLORE_RUNNER
DISTANCE_RUNNER
PACE_RUNNER
RACE_RUNNER
ALL_AROUND_RUNNER
```

- [ ] 동일 Input → 동일 Output
- [ ] Type Score 저장
- [ ] Logic Version 저장
- [ ] Logic가 UI Component에 흩어져 있지 않음
- [ ] Unit Test 존재

---

## GM-032 — Runner Type Reveal

**Priority:** P0  
**Effort:** S

### Acceptance Criteria

- [ ] Type 계산 성공 후에만 Reveal
- [ ] 사용자 Type과 Visual Asset 일치
- [ ] `runner_type_reveal` Event
- [ ] Reload 시 결과 유실되지 않음

---

## GM-033 — Runner Card Lite

**Priority:** P0  
**Hypothesis:** H1  
**Effort:** M

### Acceptance Criteria

표시:

- [ ] Runner Type
- [ ] Main Copy
- [ ] Style / Motivation / Direction
- [ ] Card Visual

Profile 전:

- [ ] Weekly Distance Pending 가능
- [ ] Current Gear Pending 가능

CTA:

- [ ] Profile Complete로 연결

Event:

```text
runner_card_view
profile_start
```

---

# 10. Epic E04 — Runner Profile & Current Shoe

---

## GM-040 — Runner Profile

**Priority:** P0  
**Effort:** M

### Input

```text
running_experience
runs_per_week
weekly_distance_band
```

### Acceptance Criteria

- [ ] Controlled Enum만 저장
- [ ] `UNKNOWN` 허용 항목 처리
- [ ] Save 후 DB 저장
- [ ] Refresh 후 유지
- [ ] Returning Login 후 유지
- [ ] `profile_complete` Event
- [ ] Profile Complete가 Activated User 기준으로 사용 가능

---

## GM-041 — Gear Product Search

**Priority:** P0  
**Effort:** M  
**Dependency:** Product Master Import

### Acceptance Criteria

- [ ] Brand / Model 검색 가능
- [ ] KR Product 기준
- [ ] Product ID 선택
- [ ] 사용자 자유 텍스트만으로 Product Master 대체하지 않음
- [ ] 검색 결과가 1 Product = 1 Model/Version

---

## GM-042 — Current Shoe Registration

**Priority:** P0  
**Effort:** M

### 상태

```text
ACTIVE
UNKNOWN_MODEL
NO_RUNNING_SHOE
```

### Acceptance Criteria

- [ ] Product Master 선택 가능
- [ ] 모름 선택 가능
- [ ] 러닝화 없음 선택 가능
- [ ] ACTIVE는 사용자당 1개
- [ ] 기존 Active 교체 시 상태 정합성 유지
- [ ] Current Shoe가 Home에 표시됨
- [ ] Recommendation에서 재사용

---

# 11. Epic E05 — Activity & Shoe Mileage

---

## GM-050 — Add Run

**Priority:** P0  
**Hypothesis:** H4  
**Effort:** L

### User Story

> 사용자는 러닝 거리를 간단히 입력하고 자신의 활동과 신발 사용거리가 즉시 업데이트되는 것을 확인한다.

### MVP Input

```text
distance_km
activity_date
current_gear
```

### Acceptance Criteria

- [ ] Distance > 0
- [ ] Activity Row 생성
- [ ] 중복 Submit 방지
- [ ] 저장 성공 후 UI 반영
- [ ] Refresh 후 유지
- [ ] `run_add` Event
- [ ] Current Shoe가 없으면 Activity는 저장되지만 Mileage는 증가하지 않음

---

## GM-051 — Activity Aggregation

**Priority:** P0  
**Effort:** M

### 계산

```text
weekly_km
weekly_runs
total_km
last_run_km
last_run_date
```

### Acceptance Criteria

5km 추가 시:

- [ ] Weekly KM +5
- [ ] Weekly Runs +1
- [ ] Total KM +5
- [ ] Last Run 5km
- [ ] 날짜 기준 정확

주 시작:

```text
Monday
```

---

## GM-052 — Shoe Mileage

**Priority:** P0  
**Hypothesis:** H4  
**Effort:** M

### Acceptance Criteria

Current Shoe 사용 Run 저장:

```text
shoe_mileage += run_distance
run_count += 1
```

- [ ] Activity와 GearUsage Transaction
- [ ] 둘 중 하나만 저장되는 상태 없음
- [ ] 새로고침 후 유지
- [ ] Returning Login 후 유지
- [ ] `shoe_mileage_update` Event

---

## GM-053 — Runner Home / Card Complete

**Priority:** P0  
**Effort:** M

### 표시

- [ ] Runner Type
- [ ] Weekly KM
- [ ] Runs
- [ ] Last Run
- [ ] Total KM
- [ ] Current Shoe
- [ ] Shoe Mileage

### CTA

- [ ] + RUN
- [ ] EXPLORE GEAR

---

# 12. Epic E06 — Product DB Foundation

> **중요:** 본 Epic은 개발 기능과 데이터 작업이 함께 존재한다.

---

## GM-060 — Product DB Import Pipeline

**Priority:** P0  
**Effort:** M

### 기준

```text
10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx
```

### Acceptance Criteria

- [ ] `product_id` 유지
- [ ] 가격은 숫자형 KRW
- [ ] 명시적 가격 범위는 최대값 정책 반영
- [ ] Product Master Import
- [ ] Duplicate 방지
- [ ] Required Field Validation
- [ ] Version 저장

---

## GM-061 — Recommendation Attribute Import

**Priority:** P0  
**Effort:** M

### P0 Attributes

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

### Acceptance Criteria

- [ ] 0~100
- [ ] 5점 단위 Calibration 허용
- [ ] Null Score Product는 Recommendation Eligible 불가
- [ ] Score Status 저장
- [ ] Evidence 추적 가능

---

## GM-062 — Product Verification Expansion

**Priority:** P0 — Release Data Blocker  
**Effort:** XL  
**Owner:** PM/Data + Reviewer

### 현재 기준

```text
35 normalized products
10 recalibrated / verified
25 draft
```

### Closed MVP 최소 목표

권장 Role Coverage:

| Primary Role | 최소 VERIFIED |
|---|---:|
| DAILY | 5 |
| CUSHION_LONG | 4 |
| STABILITY | 3 |
| SPEED_TRAINING | 4 |
| SUPER_TRAINER | 4 |
| RACE | 4 |

전체 목표:

```text
약 24~28개 이상 VERIFIED
```

### Acceptance Criteria

각 Eligible Product:

- [ ] Official Product Source
- [ ] Primary Use
- [ ] Secondary Use
- [ ] Specialization
- [ ] Plate Fact
- [ ] 8 P0 Score
- [ ] 최소 2개 Review/Evidence 기반 검토 권장
- [ ] Conflict 여부
- [ ] Score Reviewer
- [ ] `VERIFIED`
- [ ] Recommendation Eligible

---

## GM-063 — Review Conflict Handling

**Priority:** P0  
**Effort:** S

### 현재 Conflict 예

- Wave Rider 29 — Stability
- Wave Sky 9 — Comfort / Long Run
- MagMax NITRO 2 — Responsiveness
- Cloudflow 5 — Responsiveness / Performance

### Acceptance Criteria

- [ ] Conflict Product를 무리하게 VERIFIED 처리하지 않음
- [ ] Conflict Attribute 표시
- [ ] Score 미확정 시 Recommendation 제외 가능
- [ ] 한 리뷰만으로 자동 결론 내리지 않음

---

# 13. Epic E07 — Recommendation Engine

---

## GM-070 — Recommendation Context Loader

**Priority:** P0  
**Hypothesis:** H3  
**Effort:** M

### Context

```text
Runner Type
Running Experience
Runs / Week
Weekly Distance
Actual Activity Summary
Current Shoe
Gear Need
Priority
```

### Acceptance Criteria

- [ ] Server에서 User Context 로드
- [ ] Frontend가 Profile Snapshot을 임의 조작해 보내지 않음
- [ ] Missing Context 식별
- [ ] Recommendation Snapshot 저장 가능

---

## GM-071 — Gear Need / Priority

**Priority:** P0  
**Effort:** S

### Gear Need

```text
COMFORT
SPEED
DISTANCE
RACE
UNSURE
```

### Priority

```text
COMFORT
STABILITY
RESPONSIVENESS
VERSATILITY
PERFORMANCE
```

### Acceptance Criteria

- [ ] Controlled Enum
- [ ] Event 기록
- [ ] 기존 Context를 다시 묻지 않음

---

## GM-072 — Need Match v1.1

**Priority:** P0  
**Effort:** M

### Config

#### COMFORT

```text
Comfort 40
Daily 25
Long Run 15
Stability 10
Versatility 10
```

#### SPEED

```text
Speed 45
Responsiveness 25
Versatility 20
Daily 10
```

#### DISTANCE

```text
Long Run 40
Comfort 25
Daily 15
Stability 10
Versatility 10
```

#### RACE

```text
Race 60
Speed 20
Responsiveness 15
Stability 5
```

#### UNSURE

```text
Versatility 30
Daily 25
Comfort 15
Long Run 10
Responsiveness 10
Stability 10
```

### Acceptance Criteria

- [ ] Weight 합 = 100%
- [ ] Config File로 분리
- [ ] Unit Test
- [ ] Rule Version = `gear_reco_v1.1`

---

## GM-073 — Base Suitability Score v1.1

**Priority:** P0  
**Effort:** L

### Formula

```text
Need Match                30%
Priority Match            25%
Usage / Distance Fit      15%
Current Shoe Transition   20%
Profile Fit               10%
-
Penalty
```

### Acceptance Criteria

- [ ] Component Score Debug 가능
- [ ] 0~100 Clamp
- [ ] Frontend에서 Weight 계산 안 함
- [ ] Recommendation에 Version 저장

---

## GM-074 — Current Shoe Transition

**Priority:** P0  
**Effort:** L

### Principle

> 현재 신발보다 “더 높은 점수”를 찾는 것이 아니라  
> **사용자가 원하는 방향으로 의미 있게 이동하는지** 평가한다.

### Acceptance Criteria

Need별 비교 Axis 존재.

예:

```text
SPEED:
speed
responsiveness

COMFORT:
comfort
daily

DISTANCE:
long_run
comfort

RACE:
race
speed
responsiveness
```

- [ ] Candidate와 Current Shoe 비교
- [ ] 목표 방향의 변화 계산
- [ ] Current Shoe Unknown이면 임의 50점 금지
- [ ] Unknown이면 나머지 80% Weight 재정규화
- [ ] `NO_MEANINGFUL_TRANSITION` 적용 가능

---

## GM-075 — Direction Candidate Role Filter

**Priority:** P0 — Critical  
**Effort:** M

### Rule

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

### Acceptance Criteria

- [ ] `STABILITY_SUPPORT`에 Neutral Daily Shoe가 Score만으로 침투하지 않음
- [ ] Race 제품이 Comfort/Balance Direction에 기본 노출되지 않음
- [ ] Role Filter가 Score 계산 전에 적용됨
- [ ] `DIRECTION_ROLE_MISMATCH` = Hard Exclude

---

## GM-076 — Penalty v1.1

**Priority:** P0  
**Effort:** M

### Rules

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

### Acceptance Criteria

- [ ] Penalty 적용 이유 Debug 가능
- [ ] 초보라는 이유 자체로 Race Shoe Hard Exclude하지 않음
- [ ] 의료·부상 판단 Rule 없음

---

## GM-077 — Direction Selection

**Priority:** P0  
**Effort:** L

### Direction Codes

```text
DAILY_COMFORT
BALANCED_ALLROUND
STABILITY_SUPPORT
LONG_DISTANCE
SPEED_TRAINING
PERFORMANCE_STEPUP
RACE_FOCUS
```

### Acceptance Criteria

- [ ] 사용자당 3개 Direction
- [ ] 동일한 의미의 Direction 세 개가 나오지 않음
- [ ] Product Top 3 = Direction 3개로 대체하지 않음
- [ ] Direction마다 Candidate 별도 계산

---

## GM-078 — UNSURE Dynamic Direction

**Priority:** P0  
**Effort:** M

### Rule

기본:

```text
BALANCED_ALLROUND
DAILY_COMFORT
```

3번째:

> Current Shoe와 가장 다른 의미 있는 비-RACE Direction.

Current Shoe 없음:

> 필요 시 Follow-up 후 결정.

### Acceptance Criteria

- [ ] `UNSURE → Performance` 고정 아님
- [ ] Race Focus 자동 등장 안 함
- [ ] Unknown Context를 AI가 추정하지 않음

---

## GM-079 — Candidate Diversity

**Priority:** P0  
**Effort:** M

### Acceptance Criteria

- [ ] 동일 Product 중복 없음
- [ ] 동일 Series 중복 최소화
- [ ] 가능한 경우 3개 모두 동일 Brand 방지
- [ ] Brand 다양성을 위해 낮은 적합 제품을 억지로 넣지 않음
- [ ] 세 Product의 Trade-off 차이가 설명 가능

---

# 14. Epic E08 — Recommendation Experience

---

## GM-080 — 3 Gear Direction Result

**Priority:** P0  
**Hypothesis:** H3  
**Effort:** L

### 각 Direction 표시

- [ ] Direction Name
- [ ] Short Summary
- [ ] Primary Product
- [ ] Product Image
- [ ] Product Name
- [ ] Short Why

### 금지

- [ ] `1위`
- [ ] `BEST`
- [ ] `97% FIT`
- [ ] `Perfect Match`

---

## GM-081 — Product Detail

**Priority:** P0  
**Effort:** M

### 표시

```text
WHY THIS
VS YOUR SHOE
BEST FOR
KEEP IN MIND
```

### Acceptance Criteria

- [ ] 모든 Product에 WHY THIS
- [ ] 모든 Product에 BEST FOR
- [ ] 모든 Product에 KEEP IN MIND
- [ ] Current Shoe 검증 가능 시 VS YOUR SHOE
- [ ] Current Shoe Unknown이면 비교 생략
- [ ] Reason에 사용하지 않은 사용자 정보 임의 포함 금지

---

## GM-082 — Current Shoe Comparison

**Priority:** P0  
**Effort:** M

### Axis

```text
Comfort
Platform Stability
Responsiveness
Long Run
Speed
Versatility
```

### User-facing Delta v1.1

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

### Acceptance Criteria

- [ ] `+5`만으로 실제 차이라고 표현하지 않음
- [ ] 높은 점수 = 무조건 좋음으로 표현하지 않음
- [ ] Trade-off 문장 생성 가능

---

# 15. Epic E09 — Feedback & Purchase Intent

---

## GM-090 — Recommendation Helpful Feedback

**Priority:** P0  
**Hypothesis:** H3  
**Effort:** S

### Question

> 이 추천이 도움이 되었나요?

```text
HELPFUL
UNSURE
NOT_FIT
```

### Acceptance Criteria

- [ ] Recommendation ID 연결
- [ ] User ID 연결
- [ ] Event 기록
- [ ] Skip 가능
- [ ] 중복 제출 처리

---

## GM-091 — Feedback Reason

**Priority:** P0  
**Effort:** S

### Positive

```text
DIRECTION_HELPFUL
CURRENT_SHOE_COMPARE_HELPFUL
PRODUCT_DISCOVERY_HELPFUL
CRITERIA_HELPFUL
```

### Negative

```text
NOT_MY_RUNNING
PRODUCT_NOT_INTERESTING
REASON_NOT_CONVINCING
INSUFFICIENT_INFO
OTHER
```

---

## GM-092 — Purchase Consideration

**Priority:** P0  
**Hypothesis:** H5  
**Effort:** S

### Levels

```text
STRONG_CONSIDER
CONSIDER
UNSURE
NO_CONSIDER
```

### Acceptance Criteria

- [ ] Product ID 연결
- [ ] Recommendation ID 연결
- [ ] DB 저장
- [ ] Event 기록

---

# 16. Epic E10 — Analytics & Experiment Data

---

## GM-100 — Analytics Wrapper

**Priority:** P0  
**Effort:** M

### API

```text
track(eventName, properties)
```

### Acceptance Criteria

- [ ] Component마다 SDK 호출 방식이 다르지 않음
- [ ] 공통 Wrapper 사용
- [ ] Dev/Staging/Prod 환경 구분

---

## GM-101 — H1 Events

**Priority:** P0

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

## GM-102 — H4 Events

**Priority:** P0

```text
session_start
return_session
home_view
run_entry_view
run_add
shoe_mileage_update
```

---

## GM-103 — H3/H5 Events

**Priority:** P0

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

## GM-104 — User / Anonymous Session 연결

**Priority:** P0  
**Effort:** M

### Acceptance Criteria

- [ ] 가입 전 Anonymous Session 존재
- [ ] Account 생성 후 동일 Journey와 연결 가능
- [ ] Returning User 새로운 Session 생성
- [ ] 동일 user_id 유지

---

## GM-105 — Funnel Validation

**Priority:** P0  
**Effort:** M

최소 Funnel:

### Identity

```text
Landing
→ Test Start
→ Complete
→ Runner Card
→ Profile Complete
```

### Activity

```text
Profile Complete
→ Run Add
→ Return
→ Repeat Run
```

### Gear

```text
Gear Start
→ Recommendation
→ Product View
→ Helpful
→ Purchase Consideration
```

### Acceptance Criteria

운영자가 별도 개발 없이 Analytics Tool 또는 Query로 계산 가능.

---

# 17. Epic E11 — QA / Staging / Release

---

## GM-110 — Recommendation Unit Tests

**Priority:** P0  
**Effort:** L

### 필수 검증

- [ ] Need Weight
- [ ] Priority
- [ ] Direction Role Filter
- [ ] Penalty
- [ ] Current Shoe Transition
- [ ] Unknown Current Shoe Renormalize
- [ ] Candidate Diversity
- [ ] 3 Directions
- [ ] 같은 Context → 재현 가능한 결과

---

## GM-111 — Product Data QA

**Priority:** P0  
**Effort:** M

### 확인

- [ ] VERIFIED에 Null P0 Score 없음
- [ ] DRAFT가 Eligible 아님
- [ ] Product Role Distribution
- [ ] 특정 Brand 과도한 Coverage 없음
- [ ] Product DB Version 저장

---

## GM-112 — QA Persona Execution

**Priority:** P0  
**Effort:** M

`06_QA` 8개 Scenario 실제 실행.

### QA-01 Comfort

- Race Focus 주 방향 금지

### QA-02 Speed

- Performance / Fast Training 노출

### QA-03 Distance

- Long Run 중심

### QA-04 Race

- Race Focus 존재
- Race Product만 정답처럼 표현하지 않음

### QA-05 Unsure

- Balance / Comfort + Context Dynamic

### QA-06 Unknown Current Shoe

- Recommendation 정상
- VS YOUR SHOE 생략

### QA-07 Race/Fast Shoe → Comfort

- 또 다른 Race Shoe 반복 추천 금지

### QA-08 Low Data

- Follow-up 또는 Unknown 처리
- 추정 금지

### Acceptance Criteria

- [ ] 각 Scenario 결과 저장
- [ ] PASS / FAIL / REVIEW
- [ ] 실패 이유 기록
- [ ] 수정 후 Regression Test

---

## GM-113 — E2E New User

**Priority:** P0

```text
Landing
→ Test
→ Card
→ Account
→ Profile
→ Shoe
→ Home
```

### Acceptance Criteria

DB에:

- [ ] User
- [ ] Answers
- [ ] Identity
- [ ] Profile
- [ ] Current Shoe

존재.

---

## GM-114 — E2E Activity

**Priority:** P0

```text
Login
→ Add 5km
→ Refresh
```

### Acceptance Criteria

- [ ] Activity +1
- [ ] Weekly KM +5
- [ ] Weekly Run +1
- [ ] Mileage +5
- [ ] Refresh 유지

---

## GM-115 — E2E Recommendation

**Priority:** P0

```text
Explore Gear
→ Need
→ Priority
→ Direction
→ Product
→ Feedback
→ Intent
```

### Acceptance Criteria

DB에:

- [ ] Recommendation
- [ ] Snapshot
- [ ] Logic Version
- [ ] Product DB Version
- [ ] Directions
- [ ] Items
- [ ] Feedback
- [ ] Purchase Intent

---

## GM-116 — E2E Returning User

**Priority:** P0

### Acceptance Criteria

새 Session에서 Login 후:

- [ ] Runner Type 동일
- [ ] Profile 동일
- [ ] Current Shoe 동일
- [ ] Activity 동일
- [ ] Mileage 동일

---

## GM-117 — Mobile / Browser QA

**Priority:** P0

### 최소

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Desktop Chrome
- [ ] Desktop Edge

---

# 18. Epic E12 — Card Save / Share [P1]

---

## GM-120 — Runner Card Image Save

### Acceptance Criteria

- [ ] 실제 이미지 Export
- [ ] Mock Toast만 띄우지 않음
- [ ] Save 완료 Event

---

## GM-121 — Share

### Acceptance Criteria

- [ ] Native/Web Share
- [ ] 카드 이미지 또는 Shareable URL
- [ ] Share 버튼 클릭과 실제 완료 가능하면 분리

---

# 19. Epic E13 — Product Save / Outbound [P1]

---

## GM-130 — Product Save

**Hypothesis:** H5

- [ ] User + Product + Recommendation 연결
- [ ] Saved State 재방문 유지
- [ ] `product_save`

---

## GM-131 — External Product Link

**Hypothesis:** H5

### Acceptance Criteria

- [ ] Product별 정상 URL
- [ ] `outbound_click`
- [ ] Recommendation ID 연결
- [ ] Sponsored와 Organic 미혼합

---

# 20. Epic E14 — AI Gear Coach Lite [P1]

---

## GM-140 — Gear Coach Suggested Questions

- 지금 신발과 뭐가 달라?
- 세 후보 중 가장 편한 건?
- 장거리에는 어떤 차이가 있어?
- 대회용으로 볼 때는?

---

## GM-141 — AI Context Builder

### AI 입력 허용

```text
Runner Identity
Profile
Activity Summary
Current Shoe
Recommendation
Verified Product Fact
Trade-off
```

### 금지

- DB 전체
- 다른 User Data
- 임의 Web Recommendation
- Secret

---

## GM-142 — AI Response Guardrail

### Acceptance Criteria

AI가:

- [ ] 새 Product 임의 추가하지 않음
- [ ] Recommendation 순위 변경하지 않음
- [ ] “완벽하게 맞다” 단정하지 않음
- [ ] 부상/의료 진단하지 않음
- [ ] Trade-off 포함 가능
- [ ] 모르는 정보는 모른다고 답함

---

# 21. Release Blocker

다음 중 하나라도 미완료면 **Closed MVP Release 금지**를 권장한다.

## Product

- [ ] P0 전체 구현
- [ ] New User E2E PASS
- [ ] Returning User E2E PASS
- [ ] Activity E2E PASS
- [ ] Recommendation E2E PASS

## Recommendation Data

- [ ] VERIFIED 약 24~28개 이상 권장
- [ ] DAILY 5+
- [ ] CUSHION_LONG 4+
- [ ] STABILITY 3+
- [ ] SPEED_TRAINING 4+
- [ ] SUPER_TRAINER 4+
- [ ] RACE 4+
- [ ] Review Conflict 미해결 Product가 Recommendation Eligible이 아님

## Analytics

- [ ] H1 Funnel 계산 가능
- [ ] H4 Return 계산 가능
- [ ] H3 Product/Helpful 계산 가능
- [ ] H5 Purchase Intent 계산 가능

## Security

- [ ] PIN Hash
- [ ] Rate Limit
- [ ] HttpOnly Session
- [ ] Authorization
- [ ] Production Secret 보호

---

# 22. Definition of Done — 공통

하나의 Story를 `Done`으로 처리하려면 적용 가능한 항목을 모두 충족해야 한다.

```text
[ ] UI 구현
[ ] Server-side Validation
[ ] DB Persistence
[ ] Refresh Persistence
[ ] Event Logging
[ ] Loading State
[ ] Error State
[ ] Authorization
[ ] Unit/Integration Test
[ ] Staging QA
[ ] 문서/Config Version 정합성
```

---

# 23. Suggested Development Sequence

## Phase 0 — Foundation

```text
GM-001
GM-002
GM-003
GM-004
```

---

## Phase 1 — UI Migration

```text
GM-010
GM-011
```

이 단계까지는 Mock State 허용.

---

## Phase 2 — Identity & Persistence

```text
GM-020~024
GM-030~033
GM-040~042
```

목표:

```text
Landing
→ Runner Card
→ Profile
→ Save
→ Returning Login
```

---

## Phase 3 — Retention Utility

```text
GM-050~053
```

목표:

```text
Run
→ Mileage
→ Return
```

---

## Phase 4 — Recommendation Foundation

병렬 가능:

### Development

```text
GM-060
GM-061
GM-070
GM-071
```

### Data

```text
GM-062
GM-063
```

---

## Phase 5 — Recommendation Engine

```text
GM-072~079
```

이 Phase에서는 AI를 넣지 않는다.

---

## Phase 6 — Recommendation UX / Validation

```text
GM-080~082
GM-090~092
GM-100~105
```

---

## Phase 7 — QA / Release

```text
GM-110~117
```

---

## Phase 8 — P1

P0 결과를 본 뒤:

```text
GM-120~142
```

---

# 24. Suggested Sprint Grouping

실제 기간이 아니라 **작업 묶음** 기준이다.

## Sprint A — Real Account

목표:

> Prototype을 실제 사용자 데이터로 저장.

```text
Foundation
UI Migration
Auth
Runner Test
Profile
```

---

## Sprint B — Returnable Runner Profile

목표:

> 사용자가 돌아와 Activity와 Mileage를 누적.

```text
Current Shoe
Run
Activity
Mileage
Returning User
```

---

## Sprint C — Real Recommendation

목표:

> 실제 Product DB로 3 Direction 생성.

```text
Product DB
Engine
Direction
Current Shoe Transition
Product Candidate
```

---

## Sprint D — Validate

목표:

> H1/H3/H4/H5를 실제 데이터로 판단 가능.

```text
Feedback
Purchase Intent
Analytics
QA
Release
```

---

# 25. Parallel Work Recommendation

개발이 Recommendation Engine을 구현하는 동안  
PM/Data 작업이 멈추면 안 된다.

### Developer

```text
Auth
Activity
Recommendation Engine
Analytics
```

### PM / Product Data

```text
DRAFT Product 검증
Product Evidence
Score Calibration
QA Expected Result
Recommendation Copy
```

둘이 합쳐지는 시점:

```text
GM-062
+
GM-073~079
→ Recommendation QA
```

---

# 26. Claude Code 작업 단위 원칙

Claude Code에게 전체 MVP를 한 번에 요청하지 않는다.

권장 Task 크기:

> Backlog ID 1~2개.

예:

```text
현재 작업:
GM-050 Add Run
GM-052 Shoe Mileage

참고 문서:
05 User Flow
06 Data
08 Development Spec
09 Backlog

요구사항:
- POST /api/activities
- Activity DB 저장
- Active Current Shoe가 있으면 GearUsage 동시 갱신
- Transaction
- run_add / shoe_mileage_update 이벤트

제외:
- UI redesign
- Multi-shoe
- Strava
- Activity edit/delete

완료조건:
09 문서 GM-050 / GM-052 Acceptance Criteria 전부 충족.
테스트 결과와 수정 파일 목록을 마지막에 보고.
```

---

# 27. Backlog Change Rule

테스트 중 사용자가 기능을 요청해도 바로 Backlog에 P0로 추가하지 않는다.

새 요구사항마다:

```text
Request
Frequency
Related Hypothesis
Evidence
Scope Impact
Priority
```

기록 후 판단한다.

---

# 28. 즉시 수정 가능한 항목

- 심각한 UX Drop
- 데이터 저장 실패
- Recommendation 오류
- Event 누락
- 오해를 만드는 Copy
- 모바일 사용 불가
- 보안 오류

---

# 29. 테스트 중 고정 권장 영역

Cohort 비교를 위해 가능하면 유지:

- 5 Questions
- 6 Runner Types
- Runner Card 생성 시점
- Profile Complete 기준
- Run Add 기본 구조
- 3 Gear Direction 구조
- Recommendation Feedback 구조

---

# 30. P2 / OUT — Backlog에 아직 넣지 않음

다음은 개발 Story로 만들지 않는다.

```text
Avatar
Other Runner Profile
Similar Runner
Runner Discovery
Community Feed
Follow
Comment
DM
Group Run
Competition
Ranking
Strava / Garmin / NRC Integration
Multi-shoe Rotation
Marketplace
Payment
Complex ML
Native App
```

필요한 데이터 구조 확장 가능성만 유지한다.

---

# 31. MVP Release 후 1차 Review

첫 Closed MVP User Cohort 이후 확인:

## H1

- Test Start
- Test Complete
- Runner Card
- Profile Complete

## H4

- Run Add
- Repeat Run
- D1
- D7
- Return Reason

## H3

- Recommendation Reach
- Product View
- Helpful

## H5

- Purchase Consideration
- P1 구현 시 Save / Outbound

---

# 32. 결과별 Backlog 방향

## H1 강함 / H4 약함

Runner Card Hook은 있지만 재방문 가치 약함.

검토:

```text
Activity Utility
Mileage
Card 변화
```

자동으로 Community로 가지 않는다.

---

## H1 + H4 강함 / H3,H5 약함

Identity / Profile 서비스 가능성.

향후:

```text
Runner Discovery
Social Profile
```

가설 검토.

---

## H3 + H5 강함

Gear Decision Utility 강함.

향후:

```text
Product DB 확대
Compare
Outbound
Commerce
Similar Runner Evidence
```

---

## H4가 Mileage에서 강함

향후:

```text
Multi-shoe
Auto Sync
Gear History
Replacement Context
```

---

# 33. MVP Backlog One-page Summary

```text
FOUNDATION
↓
Prototype Migration
↓
User / Auth
↓
Runner Test
↓
Runner Card
↓
Profile
↓
Current Shoe
↓
Run / Mileage
↓
Return
↓
Product DB
↓
Recommendation Engine
↓
3 Gear Directions
↓
Product / Reason / Comparison
↓
Feedback
↓
Purchase Intent
↓
Analytics
↓
QA
↓
Closed MVP
```

---

# 34. 최종 개발 판정 기준

GearMatch AI MVP가 완성되었다는 의미는:

> “Prototype과 비슷한 웹사이트가 서버에서 열린다.”

가 아니다.

다음이 모두 가능해야 한다.

```text
한 사용자가
Runner Card를 만들고
Profile을 저장하고
실제 Run을 기록하고
다시 돌아오고
현재 신발과 자신의 러닝 Context를 기반으로
검증된 제품 DB에서
Trade-off가 다른 3개의 Gear Direction을 받고
왜 추천됐는지 이해하고
실제 구매 후보인지 반응을 남기며

운영자가 이 모든 행동을
H1 / H3 / H4 / H5 기준으로 측정할 수 있다.
```

이 상태를 **GearMatch AI Closed MVP Definition of Done**으로 정의한다.

---

# Appendix A. P0 Story Index

```text
GM-001 MVP Scope Lock
GM-002 Repository
GM-003 Database
GM-004 Environments

GM-010 Prototype Migration
GM-011 Loading/Error/Empty

GM-020 Account Creation
GM-021 PIN Security
GM-022 Returning Login
GM-023 Rate Limit
GM-024 Session

GM-030 Runner Test
GM-031 Runner Type Engine
GM-032 Type Reveal
GM-033 Runner Card Lite

GM-040 Runner Profile
GM-041 Gear Search
GM-042 Current Shoe

GM-050 Add Run
GM-051 Activity Aggregate
GM-052 Shoe Mileage
GM-053 Runner Home

GM-060 Product Import
GM-061 Attribute Import
GM-062 Product Verification Expansion
GM-063 Review Conflict

GM-070 Context Loader
GM-071 Need / Priority
GM-072 Need Match
GM-073 Suitability Score
GM-074 Current Shoe Transition
GM-075 Direction Role Filter
GM-076 Penalty
GM-077 Direction Selection
GM-078 UNSURE Dynamic
GM-079 Diversity

GM-080 Direction Result
GM-081 Product Detail
GM-082 Current Shoe Comparison

GM-090 Helpful
GM-091 Feedback Reason
GM-092 Purchase Intent

GM-100 Analytics Wrapper
GM-101 H1 Events
GM-102 H4 Events
GM-103 H3/H5 Events
GM-104 Session Mapping
GM-105 Funnel

GM-110 Recommendation Unit Test
GM-111 Product QA
GM-112 QA Persona
GM-113 New User E2E
GM-114 Activity E2E
GM-115 Recommendation E2E
GM-116 Returning E2E
GM-117 Device/Browser QA
```

---

# Appendix B. P1 Story Index

```text
GM-120 Runner Card Save
GM-121 Runner Card Share

GM-130 Product Save
GM-131 Outbound

GM-140 Gear Coach Suggested Questions
GM-141 AI Context Builder
GM-142 AI Guardrail
```

---

# Appendix C. Release Gate 핵심 10개

Closed MVP 직전 마지막으로 아래만 봐도 된다.

```text
1. New User가 혼자 Runner Card까지 갈 수 있는가?
2. Profile/Current Shoe가 DB에 저장되는가?
3. Returning User가 같은 데이터로 돌아오는가?
4. Run Add와 Shoe Mileage가 정확한가?
5. Recommendation은 VERIFIED Product만 사용하는가?
6. Direction별 Product Role Filter가 적용되는가?
7. Current Shoe 대비 의미 있는 차이를 설명하는가?
8. H3 Feedback과 H5 Purchase Intent가 저장되는가?
9. H1/H3/H4/H5 Funnel을 계산할 수 있는가?
10. QA 8개 Scenario와 핵심 E2E가 PASS인가?
```
