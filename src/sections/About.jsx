import { aboutData } from '../data';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-8 border-l-4 border-sky-500 pl-6">
            {aboutData.title}
          </h2>
        </Reveal>
        
        <Reveal delay={200}>
          <div className="text-lg text-slate-400 leading-relaxed mb-8">
            <p className="mb-6">{aboutData.description}</p>
            <blockquote className="border-l-4 border-slate-700 pl-4 italic text-slate-300">
              "{aboutData.goals}"
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
