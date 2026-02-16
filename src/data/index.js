import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { SiTailwindcss, SiVite } from 'react-icons/si';
import profileImg from '../assets/profil.jpg';

export const heroData = {
  greeting: "Hello, I'm",
  name: "Ilham Fadilah",
  role: "Frontend Developer",
  description: "I build accessible, pixel-perfect, secure, and performant web applications.",
  profileImage: profileImg,
  ctaPrimary: "View My Work",
  ctaSecondary: "Contact Me"
};

export const aboutData = {
  title: "About Me",
  description: `I am a passionate Frontend Developer with a keen eye for design and a love for clean, efficient code. My journey in web development started with curiosity and has grown into a career where I enjoy solving complex problems and creating intuitive user experiences.`,
  goals: "My goal is to build software involved in helping people improve their lives through technology."
};

export const skillsData = [
  { name: "React", icon: FaReact, color: "text-blue-400" },
  { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Vite", icon: SiVite, color: "text-purple-500" },
  { name: "GitHub", icon: FaGithub, color: "text-gray-800" },
];

export const projectsData = [
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing products, orders, and analytics. Built with React and Tailwind CSS.",
    tags: ["React", "Tailwind", "Chart.js"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=E-Commerce"
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website to showcase my work and skills. Features smooth scrolling and dark mode.",
    tags: ["React", "Vite", "Framer Motion"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Portfolio"
  },
  {
    title: "Task Management App",
    description: "A productivity tool to organize tasks with drag-and-drop functionality using local storage for persistence.",
    tags: ["React", "dnd-kit", "LocalStorage"],
    githubLink: "https://github.com",
    demoLink: "https://demo.com",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Task+App"
  }
];

export const contactData = {
  title: "Get In Touch",
  description: "I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
  email: "ilham@example.com",
  socials: [
    { name: "GitHub", icon: FaGithub, link: "https://github.com/ilham190203" },
    { name: "LinkedIn", icon: FaLinkedin, link: "https://linkedin.com" },
    { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/ilhaamfdl_19/" },
    { name: "Email", icon: FaEnvelope, link: "mailto:ilham@example.com" }
  ]
};
