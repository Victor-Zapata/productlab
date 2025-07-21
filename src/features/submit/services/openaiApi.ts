export interface OpenAIResponse {
  answer: string;
  imageUrl: string;
}

export async function getAnswerFromOpenAI({
  question,
  province,
}: {
  question: string;
  province: string;
}): Promise<OpenAIResponse> {
  const res = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, province }),
  });

  if (!res.ok) {
    throw new Error('OpenAI API error');
  }

  const data = (await res.json()) as OpenAIResponse;
  // Ahora data.answer es string y data.imageUrl es string
  return data;
}
