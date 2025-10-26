import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollProgress from "@/components/ScrollProgress";
import Navigation from "@/components/navigation";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500">
      <ScrollProgress />
      <Navigation />
      <ThemeToggle />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <OpenSource />
      <Blogs />
      <Skills />
      <Contact />
      <Footer />
     
    </div>
  );
};

export default Landing;
