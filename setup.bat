@echo off
echo [1/4] package.json 초기화 및 ESM 설정...
call npm init -y
:: package.json에 "type": "module"을 자동으로 추가하여 백엔드와의 호환성을 맞춥니다.

echo [2/4] v3 기반 라이브러리 설치 (안정 버전 고정)...
:: Turbopack 및 ESM 환경에서 가장 안정적인 v3 버전을 명시적으로 설치합니다.
call npm install next@latest react@latest react-dom@latest lucide-react
call npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.17 typescript @types/node @types/react @types/react-dom

echo [3/4] 설정 파일 최적화 (.cjs 자동 생성)...
:: ESM 환경에서 CommonJS 설정 파일이 충돌하지 않도록 확장자를 .cjs로 강제합니다.
if not exist tailwind.config.cjs (
    echo module.exports = { content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { background: "#121212", card: "#1E1E1E", accent: "#34D399", border: "#2A2A2A" } } }, plugins: [] }; > tailwind.config.cjs
)

echo [4/4] 캐시 클린업 및 환경 준비...
:: 꼬인 빌드 데이터를 삭제하여 깨끗한 상태에서 시작합니다.
if exist .next rmdir /s /q .next

echo [완료] MEGAZINE 프론트엔드 환경 구축이 끝났습니다. 'npm run dev'를 실행하세요!
pause