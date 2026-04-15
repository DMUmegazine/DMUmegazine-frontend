import React, { useState } from 'react';
import CategoryNav from '../components/layout/CategoryNav';
import DeepSearchBar from '../components/main/DeepSearchBar';
import MagazineGrid from '../components/main/MagazineGrid';

export default function MainPage() {
  const [activeTag, setActiveTag] = useState('IT');

  const handleSearch = (keyword: string) => {
    console.log("Searching for:", keyword);
    // [API-01] 연동 예정
  };

const tempArticles = [
  {
    id: '1',
    tag: 'IT',
    title: '글로벌 기술 트렌드 분석: 2026년 반도체 시장의 지각변동',
    summary: 'AI 인프라 수요가 하드웨어를 넘어 소프트웨어 생태계로 확장되고 있습니다.',
    source: '뉴시스',
    publishedAt: '12시간 전',
    url: '#'
  },
  {
    id: '2',
    tag: 'IT',
    title: '엔비디아의 독주와 반도체 시장의 미래',
    summary: '최근 수집된 기사들을 분석한 결과 기술 패러다임이 이동하고 있습니다.',
    source: '뉴스1',
    publishedAt: '2시간 전',
    url: '#'
  }
];

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] p-6 lg:p-10 font-sans selection:bg-[#34D399]/30">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            MEGA<span className="text-[#34D399]">ZINE</span>
          </h1>
          <CategoryNav 
            tags={['IT', '경제', '사회', '스포츠']} 
            activeTag={activeTag} 
            onTagChange={setActiveTag} 
          />
        </header>

        <DeepSearchBar onSearch={handleSearch} />

        <section>
          <div className="mb-8">
            <h2 className="text-sm text-gray-500 font-bold mb-1 italic">나의 매거진 — {activeTag}</h2>
            <p className="text-[11px] text-gray-600 italic">● 벡터DB 기반 실시간 AI 매거진 [MAG-06]</p>
          </div>
          <MagazineGrid articles={tempArticles} /> {/* 데이터는 나중에 API-03으로 수급 */}
        </section>
      </div>
    </div>
  );
}