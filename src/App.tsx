import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { TextProvider } from './components/TextProvider';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SolutionsSection } from './components/SolutionsSection';
import { About } from './components/About';
import { FoundersSection } from './components/FoundersSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import Clarity from '@microsoft/clarity';
import { useAuth } from './hooks/useAuth';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Home component containing the landing page content
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <SolutionsSection />
      <About />
      <FoundersSection />
      <WaitlistSection />
      <Footer />
    </>
  );
};

function App() {
  const { session } = useAuth();

  useEffect(() => {
    // Initialize Clarity
    Clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <TextProvider>
          <main className="min-h-screen bg-base-100 relative">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <>
                    <Navbar />
                    {session ? <Navigate to="/dashboard" replace /> : <Login />}
                  </>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </TextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
