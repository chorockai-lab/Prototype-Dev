# GearMatch AI — Claude Code Project Rules

## 1. Project Goal

Build the GearMatch AI Closed MVP based on the approved Prototype and planning documents.

GearMatch AI is a Runner Identity based Gear Decision Support service.

Core product loop (Prototype v1.7):

RUN
→ EXPRESS
→ DISCOVER
→ UNDERSTAND
→ EXPLORE

Concretely:

Runner Test
→ Runner Identity Reveal
→ Runner ID Card
→ Today's Run (photo + distance + time, pace auto)
→ Today's Run Share Card
→ Running Insight
→ Runners Like You (Shoes / Style)
→ Gear Need
→ 3 Gear Directions
→ Product Candidates
→ Recommendation Reasons
→ Feedback
→ Purchase Consideration

Gear is not removed; it moves behind Identity, Activity and Expression.

The MVP exists to validate:

- H1 Runner Identity
- H3 Recommendation Value
- H4 Retention
- H5 Purchase Consideration

Do not expand the product beyond this scope without explicit approval.

---

## 2. Visual Source of Truth

The current visual and UX reference is:

Prototype_GearMatch_AI_1.7_RunnerIdentity.html  (repository root)

Preserve:

- visual hierarchy
- typography
- colors
- spacing
- Runner Card visuals
- major interaction patterns
- question copy
- CTA structure
- overall design identity

Do NOT redesign the service simply because another UI pattern is easier to implement.

Claude Code is the implementation engineer, not the art director.

---

## 3. Development Source Priority

For feature and logic decisions, use this priority:

All planning documents live in the repository root, not in docs/.

1. 09_GearMatch_AI_MVP_개발_Backlog_및_Acceptance_Criteria_v1.0.md
2. 08_GearMatch_AI_MVP_개발_명세서_v1.0.md
3. 04_GearMatch_AI_MVP_Scope_정의서_v1.1.md
4. 05_GearMatch_AI_User_Flow_및_Service_Blueprint_v1.0.md
5. 06_GearMatch_AI_데이터_기획서_v1.0.md
6. 07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서_v1.0.md
7. 10-A_GearMatch_AI_Product_Recommendation_DB_v1.5_LogicReviewed.xlsx
8. 00_GearMatch_AI_Master_Context_v1.1.md
9. docs/DECISIONS.md (확정된 결정 · D-09 정본 판정 포함)

For visual decisions:

1. Prototype_GearMatch_AI_1.7_RunnerIdentity.html (current)
2. Approved visual assets
3. Planning documents

Read 01~03 (사업·서비스 정의서 / 핵심 가설 / 타깃 사용자·JTBD) only when
product strategy, target user, JTBD, or hypothesis context is actually needed.

---

## 4. Current Versions

Product DB:
product_db_v1.5

Recommendation Rule:
gear_reco_v1.1

Product Normalization:
product_norm_v1.1

Do not silently change these versions or rules.

---

## 5. Recommendation Principle

The recommendation pipeline must be deterministic.

Runner Context
+
Current Shoe
+
Gear Need
+
Priority
+
Verified Product DB

→ Eligibility Filter
→ Direction Role Filter
→ Rule / Score
→ Penalty
→ Candidate Diversity
→ 3 Gear Directions
→ Product Candidates

AI must NOT select products freely.

AI must NOT reorder candidates.

AI must NOT fabricate product facts.

AI Gear Coach is an explanation layer only.

---

## 6. Recommendation Product Rule

Only VERIFIED and recommendation-eligible products may be used.

Do not use DRAFT products in actual recommendations.

Do not expose internal 0–100 scores to users.

Do not display:

- BEST
- Perfect Match
- Fit %
- 1st / 2nd / 3rd ranking

The UI must present different decision directions and trade-offs.

---

## 7. Current Shoe Principle

Current Shoe is a core GearMatch context.

Recommendation should answer:

"How is this candidate different from what the user currently runs in?"

not:

"Is this candidate objectively better?"

If Current Shoe is UNKNOWN:

Do not invent a neutral transition score.

Renormalize the remaining recommendation components.

---

## 8. Scope Protection

P0 first.

Do NOT implement unless explicitly requested:

- Avatar
- Card customization
- Other Runner Profile
- Community
- Follow
- Comment
- DM
- Ranking
- Group Run
- Competition
- Multi-shoe rotation
- Strava / Garmin / NRC integration
- Marketplace
- Payment
- Advanced ML recommendation

Similar Runner is IN scope as of Prototype v1.7, but only as Gear Discovery
("나와 조건이 비슷한 러너들이 사용하는 Shoes"). People browsing, other runner
profiles, following and any community surface remain out of scope.

Style is a Concept Preview only: no apparel product DB, no apparel
recommendation engine, no sizing, no commerce.

Do not add a feature because it seems useful.

---

## 9. Working Method

Do not implement the entire MVP in one request.

Work using Backlog IDs defined in document 09.

Example:

GM-050 Add Run
GM-052 Shoe Mileage

For every task:

1. Read the requested Backlog item in document 09.
2. Identify only the supporting documents required.
3. Inspect the existing implementation.
4. State a short implementation plan.
5. Implement the task.
6. Run tests.
7. Check every Acceptance Criterion.
8. Report the result.

Final report must include:

- Backlog IDs completed
- files changed
- database/schema changes
- events added
- tests performed
- Acceptance Criteria PASS / FAIL
- unresolved issues
- recommended next Backlog item

Do not mark a task complete if its Acceptance Criteria are not satisfied.

---

## 10. Code Principles

Prefer:

- simple architecture
- explicit domain logic
- typed data
- server-side validation
- reusable components
- deterministic recommendation logic
- testable functions

Avoid:

- premature abstractions
- unnecessary microservices
- unnecessary dependencies
- hidden business logic inside UI components
- large speculative refactors

---

## 11. MVP Architecture Direction

Preferred:

Next.js
React
TypeScript
Managed PostgreSQL
Server-side Recommendation Engine
Managed deployment
Product Analytics

Use Clean Monolith architecture.

Do not introduce a separate backend or microservice unless required.

---

## 12. Data Principles

- UUID is the internal User ID.
- Nickname is not the primary key.
- PIN must never be stored in plaintext.
- Recommendation context must be reproducible.
- Store recommendation rule version.
- Store product DB version.
- Preserve missing values as missing.
- Do not invent user data.

---

## 13. Definition of Done

A P0 task is not complete simply because the screen works.

Where applicable it must include:

UI
+ Server Validation
+ DB Persistence
+ Refresh Persistence
+ Analytics Event
+ Loading State
+ Error State
+ Authorization
+ Tests
+ Staging QA

---

## 14. Important Rule

When requirements are ambiguous:

Do not invent product decisions.

First:

- inspect the relevant docs,
- explain the ambiguity,
- propose the smallest reasonable options.

Ask for a decision only when the ambiguity materially changes MVP behavior.