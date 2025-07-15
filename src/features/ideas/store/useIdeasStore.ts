// src/features/ideas/store/useIdeasStore.ts
import { create } from 'zustand';

export interface Idea {
  id: string;
  title: string;
  description: string;
  suggestion: string;
  tags: string[];
  votes: number;
  createdAt: string;
}

interface IdeasState {
  ideas: Idea[];
  /** Reemplaza todo el listado (p.ej. al cargar o paginar) */
  setIdeas: (ideas: Idea[]) => void;
  /** Inserta una idea nueva al inicio */
  addIdea: (idea: Idea) => void;
  /** Actualiza solo el contador de votos de una idea existente */
  updateVotes: (id: string, votes: number) => void;
}

export const useIdeasStore = create<IdeasState>((set) => ({
  ideas: [],

  setIdeas: (ideas) => {
    set({ ideas });
  },

  addIdea: (idea) => {
    set((state) => ({
      ideas: [idea, ...state.ideas],
    }));
  },

  updateVotes: (id, votes) => {
    set((state) => ({
      ideas: state.ideas.map((i) =>
        i.id === id
          ? {
              ...i,
              votes,
            }
          : i,
      ),
    }));
  },
}));
