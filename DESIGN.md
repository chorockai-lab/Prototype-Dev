---
name: GearMatch AI
description: 러너 정체성과 장비 판단을 육상 트랙의 레인 배정 문법으로 다루는 디자인 시스템
colors:
  track: "#A63D25"
  track-lit: "#A2381F"
  track-deep: "#7C2C18"
  lane: "#FFFFFF"
  lane-dim: "rgba(255,255,255,.42)"
  lane-ghost: "rgba(255,255,255,.16)"
  board: "#14171A"
  board-2: "#1E2226"
  board-3: "#2B3136"
  board-line: "#3A4147"
  signal: "#F5B722"
  signal-deep: "#C98D0C"
  infield: "#0E4433"
  shadow: "rgba(0,0,0,.3)"
  shadow-deep: "rgba(0,0,0,.42)"
  type-rhythm: "#2E7D5B"
  type-momentum: "#C6521E"
  type-distance: "#1F6FA8"
  type-pace: "#B4362B"
  type-versatile: "#6B5AA6"
fonts:
  sans: "Pretendard Variable, Pretendard, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, system-ui, sans-serif"
  display: "Archivo, Archivo Expanded, {fonts.sans}"
typography:
  display:
    fontFamily: "Archivo, Archivo Expanded, Pretendard Variable, Pretendard, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, system-ui, sans-serif"
    fontSize: "var(--type-size, 52px)"
    fontWeight: 900
    fontStretch: "106%"
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "{fonts.sans}"
    fontSize: "clamp(38px, 10.8vw, 46px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "{fonts.sans}"
    fontSize: "clamp(26px, 7.4vw, 31px)"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.028em"
  body:
    fontFamily: "{fonts.sans}"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.66
    letterSpacing: "normal"
  label-latin:
    fontFamily: "Archivo, Archivo Expanded, Pretendard Variable, Pretendard, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    fontStretch: "112%"
    lineHeight: 1.4
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  label-micro:
    fontFamily: "Archivo, Archivo Expanded, Pretendard Variable, Pretendard, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, system-ui, sans-serif"
    fontSize: "9px"
    fontWeight: 700
    fontStretch: "112%"
    lineHeight: 1.4
    letterSpacing: "0.13em"
    textTransform: "uppercase"
  label-ko:
    fontFamily: "{fonts.sans}"
    fontSize: "11.5px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.008em"
  field-question:
    fontFamily: "{fonts.sans}"
    fontSize: "19px"
    fontWeight: 750
    lineHeight: 1.34
    letterSpacing: "-0.02em"
  body-sm:
    fontFamily: "{fonts.sans}"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  caption:
    fontFamily: "{fonts.sans}"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  display-sm:
    fontFamily: "{fonts.sans}"
    fontSize: "27px"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.042em"
  title-sm:
    fontFamily: "{fonts.sans}"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.026em"
  title-xs:
    fontFamily: "{fonts.sans}"
    fontSize: "21px"
    fontWeight: 800
    lineHeight: 1.24
    letterSpacing: "-0.024em"
  body-lg:
    fontFamily: "{fonts.sans}"
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.62
    letterSpacing: "normal"
  input:
    fontFamily: "{fonts.sans}"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  measure:
    fontFamily: "{fonts.sans}"
    fontSize: "clamp(16px, 4.6vw, 20px)"
    fontWeight: 800
    lineHeight: 1.14
    letterSpacing: "-0.028em"
    fontFeature: "tnum 1"
rounded:
  marker: "1px"
  sm: "2px"
  md: "3px"
  shell: "6px"
  pill: "100px"
spacing:
  gutter: "20px"
  tight: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.board}"
    textColor: "{colors.lane}"
    rounded: "{rounded.sm}"
    padding: "15px 18px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.board-2}"
    textColor: "{colors.lane}"
  button-primary-disabled:
    backgroundColor: "rgba(20,23,26,.34)"
    textColor: "rgba(255,255,255,.44)"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.lane}"
    rounded: "{rounded.sm}"
    padding: "15px 18px"
    height: "56px"
  option-row:
    backgroundColor: "rgba(255,255,255,.07)"
    textColor: "{colors.lane}"
    padding: "17px 46px 17px 16px"
    height: "60px"
  option-row-selected:
    backgroundColor: "{colors.lane}"
    textColor: "{colors.board}"
    padding: "17px 46px 17px 22px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.lane}"
    rounded: "{rounded.pill}"
    padding: "11px 15px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.lane}"
    textColor: "{colors.board}"
    rounded: "{rounded.pill}"
  card-board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.lane}"
    rounded: "{rounded.md}"
    padding: "20px"
  watch-block:
    backgroundColor: "{colors.board-2}"
    textColor: "rgba(255,255,255,.82)"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: GearMatch AI

> ⚠️ **이 문서는 「레인 배정」 디자인 시스템 — archive `v1.2` 계열의 비주얼 월드다.**
> 
> 2026-09-21 `docs/DECISIONS.md` **D-09** 판정에 따라 정본 비주얼은
> **라임/다크 `#D7FF2E` 계열의 `Prototype_GearMatch_AI_1.7_RunnerIdentity.html`** 이다.
> 이 문서의 트랙 적갈색 `#A63D25` · Archivo · Core Type 5종 레인 컬러는 **정본이 아니다.**
> 
> 폐기하지 않고 보관하는 이유: 색·타이포·컴포넌트 토큰의 설계 근거와 Named Rules가
> 앞으로도 참고 가치가 있기 때문이다. **새 화면의 기준으로는 쓰지 않는다.**

## Overview

**Creative North Star: "레인 배정 (Lane Assignment)"**

지면이 폴리우레탄 육상 주로다. 화면은 트랙 위에 서 있고, 흰 스텐실 레인 라인 두 줄이 전 높이를 수직으로 관통한다. 읽고 계측하는 것만 차콜 전광판으로 떠오르고, 계측 신호는 앰버 하나뿐이다.

이 은유는 장식이 아니라 제품 규칙에서 나왔다. 트랙에서 레인 번호는 등수가 아니라 배정이다. 그래서 장비 추천에 번호를 매기지 않고, 세 후보를 나란한 레인으로 놓는다. `DECISIONS.md` D-05("순위 없음, UI에 번호 표기 금지")가 이 시스템에서 시각 형태를 얻는다.

확인된 시각적 안티레퍼런스 둘: **피트니스 앱의 다크 그라운드 + 네온 링/그라디언트**(이 카테고리가 늘 내놓는 것), 그리고 **크림 페이퍼 + 콘덴스드 에디토리얼 세리프**(그 뻔한 반대편이자 이 제품의 직전 버전). 둘 다 후보에서 배제한 뒤 세운 시스템이다.

**Key Characteristics:**
- 지면이 색을 지배한다 — 러스트가 화면의 30~60%
- 읽는 면만 어둡다 — 차콜 보드는 데이터가 있는 곳에만
- 각진 형태 — 반경 2~3px, 라운드 카드 없음
- 계측 신호는 하나 — 앰버는 라벨과 현재 위치에만
- 모르는 값은 모른다고 쓴다 — 추정치를 만들지 않는다

## Colors

트랙 표면에서 뽑은 단일 지배색에, 계측 장비의 차콜과 앰버가 얹힌다. 색 전략은 **Committed** — 하나의 채도 높은 색이 화면의 큰 면적을 실제로 차지한다.

### Primary
- **Track Rust** (`#A63D25`): 지면. 모든 화면의 기본 배경이며 위에서 아래로 `#A2381F → #A63D25 → #7C2C18` 그라디언트를 이룬다. 액센트가 아니라 필드다.
- **Lane White** (`#FFFFFF`): 스텐실 페인트. 레인 라인, 스타트 라인, 선택된 상태의 반전면. 순수 백색 외의 값을 쓰지 않는다 — 페인트는 바래지 않는다.

### Secondary
- **Board Charcoal** (`#14171A`): 전광판. Runner Card, 추천 후보 카드, 기본 CTA. 데이터가 있는 곳에만 나타난다.
- **Signal Amber** (`#F5B722`): 계측 신호. 섹션 라벨, 현재 진행 구간, 링크성 액션. 면으로 쓰지 않는다.

### Tertiary — Core Type 레인 컬러
Runner Type **5종 체계 기준**(구 D-01)으로 배정된 레인 색. 카드 좌측 스트라이프와 액센트에만 쓴다.
- **Rhythm Green** (`#2E7D5B`) / **Momentum Orange** (`#C6521E`) / **Distance Blue** (`#1F6FA8`) / **Pace Red** (`#B4362B`) / **Versatile Violet** (`#6B5AA6`)

### Neutral
- **Board Surface** (`#1E2226`): 보드 위 한 단 낮은 면. 제품 이미지 자리, WATCH 블록.
- **Board Line** (`#3A4147`): 보드 내부 구분선.
- **Lane Dim** (`rgba(255,255,255,.42)`) / **Lane Ghost** (`rgba(255,255,255,.16)`): 트랙 위 경계선과 비활성 마커.

### Named Rules

**The Ground Is The Track Rule.** 러스트는 액센트가 아니라 지면이다. 카드 배경, 버튼, 배지에 러스트를 쓰지 않는다. 러스트는 항상 가장 뒤에 있다.

**The One Signal Rule.** 앰버는 계측 신호다. 라벨, 현재 위치, 링크에만 쓰고 면을 채우지 않는다. 화면당 앰버 면적은 5%를 넘지 않는다.

**The Board Earns Its Darkness Rule.** 차콜 보드는 읽거나 계측할 것이 있을 때만 올라온다. 여백을 채우거나 구획을 나누려고 보드를 쓰지 않는다.

**The Track Ground Contrast Rule.** 러스트 지면 위 텍스트는 흰색 알파 0.82 이상만 허용한다. 지면 그라디언트의 가장 밝은 지점(`#A2381F`) 기준으로 본문 대비 4.5:1을 만족해야 한다. 회색으로 톤을 낮추지 않는다. 플레이스홀더도 텍스트다 — `lane-dim`(0.42)은 지면 위에서 2.3:1이라 쓰지 않고, 0.76 이상을 쓴다.

**The Amber Belongs To The Board Rule.** 앰버 텍스트는 차콜 보드 위에서만 쓴다. 러스트 지면 위 앰버는 대비 3.5:1로 소형 텍스트 기준을 넘지 못하므로, 지면 위 라벨은 백색 페인트다. 지면 위에 남는 앰버는 텍스트가 아닌 계측 마커뿐이다(현재 진행 구간, 캡션의 눈금).

## Typography

**두 서체.** 한글과 본문은 **Pretendard Variable**(CDN), 라틴 디스플레이와 계측 라벨은 **Archivo**(가변, `wdth` 100–125 / `wght` 500–900). Archivo는 도로 표지와 서식용으로 설계된 그로테스크라 폭이 넓고 옆면이 평평하다 — 주로에 칠하는 레인 번호의 골격이 여기서 나온다.

**디스플레이는 라틴 전용이다.** `--font-display`는 Runner Type 이름, 제품명, 브랜드, 계측 숫자, 라틴 마이크로 라벨에만 건다. 한글에 폭 축(`font-stretch`)을 걸면 자소가 뭉개지므로 **한글은 언제나 Pretendard**다.

**두 가지 디스플레이 처리**
- **스텐실 브리지 (라틴 전용).** 큰 라틴 대문자에 가로 브리지를 마스크로 낸다. 트랙 마킹이 실제로 브리지가 있는 스텐실이기 때문이다. Runner Type 이름과 카드 타이틀에 쓴다. **한글에는 절대 쓰지 않는다** — 자소가 끊긴다.
- **페인트 스트로크 (한글).** 한글 헤드라인 아래에 한쪽이 기운 굵은 백색 획을 깐다. 주로에 칠한 마킹의 문법이다.

**라벨은 두 종류다.** 트래킹과 대문자화는 라틴의 문법이다.
- `label-latin` — Archivo, 대문자, 트래킹 0.14~0.20em. `GEARMATCH AI`, `NICKNAME`, `01 / 05`, `LONG · COMFORT`처럼 내용이 라틴·숫자로 확정된 자리에만.
- `label-ko` — Pretendard, 11.5px/800, 트래킹 −0.008em. **대문자화도 트래킹도 걸지 않는다.** 한글은 자간을 벌려도 격이 오르지 않고 오타처럼 읽힌다.
- 프로필·RUN 입력의 항목명은 라벨이 아니라 **질문**이다. `field-question`(19px/750)으로 5문항과 같은 목소리를 낸다.

**스케일**
| 역할 | 크기 | 굵기 | 트래킹 |
|---|---|---|---|
| Display (타입 이름) | 52px 상한, 실측으로 확정 | 900 | −0.045em |
| Display sm (프리뷰 카드) | 27px | 900 | −0.042em |
| Headline (h1) | clamp(38, 10.8vw, 46) | 800 | −0.035em |
| Title (h2) | clamp(26, 7.4vw, 31) | 800 | −0.028em |
| Title sm (제품명·개요) | 22px | 800 | −0.026em |
| Title xs (루프 제목) | 21px | 800 | −0.024em |
| Measure (계측값) | clamp(16, 4.6vw, 20) | 800 | −0.028em, tnum |
| Input | 19px | 700 | normal |
| Body lg | 14px | 650 | normal |
| Body | 15px / 1.66 | 400 | normal |
| Label | 10px | 800 | 0.20em, uppercase |
| Label micro | 8.5 / 9 / 9.5px | 800 | 0.10~0.16em, uppercase |
| Body sm | 13 / 13.5px | 400~650 | normal |
| Caption | 11 / 11.5 / 12 / 12.5px | 400~750 | normal |

**허용 스텝은 위 표가 전부다.** 빌드가 실제로 쓰는 값만 기록했다 —
9 · 9.5 · 10 · 10.5 · 11 · 11.5 · 12 · 12.5 · 13 · 13.5 · 14 · 14.5 · 15 · 15.5 · 16 · 19 · 21 · 22 · 46px,
그리고 clamp로 다루는 헤드라인·타이틀·계측값과 실측으로 확정되는 디스플레이. 새 값을 즉흥으로 만들지 않는다.

### Named Rules

**The Uniform Type Size Rule.** 다섯 Runner Type 이름은 **모두 같은 크기**를 쓴다. 크기는 상한(52px)에서 시작해 **가장 긴 이름**(`MOMENTUM BUILDER`)이 컨테이너에 들어가는 값까지 실측으로 내린다. 타입마다 크기가 달라지면 카드 규격이 흔들리고, 어떤 타입은 다른 타입보다 커 보인다 — 배정에는 등급이 없다.

길이 기반 표만 믿으면 안 되는 이유는 서체가 바뀌면 글자폭이 바뀌기 때문이다. 실제 렌더 폭(`scrollWidth`)이 보증이고, 표는 출발점일 뿐이다. 이 규칙은 420px 이하 좁은 화면에서도 자동으로 성립한다.

**The Keep-All Rule.** `word-break: keep-all`을 전역에 건다. 한글이 단어 중간에서 끊기지 않는다. 계측값에는 `overflow-wrap: normal`을 더해 숫자와 단위가 분리되지 않게 한다.

**The Measure Is Tabular Rule.** 숫자를 보여주는 모든 자리는 `tabular-nums`. 값이 바뀔 때 자리가 흔들리지 않는다.

## Layout

단일 컬럼. `app-shell`은 `min(100%, 430px)`이며 화면 중앙에 선다.

**레인 프레임.** 셸 좌우 `--gutter`(20px) 위치에 백색 레인 라인이 전 높이로 그어진다. 이것은 장식이 아니라 프레임이며, 모든 화면 콘텐츠는 두 라인 사이에 놓인다. 431px 이상에서는 같은 라인이 셸 바깥 지면으로도 이어진다 — 트랙은 화면에서 끊기지 않는다.

**리듬.** 제목 위 여백이 아래보다 크다. 섹션 간격 22~28px, 그룹 내부 6~10px. `.actions`는 `margin-top:auto`로 화면 하단에 앉는다(스타팅 블록 자리).

**셸 높이에는 상한이 있다.** `431px` 이상에서 셸은 `min(100dvh - 56px, 860px)`이다. 상한이 없으면 높은 데스크톱 창에서 본문과 하단 CTA 사이가 수백 px 벌어져 버튼이 미아가 된다. 스타팅 블록은 화면 끝이 아니라 **주로 끝**에 있다.

**하단 CTA가 없는 화면은 본문을 가운데 앉힌다.** 5문항처럼 자동 넘김이라 버튼이 없는 화면에서는 `.question-body`에 `margin:auto 0`을 걸어 남은 공간을 위아래로 나눈다. 빈 주로가 화면 절반을 차지하지 않게 하는 장치다.

**브레이크포인트.** `≤359px` 거터 축소, `≥431px` 셸에 라운드와 그림자, 지면에 외곽 레인 라인.

**셸은 스크롤 컨테이너가 아니다.** `.app-shell`은 `overflow:clip`이다. `hidden`이면 셸이 스크롤 컨테이너가 되어 `scrollIntoView`가 문서 대신 셸 안에서 소모된다.

**터치 타겟.** 모든 인터랙티브 요소 최소 44px.

## Elevation & Depth

**Layered, not lifted.** 이 시스템에 떠 있는 것은 없다. 차콜 보드는 트랙 위에 **놓인 판**이고, 그림자는 그 사실을 말하는 정도까지만 쓴다.

- 보드/카드: `0 22px 50px rgba(0,0,0,.42)` — 오프셋과 넓은 블러를 가진 중립 그림자
- 기본 버튼: `0 6px 20px rgba(0,0,0,.3)`, hover 시 `0 9px 26px rgba(0,0,0,.36)`
- 컬러 글로우 금지. 스텐실 페인트는 빛나지 않는다.

**깊이는 색으로도 만든다.** `board → board-2 → board-3` 세 단계 톤 레이어가 보드 내부의 위계를 담당한다.

## Shapes

**각지다.** `--r-sm: 2px`, `--r-md: 3px`. 라운드 카드가 없다 — 트랙 마킹과 계측 장비에는 둥근 모서리가 없다.

빌드가 쓰는 반경은 넷뿐이다: 거리 마커 `1px`, 기본 면 `2px`, 카드·보드 `3px`, 431px 이상에서 셸 외곽 `6px`. 그 외 값을 쓰지 않는다.

**예외는 pill.** 칩·태그·미니 버튼은 `100px`. 배번의 라운드 태그와 레인 배정표의 문법이라 허용된다. **카드에는 절대 pill을 쓰지 않는다.**

**레인 스트라이프.** 카드 좌측의 4~5px 세로 컬러 바는 이 시스템의 서명 형태다. 각 카드가 자기 레인 색을 갖는다는 뜻이며, 장식 액센트가 아니다. 콜아웃·알림·토스트에는 쓰지 않는다.

**아이콘.** 모두 그린 SVG. 획 굵기 2.4~3px, `stroke-linecap: square`. 유니코드 글리프나 이모지를 아이콘 자리에 쓰지 않는다.

## Components

**Runner Card.** 차콜 보드 + 좌측 레인 스트라이프 + 하단 6px 액센트 바. 구성 순서 고정: 타입 이름(스텐실) → Modifier 칩 → 태그라인 → 에디토리얼 실루엣 → 초점 라인 → 2열 계측 그리드 → 상태 줄. 계측 그리드는 **2열**이다(3열은 375px에서 라벨을 자르고 값을 붙인다).

**Option Row.** 선택지는 카드가 아니라 레인의 구간이다. 위아래 1px 경계선, 반투명 흰 면, 우측 원형 인디케이터. 선택 시 **면 전체가 백색으로 반전**되며, 반전은 왼쪽에서 오른쪽으로 칠해진다(`paintIn`, 0.26s) — 페인트가 지나가는 문법이다. `role="radio"` + `aria-checked`로 선택 상태를 노출한다.

**5문항은 자동으로 넘어간다.** 고르면 확정 페인트 한 박자(280ms) 뒤 다음 문항으로 간다. 하단 "다음" 버튼이 없다 — 탭이 절반이 되고, 마지막 선택지와 CTA 사이의 빈 주로도 사라진다. 같은 화면에서 다른 보기를 누르면 타이머가 취소되고, 상단 `뒤로`가 되돌리기다. 화면마다 이 규칙을 한 줄로 알린다.

**Reveal.** 판정 결과는 이 제품의 감정적 정점이라 다른 화면과 같은 페이드로 지나가지 않는다. 스타트 라인이 왼쪽에서 화면을 가로지르고(0.5s), 타입 이름이 칠해지고(0.58s), 거리 마커 다섯이 차례로 앰버로 채워진 뒤 카드로 넘어간다(총 1.25s). `prefers-reduced-motion`에서는 통째로 건너뛰고 카드로 직행한다.

**Trade-off Card (추천 후보).** 차콜 보드 + 후보별 레인 색 스트라이프. **번호를 표기하지 않는다** — 그 자리에 Trade-off 라벨이 온다. 순서: 라벨 → 브랜드 → 제품명 → (제품 이미지) → 왜/무엇이 → **확인할 점(WATCH)** → **행동 행(저장 · 가격 확인 · 구매처 확인)**.

**전환 행동은 접힌 서랍에 두지 않는다.** 저장·가격·구매처는 제품의 성공 조건(장비 선택까지 이어가기)이므로 카드 본문에 항상 보인다. 구매처가 채워진 행의 주행동이라 백색으로 반전되고 오른쪽 끝에 선다.

**추천 화면 순서.** 요약 → 세 후보 개요 → **후보 카드 3장** → Gear Coach → 고지. Coach는 후보를 본 뒤에 온다 — 보기도 전에 "고민된다면"을 묻지 않는다.

**추천 기준 블록.** 사람이 읽는 문장이 먼저, 기계가 읽는 칩이 뒤. **Runner Type과 Modifier는 이 칩에 넣지 않는다**(D-01 — Identity Layer는 추천 점수에 투입되지 않는다). 대신 "러너 타입은 추천 점수에 넣지 않아요"를 한 줄로 명시해 원칙을 화면에서 확인시킨다.

**WATCH Block.** `board-2` 면에 놓인 확인 사항. D-06에 따라 **접힌 영역에 두지 않는다.** 카드 본문에 항상 보인다.

**Progress Markers.** 진행은 바가 아니라 주로에 찍힌 거리 마커다. 완료 구간은 `lane-dim`, 현재 구간은 앰버로 칠해지고 위아래로 3px씩 길어진다. 마커 위에 **단계 이름과 `01 / 05`를 한 줄로** 얹는다 — 이름이 없으면 여정 안에서 서로 무관한 진행바 세 개로 읽힌다. 단계 이름은 `러너 타입` / `내 러닝 정보` / `장비 방향 찾기` 셋이다. `role="progressbar"`로 값을 노출한다.

**Empty / Unknown State.** 값이 없으면 `—`와 함께 왜 비어 있는지 한 줄을 쓴다. 범위로 답한 것은 범위로 표시하고 `답변 범위`라 명시하며, 실제 기록은 `기록 합계`로 구분한다.

**없는 이미지는 자리를 비운다.** 제품 이미지가 없는 지금, 회색 실루엣 플레이스홀더는 카드마다 깨진 이미지 자리를 만든다(`board-3` on `board-2` = 대비 1.22:1). `<img>`와 자산 경로 규약은 그대로 두되 로드 실패 시 블록을 **제거**한다 — 자산이 채워지면 코드 변경 없이 나타난다. 신발 선택 목록도 같은 이유로 썸네일 없이 텍스트 행이다.

**검색은 막다른 길이 될 수 없다.** 등록된 제품 목록이 짧을 때 검색 결과가 0이면, 빈 상태 한 줄과 **"적은 이름으로 등록"** 을 함께 낸다. 목록에 없다는 이유로 사용자가 자기 상황과 다른 답을 고르게 만들지 않는다.

**전환 시 포커스.** 화면이 바뀌면 새 화면의 제목으로 포커스를 옮긴다(`tabindex="-1"`, 포커스 링 없음). 앱 전체에 `aria-live`를 걸지 않는다 — 선택할 때마다 화면 전체가 다시 낭독된다. 같은 화면 안에서 새로 나타난 답변은 `scrollIntoView`로 시야에 데려온다.

## Do's and Don'ts

**Do**
- 러스트를 지면으로만 쓴다. 가장 뒤에 둔다.
- 데이터가 있는 곳에만 차콜 보드를 올린다.
- 계측값은 tabular-nums로, **라틴** 라벨은 대문자 트래킹으로.
- 한글 라벨은 크기와 굵기로만 위계를 만든다.
- 아이콘은 그린다. 획 굵기를 통일한다.
- 모르는 값은 `—`와 사유 한 줄로 표시한다.
- 카드 좌측 스트라이프는 레인 배정을 뜻할 때만 쓴다.
- 사용자 화면의 말투는 해요체로 통일한다.

**Don't**
- 추천 후보에 번호(01/02/03)를 붙이지 않는다. (D-05)
- 확인 사항을 접힌 영역에 숨기지 않는다. (D-06)
- **추천 기준에 Runner Type을 넣지 않는다.** (D-01)
- **전환 행동(저장·가격·구매처)을 접힌 영역에 두지 않는다.**
- 범위 입력을 확정 수치로 바꾸지 않는다. (개발 원칙 4)
- 컬러 글로우 그림자를 쓰지 않는다.
- 한글에 스텐실 브리지를 적용하지 않는다.
- **한글에 라틴 트래킹(0.1em 이상)이나 `text-transform`을 걸지 않는다.**
- 러스트 지면 위에 알파 0.82 미만의 흰 텍스트를 놓지 않는다.
- **러스트 지면 위에 앰버 텍스트를 놓지 않는다.** 앰버는 보드 위에서만 글자다.
- **앰버로 면을 채우지 않는다.** 버튼 배경은 보드이거나 백색이다.
- 제목 위에 아이브로우 라벨을 얹지 않는다.
- 카드를 pill 모양으로 만들지 않는다.
- **규칙 버전 문자열(`TYPE_RULE_v0.1` 등)을 사용자 화면에 쓰지 않는다.** 추적은 `window.GM_VERSIONS`로 남긴다.
- **`Identity` / `Activity` / `Gear` 같은 내부 도메인 용어를 UI 카피에 쓰지 않는다.** `Runner Card`만 브랜드 용어로 허용한다.
- **같은 화면 안의 상태 변경으로 스크롤을 0으로 되돌리지 않는다.** 화면이 실제로 바뀔 때만 맨 위로 간다.
