import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [showPromo, setShowPromo] = useState(false);
  const [hasShownPromo, setHasShownPromo] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
        <motion.div style={{ y: heroY, opacity }} className="absolute inset-0 z-0 bg-black">
          <img alt="Mayya Electronics Showroom" className="w-full h-full object-cover opacity-60" src="/hero-bg.png" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-20 flex justify-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl text-white text-right flex flex-col items-end"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 mb-6 px-5 py-2 border border-secondary-fixed/50 bg-white/5 backdrop-blur-xl rounded-full shadow-2xl">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]"></span>
              <span className="text-sm font-label-md tracking-wider text-secondary-fixed-dim">EST. 1996</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display-lg text-display-lg md:text-[80px] leading-[1.1] mb-6 drop-shadow-2xl">
              Mangaluru's <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#F9F7F2]">Trusted</span> Destination
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-body-lg text-body-lg mb-12 text-white/80 max-w-lg leading-relaxed">
              Opposite Govinda Dasa College, Main Road, Surathkal. A legacy of quality service and premium home solutions spanning nearly three decades across Surathkal and Kinnigoli.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-end">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary-fixed text-on-secondary-fixed px-10 py-4 font-label-md text-label-md text-center shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-shadow rounded-sm"
                href="#products"
              >
                View Collections
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#001F3F" }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/30 bg-white/5 backdrop-blur-md text-white px-10 py-4 font-label-md text-label-md text-center transition-all rounded-sm"
                href="#visit"
              >
                Get Directions
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] text-white/50 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-secondary to-transparent"
          />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="bg-surface py-20 px-margin-mobile md:px-margin-desktop" id="experience">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-container-max mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg md:text-5xl text-primary mb-4">Experience the Showroom</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Take a glimpse into our world of premium appliances and unmatched service.</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-black flex items-center justify-center border border-outline-variant group"
          >
            {/* Cinematic Overlay Vignette */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-10" />

            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain md:object-cover brightness-105 contrast-[1.15] saturate-[1.1]"
            >
              <source src="/mayyaeectronics_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      </section>

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
                <p className="font-label-md text-label-md uppercase tracking-wider text-secondary">— Mr. Shivprasad Mayya</p>
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
                Founded in 1996 by late Mr. Kilpady Ramachandra Mayya, our store began with a simple vision: to bring the best home technology to the heart of Surathkal and Kinnigoli.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                What started as a small family venture has grown into Mangaluru's premier destination for home electronics. For over 28 years, we have remained anchored in our original location opposite Govinda Dasa College, serving generations of families with the same personalized care that defined our first day.
              </motion.p>
              <motion.p variants={fadeInUp} className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Our commitment goes beyond the sale. As a family-owned business, we believe in relationships, expert guidance, and being a reliable partner in our community's growth. We don't just sell appliances; we curate lifestyles.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="mt-14 flex gap-16 border-t border-outline-variant/50 pt-8">
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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

          <motion.div variants={fadeInUp} className="mt-24 pt-12 border-t border-outline/20 flex flex-wrap justify-center items-center gap-12 lg:gap-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpcCpdlcGbrEBfQ-IQeUc9fO25N7aS2TkOx6w0lttBy12w_R15hHTXyaIZExySn_A0fiJxw44cQhyM4FUPG24pwgbx5ZPa4YEBeod4nHTJ0OhBxRRAXoLyE1W2rxH6tN6iiP5HU4VIFmMczTUc6pDYxmYTj7vz7t2ait4Dfz32sbBlCh4uEVnW6Hk86mBfH9asyovxxl-nzBfO3ZK-VNWYKoWcv5bYnQkYtmfmfdL1980sq65JkIiZQk703QqpHZsElQ_GidpB00g" alt="Samsung" className="h-8 md:h-12 w-auto object-contain" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk_kWgFygXrBmS7ZU9CBfKuZ74xY8hmac_OfBdNLD81QTuV2QO5h-Xo94fPTMpURsDxBE_uKDbS247EUSy8qy4U8imftpRt5F2ejd6wSqDj23ryFrFdVXfR9msiQBulUSP8CxB65GcK3R962WQegr7e_QsvRVZFgboRf9Ul9laWZrdHws2R451NiGpCbCOtLAoOENyjMf_9_gf3pTtYvl9BEok3OvMF7avCmcjLOxQlfDM7mzLWSWtE0kUAvNZaxdm_dtqCLGTbsg" alt="LG" className="h-8 md:h-12 w-auto object-contain" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO-H71Wclb-j4Q5MCr7uBr-Qq1Ny0ig25qdwekvJi_Jhw1NZkDnqn-osRk6_PjlSc8-V5Aw70TG89g5l2nUf0cBr-yqfS_mYTs3oEqleyQV-363IfDoVm1MmJtts30NFrp87edl-QlXiJyksg5sywWo2LMH6Z1sE0qc0Oa41UDPDw0yx7gU_HvoPYzdRMnfePvojbnTjWwgimxsU2B3mdqLyreFGcie3HnYI87gXu-uGg6gh2oFKcXLUyf2peVTyXVwgA7uyg1ztI" alt="Sony" className="h-8 md:h-12 w-auto object-contain" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhEj2dU_4-_7I33b-4NvzA46nFPZVp4bwb74g0eSiLZJ5nxVFvv6WzdiJLkRHNkVh7uc0fcTbn-8B4QFwbwMjScqF4Hpc2CZbre3i6hYuiRZHa8X7Tqvx8Zy7utXwzxsdzmBCWSlJtyW3oDiTNFSOTcTLsS0C9xgro2cNa7w0MlQHOmpmqTzBJ7xSAl2jLrD_gZJAF3y0Tv16oxu0Y-Wk4GTTNZ-w2dSJqf8TOCoND6HgapQv-Yfm8S4uNg21qGoGrMC7RuPekRAc" alt="Panasonic" className="h-8 md:h-12 w-auto object-contain" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC77jV9g8_giRrUN4lxyYYc2bNLjtX16J5OSnCVZJ_8MuadRRNeiW5AoOqcUGCNOFzf_f-_ewrDHyBLIyrAl7Fj1ATKwEUJcmGQBE0-5rEPRmw9lWNShgRoDriR8iJmVNzXtQtcFNDN0NpuSzxyXc4sxeJYpPf0aQSW3v0nQoRMETCD8Ig-gCCLO67DV9IlXFEibmTCtlAn3H26uwIwIOhp3SIyQvhyAnpJwU8EbUiC84hkn6NLIw3Cyy0hOhqUrcFzo__eZaojYmA" alt="Haier" className="h-8 md:h-12 w-auto object-contain" />
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
              <h2 className="font-headline-lg text-headline-lg md:text-5xl mb-6">Why People of Mangalore Trust Mayya Electronics</h2>
              <p className="font-body-lg text-body-lg text-white/70 max-w-lg leading-relaxed">Nearly three decades of dedicated service has built a foundation of trust that goes beyond just a purchase. We are your neighbors, your advisors, and your long-term partners in home care.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="hidden md:flex justify-end">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-56 h-56 rounded-full border border-secondary-fixed/20 flex items-center justify-center p-4 relative"
              >
                <div className="absolute inset-0 rounded-full border-t border-secondary blur-sm"></div>
                <div className="text-center" style={{ transform: 'rotate(-0deg)' }}>
                  <span className="block text-5xl font-display-lg text-secondary-fixed mb-1">28+</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-label-md">Years Since 1996</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                    <p className="font-title-lg text-title-lg text-primary">Mon - Sat: 10:00 AM – 8:00 PM</p>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Closed on Sundays</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">chat</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[11px] tracking-widest text-on-surface-variant uppercase mb-2">Instant Support</h4>
                    <p className="font-title-lg text-title-lg text-primary mb-6">Have a question about a product?</p>
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 font-label-md text-label-md rounded shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                        href="https://wa.me/910000000000"
                      >
                        <span className="material-symbols-outlined">message</span>
                        WhatsApp Support
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-6 py-3 font-label-md text-label-md rounded shadow-[0_10px_20px_rgba(220,39,67,0.2)]"
                        href="https://instagram.com/mayyaelectronicsofficial"
                      >
                        <span className="material-symbols-outlined">camera_alt</span>
                        Instagram
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative h-[600px] w-full bg-surface-container-highest rounded-2xl overflow-hidden shadow-2xl">
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
