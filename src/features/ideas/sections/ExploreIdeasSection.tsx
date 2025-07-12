// src/features/ideas/sections/ExploreIdeasSection.tsx
import { useEffect } from 'react'
import { useIdeasStore } from '../store/useIdeasStore'
import { IdeaCard } from '../components/IdeaCard'

export const ExploreIdeasSection = () => {
    const { ideas, setIdeas } = useIdeasStore()

    useEffect(() => {
        fetch('http://localhost:4000/api/ideas')
            .then((res) => res.json())
            .then(setIdeas)
            .catch(console.error)
    }, [setIdeas])

    if (ideas.length === 0) {
        return (
            <p className="text-center text-zinc-500 mt-8">
                No hay ideas todavía. ¡Sé el primero en subir una!
            </p>
        )
    }

    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
        </div>
    )
}
