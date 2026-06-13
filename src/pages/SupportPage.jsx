import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SupportPage() {
  const reviews = useQuery(api.reviews.get) || [];
  const addReview = useMutation(api.reviews.add);
  const submitComplaint = useMutation(api.complaints.submit);
  const generateUploadUrl = useMutation(api.complaints.generateUploadUrl);

  const [newReview, setNewReview] = useState('');

  const [complaintForm, setComplaintForm] = useState({
    name: '', phone: '', category: '', brand: '', date: '', notes: ''
  });
  const [billFile, setBillFile] = useState(null);
  const [productFiles, setProductFiles] = useState([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    
    await addReview({
      author: "Verified Customer",
      text: newReview,
      date: "Just now"
    });
    setNewReview('');
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    if (!billFile) {
      alert("Please upload your bill picture. It is strictly required.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const billUploadUrl = await generateUploadUrl();
      const billResult = await fetch(billUploadUrl, {
        method: "POST",
        headers: { "Content-Type": billFile.type },
        body: billFile,
      });
      const { storageId: billStorageId } = await billResult.json();

      let productStorageIds = [];
      if (productFiles && productFiles.length > 0) {
        productStorageIds = await Promise.all(
          productFiles.map(async (file) => {
            const productUploadUrl = await generateUploadUrl();
            const productResult = await fetch(productUploadUrl, {
              method: "POST",
              headers: { "Content-Type": file.type },
              body: file,
            });
            const productData = await productResult.json();
            return productData.storageId;
          })
        );
      }

      await submitComplaint({
        name: complaintForm.name,
        phone: complaintForm.phone,
        category: complaintForm.category,
        brand: complaintForm.brand,
        dateOfPurchase: complaintForm.date,
        notes: complaintForm.notes,
        billStorageId,
        productStorageIds: productStorageIds.length > 0 ? productStorageIds : undefined,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit complaint:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Live Reviews */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.h1 variants={fadeInUp} className="font-headline-lg text-4xl md:text-5xl text-primary mb-4">
            Customer Experience
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body-lg text-on-surface-variant mb-10">
            We value your feedback. Share your experience with Mayya Electronics.
          </motion.p>

          <motion.form variants={fadeInUp} onSubmit={handleReviewSubmit} className="mb-12">
            <div className="relative">
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here and press Enter..."
                className="w-full bg-white border border-outline-variant rounded-2xl p-6 pr-16 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-none h-32 text-primary shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleReviewSubmit(e);
                  }
                }}
              />
              <button 
                type="submit" 
                className="absolute bottom-6 right-6 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </motion.form>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence>
              {reviews.map(review => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm"
                >
                  <p className="font-body-md text-primary text-lg mb-4">"{review.text}"</p>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-label-md text-secondary-fixed-dim uppercase tracking-wider">{review.author}</span>
                    <span className="text-on-surface-variant/60">{review.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column: Complaint Booking */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="bg-primary text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <h2 className="font-headline-md text-3xl md:text-4xl mb-2 relative z-10">Book a Service Request</h2>
            <p className="font-body-md text-white/70 mb-10 relative z-10">Our dedicated team will assist you immediately.</p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleComplaintSubmit} 
                  className="space-y-6 relative z-10 font-jakarta"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base text-white/90 mb-2">Full Name (As per bill)</label>
                      <input required type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary" 
                        value={complaintForm.name} onChange={e => setComplaintForm({...complaintForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-base text-white/90 mb-2">Phone Number</label>
                      <input required type="tel" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary" 
                        value={complaintForm.phone} onChange={e => setComplaintForm({...complaintForm, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base text-white/90 mb-2">Product Category</label>
                      <select required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary appearance-none"
                        value={complaintForm.category} onChange={e => setComplaintForm({...complaintForm, category: e.target.value})}>
                        <option value="" className="text-black">Select...</option>
                        <option value="TV" className="text-black">Television</option>
                        <option value="Fridge" className="text-black">Refrigerator</option>
                        <option value="AC" className="text-black">Air Conditioner</option>
                        <option value="WashingMachine" className="text-black">Washing Machine</option>
                        <option value="Other" className="text-black">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base text-white/90 mb-2">Brand / Model Name</label>
                      <input required type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary" 
                        value={complaintForm.brand} onChange={e => setComplaintForm({...complaintForm, brand: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base text-white/90 mb-2">Approximate Date of Purchase</label>
                    <input type="date" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary [color-scheme:dark]" 
                        value={complaintForm.date} onChange={e => setComplaintForm({...complaintForm, date: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base text-white/90 mb-2">Upload Bill <span className="text-secondary">*</span></label>
                      <input required type="file" accept="image/*,.pdf" className="w-full text-base text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                        onChange={e => setBillFile(e.target.files[0])} />
                    </div>
                    <div>
                      <label className="block text-base text-white/90 mb-2">Product Pictures (Optional)</label>
                      <input multiple type="file" accept="image/*" className="w-full text-base text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                        onChange={e => setProductFiles(Array.from(e.target.files))} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base text-white/90 mb-2">Additional Notes / Problem Description</label>
                    <textarea required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary h-24 resize-none"
                      value={complaintForm.notes} onChange={e => setComplaintForm({...complaintForm, notes: e.target.value})}></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-500 transition-colors flex justify-center items-center h-14 border border-blue-400/30 shadow-lg"
                  >
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center relative z-10 min-h-[500px]"
                >
                  <motion.svg viewBox="0 0 50 50" className="w-32 h-32 text-secondary mb-8">
                    <motion.circle cx="25" cy="25" r="23" fill="transparent" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                    <motion.path
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      fill="transparent"
                      strokeWidth="4"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    />
                  </motion.svg>
                  <h3 className="font-headline-md text-3xl mb-4">Request Submitted!</h3>
                  <p className="text-white/80 text-lg">Our service staff will contact you soon regarding your complaint.</p>
                  
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setComplaintForm({name: '', phone: '', category: '', brand: '', date: '', notes: ''});
                      setBillFile(null);
                      setProductFile(null);
                    }}
                    className="mt-12 text-sm text-secondary hover:text-white underline underline-offset-4"
                  >
                    Submit another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </main>
  );
}
