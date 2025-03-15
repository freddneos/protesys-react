import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </div>
  );
}

export default App;
