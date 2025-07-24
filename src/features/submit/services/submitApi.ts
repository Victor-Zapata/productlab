// src/features/submit/services/submitApi.ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export interface NewQuestionPayload {
  question: string
  province: string
  answer: string
  imageUrl?: string
}

export async function submitQuestion(
  payload: NewQuestionPayload
): Promise<NewQuestionPayload & { id: string; createdAt: string }> {
  const url = `${API_BASE}/api/questions`
  console.log('📡 Guardando pregunta en:', url)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Error guardando pregunta ${res.status}: ${text}`)
  }
  return JSON.parse(text)
}
