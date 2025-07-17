import { useParams, useNavigate } from 'react-router-dom';
import { useQuestionsStore } from '../store/useQuestionsStore';

export const QuestionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const question = useQuestionsStore((s) =>
    s.questions.find((q) => q.id === id)
  );

  if (!question) {
    return <p className="p-4 text-center">❌ Pregunta no encontrada</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold">{question.question}</h1>
      <p className="text-base text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
        {question.answer}
      </p>

      <div className="flex justify-between text-xs text-zinc-500">
        <span>Provincia: {question.province}</span>
        <span>
          Creada: {new Date(question.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
