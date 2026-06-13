import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'advertisements'
  const [adTitle, setAdTitle] = useState('');
  const [adFile, setAdFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const complaints = useQuery(api.complaints.get) || [];
  const updateStatus = useMutation(api.complaints.updateStatus);
  const advertisements = useQuery(api.advertisements.getAll) || [];
  const generateUploadUrl = useMutation(api.complaints.generateUploadUrl);
  const addAd = useMutation(api.advertisements.add);
  const toggleAd = useMutation(api.advertisements.toggleActive);
  const deleteAd = useMutation(api.advertisements.remove);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Polaliamma7560') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password.');
    }
  };

  const handleMarkResolved = async (id) => {
    await updateStatus({ id, status: "Resolved" });
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Pending" ? "In Progress" : currentStatus === "In Progress" ? "Resolved" : "Pending";
    await updateStatus({ id, status: nextStatus });
  };

  const handleAdSubmit = async (e) => {
    e.preventDefault();
    if (!adFile) return;
    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": adFile.type },
        body: adFile,
      });
      const { storageId } = await result.json();
      await addAd({
        title: adTitle,
        imageId: storageId,
        isActive: true
      });
      setAdTitle('');
      setAdFile(null);
    } catch (error) {
      console.error("Failed to upload advertisement:", error);
      alert("Failed to upload advertisement. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-margin-mobile md:px-margin-desktop bg-surface flex items-center justify-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-md w-full">
          <div className="bg-primary p-10 rounded-3xl shadow-2xl text-white">
            <div className="flex justify-center mb-8">
              <span className="material-symbols-outlined text-6xl text-secondary">lock</span>
            </div>
            <h1 className="text-3xl font-headline-md text-center mb-2">Staff Portal</h1>
            <p className="text-white/60 text-center mb-8 text-sm">Secure area. Authorized personnel only.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm text-white/80 mb-2">Password</label>
                <input 
                  type="password" 
                  autoFocus
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>
              <button type="submit" className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-md">
                Secure Login
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-white/40">Powered by Convex Auth (Pending Integration)</p>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-6 border-b border-outline-variant/50 pb-6">
          <div>
            <h1 className="font-headline-lg text-4xl text-primary mb-2">Staff Portal</h1>
            <p className="text-on-surface-variant">Manage complaints and website content.</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Lock System
          </button>
        </header>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('complaints')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'complaints' ? 'bg-primary text-white' : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'}`}
          >
            Complaints
          </button>
          <button 
            onClick={() => setActiveTab('advertisements')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'advertisements' ? 'bg-primary text-white' : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'}`}
          >
            Advertisements
          </button>
        </div>

        {activeTab === 'complaints' ? (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {complaints.map((complaint) => (
              <motion.div 
                key={complaint._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${expandedId === complaint._id ? 'border-primary' : 'border-outline-variant/40 hover:border-outline-variant hover:shadow-md'}`}
              >
                {/* Hyper-efficient Top Bar (Always visible) */}
                <div 
                  className="p-6 flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center cursor-pointer"
                  onClick={() => setExpandedId(expandedId === complaint._id ? null : complaint._id)}
                >
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-600' : complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                      <span className="material-symbols-outlined">{complaint.status === 'Resolved' ? 'check_circle' : complaint.status === 'In Progress' ? 'engineering' : 'build'}</span>
                    </span>
                  </div>
                  
                  {/* Phone Highlight */}
                  <div className="flex-shrink-0 w-full md:w-48">
                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Contact</p>
                    <a 
                      href={`tel:${complaint.phone}`} 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-2xl font-bold text-primary hover:text-secondary flex items-center gap-2"
                    >
                      {complaint.phone}
                      <span className="material-symbols-outlined text-[18px] text-green-600 bg-green-100 rounded-full p-1">call</span>
                    </a>
                  </div>

                  {/* Problem Description Highlight */}
                  <div className="flex-grow w-full">
                    <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider mb-1">Issue</p>
                    <p className={`text-lg text-primary ${expandedId === complaint._id ? '' : 'line-clamp-2'}`}>
                      {complaint.notes}
                    </p>
                  </div>

                  {/* Right side stats */}
                  <div className="flex-shrink-0 flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{complaint.category}</p>
                      <p className="text-xs font-bold mt-1" style={{color: complaint.status === 'Resolved' ? '#16a34a' : complaint.status === 'In Progress' ? '#ca8a04' : '#dc2626'}}>{complaint.status}</p>
                    </div>
                    <span className={`material-symbols-outlined transition-transform duration-300 text-on-surface-variant ${expandedId === complaint._id ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === complaint._id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-surface-container-lowest border-t border-outline-variant/20 rounded-b-2xl"
                    >
                      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider">Customer Name</p>
                            <p className="font-medium text-primary">{complaint.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider">Model / Brand</p>
                            <p className="font-medium text-primary">{complaint.brand}</p>
                          </div>
                          <div>
                            <p className="text-xs text-on-surface-variant uppercase tracking-wider">Purchase Date</p>
                            <p className="font-medium text-primary">{complaint.dateOfPurchase}</p>
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <p className="text-xs text-on-surface-variant uppercase tracking-wider">Attachments</p>
                          <div className="flex flex-wrap gap-4">
                            {complaint.billUrl ? (
                              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
                                <span className="material-symbols-outlined">receipt_long</span>
                                <span className="text-sm font-medium">Bill_Image</span>
                                <a href={complaint.billUrl} target="_blank" rel="noreferrer" className="ml-2 text-blue-900 hover:underline text-xs">View</a>
                              </div>
                            ) : null}
                            
                            {complaint.productUrls && complaint.productUrls.map((url, i) => (
                              <div key={i} className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg border border-purple-200">
                                <span className="material-symbols-outlined">image</span>
                                <span className="text-sm font-medium">Product_{i+1}</span>
                                <a href={url} target="_blank" rel="noreferrer" className="ml-2 text-purple-900 hover:underline text-xs">View</a>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-4 mt-6 border-t border-outline-variant/30 flex justify-end gap-4">
                            {complaint.status !== 'Resolved' && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleMarkResolved(complaint._id); }}
                                className="px-6 py-2 border border-outline-variant text-primary rounded-lg font-medium hover:bg-surface-container transition-colors"
                              >
                                Mark Resolved
                              </button>
                            )}
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleUpdateStatus(complaint._id, complaint.status); }}
                              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary hover:text-primary transition-colors shadow-sm"
                            >
                              Toggle Status
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        ) : (
        <div className="space-y-8">
          {/* Upload Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/40">
            <h2 className="text-2xl font-headline-md text-primary mb-6">Upload New Advertisement</h2>
            <form onSubmit={handleAdSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Title / Deal Name (Optional)</label>
                <input 
                  type="text" 
                  value={adTitle}
                  onChange={e => setAdTitle(e.target.value)}
                  className="w-full border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary"
                  placeholder="e.g. Diwali Mega Sale"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Advertisement Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setAdFile(e.target.files[0])}
                  className="w-full border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary cursor-pointer"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={!adFile || isUploading}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Publish Advertisement'}
              </button>
            </form>
          </div>

          {/* List of Ads */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {advertisements.map((ad) => (
                <motion.div 
                  key={ad._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${ad.isActive ? 'border-green-200' : 'border-outline-variant/40 opacity-70'}`}
                >
                  <div className="h-48 bg-white relative overflow-hidden flex items-center justify-center p-2 border-b border-outline-variant/30">
                    <img src={ad.imageUrl} alt="Advertisement" className="w-full h-full object-contain" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${ad.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {ad.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-1">{ad.title || 'Untitled Advertisement'}</h3>
                      <p className="text-xs text-on-surface-variant">Uploaded: {new Date(ad.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center gap-4">
                      <button 
                        onClick={() => toggleAd({ id: ad._id, isActive: !ad.isActive })}
                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${ad.isActive ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                      >
                        {ad.isActive ? 'Hide Ad' : 'Show Ad'}
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this advertisement forever?")) {
                            deleteAd({ id: ad._id, imageId: ad.imageId });
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
