"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { destinations, Destination } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense, useState } from "react";
import { X, MapPin, Star, Calendar, Users, Zap } from "lucide-react";

function SearchResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const location = searchParams.get("location")?.toLowerCase() || "";
    const date = searchParams.get("date") || "";
    const travelers = searchParams.get("travelers") || "";

    const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

    const filteredDestinations = destinations.filter((dest) =>
        dest.name.toLowerCase().includes(location) ||
        dest.region.toLowerCase().includes(location) ||
        dest.category.toLowerCase().includes(location)
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Your Next Adventure</h1>
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-slate-700">{location || "Everything"}</span>
                    </div>
                    {date && (
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-slate-700">{date}</span>
                        </div>
                    )}
                    {travelers && (
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-slate-700">{travelers}</span>
                        </div>
                    )}
                    <span className="text-slate-400 text-sm ml-2">{filteredDestinations.length} properties found</span>
                </div>
            </motion.div>

            {filteredDestinations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredDestinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg ring-4 ring-white/20">
                                    {dest.category}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{dest.name}</h3>
                                        <div className="flex items-center gap-1 text-slate-400 mt-1">
                                            <MapPin className="w-3 h-3" />
                                            <p className="text-xs font-bold uppercase tracking-wider">{dest.region}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-2xl border border-yellow-100 shadow-inner">
                                        <Star className="w-3 h-3 fill-yellow-700" />
                                        <span className="text-sm font-black">{dest.rating}</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-2">
                                    {dest.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Starting from</span>
                                        <p className="text-2xl font-black text-slate-900">{dest.price.toLocaleString()} <span className="text-xs font-bold">FCFA</span></p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedDest(dest)}
                                        className="bg-primary text-white px-5 py-3 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-orange-600 transition-colors"
                                    >
                                        View Details <Zap className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 bg-savannah/5 rounded-[3rem] border-2 border-dashed border-savannah/30"
                >
                    <div className="size-24 bg-savannah/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="text-4xl text-primary w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">No matches found</h2>
                    <p className="text-slate-500 max-w-md mx-auto">Try adjusting your filters or explore our popular beach destinations like Assinie.</p>
                </motion.div>
            )}

            {/* Details Modal */}
            <AnimatePresence>
                {selectedDest && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDest(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-3xl relative z-10 flex flex-col md:flex-row"
                        >
                            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <img src={selectedDest.image} className="w-full h-full object-cover" alt={selectedDest.name} />
                            </div>
                            <div className="w-full md:w-1/2 p-10 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedDest.category}</span>
                                        <h2 className="text-3xl font-black text-slate-900 mt-3">{selectedDest.name}</h2>
                                        <p className="text-slate-400 font-bold uppercase tracking-tighter text-sm">{selectedDest.region}</p>
                                    </div>
                                    <button onClick={() => setSelectedDest(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <X className="w-6 h-6 text-slate-400" />
                                    </button>
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {selectedDest.details || selectedDest.description}
                                </p>
                                <div className="mt-auto space-y-4">
                                    <div className="flex justify-between items-center py-4 border-t border-slate-100">
                                        <span className="font-bold text-slate-400">Total Price</span>
                                        <span className="text-2xl font-black text-slate-900">{selectedDest.price.toLocaleString()} FCFA</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedDest(null);
                                            router.push(`/booking?id=${selectedDest.id}`);
                                        }}
                                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/25 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        🎫 Book Your Trip Now
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main>
                <Suspense fallback={<div className="container mx-auto px-6 py-12 text-center text-slate-600">Discovering matching destinations...</div>}>
                    <SearchResultsContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
