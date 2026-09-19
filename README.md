# carlos-portfolio

김인태 포트폴리오 — Next.js 16 · React 19 · Tailwind v4 · R3F · shadergradient · paper-design LiquidMetal · liquid-glass-js

```bash
npm run dev   # http://localhost:3000 → /ko 또는 /en 으로 리다이렉트
```

## 내용 수정
모든 텍스트(ko/en)는 `content/resume.ts` 한 파일에 있다.

## 화면 캡쳐 교체
1. **더미 데이터 상태**로 캡쳐 (보호자·환자·결재 실데이터 금지)
2. `public/shots/<slug>.webp` 로 저장 (가로 1600px 권장) — slug: `vitalvet`, `homepage`, `office`, `cancervet`
3. `content/resume.ts` 해당 프로젝트의 `shot` 경로와 `aspect`(가로/세로)를 맞춘다

## 구조 메모
- 3D 스크롤 스토리(`components/screens`)와 LiquidMetal 로고는 `min-width:1024px` + 모션 허용일 때만. 그 외엔 2D 캡쳐
- `lib/liquid-glass/` 는 dashersw/liquid-glass-js(MIT) vendoring. html2canvas 스냅샷을 굴절시키는 구조라 WebGL 위가 아닌 Contact 버튼에만 쓴다
