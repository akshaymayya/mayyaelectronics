import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [showPromo, setShowPromo] = useState(false);
  const [hasShownPromo, setHasShownPromo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const activeAds = useQuery(api.advertisements.getActive) || [];

  const videoRef = useRef(null);
  const { scrollYProgress: videoScrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"]
  });
  const videoY = useTransform(videoScrollYProgress, [0, 1], ['-20%', '20%']);
  const [heroVideoEnded, setHeroVideoEnded] = useState(false);

  // The Support section has been moved to its own page

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-24 overflow-hidden bg-black font-sans">
        <motion.div style={{ y: heroY, opacity }} className="absolute inset-0 z-0 bg-black">
          <img 
            alt="Mayya Electronics Showroom" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${heroVideoEnded ? 'opacity-50' : 'opacity-0'}`} 
            src="/hero-bg.png" 
          />
          <video 
            autoPlay 
            muted 
            playsInline
            onEnded={() => setHeroVideoEnded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${heroVideoEnded ? 'opacity-0' : 'opacity-50'}`}
            src="/mayya electronic short video.mp4"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </motion.div>

        <div className="relative z-10 flex-grow flex flex-col items-center justify-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-10 pb-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Top Badge */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full py-1.5 px-4 shadow-xl">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-1 relative overflow-hidden">
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google" className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-medium text-white/90">4.9 on Google Reviews</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-bold text-white leading-[1.05] tracking-tight mb-8">
              Premium appliances.<br />Better living.
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-medium">
              Unlock the power of seamless home management and smart appliances with a  legacy of quality service and premium home solutions spanning nearly three decades across Surathkal and Kinnigoli.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-[#D6F000] text-black px-8 py-4 font-semibold text-lg rounded-full shadow-lg transition-transform"
                href="#products"
              >
                View Collections
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Trust Area */}
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-8 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-8"
          >
            {/* Left */}
            <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-1/3">
              <div className="flex items-center gap-1 text-[#00B67A]">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                <span className="text-white font-bold text-lg tracking-tight">Trustpilot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-[10px] bg-[#00B67A] text-white rounded-[2px] p-[2px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>)}
                </div>
                <span className="text-xs text-white/70">4.8 (2,004 reviews)</span>
              </div>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center gap-4 w-full md:w-1/3 overflow-hidden">
              <span className="text-xs text-white/70 font-medium tracking-wide uppercase text-center">Brand products we have</span>
              <div className="w-full max-w-xs md:max-w-[450px] overflow-hidden relative">
                {/* Gradient fade edges */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />
                
                <motion.div 
                  className="flex gap-12 items-center w-max opacity-80"
                  animate={{ x: [0, "-50%"] }}
                  transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                >
                  {[
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcCpdlcGbrEBfQ-IQeUc9fO25N7aS2TkOx6w0lttBy12w_R15hHTXyaIZExySn_A0fiJxw44cQhyM4FUPG24pwgbx5ZPa4YEBeod4nHTJ0OhBxRRAXoLyE1W2rxH6tN6iiP5HU4VIFmMczTUc6pDYxmYTj7vz7t2ait4Dfz32sbBlCh4uEVnW6Hk86mBfH9asyovxxl-nzBfO3ZK-VNWYKoWcv5bYnQkYtmfmfdL1980sq65JkIiZQk703QqpHZsElQ_GidpB00g", alt: "Samsung", className: "h-8 md:h-10 w-auto object-contain grayscale brightness-200" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_kWgFygXrBmS7ZU9CBfKuZ74xY8hmac_OfBdNLD81QTuV2QO5h-Xo94fPTMpURsDxBE_uKDbS247EUSy8qy4U8imftpRt5F2ejd6wSqDj23ryFrFdVXfR9msiQBulUSP8CxB65GcK3R962WQegr7e_QsvRVZFgboRf9Ul9laWZrdHws2R451NiGpCbCOtLAoOENyjMf_9_gf3pTtYvl9BEok3OvMF7avCmcjLOxQlfDM7mzLWSWtE0kUAvNZaxdm_dtqCLGTbsg", alt: "LG", className: "h-5 md:h-6 w-auto object-contain grayscale brightness-200" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-H71Wclb-j4Q5MCr7uBr-Qq1Ny0ig25qdwekvJi_Jhw1NZkDnqn-osRk6_PjlSc8-V5Aw70TG89g5l2nUf0cBr-yqfS_mYTs3oEqleyQV-363IfDoVm1MmJtts30NFrp87edl-QlXiJyksg5sywWo2LMH6Z1sE0qc0Oa41UDPDw0yx7gU_HvoPYzdRMnfePvojbnTjWwgimxsU2B3mdqLyreFGcie3HnYI87gXu-uGg6gh2oFKcXLUyf2peVTyXVwgA7uyg1ztI", alt: "Sony", className: "h-4 md:h-5 w-auto object-contain brightness-0 invert" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEj2dU_4-_7I33b-4NvzA46nFPZVp4bwb74g0eSiLZJ5nxVFvv6WzdiJLkRHNkVh7uc0fcTbn-8B4QFwbwMjScqF4Hpc2CZbre3i6hYuiRZHa8X7Tqvx8Zy7utXwzxsdzmBCWSlJtyW3oDiTNFSOTcTLsS0C9xgro2cNa7w0MlQHOmpmqTzBJ7xSAl2jLrD_gZJAF3y0Tv16oxu0Y-Wk4GTTNZ-w2dSJqf8TOCoND6HgapQv-Yfm8S4uNg21qGoGrMC7RuPekRAc", alt: "Panasonic", className: "h-4 md:h-5 w-auto object-contain brightness-0 invert opacity-70" },
                    { src: "/haier-seeklogo.png", alt: "Haier", className: "h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-80" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcCpdlcGbrEBfQ-IQeUc9fO25N7aS2TkOx6w0lttBy12w_R15hHTXyaIZExySn_A0fiJxw44cQhyM4FUPG24pwgbx5ZPa4YEBeod4nHTJ0OhBxRRAXoLyE1W2rxH6tN6iiP5HU4VIFmMczTUc6pDYxmYTj7vz7t2ait4Dfz32sbBlCh4uEVnW6Hk86mBfH9asyovxxl-nzBfO3ZK-VNWYKoWcv5bYnQkYtmfmfdL1980sq65JkIiZQk703QqpHZsElQ_GidpB00g", alt: "Samsung", className: "h-8 md:h-10 w-auto object-contain grayscale brightness-200" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_kWgFygXrBmS7ZU9CBfKuZ74xY8hmac_OfBdNLD81QTuV2QO5h-Xo94fPTMpURsDxBE_uKDbS247EUSy8qy4U8imftpRt5F2ejd6wSqDj23ryFrFdVXfR9msiQBulUSP8CxB65GcK3R962WQegr7e_QsvRVZFgboRf9Ul9laWZrdHws2R451NiGpCbCOtLAoOENyjMf_9_gf3pTtYvl9BEok3OvMF7avCmcjLOxQlfDM7mzLWSWtE0kUAvNZaxdm_dtqCLGTbsg", alt: "LG", className: "h-5 md:h-6 w-auto object-contain grayscale brightness-200" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-H71Wclb-j4Q5MCr7uBr-Qq1Ny0ig25qdwekvJi_Jhw1NZkDnqn-osRk6_PjlSc8-V5Aw70TG89g5l2nUf0cBr-yqfS_mYTs3oEqleyQV-363IfDoVm1MmJtts30NFrp87edl-QlXiJyksg5sywWo2LMH6Z1sE0qc0Oa41UDPDw0yx7gU_HvoPYzdRMnfePvojbnTjWwgimxsU2B3mdqLyreFGcie3HnYI87gXu-uGg6gh2oFKcXLUyf2peVTyXVwgA7uyg1ztI", alt: "Sony", className: "h-4 md:h-5 w-auto object-contain brightness-0 invert" },
                    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEj2dU_4-_7I33b-4NvzA46nFPZVp4bwb74g0eSiLZJ5nxVFvv6WzdiJLkRHNkVh7uc0fcTbn-8B4QFwbwMjScqF4Hpc2CZbre3i6hYuiRZHa8X7Tqvx8Zy7utXwzxsdzmBCWSlJtyW3oDiTNFSOTcTLsS0C9xgro2cNa7w0MlQHOmpmqTzBJ7xSAl2jLrD_gZJAF3y0Tv16oxu0Y-Wk4GTTNZ-w2dSJqf8TOCoND6HgapQv-Yfm8S4uNg21qGoGrMC7RuPekRAc", alt: "Panasonic", className: "h-4 md:h-5 w-auto object-contain brightness-0 invert opacity-70" },
                    { src: "/haier-seeklogo.png", alt: "Haier", className: "h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-80" }
                  ].map((logo, idx) => (
                    <img key={idx} src={logo.src} alt={logo.alt} className={logo.className} />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center md:items-end gap-1 w-full md:w-1/3 text-center md:text-right">
              <span className="text-sm font-bold text-white uppercase tracking-widest">EST. 1996</span>
              <span className="text-[10px] text-white/50 uppercase">Legacy Showroom</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-surface py-20 px-margin-mobile md:px-margin-desktop" id="experience" ref={videoRef}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg md:text-5xl text-primary mb-4 font-sans font-bold">Experience the Showroom</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto font-sans">Take a glimpse into our world of premium appliances and unmatched service.</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            style={{ y: videoY }}
            className="w-full rounded-2xl overflow-hidden shadow-2xl relative bg-black flex items-center justify-center border border-outline-variant group"
          >
            {/* Cinematic Overlay Vignette */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-20" />

            <video
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-auto brightness-105 contrast-[1.15] saturate-[1.1] z-10"
            >
              <source src="/mayyaelectronic_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Mute/Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-6 right-6 z-30 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white p-3 rounded-full transition-colors flex items-center justify-center border border-white/10 shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              <span className="material-symbols-outlined text-2xl">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Advertisements & Deals */}
      {activeAds.length > 0 && (
        <section className="py-16 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h2 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">Latest Updates & Deals</h2>
                <p className="text-on-surface-variant mt-2">Check out our ongoing offers and new arrivals</p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAds.map((ad, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    className="rounded-2xl overflow-hidden shadow-md border border-outline-variant/30 bg-white group cursor-pointer"
                    onClick={() => setSelectedAd(ad)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-high relative">
                      <img 
                        src={ad.imageUrl} 
                        alt={ad.title || "Advertisement"} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-primary px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          View
                        </span>
                      </div>
                    </div>
                    {ad.title && (
                      <div className="p-5 border-t border-outline-variant/20 text-center">
                        <h3 className="font-bold text-primary text-lg">{ad.title}</h3>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Ad Lightbox Modal */}
      <AnimatePresence>
        {selectedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedAd(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-secondary transition-colors bg-black/50 p-2 rounded-full flex items-center justify-center"
              onClick={() => setSelectedAd(null)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedAd.imageUrl} 
                alt={selectedAd.title || "Advertisement"} 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              {selectedAd.title && (
                <div className="mt-4 text-white text-xl font-bold text-center">
                  {selectedAd.title}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Our Story Section */}
      <section className="py-32 bg-surface px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="story">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          onViewportEnter={() => {
            if (!hasShownPromo) {
              setShowPromo(true);
              setHasShownPromo(true);
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10"
        >
          <motion.div variants={fadeInUp} className="md:col-span-5 relative">
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden group rounded-xl shadow-2xl">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                alt="Founder Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-[0.2] transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYlrlZGXA60yAR8l3wU8X7nCgJsMYZ2nJ9D1DQ9huwiGHjl8GOpp8kGbRZOK-AgjUNjlEDocLsLeQprBVFh7BIhd1JKFGgyY1DQH952NwGtFIFltirL4ybi9D6ee23NMs8BB7grdTSCC66UIj2OBv608MZ3vNa4g7fpDLJiBW3LOGOWRh_vvIhj3YN9Cf22UHPLyYpw3GBPcejVhyriAybG_aJrUkngltEmHi0KEWnBrGwxOzVDR6w2yF-zG03K8YoU5dOA2A4uvL5eg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/90 to-transparent pt-20">
                <p className="font-headline-sm text-headline-sm text-white italic mb-2">"Quality is the bridge between a house and a home."</p>
                <p className="font-label-md text-label-md uppercase tracking-wider text-white">— Mr. Shivprasad Mayya</p>
              </div>
            </div>
            {/* Accent box behind image */}
            <div className="absolute -inset-4 border border-secondary/30 rounded-xl -z-10 translate-x-4 translate-y-4" />
          </motion.div>
          <motion.div variants={staggerContainer} className="md:col-span-7 flex flex-col justify-center">
            <motion.h2 variants={fadeInUp} className="font-headline-lg text-headline-lg md:text-5xl mb-8 text-primary flex items-center gap-6">
              <span className="w-16 h-px bg-secondary hidden sm:block"></span>
              The Legacy of Mayya
            </motion.h2>
            <div className="space-y-6 max-w-2xl">
              <motion.p variants={fadeInUp} className="font-headline-sm text-headline-sm text-primary/80 italic leading-relaxed border-l-2 border-secondary/30 pl-6">
                Founded in 1996 by late K.R Mayya, our store began with a simple vision: to bring the best home technology to the heart of Surathkal and Kinnigoli.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                What started as a small family venture has grown into Mangaluru's premier destination for home electronics. For over 28 years, we have remained anchored in our original location opposite Govinda Dasa College, serving generations of families with the same personalized care that defined our first day.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Our commitment goes beyond the sale. As a family-owned business, we believe in relationships, expert guidance, and being a reliable partner in our community's growth. We don't just sell appliances; we curate lifestyles.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="mt-14 flex flex-col sm:flex-row gap-8 sm:gap-16 border-t border-outline-variant/50 pt-8">
              <div>
                <p className="text-display-lg font-display-lg text-primary drop-shadow-sm">28<span className="text-secondary">+</span></p>
                <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant mt-2">Years of Heritage</p>
              </div>
              <div>
                <p className="text-display-lg font-display-lg text-primary drop-shadow-sm">50k<span className="text-secondary">+</span></p>
                <p className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant mt-2">Happy Homes</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <section className="py-32 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop" id="products">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg md:text-5xl text-primary mb-6">Curated Collections</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">From entry-level essentials to premium flagship ranges, we bring you the finest engineering from the world's leading brands.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-3 overflow-x-auto pb-4 w-full md:w-auto scrollbar-hide">
              <span className="whitespace-nowrap px-6 py-2 bg-primary text-white font-label-md text-[11px] tracking-widest uppercase rounded-full shadow-lg">All Categories</span>
              <Link to="/category/kitchen" className="whitespace-nowrap px-6 py-2 border border-outline/30 text-on-surface-variant font-label-md text-[11px] tracking-widest uppercase hover:bg-white hover:shadow-md transition-all rounded-full cursor-pointer">Kitchen</Link>
              <Link to="/category/entertainment" className="whitespace-nowrap px-6 py-2 border border-outline/30 text-on-surface-variant font-label-md text-[11px] tracking-widest uppercase hover:bg-white hover:shadow-md transition-all rounded-full cursor-pointer">Entertainment</Link>
              <Link to="/category/cooling" className="whitespace-nowrap px-6 py-2 border border-outline/30 text-on-surface-variant font-label-md text-[11px] tracking-widest uppercase hover:bg-white hover:shadow-md transition-all rounded-full cursor-pointer">Cooling</Link>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAmUtgbl5CdlC_fuZ-OlhluGX3Rx3rBWHALpVT4oTzzKBHpl1xN7vZv2tYAyTHL-s4S_kghzRozJ7PF87P5KC0pb-yRdiuCmH9_1CXcm7wDO7oiYR_UXfH_2bhDftwMh6YI038nUFFKatlJPWWYxOq-YjuPPX07iyxTraz4UXpXvxv8TzzxGQ2tbHv0q9PEdheGizlKz2PtBXhHPAqvTWhkmA8IxfTp-BIGvBVHtkDex0j6_P8m4CPpN-fhjdQj3DKnOm3Zgzh2IZ1SUw"
              imageAlt="Television Category"
              category="Entertainment"
              title="Ultra HD Televisions"
              description="Featuring Sony Bravia, Samsung QLED, and LG OLED ranges."
              brands="Sony, LG, Samsung"
              linkTo="/category/entertainment"
            />
            <ProductCard
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBOTXoXrioJ2Tfv0ERHyTfiV7M1eu1Tesk6633fsZQqL5FjTSypCz2rrrkurfVav8KSpVVhBf8JR-I2OYd-w1RKEFK8uY_Yxa6dSqLBcig72nIVQf-wdn4EFliFzQRN4IbiaLS3hwkN50A9czcThlt86x6-jvUajuh2e-t5ZT5XJ3hQ_0wA3HoYOnJa49m4Y0iHw6CD0aJoEW4QED00OQjTrjRqvLKeU1JJPnOjMtzmQA-jDqjpBvEVfepH_zKNrEmQh5FcGV-0Cehs2Q"
              imageAlt="Refrigerators Category"
              category="Kitchen Cooling"
              title="Premium Refrigerators"
              description="Double door, side-by-side, and inverter models from LG and Whirlpool."
              brands="Whirlpool, LG, Bosch"
              linkTo="/category/cooling"
            />
            <ProductCard
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNYSnjRS7MoRinhZW82GAPa2KU0fLmPu7vBqMrYpboUG-FjPe2YEXbY4UFyl0T8EtkqyfAsUpcE4Tbi8AtYdp-s-vKysS0MiuvPuamBzrfhimmpcTLJO9C0E1kQk7hELUhyDmHuX-7CPZeI0nitegoj-Biiax9XBDItp-tfwzB_wTE-HjIiJOqX--7LZ7UsyyGC_x7HrVZ3dbzgYrWA_X8tEy7k08U0XLd0eaPG0m6xKvuCcyfLEpdc8jPr8o15Rn9AR5kMJMmlhQdw"
              imageAlt="Washing Machines Category"
              category="Home Care"
              title="Advanced Washing"
              description="Front-load and top-load fully automatic solutions by IFB and Samsung."
              brands="IFB, Samsung, LG"
              linkTo="/category/home-care"
            />
            <ProductCard
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCLO_L0PVQCmSA4lQWEbPs1oGW1lFdDRSmnno6hNhr65SiBNqvCUtVDq4RJZsf0ivhm_YuEJHimLsWZhzxHgBmh71yIL5QIQrBx2QC_ib14-49vIa17Dc7-r-bGG_3iLgD9A0mRdDb_3GQNVTzKkivnb7DXIw3OhtwJvnR9nBHVvGQudSGfrFaV7Wfw2AGFPyw45H5D1SM-VFglwE0FIbkgIevRXue7_IWv3bJFmAk8xLV23YrDaT6Q8_K6hkc-e9XZBhGl1AJHKbiwGw"
              imageAlt="Small Appliances Category"
              category="Kitchen Essentials"
              title="Kitchen Gadgets"
              description="Premium mixer-grinders, ovens, and kettles from Philips and Preethi."
              brands="Philips, Preethi, Sujata"
              linkTo="/category/kitchen"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-24 pt-12 border-t border-outline/20 flex flex-col justify-center items-center w-full">
            <div className="w-full overflow-hidden relative">
              {/* Gradient fade edges for surface background */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
              
              <motion.div 
                className="flex gap-16 lg:gap-24 items-center w-max grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                animate={{ x: [0, "-50%"] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                {[
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcCpdlcGbrEBfQ-IQeUc9fO25N7aS2TkOx6w0lttBy12w_R15hHTXyaIZExySn_A0fiJxw44cQhyM4FUPG24pwgbx5ZPa4YEBeod4nHTJ0OhBxRRAXoLyE1W2rxH6tN6iiP5HU4VIFmMczTUc6pDYxmYTj7vz7t2ait4Dfz32sbBlCh4uEVnW6Hk86mBfH9asyovxxl-nzBfO3ZK-VNWYKoWcv5bYnQkYtmfmfdL1980sq65JkIiZQk703QqpHZsElQ_GidpB00g", alt: "Samsung" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_kWgFygXrBmS7ZU9CBfKuZ74xY8hmac_OfBdNLD81QTuV2QO5h-Xo94fPTMpURsDxBE_uKDbS247EUSy8qy4U8imftpRt5F2ejd6wSqDj23ryFrFdVXfR9msiQBulUSP8CxB65GcK3R962WQegr7e_QsvRVZFgboRf9Ul9laWZrdHws2R451NiGpCbCOtLAoOENyjMf_9_gf3pTtYvl9BEok3OvMF7avCmcjLOxQlfDM7mzLWSWtE0kUAvNZaxdm_dtqCLGTbsg", alt: "LG" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-H71Wclb-j4Q5MCr7uBr-Qq1Ny0ig25qdwekvJi_Jhw1NZkDnqn-osRk6_PjlSc8-V5Aw70TG89g5l2nUf0cBr-yqfS_mYTs3oEqleyQV-363IfDoVm1MmJtts30NFrp87edl-QlXiJyksg5sywWo2LMH6Z1sE0qc0Oa41UDPDw0yx7gU_HvoPYzdRMnfePvojbnTjWwgimxsU2B3mdqLyreFGcie3HnYI87gXu-uGg6gh2oFKcXLUyf2peVTyXVwgA7uyg1ztI", alt: "Sony" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEj2dU_4-_7I33b-4NvzA46nFPZVp4bwb74g0eSiLZJ5nxVFvv6WzdiJLkRHNkVh7uc0fcTbn-8B4QFwbwMjScqF4Hpc2CZbre3i6hYuiRZHa8X7Tqvx8Zy7utXwzxsdzmBCWSlJtyW3oDiTNFSOTcTLsS0C9xgro2cNa7w0MlQHOmpmqTzBJ7xSAl2jLrD_gZJAF3y0Tv16oxu0Y-Wk4GTTNZ-w2dSJqf8TOCoND6HgapQv-Yfm8S4uNg21qGoGrMC7RuPekRAc", alt: "Panasonic" },
                  { src: "/haier-seeklogo.png", alt: "Haier" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcCpdlcGbrEBfQ-IQeUc9fO25N7aS2TkOx6w0lttBy12w_R15hHTXyaIZExySn_A0fiJxw44cQhyM4FUPG24pwgbx5ZPa4YEBeod4nHTJ0OhBxRRAXoLyE1W2rxH6tN6iiP5HU4VIFmMczTUc6pDYxmYTj7vz7t2ait4Dfz32sbBlCh4uEVnW6Hk86mBfH9asyovxxl-nzBfO3ZK-VNWYKoWcv5bYnQkYtmfmfdL1980sq65JkIiZQk703QqpHZsElQ_GidpB00g", alt: "Samsung" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk_kWgFygXrBmS7ZU9CBfKuZ74xY8hmac_OfBdNLD81QTuV2QO5h-Xo94fPTMpURsDxBE_uKDbS247EUSy8qy4U8imftpRt5F2ejd6wSqDj23ryFrFdVXfR9msiQBulUSP8CxB65GcK3R962WQegr7e_QsvRVZFgboRf9Ul9laWZrdHws2R451NiGpCbCOtLAoOENyjMf_9_gf3pTtYvl9BEok3OvMF7avCmcjLOxQlfDM7mzLWSWtE0kUAvNZaxdm_dtqCLGTbsg", alt: "LG" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO-H71Wclb-j4Q5MCr7uBr-Qq1Ny0ig25qdwekvJi_Jhw1NZkDnqn-osRk6_PjlSc8-V5Aw70TG89g5l2nUf0cBr-yqfS_mYTs3oEqleyQV-363IfDoVm1MmJtts30NFrp87edl-QlXiJyksg5sywWo2LMH6Z1sE0qc0Oa41UDPDw0yx7gU_HvoPYzdRMnfePvojbnTjWwgimxsU2B3mdqLyreFGcie3HnYI87gXu-uGg6gh2oFKcXLUyf2peVTyXVwgA7uyg1ztI", alt: "Sony" },
                  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEj2dU_4-_7I33b-4NvzA46nFPZVp4bwb74g0eSiLZJ5nxVFvv6WzdiJLkRHNkVh7uc0fcTbn-8B4QFwbwMjScqF4Hpc2CZbre3i6hYuiRZHa8X7Tqvx8Zy7utXwzxsdzmBCWSlJtyW3oDiTNFSOTcTLsS0C9xgro2cNa7w0MlQHOmpmqTzBJ7xSAl2jLrD_gZJAF3y0Tv16oxu0Y-Wk4GTTNZ-w2dSJqf8TOCoND6HgapQv-Yfm8S4uNg21qGoGrMC7RuPekRAc", alt: "Panasonic" },
                  { src: "/haier-seeklogo.png", alt: "Haier" }
                ].map((logo, idx) => (
                  <img key={idx} src={logo.src} alt={logo.alt} className="h-8 md:h-12 w-auto object-contain" />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-primary text-white px-margin-mobile md:px-margin-desktop overflow-hidden relative" id="why">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fadeInUp}>
              <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl mb-6">Why People of Mangalore Trust Mayya Electronics</h2>
              <p className="font-body-lg text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">Nearly three decades of dedicated service has built a foundation of trust that goes beyond just a purchase. We are your neighbors, your advisors, and your long-term partners in home care.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-center md:justify-end mt-12 md:mt-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-secondary-fixed/20 p-4"
                >
                  <div className="absolute inset-0 rounded-full border-t-2 border-secondary drop-shadow-[0_0_10px_rgba(214,240,0,0.8)]"></div>
                </motion.div>
                <div className="text-center relative z-10">
                  <span className="block text-4xl sm:text-5xl font-display-lg text-secondary-fixed mb-1">28+</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/60 font-label-md">Years Since 1996</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'history', title: '28+ Years', desc: 'An unwavering presence across Surathkal and Kinnigoli, offering wisdom and reliability to every visitor.' },
              { icon: 'verified_user', title: 'Brand Warranty', desc: '100% original products with authorized company warranties and peace of mind.' },
              { icon: 'support_agent', title: 'Expert Support', desc: 'Local support from people who know you, ensuring your appliances run smoothly.' },
              { icon: 'handshake', title: 'Guided Buying', desc: 'We listen to your needs and recommend only what fits your home and budget perfectly.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="bg-white/[0.03] backdrop-blur-sm p-10 rounded-2xl border border-white/10 group transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-secondary-fixed" style={{ fontVariationSettings: '"FILL" 1' }}>{feature.icon}</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4">{feature.title}</h3>
                <p className="font-body-md text-body-md text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>


      {/* Visit & Connect */}
      <section className="py-32 bg-surface px-margin-mobile md:px-margin-desktop relative overflow-hidden" id="visit">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="font-headline-lg text-headline-lg md:text-5xl text-primary mb-12">Visit Our Showroom</h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[11px] tracking-widest text-on-surface-variant uppercase mb-2">Surathkal Showroom</h4>
                    <p className="font-title-lg text-title-lg text-primary leading-relaxed">Main Road, opposite Govinda Dasa College, Surathkal, Mangaluru, 575014</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[11px] tracking-widest text-on-surface-variant uppercase mb-2">Kinnigoli Showroom</h4>
                    <p className="font-title-lg text-title-lg text-primary leading-relaxed">Main Road, towards Kateel/Moodbidre, Kinnigoli</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[11px] tracking-widest text-on-surface-variant uppercase mb-2">Store Hours</h4>
                    <p className="font-title-lg text-title-lg text-primary">Mon - Sun: 10:00 AM – 8:00 PM</p>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Open 7 days a week</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">chat</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[11px] tracking-widest text-on-surface-variant uppercase mb-2">Instant Support</h4>
                    <p className="font-title-lg text-title-lg text-primary mb-6">Have a question about a product?</p>
                    <div className="flex flex-col gap-3 w-full max-w-sm font-jakarta">
                      {/* WhatsApp Expandable */}
                      <div className="group w-full flex flex-col bg-white border border-outline-variant/30 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                        <button className="w-full flex items-center justify-between text-green-600 px-6 py-3 font-bold text-sm hover:bg-green-50 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px]">chat</span>
                            WhatsApp Support
                          </div>
                          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">expand_more</span>
                        </button>
                        
                        <div className="max-h-0 group-hover:max-h-32 transition-all duration-300 ease-in-out flex flex-col bg-green-50/30">
                          <a href="https://wa.me/919845146460" target="_blank" rel="noreferrer" className="px-6 py-3 text-green-700 hover:bg-green-100 font-bold text-sm flex items-center gap-3 border-t border-outline-variant/20">
                            <span className="material-symbols-outlined text-[16px]">call</span> +91 98451 46460
                          </a>
                          <a href="https://wa.me/91994527110" target="_blank" rel="noreferrer" className="px-6 py-3 text-green-700 hover:bg-green-100 font-bold text-sm flex items-center gap-3 border-t border-outline-variant/10">
                            <span className="material-symbols-outlined text-[16px]">call</span> +91 99452 7110
                          </a>
                        </div>
                      </div>

                      <a
                        className="flex items-center gap-3 bg-white text-pink-600 border border-outline-variant/30 px-6 py-3 font-bold text-sm rounded-xl shadow-sm hover:shadow-md hover:bg-pink-50 transition-all"
                        href="https://www.instagram.com/mayyaelectronicsofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank" rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative h-[400px] md:h-[600px] w-full bg-surface-container-highest rounded-2xl overflow-hidden shadow-2xl mt-8 md:mt-0">
              <iframe
                src="https://maps.google.com/maps?q=Mayya%20Electronics%20Surathkal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* Promo Popup */}
      <AnimatePresence>
        {showPromo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromo(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-transparent rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowPromo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors z-20"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <img src="/promo-popup.jpg" alt="Special Offer" className="w-full h-auto max-h-[90vh] object-contain rounded-2xl" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
