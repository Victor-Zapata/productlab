// src/features/ideas/store/useIdeasStore.ts
import { create } from "zustand";

export interface Idea {
    id: string;
    title: string;
    description: string;
    suggestion: string;
    tags: string[];
    votes: number;
    createdAt: string;
}

// Definimos la forma del estado
interface IdeasState {
    ideas: Idea[];
    setIdeas: (ideas: Idea[]) => void;
    addIdea: (idea: Idea) => void;
}

// Creamos el hook con la firma genérica para que TypeScript infiera bien los tipos
export const useIdeasStore = create<IdeasState>((set) => ({
    ideas: [],

    // Reemplaza todo el array
    setIdeas: (ideas: Idea[]) => {
        set({ ideas });
    },

    // Inserta una idea al inicio
    addIdea: (idea: Idea) => {
        set((state) => ({
            ideas: [idea, ...state.ideas],
        }));
    },
}));
