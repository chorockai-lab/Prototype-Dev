# archive

정본에서 물러났거나, **아직 정본 여부가 확정되지 않은** 산출물을 보관한다.

여기 있는 것을 기준으로 새 화면을 만들지 않는다. 다만 아래 v1.2는 단순 폐기가 아니라
**판정 보류 상태**이므로 주의해서 읽는다.

---

## GearMatch_AI_HTML_Prototype_v1.2_single.html

2026-09-02 산출물. 단일 HTML 파일 하나로 전체 플로우가 동작하며, 빌드 도구도 서버도
필요 없이 더블클릭으로 열린다.

| 항목 | 값 |
|---|---|
| 비주얼 시스템 | 루트 `DESIGN.md` — 「레인 배정 / Lane Assignment」 |
| 지면 색 | 트랙 적갈색 `#A63D25` |
| 디스플레이 서체 | Archivo (라틴), Pretendard Variable (한글·본문) |
| Runner Type | **5 Core Type + Modifier 4종** (`TYPE_RULE_v0.1`) |
| 제품 맥락 | 루트 `PRODUCT.md` |

### 자산 연결 지점

- **제품 이미지** — `window.GM_PRODUCT_IMAGES`에 `slug: url`을 넣으면 추천 카드에
  나타난다. slug는 `productAssetSlug()` 규칙(`브랜드-제품명` 소문자 케밥)을 따른다.
  맵이 비어 있는 지금은 이미지 블록을 아예 그리지 않는다 — 없는 것을 회색 실루엣으로
  채우지 않고, 매 렌더마다 404를 쌓지도 않기 위해서다.
- **규칙 버전** — 화면에는 쓰지 않고 `window.GM_VERSIONS`로 확인한다.

### 웹폰트

한글·본문은 Pretendard Variable, 라틴 디스플레이는 Archivo를 CDN에서 받는다.
오프라인(더블클릭 실행)에서는 시스템 스택으로 폴백되며 레이아웃은 유지된다 —
타입 이름 크기는 표가 아니라 실제 렌더 폭으로 정해지기 때문이다.

---

## ⚠️ v1.2와 루트 v1.5는 서로 다른 갈래다

레포 루트의 `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html`(2026-09-04)과
이 v1.2는 비주얼 월드도 타입 체계도 다르다.

| | archive v1.2 | 루트 v1.5 |
|---|---|---|
| 비주얼 | 트랙 적갈색 `#A63D25` + Archivo | 라임/다크 `#D7FF2E` + Boldonse |
| Runner Type | 5 Core + Modifier 4 | 6종 (`ROUTINE_RUNNER` 외) |
| 근거 문서 | `DESIGN.md`, `docs/DECISIONS.md` | `04`·`06` 기획서, `CLAUDE.md` |

**어느 쪽이 정본인지는 아직 확정되지 않았다.** `docs/DECISIONS.md` **D-09** 참조.
MVP Scope Lock(`09` 문서 GM-001) 시점에 판정한다. 그때까지 v1.2를 폐기하지 않는다.

`CLAUDE.md`는 현재 v1.5를 Visual SSOT로 지정하고 있으므로, **판정 전까지 신규 구현은
v1.5를 따른다.** v1.2는 근거 자료로만 쓴다.

---

## 이 레포에 올라오지 않은 것

아래는 작업 PC(`D:\Claude`)에만 있고 레포에는 없다. 필요해지면 별도로 커밋해야 한다.

| 경로 | 무엇 | 왜 중요한가 |
|---|---|---|
| `archive/prototype-multifile/js/type-rule.js` | `TYPE_RULE_v0.1` 판정 규칙 **구현체** | `docs/DECISIONS.md` D-01이 가리키는 대상. 5종 타입 판정의 유일한 코드 |
| `archive/prototype-multifile/js/i18n.ko.js` | Core Type / Modifier 확정 한국어 카피 | D-07 확정 카피의 원본 |
| `archive/prototype-multifile/` 나머지 | Phase 1 멀티파일 프로토타입 | v1.2가 이식해 온 출처 (전 조합 189,000건 대조 일치) |
| `archive/GearMatch_AI_HTML_Prototype_v1.1_single.html` | 타입 체계 정렬 마일스톤 | v1.2 직전 단계 |
| `archive/design-lab/` | Runner Card 무드 스터디 5종 | 방향 탐색 기록 |
| `prototype/design/` | Runner Card 방향 시안 3종 (FIELD KIT / NIGHT SESSION / DATA PORTRAIT) | 데스크톱·모바일 아트보드 + 의도 기록 |
| `.impeccable/critique/` | 디자인 헬스 스코어 21/36, P0 2건·P1 2건 진단 | MVP에서 해소해야 할 UX 결함 목록 |

`PRODUCT.md`와 `docs/UX_Prototype_Fix_Plan_v1.0.md`가 위 경로들을 참조한다.
문서상 참조는 유지하되, **레포 안에서는 해당 파일을 찾을 수 없다.**

---

## 실행

```bash
python -m http.server 4322 --directory archive
```

`.claude/launch.json`에 `archive-v1.2`(4322)로 등록되어 있다.
루트 v1.5는 `prototype-v1.5`(4321)로 띄운다.
