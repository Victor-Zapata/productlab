// src/features/questions/store/useQuestionsStore.ts
import { create } from 'zustand';
import type { Question } from '@/features/questions/types';

interface QuestionsState {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  addQuestion: (q: Question) => void;
  // …
}

export const useQuestionsStore = create<QuestionsState>((set) => ({
  questions: [],
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) => set((s) => ({ questions: [question, ...s.questions] })),
  // …
}));

