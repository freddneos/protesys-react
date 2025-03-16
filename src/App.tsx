import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { TextProvider } from './components/TextProvider';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FoundersSection } from './components/FoundersSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Clarity from '@microsoft/clarity';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Initialize Clarity
    Clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <TextProvider>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/dashboard/*" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={
                <>
                  <Navbar />
                  <Hero />
                  <Features />
                  <FoundersSection />
                  <WaitlistSection />
                  <Footer />
                </>
              } 
            />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </TextProvider>
    </ThemeProvider>
  );
}

export default App;
