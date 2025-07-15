// src/features/ideas/components/IdeaCard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIdeasStore } from '../store/useIdeasStore';
import type { Idea } from '../store/useIdeasStore';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Props = { idea: Idea };

export const IdeaCard = ({ idea }: Props) => {
  // Estado local para bloquear el botón si ya votó
  const [voted, setVoted] = useState(() => {
    return localStorage.getItem(`voted_${idea.id}`) === '1';
  });

  // Extraemos del store la función para actualizar votos
  const updateVotes = useIdeasStore((s) => s.updateVotes);

  const handleVote = async () => {
    if (voted) return;
    try {
      const res = await fetch(`/api/ideas/${idea.id}/vote`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Falló el voto');
      const { votes } = await res.json();
      updateVotes(idea.id, votes);
      localStorage.setItem(`voted_${idea.id}`, '1');
      setVoted(true);
    } catch (err) {
      console.error('Error al votar:', err);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-zinc-200 dark:border-zinc-800 transition-colors"
    >
      <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {idea.description}
      </p>

      {/* Sugerencia de IA */}
      <p className="mt-4 text-xs italic text-zinc-500 dark:text-zinc-400">
        💡 {idea.suggestion}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {idea.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Sección de votos */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">{idea.votes} 👍</span>
        <button
          onClick={handleVote}
          disabled={voted}
          className={`
            px-3 py-1 rounded 
            text-white text-sm
            ${
              voted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {voted ? 'Votado' : 'Me gusta'}
        </button>
      </div>
    </motion.div>
  );
};
