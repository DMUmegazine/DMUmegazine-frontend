import React, { useState } from 'react';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

interface LoginPageProps {
  onBack?: () => void;
  onSignUp?: () => void;
  onLogoClick?: () => void;
}

export default function LoginPage({ onBack, onSignUp, onLogoClick }: LoginPageProps) {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요.';
    }
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: 로그인 API 연결
  };

  const fields: {
    name: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
    tag: string;
  }[] = [
    { name: 'username', label: '아이디', type: 'text', placeholder: 'megazine_user', tag: 'USER' },
    { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호 입력', tag: 'PW' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-6">
      {/* Background grid texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <h1 
            onClick={onLogoClick}
            className="text-2xl font-black italic text-white uppercase tracking-tighter cursor-pointer hover:opacity-80"
          >
            <span className="text-[#34D399]">ME</span>GAZINE
          </h1>
            <span className="bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399] text-[9px] px-2 py-1 rounded font-bold tracking-widest">
              LOG IN
            </span>
          </div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-tight">
            다시 돌아오셨군요
          </h2>
          <p className="text-[11px] text-gray-600 italic mt-3">● 벡터DB 기반 실시간 AI 매거진 플랫폼</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            {fields.map((field) => {
              const isFocused = focusedField === field.name;
              const hasError = !!errors[field.name];
              const hasValue = !!formData[field.name];

              return (
                <div key={field.name} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                      {field.label}
                    </label>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold tracking-widest transition-colors duration-200 ${
                        isFocused
                          ? 'bg-[#34D399]/20 text-[#34D399]'
                          : 'bg-[#222] text-gray-600'
                      }`}
                    >
                      {field.tag}
                    </span>
                  </div>

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
                    {isFocused && !hasError && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#34D399] rounded-full" />
                    )}
                  </div>

                  {hasError && (
                    <p className="text-[10px] text-red-400 mt-1.5 font-bold tracking-wide">
                      ✕ {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-[9px] text-gray-700 font-bold tracking-widest">READY</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-[#34D399] text-black font-bold text-sm tracking-widest rounded-xl hover:bg-white active:scale-[0.98] transition-all duration-150 uppercase relative overflow-hidden group"
          >
            <span className="relative z-10">로그인 →</span>
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black z-10">
              로그인 →
            </span>
          </button>

          {/* Footer link */}
          <p className="text-center text-[11px] text-gray-600 mt-6 italic">
            계정이 없으신가요?{' '}
            <button onClick={onSignUp} className="text-[#34D399] font-bold hover:text-white transition-colors duration-150 not-italic">
              회원가입
            </button>
          </p>
        </div>

        {/* Bottom tag */}
        <p className="text-center text-[10px] text-gray-700 italic mt-6">
          ● AI-powered news magazine platform
        </p>
      </div>
    </div>
  );
}
