'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Pricing() {
    return (
        <div className="min-h-screen bg-savannah/10">
            <Header />

            <main className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto font-medium">
                        Focus on the journey, not the logistics. Choose the plan that fits your travel style.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Basic Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col"
                    >
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Solo Explorer</span>
                        <h2 className="text-3xl font-black text-slate-900 mb-6">Free</h2>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                AI Trip Outlines
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                Basic Support Flow
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 font-medium opacity-40">
                                <span className="material-symbols-outlined text-xl">cancel</span>
                                Verified Local Guides
                            </li>
                        </ul>
                        <Link href="/explore/all" className="w-full">
                            <button className="w-full py-4 rounded-2xl bg-slate-100 text-slate-900 font-black hover:bg-slate-200 transition-colors">Start Exploring</button>
                        </Link>
                    </motion.div>

                    {/* Premium Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="bg-slate-900 p-10 rounded-[2.5rem] border-4 border-primary shadow-2xl shadow-primary/20 flex flex-col relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-tighter">Most Popular</div>
                        <span className="text-savannah/60 font-bold uppercase tracking-widest text-xs mb-4">Savannah Elite</span>
                        <h2 className="text-3xl font-black text-white mb-6">450,000 CFA<span className="text-sm font-medium text-savannah/40 uppercase ml-2 tracking-widest">/Year</span></h2>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-savannah/80 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                Dedicated VIP Concierge
                            </li>
                            <li className="flex items-center gap-3 text-savannah/80 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                Anthropologist-led Tours
                            </li>
                            <li className="flex items-center gap-3 text-savannah/80 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                Private Aviation Access
                            </li>
                        </ul>
                        <Link href="/pricing/premium" className="w-full relative z-10 transition-transform hover:scale-[1.02]">
                            <button className="w-full py-4 rounded-2xl bg-primary text-white font-black hover:bg-orange-600 transition-all shadow-lg shadow-primary/20 cursor-pointer">Go Premium</button>
                        </Link>
                    </motion.div>

                    {/* Business/Group Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col"
                    >
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">Expedition Elite</span>
                        <h2 className="text-3xl font-black text-slate-900 mb-6">Custom</h2>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">hotel</span>
                                Bulk Hotel Discounts
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">groups</span>
                                Group Logistics Support
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-primary text-xl">corporate_fare</span>
                                API Access for Partners
                            </li>
                        </ul>
                        <Link href="/pricing/enterprise" className="w-full">
                            <button className="w-full py-4 rounded-2xl bg-slate-100 text-slate-900 font-black hover:bg-slate-200 transition-colors">Contact Sales</button>
                        </Link>
                    </motion.div>
                </div>

                {/* FAQ Section Trigger */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 text-center"
                >
                    <h3 className="text-3xl font-black text-slate-900 mb-6">Need a custom itinerary?</h3>
                    <p className="text-slate-600 font-medium mb-10 max-w-xl mx-auto italic">
                        &quot;Not all travelers follow the same path. We offer bespoke planning for film crews, researchers, and luxury expeditions.&quot;
                    </p>
                    <Link href="/pricing/bespoke">
                        <button className="flex items-center justify-center gap-3 mx-auto text-primary font-black group transition-all cursor-pointer">
                            Talk to a Specialist
                            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
                        </button>
                    </Link>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
}
