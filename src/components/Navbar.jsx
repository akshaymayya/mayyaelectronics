import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto font-sans">
        <div className="flex items-center w-1/4">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              alt="Mayya Electronics Logo" 
              className={`h-16 md:h-20 w-auto object-contain transition-all duration-300 ${useWhiteText ? 'brightness-0 invert drop-shadow-md' : ''}`}
              src="/logo.png" 
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          <a href="#story" onClick={(e) => handleNavClick(e, 'story')} className={`text-sm font-medium transition-colors drop-shadow-md ${useWhiteText ? 'text-white hover:text-white/70' : 'text-primary hover:text-secondary'}`}>Story</a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className={`text-sm font-medium transition-colors drop-shadow-md ${useWhiteText ? 'text-white hover:text-white/70' : 'text-primary hover:text-secondary'}`}>Products</a>
          <a href="#why" onClick={(e) => handleNavClick(e, 'why')} className={`text-sm font-medium transition-colors drop-shadow-md ${useWhiteText ? 'text-white hover:text-white/70' : 'text-primary hover:text-secondary'}`}>Why Us</a>
          <a href="#visit" onClick={(e) => handleNavClick(e, 'visit')} className={`text-sm font-medium transition-colors drop-shadow-md ${useWhiteText ? 'text-white hover:text-white/70' : 'text-primary hover:text-secondary'}`}>Visit</a>
          <Link to="/support" target="_blank" className={`text-sm font-medium transition-colors drop-shadow-md ${useWhiteText ? 'text-white hover:text-white/70' : 'text-primary hover:text-secondary'}`}>Support</Link>
        </nav>

        <div className="hidden md:flex w-1/4 justify-end relative group">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`border px-5 py-2 transition-colors rounded-full text-sm font-semibold flex items-center gap-2 ${useWhiteText ? 'bg-black/20 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black' : 'bg-primary text-white border-primary hover:bg-secondary hover:border-secondary'}`} 
          >
            Call Now <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </motion.button>
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden border border-outline-variant/20 py-1">
            <a href="tel:+918242475760" className="px-4 py-3 text-primary hover:bg-surface-container font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-green-600">call</span> +91 824-2475760
            </a>
            <a href="tel:+918242475360" className="px-4 py-3 text-primary hover:bg-surface-container font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-green-600">call</span> +91 824-2475360
            </a>
            <a href="tel:+919845146460" className="px-4 py-3 text-primary hover:bg-surface-container font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-green-600">smartphone</span> +91 9845146460
            </a>
          </div>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex items-center justify-center p-2 z-[60] ${useWhiteText && !isMobileMenuOpen ? 'text-white' : 'text-primary'}`}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center pt-20 pb-10 px-margin-mobile"
          >
            <nav className="flex flex-col items-center gap-8 w-full max-w-sm">
              <a href="#story" onClick={(e) => handleNavClick(e, 'story')} className="text-2xl font-bold text-primary hover:text-secondary">Story</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="text-2xl font-bold text-primary hover:text-secondary">Products</a>
              <a href="#why" onClick={(e) => handleNavClick(e, 'why')} className="text-2xl font-bold text-primary hover:text-secondary">Why Us</a>
              <a href="#visit" onClick={(e) => handleNavClick(e, 'visit')} className="text-2xl font-bold text-primary hover:text-secondary">Visit</a>
              <Link to="/support" target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-primary hover:text-secondary">Support</Link>
              
              <div className="w-full h-px bg-outline/20 my-4" />
              
              <div className="w-full flex flex-col gap-3">
                <a 
                  className="w-full bg-white border border-outline-variant/30 text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm"
                  href="tel:+918242475760"
                >
                  <span className="material-symbols-outlined text-[18px] text-green-600">call</span> +91 824-2475760
                </a>
                <a 
                  className="w-full bg-white border border-outline-variant/30 text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm"
                  href="tel:+918242475360"
                >
                  <span className="material-symbols-outlined text-[18px] text-green-600">call</span> +91 824-2475360
                </a>
                <a 
                  className="w-full bg-white border border-outline-variant/30 text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-sm"
                  href="tel:+919845146460"
                >
                  <span className="material-symbols-outlined text-[18px] text-green-600">smartphone</span> +91 9845146460
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
