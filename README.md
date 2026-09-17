# GearMatch AI

GearMatch AI는 러너의 신체 특성, 러닝 습관, 러닝 목적, 현재 장비 정보를 바탕으로  
사용자에게 적합한 러닝 장비 선택을 돕는 **AI 기반 러닝 기어 추천 서비스**입니다.

현재 프로젝트는 **Prototype → MVP 구현 단계**이며,  
기획 문서, 추천 데이터베이스, HTML Prototype을 기준으로 실제 서비스 구현을 진행합니다.

---

## 1. Project Goal

GearMatch AI의 핵심 목표는 단순한 상품 추천이 아니라  
사용자가 자신의 러닝 특성을 이해하고 **장비 선택에 대한 확신**을 얻도록 돕는 것입니다.

MVP에서는 다음을 우선 검증합니다.

- Runner Test를 통한 러너 특성 수집
- Runner Card 생성
- 러닝화 추천
- 추천 근거 및 주의사항 제공
- AI Gear Coach의 초기 경험 제공
- 사용자 행동 및 추천 반응 데이터 수집
- 향후 Similar Runner / 기록 기반 추천 고도화를 위한 데이터 축적

---

## 2. Current Project Stage

현재 단계:

**Prototype UI/UX 확정 → Recommendation DB 검토 → MVP 구현**

개발 시 기존 기획을 임의로 확장하지 않고  
현재 확정된 문서와 Recommendation DB를 기준으로 구현합니다.

---

## 3. Source of Truth

개발 전 아래 자료를 우선 확인합니다.

### Planning

- `00_GearMatch_AI_Master_Context...md`
- `01_GearMatch_AI_사업·서비스_정의서...md`
- `02_GearMatch_AI_핵심_가설_및_검증_계획서...md`
- `03_GearMatch_AI_타깃_사용자_및_JTBD_정의서...md`
- `04_GearMatch_AI_MVP_Scope_정의서...md`
- `05_GearMatch_AI_User_Flow_및_Service_Blueprint...md`
- `06_GearMatch_AI_데이터_기획서...md`
- `07_GearMatch_AI_Recommendation_및_AI_Gear_Coach_정의서...md`
- `08_GearMatch_AI_MVP_개발_명세서...md`
- `09_GearMatch_AI_MVP_개발_Backlog_및_Acceptance_Criteria...md`

### Recommendation Data

- `10-A_GearMatch_AI_Product_Recommendation_DB...xlsx`

Recommendation DB는 추천 로직의 기준 데이터로 사용합니다.

### Prototype

- `Prototype_GearMatch_AI_...html`

현재 Prototype은 MVP의 **User Flow / UI / Interaction 기준**으로 사용합니다.

### Claude Code Instructions

- `CLAUDE.md`

Claude Code는 작업 전 `CLAUDE.md`를 가장 먼저 확인합니다.

### Current Status

- `docs/STATUS.md`

작업을 이어서 시작할 때 확인합니다. Git 상태, 백로그 진행률, 현재 블로커, 다음 순서가 정리돼 있습니다.

### Prototype 단계 산출물 (2026-09-10 동기화)

작업 PC에서만 존재하던 아래 자산을 레포로 옮겼습니다.

| 경로 | 무엇 |
|---|---|
| `PRODUCT.md` | 제품 정의 · 사용자 · 확정 규칙 · 보유 근거 요약 |
| `DESIGN.md` | 「레인 배정」 디자인 시스템 (색·타이포·컴포넌트 토큰) |
| `docs/DECISIONS.md` | 기획 문서 간 충돌 해소 기록 (D-01~D-09) |
| `docs/UX_Prototype_Fix_Plan_v1.0.md` | UX 개선 계획 |
| `docs/superpowers/` | 프로토타입 제작 당시 plan / spec 기록 |
| `seed/products.v0.2.json` | Product DB `PDB_v0.2` 정규화 산출물 (제품 61 · Evidence 397) |
| `scripts/seed/` | xlsx → JSON 변환 및 검증 파이프라인 (`GM-060` 선행 구현) |
| `src/domain/shared/vocabulary.ts` | 도메인 용어 · Rule Version 상수 |
| `archive/` | 프로토타입 v1.2 및 보관 규칙 |

> ⚠️ **정본 판정 보류.** `archive/`의 프로토타입 v1.2와 루트의 v1.5는 비주얼 월드도
> Runner Type 체계(5종 vs 6종)도 다릅니다. 판정 전까지 **신규 구현은 `CLAUDE.md`가
> 지정한 v1.5와 최신 기획서를 따릅니다.** 상세는 `docs/DECISIONS.md` D-09 참조.

`scripts/seed/`는 `PDB_v0.2` xlsx를 대상으로 작성되어 있어, 현재 `10-A v1.5`에 맞춰
갱신이 필요합니다.

---

## 4. Recommended Project Structure

```text
GearMatchAI/
│
├─ README.md
├─ CLAUDE.md
├─ .gitignore
│
├─ docs/
│   ├─ 00_Master_Context.md
│   ├─ 01_Service_Definition.md
│   ├─ 02_Hypothesis_Validation.md
│   ├─ 03_Target_User_JTBD.md
│   ├─ 04_MVP_Scope.md
│   ├─ 05_User_Flow_Service_Blueprint.md
│   ├─ 06_Data_Plan.md
│   ├─ 07_AI_Gear_Coach.md
│   ├─ 08_Development_Spec.md
│   └─ 09_Backlog_Acceptance_Criteria.md
│
├─ data/
│   ├─ source/
│   │   └─ GearMatch_Product_Recommendation_DB.xlsx
│   └─ processed/
│
├─ prototype/
│   └─ GearMatch_AI_Prototype.html
│
├─ assets/
│   ├─ runner-cards/
│   ├─ shoes/
│   ├─ icons/
│   └─ logos/
│
├─ src/
│
└─ tests/
```

현재 파일 구조는 단계적으로 위 구조로 정리합니다.

---

## 5. Development Principles

### Planning

- 확정된 기획 문서를 기준으로 개발합니다.
- MVP Scope에 없는 기능을 임의로 추가하지 않습니다.
- 기획 변경이 필요한 경우 구현보다 문서 정의를 먼저 수정합니다.

### Data

- 원본 Recommendation DB는 임의로 수정하지 않습니다.
- 실제 서비스에서 사용할 변환 데이터는 `data/processed/`에서 관리합니다.
- 추천 결과는 가능한 한 데이터 근거를 추적할 수 있어야 합니다.

### UI / UX

- 현재 Prototype의 User Flow를 기준으로 합니다.
- 디자인 변경이 기능 흐름을 훼손하지 않도록 합니다.
- 모바일 환경을 우선 고려합니다.
- Runner Card와 Gear Recommendation은 핵심 사용자 경험으로 취급합니다.

### AI

MVP의 AI는 서비스 전체를 주도하기보다  
사용자가 추천 결과를 이해할 수 있도록 돕는 역할에 집중합니다.

주요 역할:

- 추천 이유 설명
- 장비 특성 설명
- 사용자 조건에 따른 주의사항 제공
- 향후 AI Gear Coach 고도화를 위한 사용자 반응 수집

---

## 6. Git Workflow

이 프로젝트는 GitHub를 중앙 저장소로 사용합니다.

Repository:

`chorockai-lab/Prototype-Dev`

집 PC와 회사 PC 모두 동일한 GitHub Repository를 사용합니다.

### 작업 시작

```bash
git pull
```

원격 저장소의 최신 상태를 가져온 후 작업합니다.

### 작업 확인

```bash
git status
git diff
```

### 작업 저장

```bash
git add .
git commit -m "작업 내용을 설명하는 메시지"
git push
```

예:

```bash
git commit -m "Add runner questionnaire flow"
git commit -m "Improve runner card UI"
git commit -m "Integrate recommendation database"
git commit -m "Fix mobile recommendation result layout"
```

---

## 7. Working with Claude Code

Claude Code는 프로젝트 루트인 `GearMatchAI` 폴더를 작업 공간으로 사용합니다.

작업 전 확인 순서:

1. `CLAUDE.md`
2. 관련 기획 문서
3. Recommendation DB
4. 현재 Prototype
5. 기존 소스 코드

Claude Code에 큰 범위의 작업을 한 번에 요청하기보다  
기능 단위로 작업합니다.

예:

```text
docs/04_MVP_Scope.md와
docs/05_User_Flow_Service_Blueprint.md를 기준으로

현재 Runner Test Flow만 구현해.

Recommendation 기능은 아직 수정하지 마.
```

작업 후에는 다음을 확인합니다.

- 변경된 파일
- 주요 변경사항
- 기획과 다른 부분
- 테스트 필요 항목
- 다음 작업 후보

---

## 8. Version Management

기획 문서는 파일명에 `최종`, `최종2`, `v2`, `v3` 등을 계속 추가하지 않습니다.

Git Commit을 통해 변경 이력을 관리합니다.

예:

```text
docs/04_MVP_Scope.md
```

파일 하나를 지속적으로 수정하고 Git으로 버전을 추적합니다.

단, Recommendation DB처럼  
실험 및 추천 결과의 기준 데이터셋을 명확히 구분해야 하는 경우에는 버전을 유지할 수 있습니다.

예:

```text
GearMatch_Product_Recommendation_DB_v1.5.xlsx
GearMatch_Product_Recommendation_DB_v1.6.xlsx
```

---

## 9. MVP Development Priority

현재 우선순위:

1. 프로젝트 구조 정리
2. Prototype 기준 User Flow 확정
3. Runner Test 구현
4. Runner Card 구현
5. Recommendation DB 연동
6. 추천 결과 및 추천 근거 구현
7. AI Gear Coach 초기 기능 적용
8. 사용자 행동 데이터 수집 구조 적용
9. QA 및 MVP 테스트

---

## 10. Project Rule

GearMatch AI 개발 과정에서 가장 중요한 기준은 다음과 같습니다.

> **기획은 문서에서 관리하고, 데이터는 DB에서 관리하며, 구현은 코드에서 관리하고, 변경 이력은 Git에서 관리한다.**

GitHub를 프로젝트의 중앙 기준 저장소로 사용하며,  
집과 회사에서 동일한 프로젝트를 지속적으로 이어서 개발합니다.
