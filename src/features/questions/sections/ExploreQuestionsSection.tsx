// src/features/questions/sections/ExploreQuestionsSection.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuestionCard } from '@/features/questions/components/QuestionCard';
import { useQuestionsStore } from '@/features/questions/store/useQuestionsStore';

export const ExploreQuestionsSection = () => {
  const questions = useQuestionsStore((s) => s.questions);
  const setQuestions = useQuestionsStore((s) => s.setQuestions);

  useEffect(() => {
    fetch('/api/questions')
      .then((r) => r.json())
      .then(setQuestions);
  }, [setQuestions]);

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {questions.map((q) => (
        <Link key={q.id} to={`/question/${q.id}`}>
          <QuestionCard question={q} />
        </Link>
      ))}
    </div>
  );
};
