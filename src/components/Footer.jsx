import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-primary text-white border-t border-primary mt-auto font-primary"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-4 mb-8">
            <img alt="Mayya Electronics" className="w-48 md:w-64 h-auto object-contain self-start brightness-0 invert drop-shadow-md" src="/logo.png" />
            <p className="text-body-md text-white/80 max-w-md mt-2">The trusted house of home appliances in Surathkal & Kinnigoli. Since 1996, providing premium tech and unparalleled service to our communities.</p>
          </div>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors bg-white/10 hover:bg-white/20" href="#">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors bg-white/10 hover:bg-white/20" href="https://instagram.com/mayyaelectronicsofficial">
              <span className="material-symbols-outlined text-[20px]">camera_alt</span>
            </motion.a>
          </div>
        </div>
        
        <div>
          <h4 className="text-title-md font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-4 flex flex-col items-start">
            <li><Link to="/" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Home</Link></li>
            <li><Link to="/category/kitchen" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Kitchen Appliances</Link></li>
            <li><Link to="/category/entertainment" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Televisions</Link></li>
            <li><Link to="/category/cooling" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Air Conditioners</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-title-md font-semibold text-white mb-6">Legal</h4>
          <ul className="space-y-4 flex flex-col items-start">
            <li><Link to="/privacy" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Terms of Service</Link></li>
            <li><Link to="/return" className="text-body-md text-white/80 hover:text-white transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all">Return Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center bg-black/10">
        <p className="text-body-sm text-white/60">© {new Date().getFullYear()} Mayya Electronics. All rights reserved. Designed for Heritage Excellence.</p>
      </div>
    </motion.footer>
  );
}
