import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Achievements from '@/components/Achievements';
import About from '@/components/About';
import Courses from '@/components/Courses';
import WhyFree from '@/components/WhyFree';
import YouTube from '@/components/YouTube';
import CustomBlog from '@/components/CustomBlog';
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
      <Courses />
      <WhyFree />
      <YouTube />
      <CustomBlog />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
