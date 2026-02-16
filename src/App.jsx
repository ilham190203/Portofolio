import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="font-sans antialiased text-slate-100 selection:bg-sky-400 selection:text-slate-900 scroll-smooth relative">
      <ScrollProgress />
      <Background />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Ilham Fadilah. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
