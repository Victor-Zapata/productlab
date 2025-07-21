// src/features/submit/components/QuestionForm.tsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/shared/components/Button';
import { getAnswerFromOpenAI } from '../services/openaiApi';
import type { NewQuestionPayload } from '../services/submitApi';
import { submitQuestion } from '../services/submitApi';
import { useQuestionsStore } from '@/features/questions/store/useQuestionsStore';

type Props = {
  onSuccess: () => void;
};

export const QuestionForm = ({ onSuccess }: Props) => {
  const [question, setQuestion] = useState('');
  const [province, setProvince] = useState('Buenos Aires');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addQuestion = useQuestionsStore((s) => s.addQuestion);

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error('Ingresá tu pregunta de tránsito.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) Llamamos a la API; ésta devuelve un objeto { answer, imageUrl? }
      const { answer /*, imageUrl */ } = await getAnswerFromOpenAI({
        question,
        province,
      });

      // 2) Sólo usamos `answer` para el payload que espera el backend
      const payload: NewQuestionPayload = {
        question,
        province,
        answer,
      };

      // 3) Enviamos al servidor y recibimos la pregunta guardada
      const saved = await submitQuestion(payload);

      // 4) Actualizamos el store (Zustand)
      addQuestion(saved);

      toast.success('✅ Consulta creada');
      setQuestion('');
      onSuccess();
    } catch (err) {
      console.error('Error al procesar:', err);
      toast.error('❌ Error al procesar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="¿Puedo estacionar en doble fila en Córdoba?"
        className="w-full p-3 border rounded"
      />
      <select
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Salta'].map(
          (p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ),
        )}
      </select>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Consultando…' : 'Enviar Consulta'}
      </Button>
    </div>
  );
};
