# GearMatch AI — 프로젝트 현황

**갱신일:** 2026-09-17
**목적:** 집 PC / 회사 PC 어디서 열어도 "지금 어디까지 왔고 다음에 뭘 하면 되는지"를 이 문서 하나로 파악한다.

> 이 문서는 **현황 기록**이다. 기획 결정은 `docs/DECISIONS.md`, 개발 규칙은 `CLAUDE.md`,
> 작업 단위는 `09_..._Backlog_...md`가 각각 정본이다. 충돌 시 그쪽을 따른다.

---

## 1. 한 줄 요약

**기획 문서는 완비됐고, 실제 애플리케이션 코드는 아직 0줄이다.**
백로그 기준으로 **GM-001(Scope Lock)도 미완료** 상태이며, 그 안에 포함된
**D-09 정본 판정(Runner Type 5종 vs 6종)** 이 이후 모든 구현을 막고 있다.

---

## 2. 작업 공간 / Git

### 정본 작업 공간

```text
D:\Claude\GearMatch AI MVP\        ← 여기서만 작업한다
```

- Remote: `https://github.com/chorockai-lab/Prototype-Dev.git`
- Branch: `main`
- 2026-09-17 기준 working tree clean, 원격과 동기화됨 (`ccd66a0`)

### ⚠️ 유령 저장소 (정리 필요)

```text
D:\Claude\.git                     ← 커밋 0개 · 리모트 없음 · branch prototype/html-flow
```

2026-09-02 ~ 09-09에 쓰던 옛 작업 공간의 잔재다. **여기서 작업하면 GitHub에 반영되지 않는다.**

내용 비교 결과 **정본 레포가 상위 집합**이므로 유실 위험 없이 정리 가능하다.

| 상위 폴더에만 있는 것 | 판단 |
|---|---|
| `archive/prototype-multifile/prototype.zip` | 빌드 산출물 — 폐기 가능 |
| `prototype/..._v1.2_single.html` | 레포에는 `archive/`로 이동 완료 — 중복 |
| `HP/` | 빈 폴더 |

상위 폴더의 `DESIGN.md` · `package.json` · `tsconfig.json` · `seed/` · `scripts/` · `src/`는
레포본과 **내용 동일**(줄바꿈 차이뿐)이다.

### 정리 절차 (미실행)

1. `D:\Claude\.git` 삭제
2. 상위 중복 파일/폴더 제거
3. 이후 모든 세션의 작업 디렉터리를 `D:\Claude\GearMatch AI MVP\`로 고정

---

## 3. 레포 자산 인벤토리

### 있는 것 ✅

| 구분 | 내용 |
|---|---|
| 기획 문서 | `00`~`09`, `11` (루트에 평면 배치) |
| Product DB | `06-A ... v0.3.xlsx`, `10-A ... v1.5_LogicReviewed.xlsx` |
| 프로토타입 | 루트 `Prototype_..._1.5_ShoeImages_Embedded.html` (Visual SSOT) |
| 프로토타입 (구) | `archive/..._v1.1_single.html`, `archive/..._v1.2_single.html`, `archive/prototype-multifile/` |
| 디자인 | `DESIGN.md` (「레인 배정」 시스템 — v1.2 계열), `prototype/design/*.dc.html` |
| 제품 정의 | `PRODUCT.md` |
| 결정 기록 | `docs/DECISIONS.md` (D-01~D-09) |
| 데이터 파이프라인 | `scripts/seed/` (xlsx→JSON 변환·검증), `seed/products.v0.2.json` |
| 도메인 상수 | `src/domain/shared/vocabulary.ts` |
| 개발 규칙 | `CLAUDE.md` |

### 없는 것 ❌

- **애플리케이션 코드 전체** — Next.js 설정 없음, `src/`에 `vocabulary.ts` 1개뿐
- **DB** — 마이그레이션·스키마 없음
- **문서 10** — `docs/10_..._러닝화_DB_및_Recommendation_Rulebook_v1.0.md`
  `CLAUDE.md` §3이 우선순위 7번으로 참조하는데 **파일 자체가 존재하지 않는다**
- 테스트, CI, `.env.example`

---

## 4. 백로그 진행률

| Epic | 내용 | 상태 |
|---|---|---|
| E00 Scope Lock & Foundation | GM-001~004 | **미완료** — GM-001부터 막힘 |
| E01 Prototype Migration | GM-010~011 | 미착수 |
| E02 User & Authentication | GM-020~024 | 미착수 |
| E03 Runner Test & Identity | GM-030~033 | **D-09에 차단됨** |
| E04 Profile & Current Shoe | GM-040~042 | 미착수 |
| E05 Activity & Shoe Mileage | GM-050~053 | 미착수 |
| E06 Product DB Foundation | GM-060~063 | **부분 선행** — `scripts/seed/`가 GM-060 일부 구현 |
| E07 Recommendation Engine | GM-070~079 | 미착수 |
| E08 Recommendation Experience | GM-080~082 | 미착수 |
| E09 Feedback & Purchase Intent | GM-090~092 | 미착수 |
| E10 Analytics | GM-100~105 | 미착수 |
| E11 QA / Staging / Release | GM-110~117 | 미착수 |

전부 P0다. P1/P2(GM-120 이상)는 논외.

---

## 5. 지금 막고 있는 것

### 🔴 블로커 — D-09 프로토타입 정본 판정

`docs/DECISIONS.md` D-09에 `보류`로 기록돼 있다. 두 갈래가 정면 충돌한다.

| 항목 | A안 — D-01~D-08 계열 | B안 — 레포 최신 기획서 |
|---|---|---|
| 근거 문서 | `01 v1.4`, `04 v0.4`, `05 v0.2`, `06 v0.1` | `01 v2.1`, `04 v1.1`, `05`~`09 v1.0` |
| 프로토타입 | `archive/..._v1.2_single.html` (09-02) | 루트 `..._1.5_...html` (09-04) |
| 비주얼 | 「레인 배정」 트랙 적갈색 `#A63D25` | 라임/다크 `#D7FF2E` |
| Runner Type | **5 Core + Modifier 4** | **6종 enum** |
| Current Shoe | Closet 최대 3 | Active 1개 |
| Similar Runner | P0 Evidence | P2 |
| Product DB | `PDB_v0.2` — 61개 / Eligible 29 | `10-A v1.5` — 35개 / VERIFIED 10 |

**A안 5종 + Modifier**
`RHYTHM_MAKER` / `MOMENTUM_BUILDER` / `DISTANCE_ARCHITECT` / `PACE_TACTICIAN` / `VERSATILE_EXPLORER`
Modifier: `COMFORT_FIRST` / `SPEED_CURIOUS` / `DISTANCE_UP` / `RACE_READY`

**B안 6종** (`04 §11`)
`ROUTINE RUNNER` / `EXPLORE RUNNER` / `DISTANCE RUNNER` / `PACE RUNNER` / `RACE RUNNER` / `ALL-AROUND RUNNER`

- **판정 시점: GM-001 Scope Lock.** 그 전까지 어느 쪽도 정본이라 부르지 않는다
- **판정 전 신규 구현은 `CLAUDE.md`가 지정한 v1.5 + 최신 기획서(B안)를 따른다**
- Runner Type이 정해지지 않으면 **GM-031(Runner Type Engine)에 착수할 수 없고**,
  그 위에 얹히는 추천 엔진(E07) 전체가 멈춘다
- D-06(Caution 3단계)은 "Hard 적용 시 후보 0개"라는 실측에서 나온 것이라
  타입 체계와 무관하게 유효하다

### 🟠 구조 불일치 — `CLAUDE.md`의 경로가 전부 실존하지 않음

| `CLAUDE.md` 선언 | 실제 |
|---|---|
| `prototype/Prototype_..._1.5_...html` | 루트에 있음 |
| `docs/08_...md`, `docs/09_...md` | 루트에 평면 배치 |
| `docs/10_..._Rulebook_v1.0.md` | **파일 없음** |
| `data/10-A_....xlsx` | 루트에 있음 |
| `docs/background/01~03` | 없음 (루트 평면) |

GM-001 Task "00~10 문서 Repository `/docs`에 배치"가 미완료라서 생긴 문제다.
Claude Code가 `CLAUDE.md`대로 경로를 찾으면 전부 실패한다.

### 🟡 데이터 파이프라인 버전 불일치

`scripts/seed/`는 `PDB_v0.2`(제품 61 · Evidence 397) 기준으로 작성돼 있다.
현재 `CLAUDE.md`가 지정한 정본은 `product_db_v1.5` = `10-A v1.5`(35개 / VERIFIED 10)다.
`src/domain/shared/vocabulary.ts`의 `RULE_VERSIONS`도 v0.1/v0.2 계열로 남아 있다.

---

## 6. 진행 순서

### 0단계 — 작업 공간 통일 `미착수`

`D:\Claude\.git` 제거, 중복 정리, 작업 디렉터리를 레포 폴더로 고정. (§2 참조)

### 1단계 — GM-001 Scope Lock `미착수` ← **실질적인 다음 할 일**

- [ ] **D-09 판정** — Runner Type 5종 vs 6종 결정 (의사결정권자: PM)
- [ ] 판정 결과를 `docs/DECISIONS.md` D-09에 `승인`으로 기록
- [ ] 폐기된 쪽의 프로토타입·디자인 자산 `archive/` 정리 및 사유 명시
- [ ] 레포 구조를 `CLAUDE.md` 선언대로 재배치 (`docs/`, `data/`, `prototype/`)
- [ ] 문서 10 Rulebook 작성 또는 `CLAUDE.md` §3에서 참조 제거
- [ ] `RULE_VERSIONS` 상수를 확정 버전으로 갱신
- [ ] P0 기능 목록 단일 문서화

### 2단계 — 기반 공사

- **GM-002** Next.js / React / TypeScript, `.env.example`, Lint, Build, README
- **GM-003** 15개 테이블 마이그레이션 (`users` ~ `events`)
- **GM-004** Local / Staging / Production 분리

### 3단계 — 제품 구현

E01 프로토타입 React 이전 → E02 인증 → E03 Runner Test → E04 Profile/Current Shoe
→ E05 Activity → E06 Product DB → E07 추천 엔진 → E08 추천 경험 → E09 피드백
→ E10 Analytics → E11 QA

---

## 7. 새 세션 시작 체크리스트

1. 작업 디렉터리가 `D:\Claude\GearMatch AI MVP\`인지 확인
2. `git pull`
3. `CLAUDE.md` → 이 문서(`docs/STATUS.md`) → `docs/DECISIONS.md` 순으로 읽기
4. 작업할 Backlog ID를 `09_...md`에서 확인
5. 작업 후 `git add . && git commit && git push`
