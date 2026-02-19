import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { MemberProfile } from './pages/MemberProfile';
import { ContactPage } from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectsProfile from './pages/ProjectProfile';
import { BlogPage } from './pages/BlogPage';
import { AdminDashboard } from './components/AdminDashboard';
import LoginScreen from './components/LoginScreen'
import { PrivateRoute } from './components/PrivateRoute';
import { GlobalStarBackground } from './components/GlobalStarBackground';

function App() {
  return (
    // 1. Removido o bg-gray-50 e trocado por bg-transparent
    // 2. Adicionado 'relative' e 'text-white' como base
    <div className="min-h-screen bg-transparent flex flex-col text-white relative">
      
      {/* BACKGROUND GLOBAL (Fica fixo e no fundo z-0) */}
      <GlobalStarBackground />
      
      {/* HEADER (Certifique-se de que ele tenha transparência/backdrop-blur) */}
      <Header />
      
      {/* CONTAINER DAS PÁGINAS (z-10 garante que fique acima das estrelas) */}
      <div className="pt-16 flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<BlogPage />} />            
          <Route path="/members" element={<MembersPage />} />
          <Route path="/member/:id" element={<MemberProfile />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectsProfile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {/* FOOTER (Certifique-se de que ele tenha transparência também) */}
      <div className="relative z-10 w-full">
        <Footer />
      </div>
      
    </div>
  );
}

export default App;