// src/types/magazine.ts

/**
 * [PIPE-06] Vector DB 적재 및 [API-02] 반환 규격에 맞춘 뉴스 아티클 타입
 */
export interface NewsArticle {
  id: string;           // 기사 고유 ID
  tag: string;          // [AUTH-02] 관심사 태그 (IT, 경제 등)
  title: string;        // 기사 제목
  summary: string;      // [MAG-04] LLM이 생성한 요약 텍스트
  source: string;       // 출처 (예: 네이버 뉴스, 뉴시스 등)
  publishedAt: string;  // 발행일 또는 시간 (예: 2시간 전)
  url: string;          // [MAG-03] 원문 이동을 위한 링크
}

/**
 * [DEEP-06] 출처 포함 요구사항을 위한 소스 타입
 */
export interface Source {
  name: string;
  url: string;
}

/**
 * LLM이 생성한 브리핑 섹션 (무슨 일이 발생했나? 등)
 */
export interface BriefingSection {
  icon: string;
  question: string;
  answer: string;
}

/**
 * [DEEP-01] AI 검색 결과 — RAG 유사도 검색 후 LLM이 생성한 종합 브리핑
 */
export interface SearchResult {
  title: string;
  tag: string;
  source: string;
  publishedAt: string;
  briefings: BriefingSection[];
  relatedArticles: NewsArticle[]; // 유사도 랭킹 순 정렬
  imageUrl?: string;              // LLM 생성 이미지 URL (없으면 스켈레톤)
}