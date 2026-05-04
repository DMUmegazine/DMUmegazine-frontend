import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function DeepSearchBar({ onSearch }: { onSearch: (keyword: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <section className="bg-card rounded-2xl p-8 border border-border mb-12 shadow-xl">
      <p className="text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-[0.2em]">Deep Search — AI Analysis</p>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // 엔터키 지원
            placeholder="키워드를 입력하면 AI가 관련 기사를 종합해 브리핑합니다"
            className="w-full bg-background border border-[#333] rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-accent transition-all text-white"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="bg-[#2D2D2D] text-white border border-[#3D3D3D] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3D3D3D] transition-all"
        >
          검색
        </button>
      </div>
    </section>
  );
}