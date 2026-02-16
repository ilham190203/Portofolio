import { heroData } from '../data';
import { FaArrowRight } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from '../components/Reveal';
import { useEffect, useState } from 'react';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics adjustments for more "gravity" feel
  const springConfig = { stiffness: 150, damping: 15, mass: 1.5 }; // Heavie, tighter spring
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const xPos = useTransform(springX, (value) => value);
  const yPos = useTransform(springY, (value) => value);
  
  // Dynamic String Path (Triangle Shape)
  const [stringPath, setStringPath] = useState("M 150 0 L 150 0");

  useEffect(() => {
    const unsubscribeX = springX.on("change", (latestX) => {
        const latestY = springY.get();
        // Calculate anchor point (top center) and clip point (card top center)
        const anchorX = 160; 
        const anchorY = -100;
        const cardTopX = 160 + latestX;
        const cardTopY = latestY;

        // V-Shape: Two lines converging from the neck to the card clip
        // Adding a slight curve to simulate slack/tension
        setStringPath(`
            M ${anchorX} ${anchorY} 
            Q ${anchorX} ${anchorY + 50} ${cardTopX - 25} ${cardTopY} 
            L ${cardTopX + 25} ${cardTopY} 
            Q ${anchorX} ${anchorY + 50} ${anchorX} ${anchorY}
        `);
    });
    
    // Trigger initial render
    x.set(0); 

    return () => {
        unsubscribeX();
    };
  }, [springX, springY, x]);

  const rotateX = useTransform(y, [-150, 150], [45, -45]); // More dramatic tilt
  const rotateY = useTransform(x, [-150, 150], [-45, 45]); // More dramatic twist
  const rotateZ = useTransform(x, [-150, 150], [-20, 20]); // Realistic sway

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="order-2 md:order-1 relative z-10">
          <Reveal>
            <span className="text-sky-400 font-semibold tracking-wider uppercase text-sm mb-4 block animate-fade-in-up">
              {heroData.greeting}
            </span>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 leading-tight animate-fade-in-up delay-100">
              {heroData.name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                {heroData.role}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl leading-relaxed animate-fade-in-up delay-200">
              {heroData.description}
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <a 
                href="#projects" 
                className="px-8 py-4 bg-sky-500 text-slate-900 font-bold rounded-full hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                {heroData.ctaPrimary}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-slate-800/50 text-slate-300 font-semibold rounded-full hover:bg-slate-800 hover:text-white transition-all border border-slate-700 hover:border-sky-500/50 flex items-center justify-center"
              >
                {heroData.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Improved Lanyard Interactive Area */}
        <div className="order-1 md:order-2 flex justify-center relative z-10 h-[500px] flex items-center justify-center perspective-[1000px]">
           <div className="relative w-80 h-full flex flex-col items-center justify-center">
             
             {/* The Hanging Strap (V-Shape Lanyard) */}
             <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <path 
                    d={stringPath} 
                    stroke="url(#lanyard-gradient)" 
                    strokeWidth="3" 
                    fill="none" 
                    strokeLinecap="round"
                    className="drop-shadow-md"
                />
                 {/* Anchor Point at Neck (Top of Screen area) */}
                 <circle cx="160" cy="-100" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                 
                <defs>
                    <linearGradient id="lanyard-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                </defs>
             </svg>

             {/* Draggable Card */}
            <motion.div 
              className="relative w-56 h-72 md:w-72 md:h-96 cursor-grab active:cursor-grabbing origin-top z-10"
              style={{ x, y, rotateX, rotateY, rotateZ }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Lock to center but allow pull
              dragElastic={0.2} // Stretchier "pull" feeling like a real elastic
              onDragEnd={() => {
                x.set(0); 
                y.set(0); 
              }}
              whileTap={{ cursor: "grabbing" }}
            >
                {/* Connection to String (Top Bar) */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-slate-700 rounded-full z-0"></div>

                {/* Card Body */}
                <div className="relative w-full h-full bg-slate-900 rounded-xl border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md">
                    
                    {/* Metal Clip Mechanism */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-slate-300 to-slate-500 rounded-b-lg z-20 shadow-md border-b-2 border-slate-600 flex justify-center items-center">
                        <div className="w-10 h-1 bg-slate-800/30 rounded-full"></div>
                    </div>

                    {/* Image Area */}
                    <div className="absolute top-8 left-4 right-4 bottom-24 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 group">
                        <img 
                            src={heroData.profileImage} 
                            alt={heroData.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            draggable="false"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    </div>
                    
                    {/* ID Info */}
                    <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                        <h3 className="text-xl font-bold text-slate-100 tracking-wide uppercase">{heroData.name}</h3>
                        <p className="text-xs text-sky-400 font-mono tracking-widest mt-1 mb-2">ID: DEV-001</p>
                        
                        <div className="flex justify-between items-end opacity-40">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className={`bg-slate-400 w-0.5 ${i % 3 === 0 ? 'h-4' : 'h-2'}`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Glass Glare */}
                    <div className="absolute -inset-full top-0 block h-full w-full -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 pointer-events-none group-hover:animate-shine" />
                </div>
            </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
}
