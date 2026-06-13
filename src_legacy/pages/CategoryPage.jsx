import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { categoryId } = useParams();

  const getCategoryTitle = (id) => {
    switch(id) {
      case 'entertainment': return 'Entertainment & Televisions';
      case 'cooling': return 'Kitchen Cooling & Refrigerators';
      case 'home-care': return 'Home Care & Washing Machines';
      case 'kitchen': return 'Kitchen Essentials & Gadgets';
      default: return 'Products';
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface min-h-screen pt-32">
      <div className="max-w-container-max mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link to="/#products" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary mb-4 font-label-md transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Collections
          </Link>
          <h1 className="font-display-lg text-display-lg text-primary mb-4 capitalize">{getCategoryTitle(categoryId)}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Explore our curated selection of premium {categoryId?.replace('-', ' ')} products. We stock only the most reliable brands to ensure your home runs smoothly.
          </p>
        </motion.div>

        {/* Placeholder products for the category */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter opacity-90"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item} 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white border border-outline-variant/40 p-6 rounded-lg shadow-sm hover:shadow-2xl flex flex-col grayscale-[0.5] hover:grayscale-0 transition-all duration-500 cursor-pointer group"
            >
              <div className="aspect-square bg-surface-container-low mb-6 flex items-center justify-center rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-10" />
                <span className="material-symbols-outlined text-outline text-6xl group-hover:scale-110 transition-transform duration-700">image</span>
              </div>
              <p className="font-label-md text-[10px] tracking-widest text-secondary-fixed-dim uppercase mb-2">Premium Model</p>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">Model Series {item}000</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">A high-quality appliance perfect for your daily needs.</p>
              <div className="border-t border-outline-variant/60 pt-4 flex justify-between items-center group-hover:text-secondary transition-colors mt-auto">
                <span className="font-label-md text-label-md text-primary/80 group-hover:text-secondary transition-colors">View Details</span>
                <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
