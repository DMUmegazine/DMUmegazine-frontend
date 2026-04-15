@echo off
echo [1/3] package.json 초기화 중...
call npm init -y

echo [2/3] 필수 라이브러리 설치 중 (Next.js, React, Tailwind, Lucide)...
call npm install next@latest react@latest react-dom@latest lucide-react
call npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer

echo [3/3] Tailwind CSS 초기화 중...
call npx tailwindcss init -p

echo 모든 설정이 완료되었습니다! 'npm run dev'로 서버를 실행하세요.
pause