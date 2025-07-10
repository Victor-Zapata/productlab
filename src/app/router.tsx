
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { SubmitIdeaPage } from '@/features/submit/pages/SubmitIdeaPage';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { IdeaDetailPage } from '@/features/ideas/pages/IdeaDetailPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<SubmitIdeaPage />} />
          <Route path="/idea/:id" element={<IdeaDetailPage />} />
          {/* Aquí agregaremos rutas para otras páginas */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}