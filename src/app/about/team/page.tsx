"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";

export default function TeamPage() {
    const team = [
        {
            name: "Amadou Touré",
            role: "Founder & CEO",
            bio: "Former tech executive passionate about reconnecting the diaspora with their roots through authentic, AI-curated travel experiences.",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&auto=format&fit=crop"
        },
        {
            name: "Fatou Diaby",
            role: "Head of Cultural Partnerships",
            bio: "Anthropologist and lifelong Ivoirian. Fatou ensures every tour honors the local traditions and directly benefits artisan communities.",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1b40ce?q=80&w=800&auto=format&fit=crop"
        },
        {
            name: "Jean-Marc Koffi",
            role: "Chief Technology Officer",
            bio: "AI researcher focusing on hyper-localized recommendation engines. Jean-Marc built the core neural network powering SmartTrip CI.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
        },
        {
            name: "Sarah Lawson",
            role: "Lead Travel Designer",
            bio: "With 15 years in luxury hospitality, Sarah crafts the physical logistics of your journey to ensure world-class comfort in untouched locales.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero section */}
                <section className="pt-32 pb-20 px-6 lg:px-20 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest"
                    >
                        <Users className="w-4 h-4" />
                        Built by Locals, for the World
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Meet the <span className="text-primary italic">Visionaries</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
                    >
                        We are a collective of technologists, cultural anthropologists, and hospitality experts completely obsessed with Côte d'Ivoire.
                    </motion.p>
                </section>

                {/* Team Grid */}
                <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex flex-col sm:flex-row gap-8 items-start bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 hover:border-primary/20 transition-colors"
                            >
                                <div className="shrink-0 w-full sm:w-48 h-64 sm:h-48 relative rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-primary/20 transition-shadow">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h3>
                                    <p className="text-primary font-bold text-sm tracking-wide uppercase mb-4">{member.role}</p>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                        {member.bio}
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-slate-900 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Want to join the team?</h2>
                        <p className="text-slate-400 text-lg mb-10 font-medium">We are always searching for exceptional talent to help build the future of localized African travel.</p>
                        <a href="/about/careers" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-full font-black hover:bg-orange-600 transition-colors shadow-xl shadow-primary/25 cursor-pointer">
                            View Open Roles
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
