import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-margin-mobile md:px-margin-desktop bg-surface flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <motion.div variants={fadeInUp} className="mb-6 relative inline-block">
          <h1 className="font-display-lg text-[120px] md:text-[180px] leading-none text-primary drop-shadow-sm">404</h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-secondary rotate-[-15deg] opacity-70"></div>
        </motion.div>
        
        <motion.h2 variants={fadeInUp} className="font-headline-md text-3xl md:text-4xl text-primary mb-6">
          Oops! Page Not Found
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="font-body-lg text-lg text-on-surface-variant mb-12 max-w-lg mx-auto leading-relaxed">
          It looks like the page you are searching for is out of stock or has been moved. Let's get you back to exploring our premium appliances.
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-secondary hover:text-primary transition-colors shadow-lg hover:shadow-xl"
          >
            <span className="material-symbols-outlined">home</span>
            Return to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
