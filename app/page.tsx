import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Achievements from '@/components/Achievements';
import About from '@/components/About';
import Books from '@/components/Books';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Achievements />
      <About />
      <Books />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
