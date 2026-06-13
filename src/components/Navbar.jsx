import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHomePage = location.pathname === '/';
  const useWhiteText = isHomePage && !isScrolled;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-surface/85 backdrop-blur-md shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              alt="Mayya Electronics Logo" 
              className="h-14 md:h-16 w-auto object-contain transition-all duration-300" 
              src="/logo.png" 
            />
            <div className="flex flex-col font-primary">
              <span className={`text-title-lg font-bold leading-tight transition-colors duration-300 ${useWhiteText ? 'text-white drop-shadow-md' : 'text-primary'}`}>Mayya Electronics</span>
              <span className={`text-[10px] md:text-[12px] uppercase tracking-widest transition-colors duration-300 ${useWhiteText ? 'text-white/80 drop-shadow-sm' : 'text-on-surface-variant'}`}>House of Home Appliances</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-primary">
          <a href="#story" onClick={(e) => handleNavClick(e, 'story')} className={`text-label-md uppercase tracking-wide hover:text-secondary transition-colors ${useWhiteText ? 'text-white drop-shadow-md' : 'text-on-surface'}`}>Story</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className={`text-label-md uppercase tracking-wide hover:text-secondary transition-colors ${useWhiteText ? 'text-white drop-shadow-md' : 'text-on-surface'}`}>Products</a>
          <a href="#why" onClick={(e) => handleNavClick(e, 'why')} className={`text-label-md uppercase tracking-wide hover:text-secondary transition-colors ${useWhiteText ? 'text-white drop-shadow-md' : 'text-on-surface'}`}>Why Choose Us</a>
          <a href="#visit" onClick={(e) => handleNavClick(e, 'visit')} className={`text-label-md uppercase tracking-wide hover:text-secondary transition-colors ${useWhiteText ? 'text-white drop-shadow-md' : 'text-on-surface'}`}>Visit</a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-lg" 
            href="tel:+910000000000"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="text-label-md">Call Now</span>
          </motion.a>
        </nav>
        
        <button className={`md:hidden flex items-center justify-center p-2 ${useWhiteText ? 'text-white' : 'text-primary'}`}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </motion.header>
  );
}
