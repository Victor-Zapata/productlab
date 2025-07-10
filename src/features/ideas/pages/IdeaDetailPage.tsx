import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchIdeaById } from '../services/ideaApi'
import type { Idea } from '@/types/idea'

export const IdeaDetailPage = () => {
    const { id } = useParams()
    const [idea, setIdea] = useState<Idea | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchIdeaById(id)
                .then((data) => setIdea(data as Idea))
                .catch(() => setError('No se encontró la idea'))
        }
    }, [id])

    if (error) return <p className="text-red-500 p-4">{error}</p>
    if (!idea) return <p className="p-4">Cargando...</p>

    return (
        <section className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
            <p className="mb-4 text-zinc-700 dark:text-white/80">{idea.description}</p>
            <p className="text-sm mb-2">Votos: {idea.votes}</p>
            <div className="flex gap-2 flex-wrap">
                {idea.tags.map(tag => (
                    <span
                        key={tag}
                        className="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white px-3 py-1 rounded-full text-xs font-semibold"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </section>
    )
}
