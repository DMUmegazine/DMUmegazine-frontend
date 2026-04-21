import React, { useState } from 'react';

// 회원가입 폼 입력 데이터 구조
interface FormData {
  email: string;
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

// 유효성 검사 에러 메시지 구조
interface FormErrors {
  email?: string;
  username?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
}

// props 타입 추가 (뒤로가기 콜백)
interface SignUpPageProps {
  onBack?: () => void;
  onLogin?: () => void;
}

export default function SignUpPage({ onBack, onLogin }: SignUpPageProps) {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  // 유효성 검사 에러 메시지 상태
  const [errors, setErrors] = useState<FormErrors>({});
  // 현재 포커스된 입력 필드 이름 (스타일 하이라이트용)
  const [focusedField, setFocusedField] = useState<string | null>(null);
  // 회원가입 완료 여부 (완료 화면 전환용)
  const [submitted, setSubmitted] = useState(false);

  // 각 필드의 입력값을 검사하고 에러 메시지 객체를 반환
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요.';
    } else if (formData.username.length < 4) {
      newErrors.username = '아이디는 4자 이상이어야 합니다.';
    }
    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호를 다시 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    return newErrors;
  };

  // ----- 이벤트 핸들러 -----
  // 입력값 변경 시 formData 업데이트 + 해당 필드 에러 초기화
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // 제출 버튼 클릭 시 유효성 검사 후 통과하면 완료 상태로 전환
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  // ----- 입력 필드 목록 -----
  // 렌더링할 폼 필드 정보 배열
  const fields: {
    name: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
    tag: string;
  }[] = [
      { name: 'email', label: '이메일', type: 'email', placeholder: 'hello@megazine.io', tag: 'ID' },
      { name: 'username', label: '아이디', type: 'text', placeholder: 'megazine_user', tag: 'USER' },
      { name: 'nickname', label: '닉네임', type: 'text', placeholder: '나의 매거진 이름', tag: 'NICK' },
      { name: 'password', label: '비밀번호', type: 'password', placeholder: '8자 이상 입력', tag: 'PW' },
      { name: 'confirmPassword', label: '비밀번호 확인', type: 'password', placeholder: '한 번 더 입력', tag: 'CFM' },
    ];

  // ----- 완료 화면 -----
  // 회원가입 성공 시 완료 화면
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* 완료 뱃지 */}
          <div className="inline-block bg-[#34D399]/10 border border-[#34D399]/30 rounded-2xl px-4 py-1 mb-6">
            <span className="text-[#34D399] text-xs font-black tracking-widest">● COMPLETE</span>
          </div>
          {/* 로고 */}
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">
            <span className="text-[#34D399]">ME</span>GAZINE
          </h2>
          {/* 환영 메시지 */}
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            <span className="text-[#34D399] font-bold">{formData.nickname}</span>님의<br />
            매거진이 준비되었습니다.
          </p>
          {/* 로그인 페이지로 이동 버튼 */}
          <button
            onClick={onLogin}
            className="w-full py-3 bg-[#34D399] text-black font-black text-sm tracking-widest rounded-xl hover:bg-white transition-colors duration-200"
          >
            로그인하러 가기 →
          </button>
        </div>
      </div>
    );
  }

  // ----- 회원가입 폼 화면 -----
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6">
      {/* 배경 격자 텍스처 (은은하게 표시) */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* 헤더 */}
        <div className="mb-10">
          {/* 로고 + SIGN UP 뱃지 */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">
              <span className="text-[#34D399]">ME</span>GAZINE
            </h1>
            <span className="bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] text-[9px] px-2 py-1 rounded font-black tracking-widest">
              SIGN UP
            </span>
          </div>
          {/* 페이지 타이틀 */}
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-tight">
            나만의 AI<br />
            <span className="text-gray-600">매거진을 시작하세요</span>
          </h2>
          {/* 서비스 설명 서브텍스트 */}
          <p className="text-[11px] text-gray-600 italic mt-3">● 벡터DB 기반 실시간 AI 매거진 플랫폼</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
          {/* 입력 필드 목록 */}
          <div className="space-y-5">
            {fields.map((field) => {
              // 현재 필드가 포커스 중인지
              const isFocused = focusedField === field.name;
              // 현재 필드에 에러가 있는지
              const hasError = !!errors[field.name];
              // 현재 필드에 값이 있는지
              const hasValue = !!formData[field.name];

              return (
                <div key={field.name} className="group">
                  {/* 필드 레이블 + 태그 뱃지 */}
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-black tracking-widest text-gray-500 uppercase">
                      {field.label}
                    </label>
                    {/* 포커스 시 뱃지 색상 변경 */}
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest transition-colors duration-200 ${isFocused
                        ? 'bg-[#34D399]/20 text-[#34D399]'
                        : 'bg-[#222] text-gray-600'
                        }`}
                    >
                      {field.tag}
                    </span>
                  </div>

                  {/* 입력창 + 포커스 좌측 액센트 바 */}
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      className={`w-full bg-[#1e1e1e] text-white text-sm placeholder-gray-700 rounded-xl px-4 py-3.5 outline-none border transition-all duration-200 font-mono
                        ${hasError
                          ? 'border-red-500/50 focus:border-red-500'
                          : isFocused
                            ? 'border-[#34D399]/40 shadow-[0_0_0_3px_rgba(52,211,153,0.05)]'
                            : hasValue
                              ? 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                              : 'border-[#222] hover:border-[#2a2a2a]'
                        }`}
                    />
                    {/* 포커스 시 좌측에 나타나는 초록 액센트 바 */}
                    {isFocused && !hasError && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#34D399] rounded-full" />
                    )}
                  </div>
                  {/* 에러 메시지 */}
                  {hasError && (
                    <p className="text-[10px] text-red-400 mt-1.5 font-bold tracking-wide">
                      ✕ {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {/* 구분선 */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-[9px] text-gray-700 font-black tracking-widest">READY</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>
          {/* 제출 버튼 */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-[#34D399] text-black font-black text-sm tracking-widest rounded-xl hover:bg-white active:scale-[0.98] transition-all duration-150 uppercase relative overflow-hidden group"
          >
            <span className="relative z-10">매거진 시작하기 →</span>
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center font-black text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black z-10">
              매거진 시작하기 →
            </span>
          </button>

          {/* 풋터 링크 — onBack으로 이전 화면으로 이동 */}
          <p className="text-center text-[11px] text-gray-600 mt-6 italic">
            이미 계정이 있으신가요?{' '}
            <button onClick={onLogin} className="text-[#34D399] font-bold hover:text-white transition-colors duration-150 not-italic">
              로그인
            </button>
          </p>
        </div>
        {/* 하단 설명 */}
        <p className="text-center text-[10px] text-gray-700 italic mt-6">
          ● AI-powered news magazine platform
        </p>
      </div>
    </div>
  );
}