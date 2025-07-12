// src/app/router.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { SubmitIdeaPage } from '@/features/submit/pages/SubmitIdeaPage';
import { MainLayout } from '@/shared/layouts/MainLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/submit" element={<SubmitIdeaPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
