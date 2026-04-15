// src/components/layout/CategoryNav.tsx
import React from 'react';

interface CategoryNavProps {
  tags: string[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  onAddClick: () => void; // 추가
}

export default function CategoryNav({ tags, activeTags, onTagToggle, onAddClick }: CategoryNavProps) {
  return (
    <div className="flex gap-2 items-center">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            activeTags.includes(tag) 
            ? 'bg-white text-black border-white' 
            : 'bg-transparent border-border text-gray-400'
          }`}
        >
          {tag}
        </button>
      ))}
      <button 
        onClick={onAddClick} // 이벤트 연결 [cite: 1]
        className="px-3 py-1.5 border border-dashed border-border rounded-full text-gray-500 hover:text-white transition-colors text-xs font-bold"
      >
        + 태그 추가
      </button>
    </div>
  );
}