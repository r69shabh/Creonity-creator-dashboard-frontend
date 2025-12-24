import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
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
import { EntityProfileProvider } from './context/EntityProfileContext';
import { ToastProvider } from './context/ToastContext';
import EntityDrawer from './components/EntityDrawer';
import ToastContainer from './components/ToastContainer';

const AppContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Determine title based on path
  const getPageTitle = (pathname: string) => {
    if (matchPath("/gigs/:id", pathname)) return 'Gig Details';
    if (matchPath("/collaborations/:id", pathname)) return 'Workroom';
    if (matchPath("/drive/:folderName", pathname)) return 'Workspace';
    
    switch (pathname) {
      case '/': return 'Overview';
      case '/gigs': return 'Find Gigs';
      case '/collaborations': return 'My Work & Applications';
      case '/analytics': return 'Analytics & Insights';
      case '/wallet': return 'Payments & Escrow';
      case '/profile': return 'My Creator Profile';
      case '/settings': return 'System Settings';
      case '/messages': return 'Messages';
      default: return 'Dashboard';
    }
  };

  const isMessagesPage = location.pathname === '/messages';

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-gray-900 text-text-primary dark:text-gray-100 font-display antialiased overflow-hidden transition-colors duration-200">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
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
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/collaborations/:id" element={<CollaborationDetail />} />
            <Route path="/drive/:folderName" element={<FolderView />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} toggleTheme={toggleTheme} />} />
            <Route path="/messages" element={<Messages onMenuClick={() => setMobileMenuOpen(true)} />} />
          </Routes>
        </main>
      </div>

      <EntityDrawer />
      <ToastContainer />
    </div>
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