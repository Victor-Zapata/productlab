// src/features/questions/components/QuestionCard.tsx
import { motion } from 'framer-motion';
import type { Question } from '@/types/question';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Props = { question: Question };

export const QuestionCard = ({ question }: Props) => (
  <motion.div
    className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    {/* 1) Imagen con aspect-ratio 4:3 */}
    {question.imageUrl && (
      <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={question.imageUrl}
          alt="Ilustración"
          className="object-fill w-full h-full"
        />
      </div>
    )}

    {/* 2) Contenido */}
    <div className="p-5 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
        {question.question}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow line-clamp-4">
        {question.answer}
      </p>
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{question.province}</span>
        <span>{new Date(question.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </motion.div>
);
