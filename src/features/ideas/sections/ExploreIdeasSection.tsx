// src/features/ideas/sections/ExploreIdeasSection.tsx
import { Link } from 'react-router-dom'
import { IdeaCard } from '../components/IdeaCard'
import { useIdeasStore } from '../store/useIdeasStore'
import { useEffect } from 'react'

export const ExploreIdeasSection = () => {
  const { ideas, setIdeas } = useIdeasStore()

  useEffect(() => {
    fetch('/api/ideas')
      .then(res => res.json())
      .then(data => setIdeas(data))
  }, [setIdeas])

  if (!ideas.length) {
    return <p className="text-center text-zinc-500">No hay ideas todavía.</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {ideas.map(idea => (
        <Link key={idea.id} to={`/idea/${idea.id}`}>
          <IdeaCard idea={idea} />
        </Link>
      ))}
    </div>
  )
}
