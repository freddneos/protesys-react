import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Clarity from '@microsoft/clarity';

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
  useEffect(() => {
    // Initialize Clarity
    Clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <TextProvider>
          <main className="min-h-screen bg-base-100 relative">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </TextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
