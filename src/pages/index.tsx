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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ nickname: string; email: string } | null>(null);

  const handleLoginSuccess = (userData: any) => {
  setIsLoggedIn(true);
  setUserInfo({
    nickname: userData.user.nickname,
    email: userData.user.email
  });

  if (userData.user.tags && userData.user.tags.length > 0) {
    setSelectedTags(userData.user.tags);

    setAllTags(prev => {
      const combined = Array.from(new Set([...prev, ...userData.user.tags]));
      return combined;
    });
  }
  
  setShowLogin(false);
};

  const handleLogoClick = () => {
    setShowSignUp(false);
    setShowLogin(false);
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  const handleAddTag = async (newTag: string) => {
  const updatedAllTags = allTags.includes(newTag) ? allTags : [...allTags, newTag];
  const updatedSelectedTags = selectedTags.includes(newTag) ? selectedTags : [...selectedTags, newTag];
  
  setAllTags(updatedAllTags);
  setSelectedTags(updatedSelectedTags);

  if (isLoggedIn && userInfo?.email) {
    try {
      await fetch('http://localhost:8000/auth/update-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          tags: updatedSelectedTags, // 현재 선택된 모든 태그 전송
        }),
      });
      console.log("관심사가 DB에 저장되었습니다.");
    } catch (error) {
      console.error("태그 저장 실패:", error);
    }
  }
  setIsModalOpen(false);
};

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (showSignUp) return (
    <SignUp 
      onBack={() => setShowSignUp(false)} 
      onLogin={() => { setShowSignUp(false); setShowLogin(true); }} 
      onLogoClick={handleLogoClick} 
    />
  );
  
  if (showLogin) return (
    <Login 
      onBack={() => setShowLogin(false)} 
      onSignUp={() => { setShowLogin(false); setShowSignUp(true); }} // 회원가입으로 이동
      onLogoClick={handleLogoClick}
      onLoginSuccess={handleLoginSuccess} // 성공 콜백 전달
    />
  );
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
            {isLoggedIn ? (
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] text-accent font-black tracking-widest uppercase italic">
                  ● {userInfo?.nickname} 님
                </span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-[9px] text-gray-600 hover:text-white font-bold transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)} 
                className="px-6 py-2.5 bg-[#34D399] text-black font-black text-[11px] tracking-widest rounded-xl hover:bg-white active:scale-[0.98] transition-all duration-150 uppercase relative overflow-hidden group"
              >
                <span className="relative z-10">LOG IN</span>
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            )}
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