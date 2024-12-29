import { create } from 'zustand';

export interface Article {
  id: string;
  project: string;
  title: string;
  content: string;
  words: number;
  characters: number;
  status: 'completed' | 'pending';
  lastModified?: string;
}

interface ArticlesStore {
  articles: Article[];
  addArticle: (article: Article) => void;
  removeArticle: (id: string) => void;
  updateArticle: (id: string, updatedArticle: Partial<Article>) => void;
}

// Mock initial articles
const initialArticles: Article[] = [
  {
    id: '1',
    project: 'stgHellis',
    title: 'Donnez-vous un Coup de Pouce Stylistique avec ces Belles Montres pour Hommes',
    content: `
      <h1>Donnez-vous un Coup de Pouce Stylistique avec ces Belles Montres pour Hommes</h1>

      <h2>L'importance d'une belle montre dans le style masculin</h2>
      <p>Une montre élégante est bien plus qu'un simple accessoire pour lire l'heure. C'est un véritable statement de style qui peut transformer complètement votre look. Que vous soyez en costume pour une réunion importante ou en tenue décontractée pour le week-end, une belle montre apporte cette touche finale qui fait toute la différence.</p>

      <h2>Les différents styles de montres pour hommes</h2>
      <p>Il existe une grande variété de styles de montres, chacun adapté à différentes occasions :</p>
      <ul>
        <li>Les montres classiques en cuir pour un look professionnel</li>
        <li>Les montres sport en acier pour un style décontracté</li>
        <li>Les montres de luxe pour les occasions spéciales</li>
        <li>Les smartwatches pour les amateurs de technologie</li>
      </ul>

      <h2>Comment choisir la montre parfaite</h2>
      <p>Le choix d'une montre dépend de plusieurs facteurs importants :</p>
      <ul>
        <li>Votre style vestimentaire habituel</li>
        <li>Les occasions auxquelles vous la porterez</li>
        <li>Votre budget</li>
        <li>La taille de votre poignet</li>
      </ul>

      <h2>Les marques de montres recommandées</h2>
      <p>Voici une sélection de marques réputées pour leur qualité et leur style :</p>
      <ul>
        <li>Rolex - Pour le luxe intemporel</li>
        <li>Omega - Pour l'élégance sportive</li>
        <li>Seiko - Pour un excellent rapport qualité-prix</li>
        <li>Tag Heuer - Pour un style moderne et dynamique</li>
      </ul>

      <h2>L'entretien de votre montre</h2>
      <p>Pour préserver la beauté et la longévité de votre montre, quelques gestes simples sont essentiels :</p>
      <ul>
        <li>Nettoyage régulier avec un chiffon doux</li>
        <li>Protection contre l'eau selon l'indice d'étanchéité</li>
        <li>Révision périodique chez un horloger</li>
        <li>Rangement approprié dans un écrin</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Une belle montre est un investissement dans votre style personnel. Prenez le temps de choisir celle qui vous correspond le mieux et qui vous accompagnera dans toutes vos aventures. N'oubliez pas qu'une montre de qualité peut durer toute une vie si elle est bien entretenue.</p>
    `,
    words: 1500,
    characters: 6000,
    status: 'completed'
  }
];

export const useArticles = create<ArticlesStore>((set) => ({
  articles: initialArticles,
  addArticle: (article) => 
    set((state) => ({
      articles: [...state.articles, article]
    })),
  removeArticle: (id) =>
    set((state) => ({
      articles: state.articles.filter(article => article.id !== id)
    })),
  updateArticle: (id, updatedArticle) => set((state) => ({
    articles: state.articles.map((article) =>
      article.id === id ? { ...article, ...updatedArticle } : article
    ),
  })),
}));
