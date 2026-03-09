"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { partners } from "@/lib/data";
import { ChevronRight, Award, ShieldCheck, Zap, Store } from "lucide-react";
import Link from "next/link";

export default function Partners() {
    const premiumPartners = partners.filter(p => p.tier === 'Premium');
    const goldPartners = partners.filter(p => p.tier === 'Gold');
    const standardPartners = partners.filter(p => p.tier === 'Standard');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />

            <main>
                {/* Cinematic Hero */}
                <section className="bg-slate-900 py-32 relative overflow-hidden text-center text-white px-6">
                    <div className="absolute inset-0 opacity-20 senufo-pattern"></div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="max-w-4xl mx-auto relative z-10"
                    >
                        <div className="flex items-center justify-center gap-2 text-primary mb-6">
                            <span className="material-symbols-outlined filled text-4xl">handshake</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter">Powered By <span className="text-primary italic">Partnership</span></h1>
                        <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                            SmartTrip CI is everywhere. We've built a robust network of trusted airlines, luxury hotels, and digital masters to ensure your journey is flawless from takeoff to touchdown.
                        </p>
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <Link href="/partners/portal/dashboard" className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/30 transition-all flex items-center gap-3">
                                Join Our Network <ChevronRight className="w-5 h-5" />
                            </Link>
                            <Link href="/partners/portal/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black transition-all">
                                Partner Portal Login
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Tiered Partners Section */}
                <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">

                    {/* Premium Partners */}
                    <div className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Premium Partners</h2>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">The Excellence Collective</p>
                            </div>
                        </div>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {premiumPartners.map((partner) => (
                                <motion.div
                                    key={partner.id}
                                    variants={item}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col transition-all hover:-translate-y-2 group"
                                >
                                    <div className="h-40 w-full p-4 flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{partner.name}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">{partner.description}</p>
                                    <div className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full w-fit">
                                        Tier: Premium
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Gold & Standard Partners */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="size-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-600">
                                    <Zap className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Gold Partners</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {goldPartners.map(p => (
                                    <div key={p.id} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-6">
                                        <div className="h-28 w-full p-2 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                                            <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                                        </div>
                                        <h4 className="font-black text-slate-900">{p.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <div className="size-14 bg-emerald-400/10 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Global Standards</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {standardPartners.map(p => (
                                    <div key={p.id} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-6">
                                        <div className="h-28 w-full p-2 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                                            <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                                        </div>
                                        <h4 className="font-black text-slate-900">{p.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Boutique Expansion Section */}
                <section className="bg-slate-50 py-32 px-6 lg:px-20 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                            <div>
                                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4">
                                    <Store className="w-4 h-4" /> Boutique Collection
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-slate-900">Expanding Luxury</h2>
                                <p className="text-slate-500 font-medium max-w-lg mt-4 text-lg">
                                    We are proud to support an ever-growing list of independent boutique hotels that represent the peak of Ivoirian hospitality.
                                </p>
                            </div>
                            <Link href="/explore" className="text-primary font-black flex items-center gap-2 hover:gap-4 transition-all">
                                View All Destinations <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[
                                { name: "Villa Lepic", img: "/images/destinations/abidjan.png" },
                                { name: "Noom Hotel", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&auto=format&fit=crop" },
                                { name: "Azalaï", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop" },
                                { name: "Radisson Blu", img: "https://images.unsplash.com/photo-1590447158019-883d6d5f8bc7?q=80&w=400&auto=format&fit=crop" },
                                { name: "Tiama Hotel", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop" },
                                { name: "Palm Club", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=400&auto=format&fit=crop" }
                            ].map((boutique, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="h-24 w-full overflow-hidden">
                                        <img src={boutique.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={boutique.name} />
                                    </div>
                                    <div className="p-4 text-center">
                                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{boutique.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Strategic Partnerships Section */}
                <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="bg-primary rounded-[4rem] p-16 lg:p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(234,88,12,0.3)]">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5 rounded-l-full blur-3xl transform translate-x-1/2"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="text-white">
                                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">Solid Partnerships <br />Worldwide</h2>
                                <p className="text-xl text-white/80 font-medium mb-12">
                                    Our network is built on trust, scale, and a shared vision of excellence. We ensure that our partners have the tools they need to succeed and our travelers have the quality they deserve.
                                </p>
                                <div className="flex flex-wrap gap-8">
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-black">500+</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/60">Verified Partners</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-black">18</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/60">Regions Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-10 border border-white/20">
                                <h4 className="text-2xl font-black text-white mb-8">Integrated Systems</h4>
                                <div className="space-y-6">
                                    {[
                                        { title: "Global GDS Connectivity", desc: "Live syncing with major travel systems." },
                                        { title: "Wave Money Payouts", desc: "Instant digital settlement for local agents." },
                                        { title: "AI Capacity Forecast", desc: "Predictive booking analytics for hotel partners." }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                                            <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black">{i + 1}</div>
                                            <div>
                                                <p className="font-black text-white">{feature.title}</p>
                                                <p className="text-sm text-white/60 font-medium">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
