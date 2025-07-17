import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ExploreQuestionsSection } from '@/features/questions/sections/ExploreQuestionsSection';
import { QuestionForm } from '@/features/submit/components/QuestionForm';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="p-4 flex justify-between">
        <Link to="/">Inicio</Link>
        <Link to="/submit">Nueva Consulta</Link>
      </div>
      <Routes>
        <Route path="/" element={<ExploreQuestionsSection />} />
        <Route path="/submit" element={<QuestionForm />} />
      </Routes>
    </BrowserRouter>
  );
}
