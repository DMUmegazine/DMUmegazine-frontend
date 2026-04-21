#!/bin/bash

echo "[1/4] package.json 초기화 및 ESM 설정..."
npm init -y

# package.json에 "type": "module" 추가
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
pkg.type = 'module';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "[2/4] v3 기반 라이브러리 설치 (안정 버전 고정)..."
npm install next@latest react@latest react-dom@latest lucide-react
npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.17 typescript @types/node @types/react @types/react-dom

echo "[3/4] 설정 파일 최적화 (.cjs 자동 생성)..."
if [ ! -f tailwind.config.cjs ]; then
cat <<EOF > tailwind.config.cjs
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        card: "#1E1E1E",
        accent: "#34D399",
        border: "#2A2A2A"
      }
    }
  },
  plugins: []
};
EOF
fi

echo "[4/4] 캐시 클린업 및 환경 준비..."
if [ -d .next ]; then
  rm -rf .next
fi

echo "[완료] MEGAZINE 프론트엔드 환경 구축이 끝났습니다. 'npm run dev'를 실행하세요!"