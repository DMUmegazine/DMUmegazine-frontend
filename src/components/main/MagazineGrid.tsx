import React from 'react';
import { NewsArticle } from '../../types/magazine';
import NewsCard from './NewsCard';

interface MagazineGridProps {
  articles: NewsArticle[];
  onNewsClick: (article: NewsArticle) => void;
}

export default function MagazineGrid({ articles, onNewsClick }: MagazineGridProps) {
  return (
    // [FE-03] 반응형 그리드: 모바일 1열, 태블릿 2열, 데스크탑 3열
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {articles.length > 0 ? (
        articles.map((article) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            onClick={onNewsClick} 
          />
        ))
      ) : (
        <p className="text-gray-600 text-sm col-span-full py-20 text-center">
          선택한 태그에 해당하는 기사가 없습니다.
        </p>
      )}
    </div>
  );
}