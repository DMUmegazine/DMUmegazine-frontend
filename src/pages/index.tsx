import React, { useState } from 'react';
import { Search, Plus, ExternalLink } from 'lucide-react';

export default function MainPage() {
  const [activeTag, setActiveTag] = useState('IT');

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 font-sans selection:bg-accent/30">
      <div className="max-w-5xl mx-auto">
        {/* --- GNB 영역 --- */}
        <nav className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-black italic tracking-tighter">
            MEGA<span className="text-accent">ZINE</span>
          </h1>
          <div className="flex gap-2">
            {['IT', '경제', '사회', '스포츠'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeTag === tag 
                  ? 'bg-card border-accent text-accent' 
                  : 'bg-transparent border-border text-gray-500 hover:border-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
            <button className="p-2 border border-dashed border-border rounded-full text-gray-600">
              <Plus size={18} />
            </button>
          </div>
        </nav>

        {/* --- Deep Search (딥서치) 영역 [DEEP-01] --- */}
        <section className="bg-card rounded-3xl p-8 border border-border mb-16 shadow-2xl">
          <p className="text-xs text-gray-500 mb-5 font-medium uppercase tracking-widest">Deep Search — AI Insight</p>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
              <input 
                type="text" 
                placeholder="키워드를 입력하면 AI가 관련 기사를 종합해 브리핑합니다"
                className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <button className="bg-accent text-black px-10 py-4 rounded-xl font-bold text-sm hover:brightness-110 transition-all">
              검색
            </button>
          </div>
        </section>

        {/* --- Magazine Grid 영역 [MAG-02] --- */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-sm text-gray-500 font-bold mb-1 italic">나의 매거진 — {activeTag}</h2>
              <p className="text-xs text-gray-600 italic">● 벡터DB에서 관심 태그 기반 기사 검색 후 AI가 생성한 매거진입니다</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 임시 카드 루프 [FE-02, FE-04 적용] */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group bg-card border border-border rounded-2xl p-7 hover:border-accent/50 transition-all cursor-pointer">
                <span className="text-[10px] font-black text-accent mb-4 block tracking-widest">{activeTag}</span>
                <h3 className="text-base font-bold text-white mb-4 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  글로벌 기술 트렌드 분석: 2026년 반도체 시장의 지각변동
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
                  수집된 15개의 기사를 기반으로 분석한 결과, AI 인프라 수요가 하드웨어를 넘어 소프트웨어 생태계로 확장되고 있습니다.
                </p>
                <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold">
                  <span>12시간 전 · 뉴시스</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}