import Navbar from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FoundersSection } from '../components/FoundersSection';
import { WaitlistSection } from '../components/WaitlistSection';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FoundersSection />
      <WaitlistSection />
      <Footer />
    </>
  );
};

export default Home;