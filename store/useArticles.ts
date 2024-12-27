import { create } from 'zustand';

export interface Article {
  id: string;
  project: string;
  title: string;
  content: string;
  words: number;
  characters: number;
  status: 'completed' | 'pending';
}

interface ArticlesStore {
  articles: Article[];
  addArticle: (article: Article) => void;
  removeArticle: (id: string) => void;
}

export const useArticles = create<ArticlesStore>((set) => ({
  articles: [],
  addArticle: (article) => 
    set((state) => ({
      articles: [...state.articles, article]
    })),
  removeArticle: (id) =>
    set((state) => ({
      articles: state.articles.filter(article => article.id !== id)
    })),
}));
