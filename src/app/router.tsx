// src/app/router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { QuestionDetailPage } from '@/features/questions/pages/QuestionDetailPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/question/:id"   element={<QuestionDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
