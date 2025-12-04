import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FoodMenu from './pages/FoodMenu';
import FoodDetail from './pages/FoodDetail';
import WineList from './pages/WineList';
import WineDetail from './pages/WineDetail';
import Learning from './pages/Learning';
import Login from './pages/Login';
import { BottomNav, AppShell } from './components/Layout';
import { User } from './types';

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Wrapper for animated routes
const AnimatedRoutes: React.FC<{ isAuthenticated: boolean; onLogin: (user: User) => void }> = ({ isAuthenticated, onLogin }) => {
  const location = useLocation();
  const showNav = isAuthenticated && location.pathname !== '/login';

  // Protect routes
  if (!isAuthenticated && location.pathname !== '/login') {
      return <Navigate to="/login" replace />;
  }

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          {/* Default now redirects to /wine per user request */}
          <Route path="/" element={<Navigate to="/wine" replace />} />
          <Route path="/wine" element={<WineList />} />
          <Route path="/wine/:id" element={<WineDetail />} />
          <Route path="/food" element={<FoodMenu />} />
          <Route path="/food/:id" element={<FoodDetail />} />
          <Route path="/learn" element={<Learning />} />
        </Routes>
      </AnimatePresence>
      {showNav && <BottomNav />}
    </>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check generic session persistence (mock)
  useEffect(() => {
      const storedAuth = localStorage.getItem('demo_auth');
      const storedUser = localStorage.getItem('demo_user');
      if (storedAuth === 'true' && storedUser) {
          try {
             setCurrentUser(JSON.parse(storedUser));
          } catch(e) {
             console.error("Failed to parse user");
          }
      }
  }, []);

  const handleLogin = (user: User) => {
      setCurrentUser(user);
      localStorage.setItem('demo_auth', 'true');
      localStorage.setItem('demo_user', JSON.stringify(user));
  };

  const handleLogout = () => {
      setCurrentUser(null);
      localStorage.removeItem('demo_auth');
      localStorage.removeItem('demo_user');
  };

  const isAuthenticated = !!currentUser;

  return (
    <HashRouter>
        <AppShell user={currentUser} onLogout={handleLogout}>
            <div className="bg-[#FAFAFA] min-h-screen text-dark font-sans selection:bg-primary/20">
                <AnimatedRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
            </div>
        </AppShell>
    </HashRouter>
  );
};

export default App;