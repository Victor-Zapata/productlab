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

  if (!questions.length) {
    return <p className="text-center text-zinc-500">No hay preguntas todavía.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3   /* 3 columnas a partir de 768px */
          gap-6
        "
        style={{ gridAutoRows: '1fr' }}
      >
        {questions.map((q) => (
          <Link key={q.id} to={`/question/${q.id}`}>
            <QuestionCard question={q} />
          </Link>
        ))}
      </div>
    </div>
  );
};
