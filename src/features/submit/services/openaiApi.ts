export async function getAnswerFromOpenAI({
  question,
  province,
}: {
  question: string;
  province: string;
}): Promise<string> {
  const res = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, province }),
  });
  if (!res.ok) throw new Error('OpenAI API error');
  const { answer } = await res.json();
  return answer;
}
