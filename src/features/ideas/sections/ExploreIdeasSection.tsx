// src/features/ideas/sections/ExploreIdeasSection.tsx
import { useEffect } from 'react';
import { useIdeasStore } from '../store/useIdeasStore';
import { IdeaCard } from '../components/IdeaCard';

export const ExploreIdeasSection = () => {
  const ideas = useIdeasStore((state) => state.ideas);
  const setIdeas = useIdeasStore((state) => state.setIdeas);

  useEffect(() => {
    // carga inicial
    fetch('/api/ideas')
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, [setIdeas]);

  if (ideas.length === 0) {
    return <p className="text-center text-zinc-500">No hay ideas todavía.</p>;
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
};
