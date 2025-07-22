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
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Consultas Recientes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {questions.map((q) => (
            <Link key={q.id} to={`/question/${q.id}`}>
              <QuestionCard question={q} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
