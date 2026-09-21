# GearMatch AI — 프로젝트 현황

**갱신일:** 2026-09-21
**목적:** 집 PC / 회사 PC 어디서 열어도 "지금 어디까지 왔고 다음에 뭘 하면 되는지"를 이 문서 하나로 파악한다.

> 이 문서는 **현황 기록**이다. 기획 결정은 `docs/DECISIONS.md`, 개발 규칙은 `CLAUDE.md`,
> 작업 단위는 `09_..._Backlog_...md`가 각각 정본이다. 충돌 시 그쪽을 따른다.

---

## 1. 한 줄 요약

**기획 문서는 완비됐고, 실제 애플리케이션 코드는 아직 0줄이다.**
2026-09-21에 **D-09 정본 판정이 완료**돼 가장 큰 블로커는 풀렸다.
정본은 **레포 최신 기획서 + `Prototype v1.7`**, Runner Type은 **6종**이다.
남은 것은 GM-001 Scope Lock의 나머지 작업(레포 구조 재배치, `RULE_VERSIONS` 갱신,
`scripts/seed/` 재작성)이다.

---

## 2. 작업 공간 / Git

### 정본 작업 공간

```text
D:\Claude\GearMatch AI MVP\        ← 여기서만 작업한다
```

- Remote: `https://github.com/chorockai-lab/Prototype-Dev.git`
- Branch: `main` / 작업 Branch `prototype/v1.7-runner-identity`
- Tag: `prototype-v1.6` (v1.6 보존 기준점). `prototype-v1.7`은 main merge 후 생성
- 2026-09-21 기준 v1.7 Prototype과 문서 정합 작업이 `prototype/v1.7-runner-identity`에 올라가 있다

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
| E00 Scope Lock & Foundation | GM-001~004 | **진행 중** — D-09 판정 완료, GM-001 잔여 작업만 남음 |
| E01 Prototype Migration | GM-010~011 | 미착수 |
| E02 User & Authentication | GM-020~024 | 미착수 |
| E03 Runner Test & Identity | GM-030~033 | 미착수 — **차단 해제됨** (Runner Type 6종 확정) |
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

### ✅ 해소됨 — D-09 프로토타입 정본 판정 (2026-09-21)

`docs/DECISIONS.md` D-09가 `확정`으로 기록됐다.

| 항목 | 확정값 |
|---|---|
| 정본 문서 | `00 v1.1`, `01 v2.1`, `04 v1.1`, `05`~`09 v1.0` |
| 정본 프로토타입 | `Prototype_GearMatch_AI_1.7_RunnerIdentity.html` |
| 비주얼 | 라임/다크 `#D7FF2E` |
| Runner Type | **6종 enum** (`ROUTINE` / `EXPLORE` / `DISTANCE` / `PACE` / `RACE` / `ALL-AROUND`) |
| Current Shoe | Active 1개 (Multi-shoe는 P2) |
| Similar Runner | **P0 — Gear Discovery 한정** (사람 탐색·프로필은 P2) |
| Product DB | `10-A v1.5` (`product_db_v1.5`) |

- `archive/`의 v1.2와 루트의 v1.5 / v1.6은 **보관본**이다. 삭제하지 않고 기준으로도 쓰지 않는다
- **GM-031(Runner Type Engine) 착수 차단은 해제됐다**
- D-01 / D-02 / D-03 / D-08은 대체됐고, 각 항목에 대체 내용을 붙였다
- D-04~D-07은 그대로 유효하다

### ✅ 해소됨 — `CLAUDE.md` 경로 불일치 (2026-09-21)

`CLAUDE.md` §3을 실제 레포 구조(루트 평면 배치)에 맞춰 수정했다.
존재하지 않던 `docs/10_..._Rulebook_v1.0.md`, `data/`, `docs/background/` 참조는 제거했다.

> 레포 구조를 `CLAUDE.md` 선언대로 재배치하는 방향(문서를 `docs/`로 옮기는 것)도
> 가능하지만, 지금은 **문서를 실제 구조에 맞춘 쪽**으로 정리했다.
> 재배치를 원하면 GM-001에서 별도로 진행한다.

### 🟡 데이터 파이프라인 버전 불일치

**이건 아직 남아 있다.**

`scripts/seed/`는 `PDB_v0.2`(제품 61 · Evidence 397) 기준으로 작성돼 있다.
D-09가 확정한 정본은 `product_db_v1.5` = `10-A v1.5`(35개 / VERIFIED 10)다.
`src/domain/shared/vocabulary.ts`의 `RULE_VERSIONS`는 2026-09-21에 확정 버전으로 갱신했지만,
**`scripts/seed/` 파이프라인 재작성은 미착수**다.

---

## 6. 진행 순서

### 0단계 — 작업 공간 통일 `미착수`

`D:\Claude\.git` 제거, 중복 정리, 작업 디렉터리를 레포 폴더로 고정. (§2 참조)

### 1단계 — GM-001 Scope Lock `진행 중` ← **실질적인 다음 할 일**

- [x] **D-09 판정** — Runner Type **6종** 확정 (2026-09-21)
- [x] 판정 결과를 `docs/DECISIONS.md` D-09에 `확정`으로 기록
- [x] 문서 10 Rulebook 참조를 `CLAUDE.md` §3에서 제거
- [x] `RULE_VERSIONS` 상수를 확정 버전으로 갱신
- [x] 문서 간 상호 참조 버전 정합 (04~09의 상위 기준 문서, 기준 Prototype)
- [ ] 보관본(`archive/` v1.2, 루트 v1.5)의 보관 사유를 `archive/README.md`에 명시
- [ ] 레포 구조 재배치 여부 결정 (`docs/`, `data/`, `prototype/`로 옮길지)
- [ ] `scripts/seed/`를 `10-A v1.5` 기준으로 재작성
- [ ] P0 기능 목록 단일 문서화 (v1.7의 Today's Run / Share Card / Insight / Runners Like You 포함)

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
