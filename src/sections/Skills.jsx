import { skillsData } from '../data';
import Reveal from '../components/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-12 text-center">
            My Tech Stack
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {skillsData.map((skill, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-700 hover:border-sky-500/30 group hover:-translate-y-2 duration-300 h-40 w-full aspect-[4/3] md:aspect-square">
                <skill.icon className={`text-5xl mb-4 text-slate-400 group-hover:${skill.color} transition-colors duration-300`} />
                <span className="font-semibold text-slate-400 group-hover:text-slate-100 transition-colors">{skill.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
