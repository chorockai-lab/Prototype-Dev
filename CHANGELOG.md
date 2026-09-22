# GearMatch AI Prototype Changelog

버전별 HTML Prototype 변경 기록입니다. 각 버전 파일은 덮어쓰지 않고 별도 파일로 보존합니다.

## v1.7 — Runner Identity / Today's Run

파일: `Prototype_GearMatch_AI_1.7_RunnerIdentity.html`
Base: `prototype-v1.6`

- 서비스 중심을 Gear Recommendation Funnel에서 Runner Identity 경험으로 재정렬
- Landing 약속을 "내 러닝 스타일 발견 + 오늘의 러닝 기록"으로 변경 (`03 GEAR OPTIONS` → `TODAY / RUN & SHARE`)
- Runner Identity Reveal 강화: 자동 전환 제거, `WHY THIS IS YOU` 근거 표시
- Today's Run 수동 입력 추가: 사진 · 거리 · 시간 · Pace 자동 계산 · 날짜
- Photo-first Run Share Card 추가 (사진 70~80% + 데이터 Overlay)
- Visual Mood Mock 4종 추가 (PERFORMANCE · CLEAN · STREET · RELAXED)
- Running Insight 추가 (최근 4주 거리 · 횟수 · 평균 · 최장 · 주차별 Trend · 한 줄 해석)
- Similar Runner를 Gear → Activity → People 구조로 재설계 (`RUNNERS LIKE YOU`)
- Shoes / Style Concept 구조 추가 (Style은 Concept Preview 수준)
- 재방문 Home을 Recent Run → Insight → Identity → Runners Like You → Gear Explore 순서로 재구성
- Gear Recommendation을 Secondary Flow로 이동, Gear Need 자유입력을 보조화

포함하지 않음: Strava/NRC/Garmin 연동, OCR, Community, Apparel 추천, Card Editor, Commerce

### 문서 정합 (2026-09-21)

- `docs/DECISIONS.md` **D-09 정본 판정 확정** — 정본 = 최신 기획서 + Prototype v1.7,
  Runner Type **6종**, Current Shoe Active 1개, Similar Runner P0(Gear Discovery 한정), Product DB `10-A v1.5`
- D-01 / D-02 / D-03 / D-08에 대체 표기, Rule Version 표를 확정 버전으로 갱신
- `04` MVP Scope와 `05` User Flow를 v1.7 경험 기준으로 개정
- `CLAUDE.md` 경로 오류 수정, Visual SSOT를 v1.7로 변경
- `DESIGN.md`가 archive v1.2 계열임을 명시
- 04~09 문서의 상호 참조 버전을 실제 파일 기준으로 정렬

### Seed 파이프라인 재작성 (2026-09-22)

- `scripts/seed/` 를 `product_db_v1.5` 기준으로 전면 재작성
- 파서를 ExcelJS에서 SheetJS로 교체 (10-A 워크북의 `x:` 네임스페이스 접두를 ExcelJS가 못 읽음)
- `seed/products.v1.5.json` 신규 산출 (제품 35 · Eligible 10 · Evidence 80)
- 구 산출물 `seed/products.v0.2.json` 을 `archive/seed/` 로 이동
- `vocabulary.ts` 를 v1.5 통제어휘로 교체 (점수 척도 1~5 → 0~100 여덟 축)
- 검증 게이트에 Direction 후보 커버리지 실측 검사 추가

## v1.6 — UX Clarity

파일: `Prototype_GearMatch_AI_1.6_UXClarity.html`

- 해석 부담 감소
- Landing / Runner Type / Recommendation Copy 개선
- Ticket-style Runner Card 개선

## v1.5 — Shoe Images Embedded

파일: `Prototype_GearMatch_AI_1.5_ShoeImages_Embedded.html`

- 추천 제품 이미지를 단일 HTML에 임베드
