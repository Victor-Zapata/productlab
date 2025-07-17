import type { Question } from '@/types';

export async function submitQuestion(
  q: Omit<Question, 'id' | 'createdAt'>,
): Promise<Question> {
  const res = await fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(q),
  });
  if (!res.ok) throw new Error('Submit API error');
  return res.json();
}
