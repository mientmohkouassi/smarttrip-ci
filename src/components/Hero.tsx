'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    const [searchState, setSearchState] = useState({
        location: '',
        date: '',
        travelers: ''
    });
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 2000); // Mock search delay
    };

    return (
        <section className="flex flex-col lg:flex-row min-h-[85vh] overflow-hidden" id="hero">
            <div className="w-full lg:w-1/2 bg-savannah flex items-center px-5 py-10 md:py-16 lg:px-20 lg:py-20 relative">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl relative z-10"
                >
                    <h1 className="font-poppins text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-4 lg:mb-6 tracking-tight">
                        Explore <br />
                        <motion.span
                            initial={{ color: "#0f172a" }}
                            animate={{ color: "#ff8000" }}
                            transition={{ delay: 1, duration: 1 }}
                        >Côte d&apos;Ivoire</motion.span> <br />
                        Like a Local
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-slate-600 text-sm md:text-lg lg:text-xl mb-7 lg:mb-12 max-w-lg leading-relaxed"
                    >
                        Discover the hidden gems of the Ivory Coast with our AI-powered travel companion. From the beaches of Assinie to the peaks of Man.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="glass-search p-2 rounded-2xl flex flex-col md:flex-row items-stretch gap-2 shadow-2xl shadow-primary/10"
                    >
                        <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-slate-200/50">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-medium"
                                placeholder="Where to?"
                                type="text"
                                value={searchState.location}
                                onChange={(e) => setSearchState({ ...searchState, location: e.target.value })}
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-slate-200/50">
                            <span className="material-symbols-outlined text-primary">calendar_month</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-medium"
                                placeholder="When?"
                                type="text"
                                value={searchState.date}
                                onChange={(e) => setSearchState({ ...searchState, date: e.target.value })}
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 gap-3">
                            <span className="material-symbols-outlined text-primary">group</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-medium"
                                placeholder="Travelers"
                                type="text"
                                value={searchState.travelers}
                                onChange={(e) => setSearchState({ ...searchState, travelers: e.target.value })}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[140px]"
                        >
                            <AnimatePresence mode="wait">
                                {isSearching ? (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0, rotate: 0 }}
                                        animate={{ opacity: 1, rotate: 360 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="material-symbols-outlined"
                                    >
                                        sync
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="search"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                    >
                                        Search
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </motion.div>

                    {/* Explore CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="flex items-center gap-4 mt-6 flex-wrap"
                    >
                        <Link href="/destinations">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-primary transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 group"
                            >
                                <span className="material-symbols-outlined text-base">travel_explore</span>
                                Explore All Destinations
                            </motion.button>
                        </Link>
                        <span className="text-slate-400 text-sm font-medium">7 curated destinations</span>
                    </motion.div>
                </motion.div>
            </div>

            <div className="w-full lg:w-1/2 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    title="Cinematic aerial view of Assinie beach palm trees and turquoise water"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5zjqmhSEmdX0IU5VUaTHJgeQ4Ayfe7xHCl5Mcej6-SJLyN2uv4Jwj0NHxfMqmzlYgHYJX31dWYJr3_tb4ZQg35zqV5Depgbvv_iIGodwYjSIme7MxU8Qcwx76gD2SLyZxPejMe85WEwob_LPHMvkRRn7UfNWkKVoP6kGqoDbcRYt8cuTUwmU9qGVM1SkBK2ywFOx2Q7-Ir4l3wfnGsmLtG4cEO-JoCVodKeBDwGqrM0nYnbDtPcsL_arKBhJCtkM_BDl-aZ3Ubqwd')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-savannah/20 to-transparent"></div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white"
                >
                    <p className="text-xs uppercase tracking-widest font-bold opacity-80">Featured Location</p>
                    <h4 className="text-xl font-bold">Assinie-Mafia</h4>
                </motion.div>
            </div>
        </section>
    );
}
