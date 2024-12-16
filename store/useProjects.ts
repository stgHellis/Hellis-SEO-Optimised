import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Project {
  name: string;
  unpublishedArticles: number;
  wordpress: boolean;
  pbn: boolean;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (index: number) => void;
}

// Helper to safely parse stored projects
const parseStoredProjects = (str: string | null): Project[] => {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(project => 
      typeof project === 'object' &&
      typeof project.name === 'string' &&
      typeof project.unpublishedArticles === 'number' &&
      typeof project.wordpress === 'boolean' &&
      typeof project.pbn === 'boolean'
    );
  } catch {
    return [];
  }
};

// Get initial projects from localStorage if available
const getInitialProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('projects');
  const parsedProjects = parseStoredProjects(stored);
  return parsedProjects.length > 0 ? parsedProjects : [
    {
      name: "stgHellis",
      unpublishedArticles: 0,
      wordpress: false,
      pbn: false,
    }
  ];
};

export const useProjects = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: getInitialProjects(),
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      removeProject: (index) => set((state) => ({ 
        projects: state.projects.filter((_, i) => i !== index) 
      })),
    }),
    {
      name: 'projects-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ projects: state.projects }),
    }
  )
)
