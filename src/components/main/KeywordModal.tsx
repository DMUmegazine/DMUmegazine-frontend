import React from 'react';
import { X } from 'lucide-react';

interface KeywordModalProps {
  onClose: () => void;
  onSelect: (keyword: string) => void;
}

const RECOMMEND_KEYWORDS = ['반도체', 'AI', '부동산', '주식', '가상화폐', '엔터테인먼트', '환경', '정치'];

export default function KeywordModal({ onClose, onSelect }: KeywordModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">관심 키워드 추가</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>
        
        <p className="text-xs text-gray-500 mb-4 font-bold">추천 키워드</p>
        <div className="flex flex-wrap gap-2">
      {RECOMMEND_KEYWORDS.map(keyword => (
        <button
          key={keyword}
          onClick={() => onSelect(keyword)}
          className="px-4 py-2 bg-background border border-border rounded-xl text-sm text-gray-300 hover:border-accent hover:text-accent transition-all"
        >
          # {keyword}
        </button>
      ))}
    </div>
      </div>
    </div>
  );
}