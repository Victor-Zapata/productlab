// src/features/ideas/components/IdeaCard.tsx
import { motion } from 'framer-motion'
import type { Idea } from '../store/useIdeasStore'

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

type Props = { idea: Idea }

export const IdeaCard = ({ idea }: Props) => (
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

        {/* Aquí mostramos la sugerencia de la IA */}
        <p className="mt-4 text-xs italic text-zinc-500 dark:text-zinc-400">
            💡 {idea.suggestion}
        </p>

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
    </motion.div>
)
