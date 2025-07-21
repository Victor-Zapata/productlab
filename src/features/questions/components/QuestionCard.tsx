import { motion } from 'framer-motion';
import type { Question } from '@/types/question';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Props = { question: Question };

export const QuestionCard = ({ question }: Props) => {
  // si en el futuro añades votaciones, aquí iría la lógica igual que con ideas

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className="
        flex flex-col h-full                 
        bg-white dark:bg-zinc-900 
        rounded-2xl p-6 shadow-md 
        border border-zinc-200 dark:border-zinc-800 
        transition-colors
      "
    >
      <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 flex-1 overflow-hidden">
        {question.answer.length > 150
          ? `${question.answer.slice(0, 150)}…`
          : question.answer}
      </p>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Ilustración"
          className="mt-4 w-full h-40 object-cover rounded-md"
        />
      )}

      {/* si quisieras meter más metadatos, irían aquí */}

      {/* pie de la card */}
      <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(question.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};
