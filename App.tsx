import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, matchPath, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Gigs from './pages/Gigs';
import GigDetail from './pages/GigDetail';
import Collaborations from './pages/Collaborations';
import CollaborationDetail from './pages/CollaborationDetail';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import FolderView from './pages/FolderView';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Onboarding from './pages/onboarding/Onboarding';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Marketplace from './pages/Marketplace';
import MarketplaceDetail from './pages/MarketplaceDetail';
import { EntityProfileProvider } from './context/EntityProfileContext';
import { ToastProvider } from './context/ToastContext';
import EntityDrawer from './components/EntityDrawer';
import ToastContainer from './components/ToastContainer';

// Wrapper to handle routing logic based on auth state
const AppRoutes: React.FC<{ 
  isAuthenticated: boolean; 
  isOnboarded: boolean; 
  login: (skipOnboarding?: boolean) => void; 
  completeOnboarding: () => void; 
  logout: () => void;
  toggleTheme: () => void;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}> = ({ isAuthenticated, isOnboarded, login, completeOnboarding, logout, toggleTheme, darkMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/messages';

  // Determine page title
  const getPageTitle = (pathname: string) => {
    if (matchPath("/gigs/:id", pathname)) return 'Gig Details';
    if (matchPath("/campaigns/:id", pathname)) return 'Campaign Details';
    if (matchPath("/collaborations/:id", pathname)) return 'Workroom';
    if (matchPath("/drive/:folderName", pathname)) return 'Workspace';
    if (matchPath("/marketplace/:id", pathname)) return 'Opportunity Details';
    
    switch (pathname) {
      case '/': return 'Overview';
      case '/gigs': return 'Find Gigs';
      case '/campaigns': return 'Campaigns';
      case '/marketplace': return 'Marketplace';
      case '/collaborations': return 'My Work & Applications';
      case '/analytics': return 'Analytics & Insights';
      case '/wallet': return 'Payments & Escrow';
      case '/profile': return 'My Creator Profile';
      case '/settings': return 'System Settings';
      case '/messages': return 'Messages';
      default: return 'Dashboard';
    }
  };

  // 1. Not Authenticated? Force Login or Signup.
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-text-primary dark:text-gray-100 font-display antialiased transition-colors duration-200">
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup onSignup={() => login(false)} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  // 2. Authenticated but Not Onboarded? Force Onboarding.
  if (isAuthenticated && !isOnboarded) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-text-primary dark:text-gray-100 font-display antialiased transition-colors duration-200">
         <Routes>
            <Route path="/onboarding" element={<Onboarding onComplete={completeOnboarding} />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
         </Routes>
      </div>
    );
  }

  // 3. Fully Authenticated & Onboarded? Show Dashboard.
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-gray-900 text-text-primary dark:text-gray-100 font-display antialiased overflow-hidden transition-colors duration-200">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onLogout={logout} />
      
      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {!isMessagesPage && (
          <Header 
            title={getPageTitle(location.pathname)} 
            onMenuClick={() => setMobileMenuOpen(true)} 
          />
        )}
        
        <main className={`flex-1 overflow-hidden ${!isMessagesPage ? 'overflow-y-auto scroll-smooth' : ''} bg-background-light dark:bg-gray-900`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/gigs/:id" element={<GigDetail />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/collaborations/:id" element={<CollaborationDetail />} />
            <Route path="/drive/:folderName" element={<FolderView />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
            <Route path="/messages" element={<Messages onMenuClick={() => setMobileMenuOpen(true)} />} />
            {/* Redirect any unknown routes back to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <EntityDrawer />
      <ToastContainer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // -- Auth & Onboarding State Management --
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('creonity_auth') === 'true';
  });
  
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('creonity_onboarded') === 'true';
  });

  // -- Theme Management --
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('creonity_theme');
    // If no saved preference, check system preference
    if (savedTheme === null) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark';
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('creonity_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('creonity_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // -- Actions --
  const handleLogin = (skipOnboarding = false) => {
    localStorage.setItem('creonity_auth', 'true');
    // Standard login does NOT trigger tutorials
    sessionStorage.removeItem('creonity_tour_session');
    
    setIsAuthenticated(true);
    if (skipOnboarding) {
        localStorage.setItem('creonity_onboarded', 'true');
        setIsOnboarded(true);
    }
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('creonity_onboarded', 'true');
    // Set a global session flag to enable tutorials for this session (new account flow)
    sessionStorage.setItem('creonity_tour_session', 'true');
    setIsOnboarded(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('creonity_auth');
    localStorage.removeItem('creonity_onboarded');
    sessionStorage.clear(); // Clear session flags to ensure a clean state
    setIsAuthenticated(false);
    setIsOnboarded(false);
  };

  return (
    <AppRoutes 
      isAuthenticated={isAuthenticated}
      isOnboarded={isOnboarded}
      login={handleLogin}
      completeOnboarding={handleCompleteOnboarding}
      logout={handleLogout}
      toggleTheme={toggleTheme}
      darkMode={darkMode}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <EntityProfileProvider>
          <AppContent />
        </EntityProfileProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;