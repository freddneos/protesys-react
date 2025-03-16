import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { TextProvider } from './components/TextProvider';
import { AuthProvider } from './components/AuthProvider';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { FoundersSection } from './components/FoundersSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Clarity from '@microsoft/clarity';
import { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    // Initialize Clarity
    Clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <TextProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <Features />
                <FoundersSection />
                <WaitlistSection />
                <Footer />
              </>
            } />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          <Toaster position="top-right" />
        </TextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
