import React, { useState } from 'react';
import CategoryNav from '../components/layout/CategoryNav';
import DeepSearchBar from '../components/main/DeepSearchBar';
import KeywordModal from '../components/main/KeywordModal';
import SearchResultPanel from '../components/main/SearchResultPanel';
import { SearchResult } from '../types/magazine';
import SignUp from '../components/main/SignUp';
import Login from '../components/main/Login';

const DUMMY_SEARCH_RESULT: SearchResult = {
  title: '애플 WWDC 2025 주요 발표 — AI 통합과 iOS 19의 변화',
  tag: 'IT',
  source: '뉴스A',
  publishedAt: '2시간 전',
  briefings: [
    {
      icon: '⚡',
      question: '무슨 일이 발생했나?',
      answer:
        '애플이 WWDC 2025에서 AI 기능을 시스템 전반에 통합하고, iOS 19를 비롯한 주요 소프트웨어 업데이트를 발표했습니다.',
    },
    {
      icon: '⭐',
      question: '왜 중요한가?',
      answer:
        '온디바이스 AI 강화로 개인정보 보호와 성능이 개선됐으며, 사용자 경험의 새로운 전환점이 될 것으로 기대됩니다.',
    },
    {
      icon: '📈',
      question: '앞으로 어떤 영향이 있을까?',
      answer:
        'AI 기반 기능 확대로 애플 생태계의 경쟁력이 한층 강화되고, 개발자와 사용자 모두에게 더 스마트한 경험을 제공할 전망입니다.',
    },
  ],
  relatedArticles: [
    {
      id: '1',
      tag: 'IT',
      title: '오픈AI GPT-5 출시 — 추론 속도 3배 향상',
      summary: '멀티모달 처리와 코드 생성 성능이 크게 개선됐습니다.',
      source: '매일경제',
      publishedAt: '6시간 전',
      url: 'https://...',
    },
    {
      id: '2',
      tag: 'IT',
      title: '구글 I/O 2025 — 제미나이 2.0과 안드로이드 16 공개',
      summary: 'AI 기반 검색과 개인화 기능이 한층 강화됐습니다.',
      source: '테크월드',
      publishedAt: '12시간 전',
      url: 'https://...',
    },
    {
      id: '3',
      tag: 'IT',
      title: '마이크로소프트 Build 2025 — 코파일럿 플랫폼 대대적 업데이트',
      summary: '개발자 생산성을 높이는 새로운 도구들이 공개됐습니다.',
      source: 'IT조선',
      publishedAt: '1일 전',
      url: 'https://...',
    },
  ],
};

export default function MainPage() {
  const [allTags, setAllTags] = useState(['IT', '경제', '사회', '스포츠']);
  const [selectedTags, setSelectedTags] = useState<string[]>(['IT']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ nickname: string; email: string } | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const fetchAISearch = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/magazine/generate?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      console.log('AI 검색 결과:', data);

      if (data.error || !data.briefings) {
        alert(`매거진 생성 실패: ${data.error || '데이터를 불러올 수 없습니다.'}`);
        return; 
      }

      setSearchResult(data); 
    } catch (error) {
      console.error('AI 검색 실패:', error);
      alert('서버와 연결할 수 없습니다.');
    }
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUserInfo({
      nickname: userData.user.nickname,
      email: userData.user.email,
    });
    if (userData.user.tags && userData.user.tags.length > 0) {
      setSelectedTags(userData.user.tags);
      setAllTags((prev) => Array.from(new Set([...prev, ...userData.user.tags])));
    }
    setShowLogin(false);
  };

  const handleLogoClick = () => {
    setShowSignUp(false);
    setShowLogin(false);
    setSearchResult(null);
    setIsModalOpen(false);
  };

  const handleAddTag = async (newTag: string) => {
    const updatedAllTags = allTags.includes(newTag) ? allTags : [...allTags, newTag];
    const updatedSelectedTags = selectedTags.includes(newTag)
      ? selectedTags
      : [...selectedTags, newTag];

    setAllTags(updatedAllTags);
    setSelectedTags(updatedSelectedTags);

    if (isLoggedIn && userInfo?.email) {
      try {
        await fetch('http://localhost:8000/auth/update-tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userInfo.email, tags: updatedSelectedTags }),
        });
      } catch (error) {
        console.error('태그 저장 실패:', error);
      }
    }
    setIsModalOpen(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (showSignUp)
    return (
      <SignUp
        onBack={() => setShowSignUp(false)}
        onLogin={() => {
          setShowSignUp(false);
          setShowLogin(true);
        }}
        onLogoClick={handleLogoClick}
      />
    );

  if (showLogin)
    return (
      <Login
        onBack={() => setShowLogin(false)}
        onSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
        onLogoClick={handleLogoClick}
        onLoginSuccess={handleLoginSuccess}
      />
    );

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
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

        {/* 검색 결과 없음: 검색창 중앙 배치 */}
        {!searchResult ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full">
              <DeepSearchBar onSearch={fetchAISearch} />
            </div>
          </div>
        ) : (
          <>
            {/* 검색창 */}
            <DeepSearchBar onSearch={fetchAISearch} />
            {/* 3분할 결과 패널 */}
            <SearchResultPanel result={searchResult} />
          </>
        )}

        {isModalOpen && (
          <KeywordModal onClose={() => setIsModalOpen(false)} onSelect={handleAddTag} />
        )}
      </div>
    </div>
  );
}
