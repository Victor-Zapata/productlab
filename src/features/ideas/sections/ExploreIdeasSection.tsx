import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IdeaCard } from '../components/IdeaCard';
import { fetchIdeas } from '../data/mockIdeas';
import type { Idea } from '../data/mockIdeas';

import { Link } from 'react-router-dom';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const ExploreIdeasSection = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIdeas().then((data) => {
            setIdeas(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <section className="py-12 px-4 md:px-16 text-center text-zinc-600 dark:text-zinc-300">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                Cargando ideas...
            </section>
        );
    }

    return (
        <section className="py-12 px-4 md:px-16">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {ideas.map((idea) => (
                    <Link to={`/idea/${idea.id}`} key={idea.id}>
                        <IdeaCard idea={idea} />
                    </Link>
                ))}
            </motion.div>
        </section>
    );
};
