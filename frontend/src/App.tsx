import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AgendamentoSlugPage from './pages/public/AgendamentoSlugPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:slug" element={<AgendamentoSlugPage />} />
        <Route path="/" element={<Navigate to="/barbearia-do-ze" replace />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 text-sm font-medium">
              Página não encontrada
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}