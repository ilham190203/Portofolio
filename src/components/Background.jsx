import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];

    // Configuration
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 80; // Optimize for mobile
    const connectionDistance = isMobile ? 120 : 200; 
    const mouseParams = { x: null, y: null, radius: 250 };

    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8'; // Sky-400 or Indigo-400
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouseParams.x != null) {
            let dx = mouseParams.x - this.x;
            let dy = mouseParams.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouseParams.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseParams.radius - distance) / mouseParams.radius;
                const directionX = forceDirectionX * force * 0.5; // Push strength
                const directionY = forceDirectionY * force * 0.5;
                this.vx -= directionX;
                this.vy -= directionY;
            }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            let opacityValue = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.2})`; // Reduced opacity for subtlety
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Mouse Listeners
    const handleMouseMove = (e) => {
        mouseParams.x = e.x;
        mouseParams.y = e.y;
    }
    const handleMouseLeave = () => {
        mouseParams.x = null;
        mouseParams.y = null;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-slate-900 pointer-events-none">
        {/* Subtle Grid Pattern Base */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-grid-slate-700/[0.1] bg-[length:30px_30px]"></div>
      
      {/* Gradient Blobs for ambient light */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>

      {/* Neural Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/80"></div>
    </div>
  );
}
