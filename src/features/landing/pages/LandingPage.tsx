// src/features/questions/pages/HomePage.tsx
import { useState } from 'react';
import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { QuestionForm } from '@/features/submit/components/QuestionForm';
import { ExploreQuestionsSection } from '@/features/questions/sections/ExploreQuestionsSection';

export const LandingPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Nueva Consulta</h1>
      <div className="flex justify-center mb-12">
        <Button onClick={() => setOpen(true)}>+ Hacer una consulta</Button>
      </div>

      <ExploreQuestionsSection />

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {/* Le pasamos un callback para cerrar tras éxito */}
        <QuestionForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
};
