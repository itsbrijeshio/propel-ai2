import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import Proposals from './pages/Proposals';
import ProposalDetail from './pages/ProposalDetail';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Shell from './components/layout/Shell';

export default function App() {
  // Simple auth mock
  const isAuthenticated = true; // Set to true for preview comfort

  return (
    <ThemeProvider defaultTheme="light" storageKey="propelai-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={isAuthenticated ? <Shell /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/proposals/:id" element={<ProposalDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ThemeProvider>
  );
}
