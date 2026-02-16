import { contactData } from '../data';
import Reveal from '../components/Reveal';
import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info & Actions */}
          <div className="text-left">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-6">
                {contactData.title}
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-lg">
                {contactData.description}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mb-10">
                <p className="text-slate-400 mb-4 text-sm font-semibold tracking-wide uppercase">For quick inquiries</p>
                <a 
                  href={`mailto:${contactData.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-slate-900 font-bold rounded-full shadow-lg hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all transform hover:-translate-y-1"
                >
                  <FaPaperPlane /> Say Hello via Email
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
               <div>
                 <p className="text-slate-400 mb-4 text-sm font-semibold tracking-wide uppercase">Connect with me</p>
                 <div className="flex gap-6">
                  {contactData.socials.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-sky-400 transition-colors transform hover:scale-110"
                    >
                      <social.icon size={28} />
                      <span className="sr-only">{social.name}</span>
                    </a>
                  ))}
                 </div>
               </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
         <div className="w-full">

        <Reveal delay={600}>
            <form onSubmit={handleSubmit} className="w-full bg-slate-800/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border border-slate-700 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Send a Message</h3>

              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-100 transition-colors text-center"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-100 transition-colors text-center"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-100 transition-colors resize-none text-center"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-4 font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-2
                  ${status === 'success' 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/25'
                  }
                  ${status === 'submitting' ? 'opacity-75 cursor-wait' : ''}
                `}
              >
                {status === 'submitting' && <FaSpinner className="animate-spin" />}
                {status === 'success' && <><FaCheckCircle /> Message Sent!</>}
                {status === 'idle' && 'Send Message'}
              </button>
            </form>
        </Reveal>


         </div>
        </div>
      </div>
    </section>
  );
}
