// src/features/ideas/pages/IdeaDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useIdeasStore } from '../store/useQuestionsStore'
import { Button } from '@/shared/components/Button'

export const IdeaDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Buscamos la idea en el store por su id
  const idea = useIdeasStore(state =>
    state.ideas.find(item => item.id === id)
  )

  if (!idea) {
    return (
      <div className="p-6 text-center text-red-500">
        🚫 Idea no encontrada.
        <div className="mt-4">
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Button onClick={() => navigate(-1)}>← Volver</Button>

      <h1 className="text-3xl font-bold">{idea.title}</h1>
      <p className="text-sm text-zinc-500">Creada: {new Date(idea.createdAt).toLocaleString()}</p>

      <p className="mt-4 text-lg">{idea.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">💡 Sugerencia IA</h2>
        <p className="italic">{idea.suggestion}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {idea.tags.map(tag => (
          <span
            key={tag}
            className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <span className="font-medium">👍 Votos:</span> {idea.votes}
      </div>
    </div>
  )
}
