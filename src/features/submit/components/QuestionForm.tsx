import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/shared/components/Button';
import { getAnswerFromOpenAI } from '../services/openaiApi';
import { submitQuestion } from '../services/submitApi';
import { useQuestionsStore } from '@/features/questions/store/useQuestionsStore';

export const QuestionForm = () => {
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
      // 1) Pedimos respuesta a OpenAI
      const answer = await getAnswerFromOpenAI({ question, province });
      // 2) Guardamos en backend
      const saved = await submitQuestion({ question, province, answer });
      // 3) Actualizamos store
      addQuestion(saved);
      toast.success('✅ Pregunta procesada');
      setQuestion('');
    } catch (err) {
      console.error(err);
      toast.error('❌ Error al procesar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">❓ Consulta de Tránsito</h2>
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
