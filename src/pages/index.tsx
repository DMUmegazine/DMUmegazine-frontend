import React, { useState } from 'react';
import CategoryNav from '../components/layout/CategoryNav';
import DeepSearchBar from '../components/main/DeepSearchBar';
import MagazineGrid from '../components/main/MagazineGrid';
import KeywordModal from '../components/main/KeywordModal';
import { NewsArticle } from '../types/magazine';
import SignUp from '../components/main/SignUp';
import Login from '../components/main/Login';

const DUMMY_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    tag: 'IT',
    title: '애플 WWDC 2025 주요 발표 — AI 통합과 iOS 19의 변화',
    summary: '애플이 올해 WWDC에서 시스템 전반에 걸친 AI 기능 통합을 발표했습니다.',
    source: '뉴시스',
    publishedAt: '2시간 전',
    url: 'https://...'
  },
  {
    id: '2',
    tag: '경제',
    title: '한국은행 기준금리 동결 — 2.75% 유지',
    summary: '내수 부진과 환율 불안정을 이유로 금리를 동결했습니다.',
    source: '연합뉴스',
    publishedAt: '4시간 전',
    url: 'https://...'
  },
  {
    id: '3',
    tag: 'IT',
    title: '오픈AI GPT-5 출시 — 추론 속도 3배 향상',
    summary: '멀티모달 처리와 코드 생성 성능이 크게 개선됐습니다.',
    source: '매일경제',
    publishedAt: '6시간 전',
    url: 'https://...'
  }
];

export default function MainPage() {
  const [allTags, setAllTags] = useState(['IT', '경제', '사회', '스포츠']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['IT']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogoClick = () => {
    setShowSignUp(false);
    setShowLogin(false);
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const handleAddTag = (newTag: string) => {
    if (!allTags.includes(newTag)) {
      setAllTags(prev => [...prev, newTag]); // 리스트에 추가
    }
    if (!selectedTags.includes(newTag)) {
      setSelectedTags(prev => [...prev, newTag]); // 즉시 선택 상태로 변경
    }
    setIsModalOpen(false); // 모달 닫기
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} onLogoClick={handleLogoClick} onSignUp={() => { setShowLogin(false); setShowSignUp(true); }} />;
  }

  if (showSignUp) {
    return <SignUp onBack={() => setShowSignUp(false)} onLogoClick={handleLogoClick} onLogin={() => { setShowSignUp(false); setShowLogin(true); }} />;
  }
  return (

    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 
            onClick={handleLogoClick}
            className="text-2xl font-black italic text-white uppercase tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-accent">ME</span>GAZINE
          </h1>
          <div className="flex items-center gap-4">
            <CategoryNav
              tags={allTags}
              activeTags={selectedTags}
              onTagToggle={toggleTag}
              onAddClick={() => setIsModalOpen(true)}
            />
            {/* 회원가입 버튼 */}
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-[#34D399] text-black text-xs font-bold tracking-widest px-4 py-2 rounded-xl hover:bg-white transition-colors duration-150 uppercase"
            >
              회원가입
            </button>
          </div>
        </header>


        {/* 2. [DEEP-01] 검색바 (상단 고정) */}
        <DeepSearchBar onSearch={(k) => console.log(k)} />

        {/* 3. [DEEP-05] 선택된 뉴스 상세 브리핑 (검색바 바로 아래) */}
        {selectedNews && (
          <section className="bg-card border border-border rounded-2xl p-8 mb-12 animate-in fade-in slide-in-from-top-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-white leading-tight">{selectedNews.title}</h2>
              <span className="bg-accent/20 text-accent text-[10px] px-2 py-1 rounded font-black">AI 브리핑</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">{selectedNews.summary}</p>
            <div className="flex gap-4 text-xs font-bold border-t border-border pt-4">
              <a href={selectedNews.url} target="_blank" rel="noreferrer" className="text-accent hover:text-white transition-colors">
                ● 원문 기사 읽기 — {selectedNews.source}
              </a>
            </div>
          </section>
        )}

        {/* 4. [MAG-01, 02] 뉴스 그리드 리스트 */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm text-gray-500 font-bold mb-1 italic">나의 매거진 — {selectedTags.join(', ')}</h2>
            <p className="text-[11px] text-gray-600 italic">● 벡터DB 기반 실시간 AI 매거진입니다</p>
          </div>

          <MagazineGrid
            articles={DUMMY_ARTICLES.filter(a => selectedTags.includes(a.tag))}
            onNewsClick={setSelectedNews}
          />
        </section>
        {isModalOpen && (
          <KeywordModal
            onClose={() => setIsModalOpen(false)}
            onSelect={handleAddTag}
          />
        )}
      </div>
    </div>
  );
}