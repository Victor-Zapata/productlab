// src/features/submit/pages/SubmitIdeaPage.tsx
import { IdeaForm } from '../components/IdeaForm';
import { Button } from '@/shared/components/Button';
import { useNavigate } from 'react-router-dom';

export const SubmitIdeaPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
            <Button onClick={() => navigate(-1)}>
                ← Volver al Home
            </Button>

            <IdeaForm onSuccess={() => navigate('/')} />
        </div>
    );
};
