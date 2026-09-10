# GearMatch AI — Interactive HTML Prototype 설계

**단계:** Phase 1 Interactive Web Prototype (08 DEV Brief §1). Closed MVP 아님.
**범위:** Landing → Runner Test → Runner Type Result → Runner Card
**기준 문서:** 01~09 기획 문서, `CLAUDE.md`, `docs/DECISIONS.md`
**작성일:** 2026-08-31

---

## 1. 목적

이 프로토타입의 목적은 동작하는 서비스가 아니라 **UI/UX와 Flow에 대한 판단 근거**다.
04 §Phase 1과 05 §20이 지정한 검증 대상 중 이번 범위에 해당하는 것:

- Runner Test가 "설문"이 아니라 "나를 알아가는 과정"으로 느껴지는가
- 질문 수보다 결과 기대가 큰가
- Runner Type 결과가 너무 뻔하지 않은가 / 자기해석처럼 느껴지는가
- Type + Modifier가 흥미를 만드는가
- Runner Card가 현재의 나를 한눈에 이해시키는가
- Runner Card의 Gear Recommendation CTA가 명확한가
- 한국어/영어 전환 시 레이아웃이 유지되는가

**이번 범위가 아닌 것:** Gear Need, Gear Coach, Recommendation, Similar Runner, Run Update, Card Save/Recovery, 실제 DB, LLM 연동, Analytics 전송.

## 2. 제약

| 항목 | 결정 |
|---|---|
| 기술 | HTML + CSS + Vanilla JS. React/Next.js 미사용 |
| 빌드 | 없음. 트랜스파일·번들 없음 |
| 실행 | `index.html` 더블클릭으로 동작해야 한다 (`file://`) |
| 모듈 | ES Module 불가(`file://` CORS). classic `<script>` + 단일 전역 `GM` |
| 데이터 | Mock/문구/문항/판정규칙을 UI 코드에서 분리 |
| Locale | ko-KR 기본, en-US 전환 가능 |
| 수명 | 폐기 또는 재구현 전제. 과도한 추상화 금지 |

`file://` 제약이 구조를 결정한다. `fetch()`로 JSON을 읽을 수 없으므로
Mock 데이터와 로케일은 **JS 파일이 `GM` 네임스페이스에 값을 할당하는 방식**으로 분리한다.
이는 "UI에 하드코딩하지 않는다"는 요구를 충족하면서 서버 없이 동작한다.

## 3. 파일 구조

```
prototype/
├─ index.html                 단일 진입점. 4개 screen container + preview overlay
├─ README.md                  실행 방법 / 구조 / 임시 결정
├─ css/
│  ├─ tokens.css              Design Token (색·타입스케일·간격·모션·Type Accent)
│  ├─ base.css                reset, typography, layout primitive, a11y
│  ├─ components.css          button / choice / progress / metric / tag / toggle
│  └─ screens.css             landing / test / type-result / runner-card
└─ js/
   ├─ i18n.ko.js              GM.i18n.ko  — 한국어 문자열
   ├─ i18n.en.js              GM.i18n.en  — 영어 문자열
   ├─ questions.js            GM.questions — 8단계 문항 정의 (i18n key 참조)
   ├─ data.mock.js            GM.mock — Type 정의 / 파생지표 / Current Shoe
   ├─ type-rule.js            GM.typeRule — Core Type + Modifier 판정 (초안)
   ├─ runner-graphic.js       GM.graphic — Type별 Abstract Runner SVG
   ├─ store.js                GM.store — 상태 + sessionStorage
   ├─ i18n.js                 GM.t() / locale 전환 / DOM 적용
   ├─ router.js               GM.router — hash 라우팅
   └─ app.js                  screen 렌더 + 이벤트 바인딩 + preview overlay
```

`<script>` 로드 순서가 곧 의존 순서다. 데이터 → 규칙 → 상태 → 렌더.

## 4. 화면

### S01 Landing (`#/`)

- Hero: Headline(09 §9.2) + Sub Copy + Primary CTA `내 러너 카드 만들기`
- Hero Visual: Runner Card를 일부 화면 밖으로 이어지게 배치 (09 §9.3)
- Second Section: `Runner Profile → Similar Runner → Gear Coach → Your Top Options` 4단계 (09 §9.4)
- Secondary Link: `이미 러너 카드가 있나요? 내 카드 불러오기` — 이번 범위 밖이므로 비활성 + 안내
- 우상단 `KR / EN` 토글

### S02–S05 Runner Test (`#/test`)

8단계. 한 화면에 1개 핵심 질문(관련 항목은 최대 2개 묶음).

| Step | 그룹 | 질문 | 필드 |
|---:|---|---|---|
| 1 | A 나의 러닝 | 러닝을 얼마나 해왔나요 / 요즘 얼마나 자주 | `experience`, `frequency` |
| 2 | A | 평소 한 주에 얼마나 달리나요 | `weeklyDistance` |
| 3 | A | 요즘 러닝을 하는 가장 큰 이유는 | `purpose` |
| 4 | A | 요즘 관심이 가는 목표 / 관심 거리 | `goal`, `interestDistance` |
| 5 | A | 최근 러닝량은 어떤가요 | `volumeTrend` |
| 6 | B 내 몸과 발 | 키 / 체중대 / 신발 사이즈 | `height`, `weightBand`, `shoeSize` |
| 7 | B | 발볼 / 아치 | `footWidth`, `archType` |
| 8 | C 현재 장비 | 지금 신는 러닝화 / 만족도 / 불편 | `currentShoe`, `satisfaction`, `discomfort` |

- Progress `03 / 08` + 바 (09 §10.3)
- 모든 단계에 `잘 모르겠어요` 정상 선택지 (05 §5.1)
- Back 가능. 선택 시 자동 전진하지 않고 명시적 `다음` (오조작 방지)
- 과도한 Success Animation 금지 (09 §10.4)

D-04/Q5 반영: 체중은 Band 선택형(필수), 키는 Optional.

### S06 Runner Type Result (`#/type`)

- Core Type Wordmark (2줄 대문자 Display)
- Modifier 태그
- Abstract Runner Graphic
- Result Copy — 자기해석형 2~3문장 (05 §6.3의 Result Copy 예시 기준)
- 다음 CTA `내 러너 카드 보기`

### S07/S09 Runner Card (`#/card`)

09 §11.3 정보 위계를 따른다.

```
Runner Type → Type Description → Runner Graphic
→ Key Running Metrics → Current Gear → Modifier → Next Action
```

- Primary CTA: `내 장비 추천 받기` (이번 범위 밖 → 안내 후 정지)
- Supporting: `+ 오늘 러닝 반영하기` (범위 밖 → 안내)
- P1 점선: `나와 비슷한 러너들은 어떤 장비를 사용할까?` (비활성 표시)

### Type Preview Overlay (개발자 전용)

- 키보드 `T` 또는 `?preview=1`
- 5 Core Type × 4 Modifier 즉시 전환 → Type Result / Runner Card에 반영
- 프로토타입 전용. Closed MVP로 이전하지 않는다.

## 5. Runner Identity Design Family

Type Result와 Runner Card는 **하나의 시각 언어**를 공유한다.

공통 요소:
- Type Wordmark — 2줄 대문자, tight tracking, 가장 큰 활자
- Abstract Runner SVG — Type별 자세·모션라인·패턴 변형
- Type Accent — Core Type별 보조색 (배경 아닌 선/라벨/그래픽에만)
- Mono Metric Label — 숫자는 크게, 라벨은 작은 mono 대문자

차이:
- **Type Result** = 전면 Identity 선언. 여백 크고 활자 지배적, 설명 중심
- **Runner Card** = 같은 언어의 압축판. 독립된 Digital Object, 상대적으로 sharp한 모서리, 지표·장비·CTA 포함

09 §11.5 금지: 얼굴 생성, 실제 체형 평가, 캐릭터 게임화, Fantasy Avatar, RPG Stat, Level 중심 표현, Gold/Silver Ranking Card, 구형 Sports Trading Card.

## 6. Design Token (09 §3, §5, §8)

| Token | 값 | 근거 |
|---|---|---|
| `--bg` | Off-white `#F6F5F2` | 09 §3.4 Warm/Neutral Off-white |
| `--surface` | `#FFFFFF` | |
| `--text` | Deep Charcoal `#16181C` | Pure Black 금지 |
| `--text-muted` | `#6B7078` | |
| `--divider` | `#E3E1DC` | |
| `--accent` | Cobalt `#1D4ED8` | Primary CTA / 선택 / focus |
| `--energy` | Volt `#C8F02E` | 새 결과 / progress / 완료. 3~5%만 |
| Type Accent | Core Type 5색 | 제한적 사용 |

- Light Mode만 구현 (09 §4). Token 구조는 Dark 확장 가능하게 둔다.
- Typography: `Pretendard` → `-apple-system` → `Segoe UI` → `Noto Sans KR` 폴백. 웹폰트 CDN 미사용(`file://` 동작 보장).
- Tech Accent: 숫자·Data Label·Progress에만 `ui-monospace` 계열.
- Radius 최대 8px, Runner Card는 2px. Shadow 최소. Section은 여백으로 구분.

## 7. TYPE_RULE_v0.1 (프로토타입 초안)

> **확정 기획이 아니다.** 05 §6.5의 "단일 질문으로 Type을 결정하지 않는다"를 만족시키기 위한 가중 점수 초안이며, Prototype 반응 이후 조정 대상이다.

각 Core Type에 점수를 누적하고 최고점을 선택한다. 동점 시
`MOMENTUM_BUILDER → PACE_TACTICIAN → DISTANCE_ARCHITECT → RHYTHM_MAKER → VERSATILE_EXPLORER` 순.

| 조건 | 가점 |
|---|---|
| `volumeTrend = UP` | MOMENTUM +3 |
| `experience` 1년 미만 | MOMENTUM +2 |
| `frequency` 주 3회 이상 AND `volumeTrend = SAME` | RHYTHM +3 |
| `purpose ∈ {HEALTH, HABIT}` | RHYTHM +2 |
| `purpose = DISTANCE` | DISTANCE +3 |
| `interestDistance ∈ {HALF, FULL}` | DISTANCE +2 |
| `weeklyDistance ≥ 30km` | DISTANCE +2 |
| `purpose ∈ {PERFORMANCE, RACE}` | PACE +3 |
| `goal = 기록 향상` | PACE +2 |
| `purpose = MIXED` | VERSATILE +3 |
| `goal = 잘 모르겠음` OR `interestDistance = UNKNOWN` | VERSATILE +1 |

Modifier는 독립 규칙으로 하나만 부여한다. 우선순위 순으로 첫 매칭:

1. `RACE_READY` — `goal = 대회 준비` 또는 (`purpose = RACE` AND `interestDistance ∈ {HALF, FULL}`)
2. `SPEED_CURIOUS` — `goal = 기록 향상` 또는 `purpose = PERFORMANCE`
3. `DISTANCE_UP` — `goal = 거리 늘리기` 또는 (`volumeTrend = UP` AND `purpose = DISTANCE`)
4. `COMFORT_FIRST` — 그 외 (불편 입력이 있거나 `purpose ∈ {HEALTH, HABIT}` 포함)

## 8. Mock 데이터 경계

프로토타입에서 **사용자 입력으로 실제 채워지는 값**과 **Mock인 값**을 명확히 구분한다.

| Runner Card 항목 | 출처 |
|---|---|
| Runner Type / Modifier | 실제 — TYPE_RULE_v0.1 판정 |
| 러닝 경력 / 주간 러닝량 / 주요 목적 | 실제 — Test 답변 |
| Current Shoe | 실제 — Test 답변 (목록에서 선택) |
| 이번 달 누적 거리 | **Mock** — Activity 기능이 범위 밖 |
| Shoe Mileage | **Mock** — Run Update가 범위 밖 |
| 평균 페이스 | **Mock 또는 미표시** — 선택 입력 시에만 |

Mock 값은 `GM.mock`에 모아두고, 화면에는 개발자만 아는 표시 없이 그대로 렌더한다
(검토자에게는 README와 보고서로 알린다).

## 9. i18n

- `GM.t(key, vars)` — 누락 키는 key 자체를 반환하고 콘솔 경고
- 정적 텍스트는 `data-i18n` 속성, 동적 텍스트는 `GM.t()` 호출
- 전환 시 전체 리렌더. 현재 화면·단계·답변 유지
- `?lang=en`로 진입 가능, 선택은 `sessionStorage`에 저장
- Runner Type 이름은 영문 Identity Label 유지 (09 §6.6). 설명만 번역
- 09 §28: Button `min-width` 고정 금지, Auto Layout, Text Wrapping 허용, Type 설명 2~3줄 허용

## 10. Responsive

- Mobile First. 기준 폭 360–430px
- Breakpoint: `≥768px` tablet(여백 확대), `≥1024px` desktop(중앙 Content Width 유지 + 좌우 여백)
- Desktop에서 Mobile UI를 단순 확대하지 않는다 (09 §7.1)
- Runner Card는 어느 폭에서도 고정 종횡비를 강제하지 않고 내용에 따라 늘어난다 (번역 길이 대응)

## 11. Motion (09 §19)

허용: step 전환(opacity + 8px translate, 200ms ease-out), progress 바 width, Type Wordmark 순차 노출, Runner Card 지표 count-up 1회, page transition.
금지: 3D Card Flip, 지속 배경 애니메이션, Parallax, Scroll Jacking, Particle, 긴 Intro, Hover 남발, 불필요한 Celebration.

`prefers-reduced-motion: reduce`에서 모든 transition/animation을 무효화한다.

## 12. 접근성 (09 §25)

- Text Contrast 확보, 색만으로 상태 구분하지 않음(선택 상태는 색 + 테두리 + 체크)
- 모든 선택지는 실제 `<button>`. 키보드 Tab/Enter 동작
- `:focus-visible` 링 명시
- Tap Target 최소 44px
- `<html lang>`을 locale에 따라 갱신
- SVG에 `role="img"` + `aria-label`
- Progress에 `role="progressbar"` + `aria-valuenow`

## 13. 범위 밖 기능의 처리

Gear Need / Gear Coach / Recommendation / Run Update / Card Save는 이번 범위가 아니다.
버튼은 **화면에 존재하되** 클릭 시 다음 안내를 띄우고 정지한다.

> 이 화면은 다음 프로토타입 단계에서 구현됩니다.

버튼을 숨기면 Runner Card의 정보 위계와 CTA 명확성(09 §31 체크리스트)을 검증할 수 없기 때문이다.

## 14. 완료 기준

- `index.html` 더블클릭으로 4개 화면을 끝까지 이동할 수 있다
- Runner Test 답변이 실제로 Type 판정에 반영된다
- Type Preview로 5×4 조합을 확인할 수 있다
- ko/en 전환에서 레이아웃이 깨지지 않는다
- 360px 폭에서 가로 스크롤이 발생하지 않는다
- 09 §31 Visual QA Checklist를 통과한다
- 09 §30 "하지 말 것" 목록을 위반하지 않는다
