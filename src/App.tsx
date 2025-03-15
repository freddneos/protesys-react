import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { TextProvider } from './components/TextProvider';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SolutionsSection } from './components/SolutionsSection';
import { About } from './components/About';
import { FoundersSection } from './components/FoundersSection';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Clarity from '@microsoft/clarity';

function App() {
  useEffect(() => {
    // Initialize Clarity
    Clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);

  return (
    <ThemeProvider>
      <TextProvider>
        <main className="min-h-screen bg-base-100 relative">
          <Navbar />
          <Hero />
          <Features />
          <SolutionsSection />
          <About />
          <FoundersSection />
          <WaitlistSection />
          <Footer />
        </main>
      </TextProvider>
    </ThemeProvider>
  );
}

export default App;
