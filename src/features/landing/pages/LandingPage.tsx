// src/features/landing/pages/LandingPage.tsx
import { ExploreIdeasSection } from '@/features/questions/sections/ExploreQuestionsSection';
import { Button } from '@/shared/components/Button';
import { Link } from 'react-router-dom';

export const LandingPage = () => (
    <>
        {/* HERO */}
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Validá tu próxima gran idea con <span className="text-yellow-400">ProductLab</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-700">
                    Subí tu idea, recibí feedback de IA y sumá votos en nuestra comunidad builder.
                </p>

                {/* Link a /submit */}
                <Link to="/submit" className="inline-block">
                    <Button variant="secondary">
                        Proponé tu idea 💡
                    </Button>
                </Link>
            </div>

            {/* Listado dinámico de ideas */}
            <ExploreIdeasSection />
        </section>
    </>
);
