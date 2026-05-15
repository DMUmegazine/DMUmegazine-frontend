import React from 'react';
import { SearchResult } from '../../types/magazine';

interface Props {
  result: SearchResult;
}

export default function SearchResultPanel({ result }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-top-4">
      {/* 좌측: AI 브리핑 요약 */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
        <span className="text-[10px] font-black text-accent tracking-widest uppercase">
          {result.tag}
        </span>
        <h2 className="text-xl font-black text-white leading-snug">
          {result.title}
        </h2>
        <p className="text-[11px] text-gray-500">
          {result.publishedAt} · {result.source}
        </p>
        <div className="flex flex-col gap-5 mt-2">
          {result.briefings.map((b, i) => (
            <div key={i}>
              <p className="text-sm font-bold text-white mb-2">
                {b.icon} {b.question}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">{b.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
        {result.imageUrl ? (
          <img 
  src={result.imageUrl || "https://placehold.co/800x800?text=Generating..."} 
  alt={result.title} 
  className="flex-1 object-cover min-h-[320px]"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
        target.onerror = null; 
    
    target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8+R8AAnkB9m9zBfIAAAAASUVORK5CYII=";
    
    console.warn("이미지 로딩 실패: 무한 루프 방지를 위해 기본 색상으로 대체합니다.");
  }}
/>
        ) : (
          <div className="flex-1 bg-[#2A2A2A] animate-pulse min-h-[320px]" />
        )}
        <p className="text-[10px] text-gray-600 text-center py-3 font-bold tracking-wide">
          {result.imageUrl ? result.title : '이미지 생성 중...'}
        </p>
      </div>

      {/* 우측: 관련 뉴스 */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-5">관련 뉴스</h3>
        <div className="flex flex-col gap-3">
          {result.relatedArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="group block border border-border rounded-xl p-4 hover:border-accent/50 transition-colors"
            >
              <span className="text-[10px] font-black text-accent tracking-widest uppercase block mb-1">
                {article.tag}
              </span>
              <p className="text-xs font-bold text-white leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </p>
              <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">
                {article.summary}
              </p>
              <p className="text-[10px] text-gray-600">
                {article.publishedAt} · {article.source}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
