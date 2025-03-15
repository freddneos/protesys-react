import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { SolutionsSection } from './components/SolutionsSection';
import { FoundersSection } from './components/FoundersSection';

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <SolutionsSection />
      <FoundersSection />
    </div>
  );
}

export default App;
