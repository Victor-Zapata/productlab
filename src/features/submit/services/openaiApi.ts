export interface OpenAIResponse {
  answer: string;
  imageUrl?: string;
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

  // lee el texto de respuesta (puede ser JSON o un HTML de error)
  const text = await res.text();

  if (!res.ok) {
    // lanza un error que incluya status y body para que lo veas en consola
    throw new Error(`OpenAI API error ${res.status}: ${text}`);
  }

  // si todo OK, parsea el JSON
  let data: OpenAIResponse;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Respuesta no es JSON válido: ${text}`);
  }

  return data;
}
