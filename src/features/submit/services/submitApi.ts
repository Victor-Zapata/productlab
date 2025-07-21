export interface NewQuestionPayload {
  question: string;
  province: string;
  answer: string;
  imageUrl?: string;
}

export async function submitQuestion(
  payload: NewQuestionPayload,
): Promise<NewQuestionPayload & { id: string; createdAt: string }> {
  const res = await fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Error al guardar la consulta');
  }
  return await res.json();
}
