import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductCard({ 
  imageUrl, 
  imageAlt, 
  category, 
  title, 
  description, 
  brands, 
  linkTo 
}) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      whileHover={{ y: -8 }}
      className="bg-white/80 backdrop-blur-md border border-outline-variant/50 p-6 rounded-lg shadow-black/5 shadow-xl hover:shadow-2xl transition-shadow group flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-10" />
      <div className="aspect-square bg-surface mb-6 overflow-hidden rounded-md relative z-20">
        <img 
          alt={imageAlt} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          src={imageUrl} 
        />
      </div>
      <div className="relative z-20 flex flex-col flex-grow">
        <p className="font-label-md text-[10px] tracking-widest text-secondary-fixed-dim uppercase mb-2">{category}</p>
        <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">{description}</p>
        <Link to={linkTo} className="border-t border-outline-variant/60 pt-4 flex justify-between items-center group-hover:text-secondary transition-colors mt-auto">
          <span className="font-label-md text-label-md text-primary/80 group-hover:text-secondary transition-colors">{brands}</span>
          <span className="material-symbols-outlined text-secondary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">trending_flat</span>
        </Link>
      </div>
    </motion.div>
  );
}
