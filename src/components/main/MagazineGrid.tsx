import React from 'react';
import { NewsArticle } from '../../types/magazine';
import NewsCard from './NewsCard';

export default function MagazineGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    // [FE-03] 반응형 그리드: 모바일 1열, 데스크탑 3열
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}