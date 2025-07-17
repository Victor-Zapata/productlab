
// Si usas el alias `@` apunta a `/src`
import type { Question } from '@/features/questions/types';

interface Props {
  question: Question;
}

export const QuestionCard = ({ question }: Props) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold">{question.title}</h3>
      <p className="text-sm text-gray-600">{question.body}</p>
      <small className="text-xs text-gray-400">Creada: {question.createdAt}</small>
    </div>
  );
};
