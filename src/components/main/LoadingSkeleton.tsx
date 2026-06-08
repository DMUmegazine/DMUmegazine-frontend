import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1fr] gap-6 xl:gap-10 mb-12 animate-in fade-in slide-in-from-bottom-4">
      
      {/* 좌측: 기사 스켈레톤 */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <div className="w-12 h-3 bg-white/10 rounded animate-pulse" />
        <div className="w-3/4 h-6 bg-white/10 rounded animate-pulse" />
        <div className="w-24 h-3 bg-white/10 rounded animate-pulse mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 mt-2">
            <div className="w-32 h-4 bg-white/10 rounded animate-pulse" />
            <div className="w-full h-3 bg-white/5 rounded animate-pulse" />
            <div className="w-5/6 h-3 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* 중앙: 이미지 스켈레톤 */}
      <div className="bg-card border border-border rounded-2xl w-[300px] h-[300px] xl:w-[360px] xl:h-[360px] flex-shrink-0 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        <div className="text-white/30 text-sm font-bold tracking-widest uppercase z-10 animate-bounce">
          AI Generating...
        </div>
      </div>

      {/* 우측: 관련 뉴스 스켈레톤 */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
        <div className="w-20 h-4 bg-white/10 rounded animate-pulse mb-2" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-24 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
      
    </div>
  );
}