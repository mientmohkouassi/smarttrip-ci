"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, CalendarHeart, Anchor, Palmtree } from "lucide-react";
import Link from "next/link";

export default function BespokePage() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-poppins flex flex-col relative overflow-hidden">
            {/* Dark theme background with subtle senufo pattern */}
            <div className="absolute inset-0 senufo-pattern opacity-5 pointer-events-none"></div>

            <Header />

            <main className="flex-1 w-full relative z-10 flex flex-col justify-center py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 text-savannah uppercase tracking-[0.3em] text-xs font-black mb-6">
                            <Sparkles className="w-4 h-4" /> Bespoke Expeditions
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1]">
                            Your Imagination, <br />Our <span className="text-primary italic">Canvas.</span>
                        </h1>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-lg">
                            For extraordinary requests that require white-glove logistics. Private island buyouts, exclusive anthropological tours, or luxury yacht charters across the Ébrié Lagoon.
                        </p>

                        <div className="space-y-6 mb-12">
                            {[
                                { icon: <Palmtree />, text: "Private estate sourcing & booking." },
                                { icon: <Anchor />, text: "Helicopter and yacht charters." },
                                { icon: <CalendarHeart />, text: "Dedicated VIP concierge 24/7." }
                            ].map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                                        {feat.icon}
                                    </div>
                                    <p className="text-lg font-medium text-slate-300">{feat.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-14 rounded-[3rem] relative"
                    >
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 blur-[3xl] rounded-full"></div>

                        <h2 className="text-3xl font-black text-white mb-4 relative z-10">Talk to a Specialist</h2>
                        <p className="text-slate-400 font-medium mb-10 relative z-10">Share a brief vision of your dream journey, and a senior travel designer will contact you directly to curate the impossible.</p>

                        <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Request submitted. A specialist will reach out shortly.'); }}>
                            <div>
                                <input type="text" required placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <input type="email" required placeholder="Contact Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <textarea required rows={4} placeholder="Describe your vision or special requirements..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-primary/50 text-lg group flex items-center justify-center gap-2">
                                Request Callback <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </main>
            <div className="relative z-10 mt-auto">
                <Footer />
            </div>
        </div>
    );
}
