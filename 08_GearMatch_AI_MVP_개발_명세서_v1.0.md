# 08_GearMatch_AI_MVP_개발_명세서_v1.0

> **문서 목적**  
> 본 문서는 `00~07` 기획 문서를 실제 MVP 개발 작업으로 전환하기 위한 기술 명세서다.  
> 개발자가 별도의 해석 없이 GearMatch AI MVP의 시스템 구조, 데이터 흐름, API, 인증, Recommendation 처리,  
> Event Logging, 배포, 보안, QA 기준을 이해할 수 있도록 한다.
>
> **핵심 원칙:**  
> 현재 Prototype의 Visual / UI / User Flow는 가능한 한 유지하고,  
> MVP 개발에서는 **State를 실제 DB로 연결하고, Recommendation Logic과 Analytics를 실동작시키는 것**에 집중한다.

- 문서 버전: v1.0
- 기준 시점: 2026-09-04
- 서비스 정식 명칭: **GearMatch AI**
- 현재 단계: Prototype 완료 → MVP 구현 준비
- 기준 Prototype:
  - `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` (정본)
  - 이전 기준: `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html` (v1.6 -> v1.7로 승계)
- 상위 기준 문서:
  - `00_GearMatch_AI_Master_Context_v1.1`
  - `01_GearMatch_AI_사업·서비스_정의서_v2.1`
  - `02_GearMatch_AI_핵심_가설_및_검증_계획서_v1.1`
  - `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서_v1.1`
  - `04_GearMatch_AI_MVP_Scope_정의서_v1.1`
  - `05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0`
  - `06_GearMatch_AI_데이터_기획서_v1.0`
  - `07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서_v1.0`

---

# 1. MVP 개발 목표

GearMatch AI MVP의 개발 목표는 새로운 디자인을 만드는 것이 아니다.

현재 Prototype에서 이미 확인한 경험을

```text
Mock State
→ Real User
→ Real DB
→ Real Activity
→ Real Gear Usage
→ Real Recommendation
→ Real Feedback
→ Real Analytics
```

로 전환하는 것이 핵심이다.

---

# 2. MVP 기술 목표

MVP 출시 시 다음이 실제로 동작해야 한다.

## User

- 신규 사용자 생성
- 닉네임 + PIN 로그인
- 재접속
- 기존 데이터 복구

## Runner

- 5문항 Runner Test
- Runner Type 계산
- Runner Card 생성
- Profile 저장

## Activity

- RUN 추가
- Weekly Distance
- Weekly Runs
- Total Distance
- Last Run
- Shoe Mileage

## Gear

- Current Shoe 등록
- Gear Need / Priority 입력
- Recommendation 생성
- 3 Gear Directions
- Product Candidate
- Recommendation Reason
- Current Shoe Difference
- Trade-off

## Validation

- Recommendation Feedback
- Purchase Consideration
- Event Logging
- Retention 계산

---

# 3. 개발 범위 원칙

## 3.1 Visual Redesign 금지

현재 Prototype의

- 화면 구조
- Runner Card
- 색상 체계
- Typography
- Motion
- 주요 CTA 위치
- Runner Visual Asset

을 임의로 다시 디자인하지 않는다.

필요한 경우는

- 실제 데이터 연결에 따른 Empty State
- Error State
- Loading State
- Responsive 버그
- Accessibility

정도만 수정한다.

---

# 4. Recommended MVP Stack

아래 구성은 GearMatch AI MVP 규모를 기준으로 한 **권장안**이다.

## Frontend

```text
Next.js
React
TypeScript
```

### 이유

- 기존 HTML/CSS/JS Prototype을 React Component로 이식하기 쉬움
- Frontend와 Server API를 한 Repository에서 운영 가능
- MVP 배포 단순화
- 향후 서비스 확장 가능

---

# 5. Styling Strategy

기존 Prototype Visual을 보존하기 위해  
처음부터 새로운 Design System으로 재작성하지 않는다.

권장:

```text
Prototype HTML
→ React Component
→ 기존 CSS 우선 이식
→ 필요한 부분만 Component 단위 정리
```

MVP 단계에서 Tailwind 등으로 전면 재작성하는 것은 필수가 아니다.

---

# 6. Backend

권장 구조:

```text
Next.js Server
+
Managed PostgreSQL
```

MVP에서는 별도 Backend Repository를 만들지 않는 것을 권장한다.

API는 Next.js Server Route / Server Function 계층에서 처리한다.

---

# 7. Database

권장:

```text
PostgreSQL
```

관리형 DB Service를 사용한다.

필요 기능:

- Relational Data
- UUID
- JSON
- Transaction
- Index
- Backup
- Connection Pooling

---

# 8. Storage

제품 이미지와 Runner Card Export가 필요한 경우:

```text
Object Storage
```

사용.

현재 Prototype에 Embedded Image가 있더라도  
MVP Product DB에서는 이미지 URL 기반 관리를 권장한다.

---

# 9. Deployment

권장 구조:

```text
Git Repository
      ↓
Preview / Staging
      ↓
Production
```

Frontend/Server는 관리형 Web Hosting을 사용한다.

---

# 10. Analytics

MVP에서는 직접 Analytics Dashboard를 개발하지 않는다.

필요 조건:

- Custom Event
- User ID
- Session
- Funnel
- Retention
- Cohort
- Event Property

를 지원하는 Product Analytics Tool을 사용한다.

---

# 11. Error Monitoring

선택적이지만 권장:

```text
Frontend Error
Server Error
API Error
Recommendation Error
```

를 수집할 수 있는 Error Monitoring 도구.

MVP 규모가 작다면 P1로 둘 수 있다.

---

# 12. AI Layer

AI Gear Coach는 P1.

구조:

```text
Frontend
→ Gear Coach API
→ Server
→ LLM Provider
```

LLM API Key는 절대로 Client에 노출하지 않는다.

---

# 13. System Architecture

```text
┌────────────────────────────┐
│         Browser            │
│  Next.js / React Frontend  │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│       Next.js Server       │
│                            │
│ Auth / Profile / Activity  │
│ Recommendation / Feedback  │
└───────┬───────────┬────────┘
        │           │
        ▼           ▼
┌──────────────┐  ┌───────────────┐
│ PostgreSQL   │  │ Analytics     │
│              │  │ Event System  │
└───────┬──────┘  └───────────────┘
        │
        ▼
┌────────────────────────────┐
│ Recommendation Engine      │
│ Filter / Rule / Score      │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│ AI Gear Coach [P1]         │
│ Explanation Only           │
└────────────────────────────┘
```

---

# 14. Repository Structure

권장:

```text
gearmatch-ai/
│
├─ app/
│  ├─ page.tsx
│  ├─ test/
│  ├─ runner/
│  ├─ activity/
│  ├─ gear/
│  └─ api/
│
├─ components/
│  ├─ runner/
│  ├─ activity/
│  ├─ gear/
│  ├─ recommendation/
│  └─ common/
│
├─ lib/
│  ├─ db/
│  ├─ auth/
│  ├─ analytics/
│  ├─ recommendation/
│  └─ validation/
│
├─ data/
│  ├─ runner-types.ts
│  ├─ questions.ts
│  └─ direction-templates.ts
│
├─ public/
│  ├─ runners/
│  └─ products/
│
├─ types/
│
├─ tests/
│
└─ docs/
```

---

# 15. Architecture Principle

화면 Component 안에

- DB Query
- Recommendation Score
- Authentication Logic

을 직접 넣지 않는다.

구조:

```text
UI
↓
Application Logic
↓
Data / Recommendation Layer
```

로 분리한다.

---

# 16. Frontend Component Strategy

Prototype 화면을 다음 정도로 분리한다.

```text
LandingScreen
ReturningLoginScreen

RunnerQuestionScreen
RunnerTypeReveal
RunnerCard

RunnerProfileForm
CurrentShoeSelector

RunnerHome
RunEntryModal

GearNeedScreen
GearPriorityScreen
GearFollowupScreen

RecommendationScreen
ProductDetail
RecommendationFeedback

GearCoach [P1]
```

---

# 17. Shared Components

```text
PrimaryButton
SecondaryButton
ProgressBar
Modal
Loading
ErrorState
EmptyState
Toast
```

기존 Prototype의 Visual Style을 그대로 사용한다.

---

# 18. State Management

MVP에서는 복잡한 Global State Library가 필수는 아니다.

구분:

## Temporary UI State

- 현재 Test Question
- Modal
- 현재 선택

Frontend State.

## Persistent State

- User
- Runner Type
- Profile
- Activity
- Gear
- Recommendation
- Feedback

Server / DB.

---

# 19. Source of Truth

다음 값은 Browser State가 아니라 DB를 Source of Truth로 한다.

```text
Runner Type
Runner Profile
Current Shoe
Activity
Shoe Mileage
Recommendation
Feedback
```

---

# 20. Authentication Strategy

MVP 요구사항:

> **Nickname + 4-digit PIN**

정식 이메일 회원가입은 사용하지 않는다.

---

# 21. Authentication Data

사용자 입력:

```text
nickname
pin
```

서버 저장:

```text
user_id
nickname_normalized
pin_hash
```

PIN 원문은 저장하지 않는다.

---

# 22. Nickname Policy

MVP에서는 **로그인 모호성을 피하기 위해 Nickname을 중복 불가로 운영하는 것을 권장한다.**

DB:

```text
nickname_normalized UNIQUE
```

Normalization 예:

- 앞뒤 공백 제거
- 대소문자 정규화

---

# 23. Nickname Creation UX

사용자가 기존 Nickname을 입력하면:

> 이미 사용 중인 닉네임입니다.

다른 닉네임 선택.

---

# 24. PIN Security

4자리 PIN은 편의성은 높지만 보안성이 낮다.

따라서 최소한 다음을 적용한다.

- Hash 저장
- Login Attempt 제한
- IP / User 기준 Rate Limit
- 일정 횟수 실패 시 일시 차단
- HTTPS only

---

# 25. PIN Hash

권장:

```text
Argon2
or
bcrypt
```

직접 Hash Algorithm을 구현하지 않는다.

---

# 26. Login Rate Limit

예시 정책:

```text
5회 연속 실패
→ 일정 시간 추가 시도 제한
```

정확한 값은 구현 시 조정 가능.

---

# 27. Session

Login 성공 시 Server Session 발급.

권장 Cookie:

```text
HttpOnly
Secure
SameSite=Lax
```

Client JavaScript에서 인증 Token을 직접 다루지 않도록 한다.

---

# 28. Session Duration

MVP에서는 Returning User 편의성을 위해  
지나치게 짧게 잡지 않는다.

예:

```text
7~30일
```

범위에서 운영 정책 결정.

---

# 29. PIN Recovery

MVP에서는 Email/Phone을 수집하지 않으므로  
자동 PIN Recovery는 지원하지 않는다.

정책:

> PIN을 잊으면 기존 계정을 복구할 수 없으며 새 Runner Card를 생성해야 한다.

출시 전 UX에서 이를 명확히 안내한다.

향후 Account System 고도화 시 변경.

---

# 30. Logout

MVP에 포함.

```text
POST /api/auth/logout
```

Session 삭제.

---

# 31. Data Delete

최소한 사용자 데이터 삭제 요청 기능 또는 운영 경로를 제공한다.

가능하면:

```text
DELETE /api/user
```

인증된 사용자만 실행.

---

# 32. Database Tables

MVP 권장 Table:

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

# 33. users

```text
id UUID PK
nickname VARCHAR UNIQUE
nickname_normalized VARCHAR UNIQUE
pin_hash VARCHAR
market VARCHAR
language VARCHAR
status VARCHAR
created_at TIMESTAMP
updated_at TIMESTAMP
last_login_at TIMESTAMP
```

---

# 34. runner_identities

```text
id UUID PK
user_id UUID FK users
runner_type VARCHAR
flow VARCHAR
style VARCHAR
motivation VARCHAR
direction VARCHAR
type_score JSONB
logic_version VARCHAR
created_at TIMESTAMP
```

1 User : 1 Current Identity를 기본으로 한다.

---

# 35. runner_test_answers

```text
id UUID PK
user_id UUID FK
question_id VARCHAR
question_version VARCHAR
selected_option VARCHAR
answer_value VARCHAR
question_index INT
answered_at TIMESTAMP
```

---

# 36. runner_profiles

```text
id UUID PK
user_id UUID FK UNIQUE
running_experience VARCHAR
runs_per_week VARCHAR
weekly_distance_band VARCHAR
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

# 37. gears

```text
id UUID PK
brand VARCHAR
model VARCHAR
version VARCHAR
display_name VARCHAR
category VARCHAR
market VARCHAR
active BOOLEAN
image_url TEXT

daily_score NUMERIC
comfort_score NUMERIC
stability_score NUMERIC
responsiveness_score NUMERIC
long_run_score NUMERIC
speed_score NUMERIC
race_score NUMERIC
versatility_score NUMERIC

cushioning_level VARCHAR
weight_class VARCHAR
plate_type VARCHAR
recommended_use JSONB
caution_tags JSONB

short_description TEXT

created_at TIMESTAMP
updated_at TIMESTAMP
```

---

# 38. Gear Unique Rule

가능하면:

```text
brand + model + version + market
```

조합 Unique.

---

# 39. user_gears

```text
id UUID PK
user_id UUID FK
gear_id UUID FK nullable
custom_name VARCHAR nullable
status VARCHAR
started_at DATE nullable
created_at TIMESTAMP
updated_at TIMESTAMP
```

MVP Business Rule:

> 한 User당 ACTIVE Current Shoe 최대 1개.

DB Constraint 또는 Transaction Logic으로 보장한다.

---

# 40. activities

```text
id UUID PK
user_id UUID FK
activity_date DATE
distance_km NUMERIC
user_gear_id UUID FK nullable
source VARCHAR DEFAULT 'manual'
created_at TIMESTAMP
```

---

# 41. gear_usages

```text
id UUID PK
user_gear_id UUID FK UNIQUE
mileage_km NUMERIC DEFAULT 0
run_count INT DEFAULT 0
first_used_at DATE nullable
last_used_at DATE nullable
updated_at TIMESTAMP
```

---

# 42. recommendations

```text
id UUID PK
user_id UUID FK
runner_identity_id UUID FK

profile_snapshot JSONB
activity_snapshot JSONB
current_gear_snapshot JSONB

gear_need VARCHAR
priority VARCHAR
followup_value VARCHAR nullable

logic_version VARCHAR
created_at TIMESTAMP
```

---

# 43. recommendation_directions

```text
id UUID PK
recommendation_id UUID FK
direction_code VARCHAR
rank INT
title VARCHAR
summary TEXT
reason_json JSONB
created_at TIMESTAMP
```

---

# 44. recommendation_items

```text
id UUID PK
recommendation_id UUID FK
direction_id UUID FK
gear_id UUID FK
rank INT
score NUMERIC
reason JSONB/TEXT
current_shoe_difference JSONB/TEXT nullable
best_use TEXT
tradeoff TEXT
created_at TIMESTAMP
```

---

# 45. recommendation_feedbacks

```text
id UUID PK
user_id UUID FK
recommendation_id UUID FK
helpful VARCHAR
reason_code VARCHAR nullable
free_text TEXT nullable
created_at TIMESTAMP
```

---

# 46. purchase_intents

```text
id UUID PK
user_id UUID FK
recommendation_id UUID FK
gear_id UUID FK
intent_level VARCHAR
created_at TIMESTAMP
```

---

# 47. events

```text
id UUID PK
event_name VARCHAR
user_id UUID nullable
session_id UUID
occurred_at TIMESTAMP
screen VARCHAR nullable
market VARCHAR
language VARCHAR
properties JSONB
```

---

# 48. Index Strategy

최소 Index:

```text
users.nickname_normalized
activities.user_id
activities.activity_date
recommendations.user_id
recommendations.created_at
events.event_name
events.user_id
events.session_id
events.occurred_at
```

---

# 49. Database Migration

DB 변경은 수동 UI 수정이 아니라  
Migration File로 관리한다.

```text
migrations/
001_init.sql
002_add_gears.sql
...
```

---

# 50. Seed Data

개발용 Seed:

- Runner Questions
- Runner Types
- Direction Templates
- Sample Gear
- Test User

운영 데이터와 분리한다.

---

# 51. Runner Test Logic

Runner Test Logic은 Frontend에 흩어놓지 않는다.

권장 위치:

```text
lib/runner/evaluateRunnerType.ts
```

Input:

```text
QuestionAnswer[]
```

Output:

```text
RunnerTypeResult
```

---

# 52. Runner Test Result

예:

```ts
type RunnerTypeResult = {
  coreType: RunnerType
  scores: Record<RunnerType, number>
  logicVersion: string
}
```

---

# 53. Runner Type Version

```text
runner_type_v1.0
```

상수로 관리.

Logic 수정 시 Version 변경.

---

# 54. Recommendation Engine Location

```text
lib/recommendation/
```

예:

```text
loadContext.ts
filters.ts
directionScore.ts
productScore.ts
diversity.ts
reasonBuilder.ts
recommend.ts
versions.ts
```

---

# 55. Recommendation Engine Interface

```ts
recommendGear(context): RecommendationResult
```

Input:

```text
Runner Context
Gear Need
Priority
```

Output:

```text
3 Directions
Product Candidates
Reasons
```

---

# 56. Recommendation Execution Location

**Server-side only.**

이유:

- Weight 보호
- Product Logic 보호
- Version 관리
- 데이터 일관성
- 추후 AI 연결

---

# 57. Recommendation V1 Flow

```text
1. Load User Context
2. Validate Input
3. Load Eligible Products
4. Calculate Direction Scores
5. Select Top Directions
6. Score Product by Direction
7. Apply Penalty
8. Diversity Check
9. Select Candidate
10. Build Reason
11. Save Snapshot
12. Return Result
```

---

# 58. Recommendation Atomicity

Recommendation 생성 시

- Recommendation
- Directions
- Items

저장을 하나의 Transaction으로 처리하는 것을 권장한다.

중간 실패 시 부분 Recommendation을 남기지 않는다.

---

# 59. API Design Principle

API는 화면 이름이 아니라 Resource / Action 기준으로 구성한다.

---

# 60. Auth API

## Create User

```text
POST /api/users
```

Request:

```json
{
  "nickname": "RUNNER01",
  "pin": "1234",
  "market": "KR",
  "language": "ko"
}
```

---

# 61. Login

```text
POST /api/auth/login
```

```json
{
  "nickname": "RUNNER01",
  "pin": "1234"
}
```

Response:

```json
{
  "success": true
}
```

Session은 Cookie로 처리.

---

# 62. Logout

```text
POST /api/auth/logout
```

---

# 63. Current User

```text
GET /api/me
```

Response:

```text
user
runner_identity
runner_profile
current_gear
activity_summary
```

---

# 64. Runner Test API

```text
POST /api/runner-test
```

Input:

```json
{
  "answers": [
    {
      "question_id": "Q1",
      "selected_option": "..."
    }
  ]
}
```

Output:

```json
{
  "runner_type": "PACE_RUNNER",
  "logic_version": "runner_type_v1.0"
}
```

---

# 65. Profile API

```text
PUT /api/profile
```

Request:

```json
{
  "running_experience": "Y1_TO_3Y",
  "runs_per_week": "W3_4",
  "weekly_distance_band": "KM15_30"
}
```

---

# 66. Gear Search API

```text
GET /api/gears?q=pegasus
```

Filters:

```text
market
active
```

---

# 67. Current Gear API

```text
PUT /api/me/current-gear
```

Request:

```json
{
  "gear_id": "..."
}
```

Unknown:

```json
{
  "status": "UNKNOWN_MODEL",
  "custom_name": "..."
}
```

---

# 68. Activity Create API

```text
POST /api/activities
```

Request:

```json
{
  "distance_km": 5.2,
  "activity_date": "2026-09-04",
  "use_current_gear": true
}
```

---

# 69. Activity Response

```json
{
  "activity": {},
  "summary": {
    "weekly_km": 17.4,
    "weekly_runs": 3,
    "total_km": 126.5,
    "last_run_km": 5.2,
    "shoe_mileage_km": 88.4
  }
}
```

---

# 70. Recommendation Create API

```text
POST /api/recommendations
```

Request:

```json
{
  "gear_need": "SPEED",
  "priority": "RESPONSIVENESS",
  "followup_value": null
}
```

Server가 User Context를 직접 조회한다.

Frontend에서 전체 Profile Snapshot을 보내지 않는다.

---

# 71. Recommendation Response

```json
{
  "recommendation_id": "...",
  "logic_version": "gear_reco_v1.0",
  "directions": [
    {
      "direction_id": "...",
      "direction_code": "PERFORMANCE_STEPUP",
      "title": "...",
      "summary": "...",
      "product": {
        "gear_id": "...",
        "brand": "...",
        "model": "...",
        "image_url": "...",
        "reason": "...",
        "current_shoe_difference": "...",
        "best_use": "...",
        "tradeoff": "..."
      }
    }
  ]
}
```

---

# 72. Feedback API

```text
POST /api/recommendations/{id}/feedback
```

---

# 73. Purchase Intent API

```text
POST /api/recommendations/{id}/purchase-intent
```

Request:

```json
{
  "gear_id": "...",
  "intent_level": "CONSIDER"
}
```

---

# 74. AI Gear Coach API — P1

```text
POST /api/gear-coach
```

Request:

```json
{
  "recommendation_id": "...",
  "question": "지금 신발과 뭐가 달라?"
}
```

Server:

1. Recommendation 조회
2. User Context 조회
3. Product Data 조회
4. 안전한 Context 구성
5. LLM 호출

---

# 75. API Validation

모든 Request는 Server에서 Schema Validation.

예:

- enum
- distance > 0
- PIN 4 digit
- nickname length
- recommendation ownership

Client Validation만 신뢰하지 않는다.

---

# 76. Authorization

모든 User Resource 접근 시:

```text
resource.user_id == session.user_id
```

확인.

---

# 77. IDOR 방지

사용자가 URL의 Recommendation ID 등을 바꿔  
다른 사용자의 데이터를 조회할 수 없어야 한다.

---

# 78. Activity Transaction

RUN 추가 시:

```text
Create Activity
+
Update GearUsage
```

를 Transaction으로 처리한다.

둘 중 하나만 성공하지 않도록 한다.

---

# 79. Weekly Metrics

Weekly KM는

```text
Activity
WHERE activity_date within current week
```

합산.

주 시작 기준은 시장 기준으로 고정한다.

MVP에서는 월요일 시작을 권장.

---

# 80. Timezone

한국 테스트:

```text
Asia/Seoul
```

미국 테스트 시 User/Market Timezone 확장.

DB Timestamp는 UTC 저장을 권장.

UI에서 Local Time으로 변환.

---

# 81. Shoe Mileage

Source of Truth:

```text
activities
```

GearUsage는 Aggregate.

삭제/수정 시 Recalculate 가능해야 한다.

---

# 82. Activity Edit/Delete

MVP P0에서는 필수는 아니다.

초기에는 잘못 입력한 Activity 처리 필요성을 QA에서 확인.

최소 운영상 DB 수정 가능.

사용자 Edit/Delete는 P1로 둘 수 있다.

---

# 83. Loading State

실제 API 연결 후 모든 주요 Action에 Loading 필요.

- Login
- Profile Save
- Run Save
- Gear Search
- Recommendation
- Feedback

---

# 84. Duplicate Submit Prevention

버튼 연속 클릭으로

- Run 2회 생성
- Recommendation 2회 생성
- Feedback 중복

되지 않도록 한다.

방법:

- Button disabled
- Server Idempotency 고려

---

# 85. Recommendation Loading

Recommendation 계산이 느려질 수 있으므로:

```text
Loading
→ Result
```

상태 필요.

AI Gear Coach는 Recommendation Result보다 늦게 준비되어도 된다.

---

# 86. Error Handling

공통 Error Response 예:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "..."
  }
}
```

---

# 87. Error Codes

예:

```text
INVALID_INPUT
AUTH_FAILED
RATE_LIMITED
USER_NOT_FOUND
NICKNAME_TAKEN
GEAR_NOT_FOUND
RECOMMENDATION_FAILED
DATABASE_ERROR
```

---

# 88. UI Error Message Principle

내부 Error 내용을 그대로 노출하지 않는다.

예:

Server:

```text
DATABASE_ERROR
```

User:

> 잠시 문제가 발생했어요. 다시 시도해주세요.

---

# 89. Analytics Architecture

두 Layer로 나눈다.

## Product Analytics

외부 Analytics Tool.

## Server Audit / Raw Event

필요한 핵심 Event는 DB 또는 Analytics Tool에서 재현 가능하게 관리.

---

# 90. Analytics User ID

Account 생성 전:

```text
anonymous_id
```

Account 생성 후:

```text
user_id
```

가능하면 동일 Journey 연결.

---

# 91. Required Events

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
shoe_register
home_view
run_entry_view
run_add
shoe_mileage_update
gear_start
gear_need_select
gear_priority_select
gear_direction_view
recommendation_view
product_view
recommendation_feedback
purchase_consideration
session_start
return_session
```

---

# 92. P1 Events

```text
card_save
card_share
product_save
product_compare
outbound_click
coach_open
coach_question
coach_answer_view
```

---

# 93. Event Helper

Frontend에 공통:

```ts
track(eventName, properties)
```

Wrapper를 만든다.

Component에서 Analytics SDK를 직접 여러 방식으로 호출하지 않는다.

---

# 94. Event QA

Staging에서 실제 Journey를 수행한 뒤

```text
Landing
→ Test
→ Profile
→ Run
→ Gear
→ Recommendation
```

모든 Event가 1회씩 정상 기록되는지 확인한다.

---

# 95. Environment

최소:

```text
local
staging
production
```

---

# 96. Local

개발자 환경.

- Local DB 또는 Development DB
- Test Product
- Analytics 제외 또는 Dev Project

---

# 97. Staging

실제 QA / 사용자 테스트 직전 환경.

- Production과 유사 DB Schema
- Test Account
- Analytics Staging 구분

---

# 98. Production

실제 사용자.

Test Data를 기본 분석에서 제외.

---

# 99. Environment Variables

예:

```text
DATABASE_URL
SESSION_SECRET
APP_ENV
ANALYTICS_KEY
LLM_API_KEY      # P1
STORAGE_URL
```

`.env`를 Git에 Commit하지 않는다.

---

# 100. Git Branch Strategy

MVP 소규모 팀 기준 간단하게 유지.

```text
main
feature/*
fix/*
```

`main`은 Production 가능한 상태를 유지.

---

# 101. Pull Request Rule

가능하면 기능 단위 PR.

예:

```text
feature/runner-test
feature/activity
feature/recommendation
```

대규모 한 번에 변경 금지.

---

# 102. Claude Code 역할

Claude Code는 MVP 개발에서

> **Implementation Engineer**

로 사용한다.

Art Director 역할로 사용하지 않는다.

---

# 103. Claude Code가 해도 되는 것

- HTML → React Component 전환
- DB Schema 작성
- API 구현
- State 연결
- Validation
- Recommendation Logic 구현
- Event Logging
- Test
- Refactoring
- Bug Fix

---

# 104. Claude Code가 임의로 하면 안 되는 것

- Runner Test 문항 변경
- Runner Type 변경
- UI 전면 재설계
- Gear Direction 변경
- Recommendation Philosophy 변경
- 새 기능 추가
- Avatar/Community 구현
- 새로운 Framework 도입
- 문서에 없는 Data Field 과다 추가

---

# 105. Claude Code Source Priority

작업 시 우선순위:

```text
00 Master Context
↓
04 MVP Scope
↓
05 User Flow
↓
06 Data
↓
07 Recommendation
↓
08 Development Spec
↓
Current Prototype
```

충돌 시 상위 문서 우선.

---

# 106. Claude Code Working Rule

한 번에 전체 MVP를 생성시키지 않는다.

권장:

```text
Foundation
→ Identity
→ Persistence
→ Activity
→ Recommendation
→ Analytics
→ QA
```

---

# 107. Phase 0 — Project Setup

완료 조건:

- Next.js/TypeScript 프로젝트
- Git
- Env
- DB 연결
- Staging
- 기본 CI/Build

---

# 108. Phase 1 — Prototype Migration

현재 Prototype을 React로 이식.

완료 조건:

- Visual 차이 최소
- 모든 Screen 정상
- Responsive 유지
- 기존 Runner Card Asset 유지

이 단계에서는 DB 연결 전 Mock State 허용.

---

# 109. Phase 2 — User / Auth

구현:

- User 생성
- Nickname Unique
- PIN Hash
- Login
- Logout
- Session
- `/api/me`

---

# 110. Phase 3 — Runner Identity

구현:

- 5 Questions
- Answer 저장
- Type Logic
- Runner Identity DB
- Runner Card 데이터 연결

---

# 111. Phase 4 — Profile / Current Gear

구현:

- Profile
- Gear Search
- Current Shoe
- Card Complete

---

# 112. Phase 5 — Activity

구현:

- RUN Add
- Activity DB
- Weekly Stats
- Shoe Mileage
- Return 상태 복원

---

# 113. Phase 6 — Recommendation

구현:

- Gear Need
- Priority
- Direction
- Product Score
- Diversity
- Candidate
- Reason
- Current Shoe Compare
- Snapshot

---

# 114. Phase 7 — Validation

구현:

- Recommendation Feedback
- Purchase Intent
- Event Logging
- Funnel 확인

---

# 115. Phase 8 — P1

선택:

- Card Save
- Card Share
- Product Save
- Outbound
- AI Gear Coach

---

# 116. Testing Strategy

MVP에서도 최소 3단계 Test 필요.

## Unit

- Runner Type Logic
- Recommendation Score
- Penalty
- Diversity
- Activity Aggregate

## Integration

- Login
- Profile Save
- Run Transaction
- Recommendation Save

## E2E

- New User
- Returning User
- Gear Recommendation

---

# 117. Critical Unit Tests

## Runner Type

같은 답변 → 같은 결과.

Logic Version 확인.

---

# 118. Recommendation Test

고정 Context에 대해

- Direction 수 = 3
- Product 존재
- 중복 없음
- Reason 존재
- Trade-off 존재

확인.

---

# 119. Activity Test

5km Run:

```text
Activity +1
Weekly KM +5
Weekly Runs +1
Shoe Mileage +5
```

확인.

---

# 120. Login Test

- 정상 PIN
- 잘못된 PIN
- 존재하지 않는 Nickname
- Rate Limit
- Logout

---

# 121. E2E Scenario A — New User

```text
Landing
→ Test
→ Card
→ Nickname/PIN
→ Profile
→ Shoe
→ Home
```

DB 확인:

- User
- Identity
- Answers
- Profile
- UserGear

---

# 122. E2E Scenario B — Activity

```text
Login
→ +RUN 5km
→ Home
→ Refresh
```

5km 값 유지.

---

# 123. E2E Scenario C — Recommendation

```text
Login
→ Explore Gear
→ Need
→ Priority
→ Recommendation
→ Product
→ Feedback
```

DB 확인:

- Recommendation
- Directions
- Items
- Feedback
- PurchaseIntent

---

# 124. E2E Scenario D — Returning User

Browser 재접속 또는 새 Session.

```text
Nickname + PIN
→ Home
```

기존

- Type
- Profile
- Activity
- Shoe Mileage
- Gear

정상 복원.

---

# 125. Accessibility Minimum

- Button keyboard accessible
- Form label
- Focus visible
- 이미지 alt
- Contrast 확인
- Motion이 기능 사용을 방해하지 않음

---

# 126. Responsive Minimum

우선순위:

```text
Mobile First
```

테스트:

- iPhone 계열
- Android 일반 폭
- Desktop

---

# 127. Browser Support

최신 주요 Browser:

- Chrome
- Safari
- Edge

MVP에서 Legacy Browser 지원은 하지 않는다.

---

# 128. Performance Minimum

특히 확인:

- Runner Card Image Asset
- Product Image
- 초기 JS Bundle
- Recommendation API

불필요한 대형 Library를 피한다.

---

# 129. Image Strategy

Runner Card Visual Asset:

- 기존 Asset 최대한 유지
- WebP/AVIF 등 Web 친화 포맷 권장
- 적절한 Size
- Lazy Load 가능한 부분 적용

---

# 130. Security Minimum

출시 전:

- HTTPS
- PIN Hash
- Rate Limit
- HttpOnly Cookie
- Server Validation
- SQL Injection 방지
- Access Control
- Secret 관리
- Error 정보 비노출

---

# 131. Privacy Minimum

- 불필요 개인정보 미수집
- Test 데이터 분석 고지
- 데이터 삭제 방법
- AI/Recommendation 한계 고지
- 의료 판단 아님을 명시

---

# 132. Recommendation Security

Recommendation Weight와 Product Score를  
Client Bundle에서 직접 노출하지 않는 것을 권장한다.

Server에서 계산.

---

# 133. AI Security — P1

LLM Prompt에

- System Secret
- DB Credential

절대 포함하지 않는다.

사용자 자유 입력은 Server에서 길이 제한.

---

# 134. Admin Requirement

전용 Admin Dashboard는 P0 필수가 아니다.

최소 운영 기능:

- Gear Data 수정
- User/Test Data 확인
- Recommendation 조회
- Event 확인

DB Console 또는 간단한 내부 Page로 시작 가능.

---

# 135. Product Data Management

초기 Product DB는 CSV Import 지원을 권장한다.

예:

```text
gear_seed.csv
→ validation
→ database import
```

10번 Rulebook 작업과 연결한다.

---

# 136. Product Import Validation

확인:

- Brand
- Model
- Score Range
- Required Field
- Duplicate
- Image URL

오류가 있으면 Import 중단.

---

# 137. Recommendation Configuration

Weight를 Code 곳곳에 하드코딩하지 않는다.

예:

```ts
const RECOMMENDATION_CONFIG = {
  version: "gear_reco_v1.0",
  weights: {
    need: 0.35,
    priority: 0.25,
    usage: 0.20,
    profile: 0.10,
    currentGear: 0.10
  }
}
```

---

# 138. Runner Type Configuration

질문과 Score도 Config로 분리.

```text
questions.ts
runner-types.ts
scoring.ts
```

---

# 139. Direction Configuration

```text
direction-templates.ts
```

각 Direction:

```text
code
title
description
target_attributes
```

---

# 140. Logging

Server Log에 최소:

- Error
- Recommendation Failure
- Login Rate Limit
- DB Failure

를 남긴다.

사용자 PIN, Session Secret 등 민감정보는 Log 금지.

---

# 141. Monitoring

MVP 출시 초기는 Traffic이 적어도  
다음 오류는 빠르게 알 수 있어야 한다.

- Login 전체 실패
- Recommendation 전체 실패
- DB 연결 실패
- Run 저장 실패

---

# 142. Backup

관리형 DB의 자동 Backup 기능 사용 권장.

MVP라도 사용자 Activity와 Recommendation 데이터를 잃지 않아야 한다.

---

# 143. Development Definition of Done

기능이 “화면에서 움직인다”만으로 완료가 아니다.

각 Story 완료 조건:

1. UI 동작
2. Server Validation
3. DB 저장
4. Refresh 후 유지
5. Event 기록
6. Error 처리
7. Test 통과

해당 기능에 적용되는 항목을 모두 확인한다.

---

# 144. MVP Release Gate — Functional

- [ ] New User Flow 완료
- [ ] Returning Login 완료
- [ ] Runner Type 저장
- [ ] Profile 저장
- [ ] Current Shoe 저장
- [ ] Run Add 저장
- [ ] Shoe Mileage 유지
- [ ] Recommendation 생성
- [ ] 3 Directions
- [ ] Product Candidate
- [ ] Recommendation Reason
- [ ] Feedback 저장
- [ ] Purchase Intent 저장

---

# 145. MVP Release Gate — Analytics

- [ ] Landing Event
- [ ] Test Funnel
- [ ] Profile Complete
- [ ] Run Add
- [ ] Return Session
- [ ] Gear Start
- [ ] Recommendation View
- [ ] Product View
- [ ] Helpful
- [ ] Purchase Intent

---

# 146. MVP Release Gate — Security

- [ ] PIN Hash
- [ ] Rate Limit
- [ ] Session Cookie
- [ ] Access Control
- [ ] Secrets not committed
- [ ] Production HTTPS

---

# 147. MVP Release Gate — QA

- [ ] New User E2E
- [ ] Returning User E2E
- [ ] Activity E2E
- [ ] Recommendation E2E
- [ ] Mobile QA
- [ ] Safari QA
- [ ] Chrome QA

---

# 148. MVP Release Gate — Data

한 User 기준:

```text
User
→ Identity
→ Profile
→ Gear
→ Activity
→ Recommendation
→ Feedback
```

전체 관계 추적 가능.

---

# 149. Non-goals for Development

MVP 개발 중 다음을 추가하지 않는다.

- Avatar
- Community
- Follow
- DM
- Ranking
- Strava Integration
- Multi-shoe Rotation
- Marketplace
- Payment
- Complex ML
- Native App

---

# 150. Technical Debt Policy

MVP라는 이유로

- 모든 코드를 한 파일에 작성
- DB Query를 UI에 직접 작성
- Password/PIN 평문
- Event 미구현
- Recommendation Hardcode

등을 허용하지 않는다.

반대로

- Microservice
- Kubernetes
- Event Streaming Platform
- Feature Store
- Data Lake

같은 과도한 구조도 만들지 않는다.

---

# 151. Recommended Balance

```text
Clean Monolith
+
Managed Services
+
Explicit Domain Logic
```

을 MVP 기본 전략으로 한다.

---

# 152. Development Priority Summary

```text
01 Foundation
   ↓
02 Prototype Migration
   ↓
03 User / Auth
   ↓
04 Runner Identity
   ↓
05 Profile / Gear
   ↓
06 Activity
   ↓
07 Recommendation
   ↓
08 Feedback / Analytics
   ↓
09 QA / Staging
   ↓
10 MVP Release
```

---

# 153. Claude Code Development Prompt Principle

Claude Code에게 매 작업마다 제공할 정보:

```text
1. 현재 작업 목표
2. 참고 문서
3. 수정 가능한 파일
4. 수정하면 안 되는 영역
5. Acceptance Criteria
6. 테스트 방법
```

---

# 154. Bad Prompt Example

> GearMatch AI MVP 만들어줘.

사용하지 않는다.

---

# 155. Good Prompt Structure

```text
현재 작업:
Activity 저장 기능 구현

참고:
05 User Flow
06 Data
08 Development Spec

요구사항:
- POST /api/activities
- Activity DB 저장
- Current Gear Mileage 동시 증가
- Transaction
- run_add event

제외:
- UI redesign
- Multi-shoe
- Strava

완료조건:
- Refresh 후 값 유지
- Unit/Integration Test 통과
```

---

# 156. MVP First Release Recommendation

첫 외부 테스트 Release에서는  
가능하면 P0만 먼저 배포한다.

P1:

- Save/Share
- Product Save
- Outbound
- AI Gear Coach

는 P0 안정화 후 순차적으로 추가해도 된다.

---

# 157. AI Gear Coach Release Recommendation

AI Gear Coach는 첫 MVP에 반드시 포함하지 않아도 된다.

권장:

```text
MVP v0.1
Structured Recommendation

↓

MVP v0.2
AI Gear Coach Lite
```

이렇게 분리하면 H3를

> Recommendation 자체 가치

와

> AI Explanation 추가 가치

로 구분할 수 있다.

---

# 158. MVP Technical Success Criteria

기술적으로 MVP가 성공했다고 보는 기준:

1. 사용자 데이터가 Session을 넘어 유지된다.
2. Runner Card가 DB 데이터로 렌더링된다.
3. Activity와 Shoe Mileage가 정합하게 연결된다.
4. Recommendation이 같은 Context에서 재현 가능하다.
5. Recommendation Version을 추적할 수 있다.
6. Product Behavior와 Feedback이 User에 연결된다.
7. H1/H3/H4/H5 계산이 가능하다.
8. P1 AI가 없어도 Core Service가 정상 작동한다.

---

# 159. 최종 개발 원칙

> **GearMatch AI MVP 개발의 목적은 Prototype을 더 화려하게 만드는 것이 아니다.**

목표는 현재 Prototype에서 표현된

```text
Runner Identity
→ Profile
→ Activity
→ Gear Usage
→ Recommendation
```

을 실제 사용자 데이터로 연결하고,

```text
Acquisition
→ Activation
→ Retention
→ Recommendation Value
→ Purchase Consideration
```

을 측정할 수 있는 제품을 만드는 것이다.

---

# 160. 09 문서 연결

다음 `09_MVP 개발 Backlog & Acceptance Criteria`에서는  
본 개발 명세서를 실제 작업 단위로 분해한다.

구조:

```text
Epic
→ User Story
→ Task
→ Acceptance Criteria
→ Test
→ Priority
```

각 개발 Task가 완료되었는지  
개발자와 기획자가 동일한 기준으로 판단할 수 있도록 한다.

---

# 161. 10 문서 연결

`10_러닝화 DB & Recommendation Rulebook`에서는

- 초기 제품 목록
- Product Attribute
- Score 기준
- Direction Template
- Weight
- Penalty
- Current Shoe Comparison Rule

을 확정한다.

08이 **개발 구조**라면  
10은 **추천 엔진에 들어가는 실제 데이터와 Rule**이다.

---

# 162. MVP 개발 시작 전 최종 Checklist

## Product

- [ ] 00~08 문서 공유
- [ ] Prototype 최종본 고정
- [ ] P0 Scope Lock

## Development

- [ ] Repository
- [ ] DB
- [ ] Staging
- [ ] Environment Variables
- [ ] Migration

## Data

- [ ] Runner Questions
- [ ] Runner Type Logic
- [ ] Gear DB 초안
- [ ] Recommendation Config

## Analytics

- [ ] Event List
- [ ] Analytics Project
- [ ] User/Session Strategy

## Security

- [ ] PIN Hash
- [ ] Rate Limit
- [ ] Session Policy

위 항목이 준비되면  
실제 MVP 개발 Sprint를 시작할 수 있다.
