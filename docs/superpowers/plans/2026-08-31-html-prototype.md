# GearMatch AI HTML Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing → Runner Test(8단계) → Runner Type Result → Runner Card 흐름을 클릭 가능한 HTML 프로토타입으로 구현해 09 UI Guide 방향을 GPT가 판단할 수 있게 한다.

**Architecture:** 단일 `index.html` + hash 라우팅. 빌드 없음. `file://` 더블클릭 실행을 보장하기 위해 ES Module 대신 classic `<script>`로 단일 전역 `GM`에 데이터·규칙·렌더러를 순서대로 적재한다. 상태는 `GM.store`가 소유하고 `sessionStorage`에 저장한다.

**Tech Stack:** HTML5, CSS Custom Properties, Vanilla JS (ES2020 문법, 모듈 없음). 외부 의존성 0, 웹폰트 CDN 미사용.

**Spec:** `docs/superpowers/specs/2026-08-31-html-prototype-design.md`

## Global Constraints

- 빌드 도구·번들러·트랜스파일러 금지. `prototype/index.html` 더블클릭으로 동작해야 한다.
- `fetch()` / ES Module / `import` 금지 — `file://`에서 실패한다.
- 전역은 `window.GM` 하나만 만든다. 다른 전역 변수를 추가하지 않는다.
- UI 코드에 사용자 표시 문자열을 직접 쓰지 않는다. 전부 `GM.t(key)`.
- Mock 값과 사용자 입력 값을 섞지 않는다. Mock은 `GM.mock`에만 존재한다.
- 색·간격·타이포는 `css/tokens.css`의 CSS 변수만 사용한다. 컴포넌트에 리터럴 색상값 금지.
- Radius 최대 8px(Runner Card 2px), `box-shadow` 최소, Section 구분은 여백 우선.
- 09 §30 "하지 말 것": 모든 Section을 Rounded Card로 구성, Gradient 남발, Glassmorphism, Neon, Dashboard Grid, 쇼핑몰 Product Grid, ChatGPT Clone UI, RPG/Trading Card, 과도한 Icon/Emoji, 불필요한 Animation, Desktop 우선.
- 09 §14.2 금지 언어: MD 추천 / BEST / 인기상품 / 가장 많이 팔린 / 추천템 / Hot Item / Deal / Must Buy.
- 모든 선택지는 `<button>`. Tap target ≥ 44px. `prefers-reduced-motion` 대응.
- Core Type 영문 표기 고정: `RHYTHM MAKER` / `MOMENTUM BUILDER` / `DISTANCE ARCHITECT` / `PACE TACTICIAN` / `VERSATILE EXPLORER`
- Modifier 영문 표기 고정: `Comfort-First` / `Speed-Curious` / `Distance-Up` / `Race-Ready`

**검증 방식:** 이 프로토타입에는 테스트 프레임워크를 도입하지 않는다(폐기 전제, 09 §23 "과도한 Design System화 금지"와 같은 취지). 각 Task는 브라우저 실렌더 확인으로 검증한다. 검증은 `mcp__Claude_Browser__navigate` + `read_page`/`screenshot`으로 수행한다.

---

### Task 1: 스캐폴드 + Design Token + 라우팅 골격

**Files:**
- Create: `prototype/index.html`
- Create: `prototype/css/tokens.css`
- Create: `prototype/css/base.css`
- Create: `prototype/js/store.js`
- Create: `prototype/js/router.js`

**Interfaces:**
- Produces: `window.GM` 네임스페이스. `GM.store.get()/set(patch)/reset()`, `GM.store.state`(`{locale, step, answers, result, preview}`). `GM.router.start(routes)` — `routes`는 `{ '#/': fn, '#/test': fn, '#/type': fn, '#/card': fn }`, 각 fn은 컨테이너 `HTMLElement`를 받아 렌더. `GM.router.go(hash)`.

- [ ] **Step 1: `tokens.css` 작성** — spec §6 표의 값을 CSS 변수로. 색(`--bg --surface --text --text-muted --divider --accent --energy`), Type Accent 5색(`--type-rhythm` 등), 타입스케일(`--fs-display --fs-h1 --fs-body --fs-label`), 간격 스케일(`--s1`~`--s8`), radius(`--r-sm 4px --r-md 8px --r-card 2px`), motion(`--dur-fast 160ms --dur 200ms --ease`).
- [ ] **Step 2: `base.css` 작성** — reset, `html/body` 배경·글자색, 폰트 스택(`Pretendard, -apple-system, "Segoe UI", "Noto Sans KR", sans-serif`), `:focus-visible` 링, `.sr-only`, `@media (prefers-reduced-motion: reduce)`에서 `animation:none; transition:none`, 컨테이너 폭(mobile full → `≥768px` 여백 → `≥1024px` max-width 960px 중앙).
- [ ] **Step 3: `store.js` 작성** — `sessionStorage` 키 `gm.proto.v1`. `reset()`은 locale을 보존하고 나머지를 초기화.
- [ ] **Step 4: `router.js` 작성** — `hashchange` 리스너, 미지정 해시는 `#/`로. 라우트 진입 시 컨테이너를 비우고 해당 렌더러 호출, `window.scrollTo(0,0)`.
- [ ] **Step 5: `index.html` 작성** — `<main id="app">`, `<div id="overlay">`, `<script>` 태그를 의존 순서대로 배치: `i18n.ko.js, i18n.en.js, questions.js, data.mock.js, type-rule.js, runner-graphic.js, store.js, i18n.js, router.js, app.js`. (아직 없는 파일도 미리 적어두되 이 Task에서는 `store/router`만 존재 → 나머지는 Task 2~5에서 생성)
- [ ] **Step 6: 브라우저 검증** — `prototype/index.html`을 열어 콘솔 에러가 `i18n.ko.js` 등 미생성 파일의 404뿐인지 확인. `GM.store`와 `GM.router`가 정의되어 있을 것.

---

### Task 2: i18n 엔진 + ko/en 리소스 + 언어 토글

**Files:**
- Create: `prototype/js/i18n.ko.js`
- Create: `prototype/js/i18n.en.js`
- Create: `prototype/js/i18n.js`
- Modify: `prototype/css/components.css` (생성)

**Interfaces:**
- Consumes: `GM.store`
- Produces: `GM.i18n.ko` / `GM.i18n.en` (평면 key→string 객체), `GM.t(key, vars)` — 누락 시 key 반환 + `console.warn`, `{name}` 형태 치환 지원. `GM.setLocale(locale)` — `document.documentElement.lang` 갱신 + 현재 라우트 리렌더. `GM.applyStatic(root)` — `[data-i18n]` 속성을 가진 노드의 `textContent` 채움.

- [ ] **Step 1: `i18n.ko.js` 작성** — Landing/Test/Type/Card 전 문구. Landing headline은 09 §9.2 `나를 이해하면, 장비 선택이 달라진다.`, CTA `내 러너 카드 만들기`. 5 Core Type의 `type.RHYTHM_MAKER.tagline` / `.body`(05 §6.3 Result Copy 기준 2~3문장), 4 Modifier의 `modifier.COMFORT_FIRST.label` 등.
- [ ] **Step 2: `i18n.en.js` 작성** — 동일 키 세트. Landing headline `Know your run. Choose your gear with confidence.` (09 §9.2). Core Type 이름은 번역하지 않고 영문 그대로, 설명만 번역.
- [ ] **Step 3: 키 동등성 확인** — 콘솔에서 `Object.keys(GM.i18n.ko).length === Object.keys(GM.i18n.en).length` 및 누락 키 목록 출력. 불일치는 채운다.
- [ ] **Step 4: `i18n.js` 작성** — 위 인터페이스 구현.
- [ ] **Step 5: `components.css`에 언어 토글 스타일 추가** — `KR / EN` 텍스트 토글. `min-width` 고정 금지.
- [ ] **Step 6: 브라우저 검증** — 토글 클릭 시 `<html lang>`이 `ko`↔`en`으로 바뀌고 문구가 교체되는지 확인.

---

### Task 3: 문항 정의 + Runner Test Interaction

**Files:**
- Create: `prototype/js/questions.js`
- Create: `prototype/js/screens/` 없음 — `app.js`에 통합
- Create: `prototype/js/app.js` (Test 렌더만 우선)
- Modify: `prototype/css/components.css`
- Create: `prototype/css/screens.css`

**Interfaces:**
- Produces: `GM.questions` — 배열. 각 원소 `{ id, group:'A'|'B'|'C', titleKey, fields:[{ id, type:'choice'|'number'|'multi', optional?:true, optionsKey?, options:[{value, labelKey}] }] }`. 총 8개, spec §4 표와 1:1 대응.

- [ ] **Step 1: `questions.js` 작성** — spec §4 표의 8단계. 모든 choice에 `UNKNOWN` 값의 `잘 모르겠어요` 옵션 포함. Step 6의 키·Step 7의 아치는 `optional: true`.
- [ ] **Step 2: `app.js`에 Test 렌더러 작성** — Progress(`03 / 08` + `role="progressbar"`), 질문 타이틀, 선택 버튼 목록, `이전`/`다음`. 선택 시 자동 전진하지 않는다. 필수 필드 미응답 시 `다음` 비활성.
- [ ] **Step 3: `components.css`에 Choice Button 작성** — 큰 tap target, 선택 상태를 **색 + 테두리 + 체크 마크** 세 가지로 표현(색만으로 구분 금지). Pill 형태 금지, radius `--r-md`.
- [ ] **Step 4: step 전환 모션** — opacity 0→1 + `translateY(8px)`→0, `--dur` ease-out. `prefers-reduced-motion`에서 무효.
- [ ] **Step 5: 브라우저 검증** — 8단계를 끝까지 진행. 각 단계에서 `잘 모르겠어요` 선택 가능, 뒤로 가면 이전 답변이 유지되는지 확인.
- [ ] **Step 6: 360px 폭 검증** — `resize_window` mobile preset으로 가로 스크롤 없음 확인.

---

### Task 4: TYPE_RULE_v0.1 + Runner Graphic

**Files:**
- Create: `prototype/js/type-rule.js`
- Create: `prototype/js/runner-graphic.js`

**Interfaces:**
- Consumes: `GM.store.state.answers`
- Produces: `GM.typeRule.evaluate(answers)` → `{ coreType, modifier, scores }`. `coreType` ∈ `RHYTHM_MAKER|MOMENTUM_BUILDER|DISTANCE_ARCHITECT|PACE_TACTICIAN|VERSATILE_EXPLORER`. `modifier` ∈ `COMFORT_FIRST|SPEED_CURIOUS|DISTANCE_UP|RACE_READY`. `GM.graphic.render(coreType)` → SVG 문자열, `role="img"` + `aria-label` 포함.

- [ ] **Step 1: `type-rule.js` 작성** — spec §7 가점표를 그대로 구현. 파일 상단에 `// TYPE_RULE_v0.1 — 프로토타입 초안. 확정 기획 아님.` 주석 필수. 동점 시 우선순위 배열로 해소.
- [ ] **Step 2: 규칙 수동 검증** — 콘솔에서 5개 대표 답변 세트를 넣어 5개 Core Type이 각각 한 번씩 나오는지 확인. 한 타입만 나오면 가점표를 재검토.
- [ ] **Step 3: `runner-graphic.js` 작성** — Type별 Abstract Runner SVG 5종. 인물 묘사·얼굴 금지(09 §11.5). 실루엣 + 모션 라인의 각도/방향/패턴만 Type별로 변형. `currentColor`를 써서 Type Accent를 상속받게 한다.
- [ ] **Step 4: 브라우저 검증** — 콘솔에서 5개 SVG를 렌더해 시각적으로 구분되는지, 얼굴/캐릭터로 보이지 않는지 확인.

---

### Task 5: Runner Type Result + Runner Card (Identity Design Family)

**Files:**
- Create: `prototype/js/data.mock.js`
- Modify: `prototype/js/app.js`
- Modify: `prototype/css/screens.css`

**Interfaces:**
- Produces: `GM.mock` — `{ monthlyDistanceKm, shoeMileageKm, shoes:[{id, labelKey}], avgPace }`. `GM.mock` 값에는 `// MOCK:` 주석으로 근거(왜 실입력이 아닌지)를 남긴다.

- [ ] **Step 1: `data.mock.js` 작성** — spec §8 표대로. Current Shoe 후보 목록은 `seed/products.v0.2.json`의 eligible 제품명 중 대표 6종을 문자열로 옮긴다(프로토타입이므로 JSON을 읽지 않는다).
- [ ] **Step 2: Type Result 렌더러 작성** — Type Wordmark 2줄 대문자 → Modifier 태그 → Runner Graphic → Result Copy → CTA `내 러너 카드 보기`.
- [ ] **Step 3: Type Wordmark 순차 노출 모션** — 두 줄이 60ms 간격으로 등장. `prefers-reduced-motion`에서 즉시 표시.
- [ ] **Step 4: Runner Card 렌더러 작성** — 09 §11.3 위계 순서 그대로. 지표는 큰 숫자 + 작은 mono 라벨. Current Gear, Modifier 태그, Primary CTA `내 장비 추천 받기`, Supporting `+ 오늘 러닝 반영하기`, P1 점선 항목은 비활성 스타일.
- [ ] **Step 5: Runner Card를 일반 Card와 구분** — radius `--r-card`(2px), Type Accent 적용, 배경을 `--surface`가 아닌 별도 처리로 독립 오브젝트처럼. Gold Frame·Trading Card·Hexagon Stat 금지.
- [ ] **Step 6: 지표 count-up 모션** — Runner Card 첫 진입 시 1회. `prefers-reduced-motion`에서 최종값 즉시 표시.
- [ ] **Step 7: 범위 밖 CTA 처리** — 클릭 시 spec §13의 안내 문구를 노출하고 정지.
- [ ] **Step 8: 브라우저 검증** — Test 완주 → Type Result → Runner Card까지 이동. Type Result와 Runner Card가 같은 시각 언어로 보이는지 확인.

---

### Task 6: Landing + Type Preview Overlay

**Files:**
- Modify: `prototype/js/app.js`
- Modify: `prototype/css/screens.css`

- [ ] **Step 1: Landing 렌더러 작성** — Hero(headline + sub + Primary CTA), Hero Visual로 Runner Card 축소판을 일부 화면 밖으로 배치(09 §9.3), Second Section 4단계(09 §9.4), Secondary Link `내 카드 불러오기`(범위 밖 안내), 우상단 KR/EN 토글.
- [ ] **Step 2: Landing 진입 시 store reset** — 다시 처음부터 시작할 수 있게. locale은 보존.
- [ ] **Step 3: Type Preview Overlay 작성** — 키보드 `T` 또는 `?preview=1`. 5 Core Type × 4 Modifier 버튼 그리드. 선택 시 `GM.store.state.result`를 덮어쓰고 현재 화면 리렌더. 오버레이에 `PROTOTYPE ONLY` 표기.
- [ ] **Step 4: 브라우저 검증** — Landing에서 시작해 전체 Flow 왕복. Preview로 5×4 조합 전환 확인.

---

### Task 7: README + 전체 QA

**Files:**
- Create: `prototype/README.md`

- [ ] **Step 1: `README.md` 작성** — 실행 방법(더블클릭 / 로컬 서버), 파일 구조, Mock인 값 목록, TYPE_RULE_v0.1이 초안이라는 고지, 범위 밖 기능 목록, GPT 검토 시 볼 것.
- [ ] **Step 2: 09 §31 Visual QA Checklist 실행** — Brand / Runner Identity / Mobile / Localization 항목을 하나씩 확인하고 위반을 수정.
- [ ] **Step 3: ko/en 전환 QA** — 모든 화면에서 전환. 잘리는 텍스트, 무너지는 버튼 폭 확인.
- [ ] **Step 4: Responsive QA** — 360 / 768 / 1280px에서 가로 스크롤 없음, Desktop이 Mobile 확대판이 아닌지 확인.
- [ ] **Step 5: 접근성 QA** — 키보드만으로 전체 Flow 완주, focus 링 가시성, 색만으로 상태 구분하지 않는지 확인.

---

## Self-Review

**Spec coverage:** §3 파일구조→T1~T7, §4 화면→T3/T5/T6, §5 Identity Family→T5, §6 Token→T1, §7 TYPE_RULE→T4, §8 Mock 경계→T5, §9 i18n→T2, §10 Responsive→T1/T3/T7, §11 Motion→T3/T5, §12 접근성→T3/T7, §13 범위 밖 처리→T5/T6, §14 완료 기준→T7. 누락 없음.

**Type consistency:** `GM.store` / `GM.router` / `GM.t` / `GM.setLocale` / `GM.applyStatic` / `GM.questions` / `GM.mock` / `GM.typeRule.evaluate` / `GM.graphic.render` — Task 간 이름 일치 확인.

**Placeholder scan:** 각 Step이 구체 파일과 구체 동작을 지정하고 있음. "적절히 처리" 류 표현 없음.
