import type { Question } from '@/types/question';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const cardVariants = {
  hover: { scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' },
};

type Props = { question: Question };

export const QuestionCard = ({ question }: Props) => (
  <Link to={`/question/${question.id}`}>
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="
        bg-white dark:bg-zinc-900 
        rounded-2xl p-6 shadow-md border border-zinc-200 dark:border-zinc-800
        flex flex-col justify-between
        h-64            /* altura fija */
        overflow-hidden /* recorta contenido */
        transition-colors
      "
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2">
          {question.question}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
          {question.answer}
        </p>
      </div>
      <footer className="mt-4 flex justify-between items-center text-xs text-zinc-500">
        <span>{question.province}</span>
        <span>{new Date(question.createdAt).toLocaleDateString()}</span>
      </footer>
    </motion.div>
  </Link>
);
