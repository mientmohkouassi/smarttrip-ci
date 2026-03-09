"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Leaf, Award, ShieldCheck, HeartHandshake } from "lucide-react";

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/destinations/tai.jpg')" }} // Fallback to a nature/impact-like image if tai.jpg doesn't exist, will be handled gracefully by browser
                    >
                        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
                    </motion.div>

                    <div className="relative z-10 text-center px-6 max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-black uppercase tracking-widest backdrop-blur-md"
                        >
                            <Leaf className="w-4 h-4" />
                            Sustainability & Impact
                        </motion.div>
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter"
                        >
                            Traveling with <br /><span className="text-green-400 italic">Purpose.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto"
                        >
                            We believe that every journey should leave a positive footprint. Discover how SmartTrip CI empowers local communities and protects Côte d'Ivoire's majestic landscapes.
                        </motion.p>
                    </div>
                </section>

                {/* Pillars of Impact */}
                <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Our Three Pillars</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our sustainability model is woven directly into our business operations, ensuring that tourism benefits those who call these destinations home.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <HeartHandshake className="w-8 h-8" />,
                                title: "Economic Empowerment",
                                color: "bg-blue-50 text-blue-600 border-blue-100",
                                desc: "By bypassing traditional tourism middlemen, 100% of the artisan and local guide fees booked through our platform go directly to the creators and hosts.",
                                stat: "85%",
                                statDesc: "Revenue stays in local communities"
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8" />,
                                title: "Cultural Preservation",
                                color: "bg-orange-50 text-orange-600 border-orange-100",
                                desc: "We actively document and promote threatened indigenous crafts and oral histories, creating an economic incentive for younger generations to preserve their heritage.",
                                stat: "50+",
                                statDesc: "Artisan traditions digitized"
                            },
                            {
                                icon: <Leaf className="w-8 h-8" />,
                                title: "Environmental Stewardship",
                                color: "bg-green-50 text-green-600 border-green-100",
                                desc: "For every booking made on SmartTrip CI, a percentage is donated to the Taï National Park conservation fund to protect endangered flora and fauna.",
                                stat: "2.5%",
                                statDesc: "Of every booking donated to conservation"
                            }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full"
                            >
                                <div className={`size-16 rounded-[1.5rem] flex items-center justify-center mb-8 border shadow-sm ${pillar.color}`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8 flex-1">{pillar.desc}</p>

                                <div className="pt-6 border-t border-slate-100 mt-auto">
                                    <p className="text-4xl font-black text-slate-900 mb-1">{pillar.stat}</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{pillar.statDesc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Artisan Highlight */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute inset-0 senufo-pattern opacity-5"></div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Award className="w-12 h-12 text-primary mb-6" />
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Zero Commissions for Local Creators.</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Most travel platforms take up to 30% from local operators. We charge 0% commission to our local artisan and guide partners.
                                <br /><br />
                                Our revenue comes from our premium AI planning services and enterprise partnerships, allowing the local economy to thrive unhindered.
                            </p>
                            <ul className="space-y-4 font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-black">✓</span>
                                    Direct payouts via secure mobile money (Wave/Orange).
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-black">✓</span>
                                    Free digital storefront setup for artisans.
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] rounded-[3rem] overflow-hidden"
                        >
                            <img src="/images/destinations/korhogo.png" alt="Artisan impact" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Impact Story</p>
                                <p className="font-medium text-white italic">"Before SmartTrip, we relied on rare pass-by tourists. Now, travelers book our workshops weeks in advance, allowing us to hire apprentices."</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
