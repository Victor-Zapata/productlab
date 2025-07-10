import { ExploreIdeasSection } from "@/features/ideas/sections/ExploreIdeasSection";
import { Button } from "@/shared/components/Button";

export const LandingPage = () => {
    return (
        <>
            {/* HERO */}
            <section className="py-12 md:py-20 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Validá tu próxima gran idea con <span className="text-yellow-400 dark:text-yellow-300">ProductLab</span>
                    </h1>
                    <p className="mb-8 text-lg md:text-xl text-zinc-700 dark:text-white/80">
                        Subí tu idea, recibí feedback, sumá votos. Todo en una comunidad builder como vos.
                    </p>
                    <Button onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}>
                        Explorá Ideas 💡
                    </Button>
                </div>

                {/* Cards animadas */}
                <ExploreIdeasSection />
            </section>
        </>
    );
};
