// src/features/submit/services/openaiApi.ts
export interface OpenAIResponse {
  answer: string;
  imageUrl?: string;
}

// import.meta.env.VITE_API_URL siempre existe gracias al paso anterior
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

console.log('📡 Llamando a OpenAI en:', `${API_BASE}/api/openai`);

export async function getAnswerFromOpenAI({
  question,
  province,
}: {
  question: string;
  province: string;
}): Promise<OpenAIResponse> {
  const url = `${API_BASE}/api/openai`;
  console.log('📡 Llamando a OpenAI en:', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, province }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`OpenAI API error ${res.status}: ${text}`);
  }

  try {
    return JSON.parse(text) as OpenAIResponse;
  } catch {
    throw new Error(`Respuesta no es JSON válido: ${text}`);
  }
}
