import React from 'react';
import { ExternalLink } from 'lucide-react';
import { NewsArticle } from '../../types/magazine';

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div 
      onClick={() => window.open(article.url, '_blank')}
      // Tailwind 클래스로 교체: bg-card, border-border 등 커스텀 테마 사용
      className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-all cursor-pointer flex flex-col justify-between h-full shadow-lg"
    >
      <div>
        <span className="text-[10px] font-black text-accent mb-4 block tracking-widest uppercase">
          {article.tag}
        </span>
        {/* [FE-02] 제목 2줄 제한 */}
        <h3 className="text-sm font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        {/* [FE-02] 요약문 3줄 제한 */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-6">
          {article.summary}
        </p>
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold border-t border-border pt-4">
        <span>{article.publishedAt} · {article.source}</span>
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
      </div>
    </div>
  );
}