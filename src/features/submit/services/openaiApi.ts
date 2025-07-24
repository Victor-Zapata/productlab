// src/features/submit/services/openaiApi.ts
export interface OpenAIResponse {
  answer: string;
  imageUrl: string;
}

const API_BASE = import.meta.env.VITE_API_URL;  

export async function getAnswerFromOpenAI({
  question,
  province,
}: {
  question: string;
  province: string;
}): Promise<OpenAIResponse> {
  const res = await fetch(`${API_BASE}/api/openai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, province }),
  });
  if (!res.ok) throw new Error('OpenAI API error');
  return (await res.json()) as OpenAIResponse;
}
