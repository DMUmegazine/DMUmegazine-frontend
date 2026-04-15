import React from 'react';
import { Plus } from 'lucide-react';

interface CategoryNavProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export default function CategoryNav({ tags, activeTag, onTagChange }: CategoryNavProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
            activeTag === tag 
            ? 'bg-[#1E293B] border-[#34D399] text-[#34D399]' 
            : 'bg-transparent border-[#2A2A2A] text-gray-500 hover:border-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
      <button className="p-2 border border-dashed border-[#2A2A2A] rounded-full text-gray-600 flex-shrink-0">
        <Plus size={16} />
      </button>
    </div>
  );
}