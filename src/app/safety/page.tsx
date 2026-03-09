'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Safety() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-primary py-24 px-6 lg:px-20 text-white relative overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
                        className="absolute -top-24 -right-24 size-96 border-4 border-white/5 rounded-full"
                    />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.h1
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-4xl lg:text-7xl font-black mb-6"
                        >
                            Your Safety is <br />
                            Our <span className="text-savannah italic">Commitment</span>
                        </motion.h1>
                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed"
                        >
                            Travel with confidence. From encrypted payments to 24/7 local emergency support, we&apos;ve built a security layer you can trust throughout Côte d&apos;Ivoire.
                        </motion.p>
                    </div>
                </section>

                {/* Safety Features */}
                <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: "verified_user", title: "Verified Partners", desc: "Every hotel and driver undergoes a rigorous 20-point verification check." },
                            { icon: "encrypted", title: "Secure Payments", desc: "Military-grade encryption for all transactions via Wave and major cards." },
                            { icon: "support_agent", title: "24/7 Support", desc: "Real humans in Abidjan ready to assist you in English and French." },
                            { icon: "medical_services", title: "Insurance Cover", desc: "Optional health and travel insurance integrated directly into your booking." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all group"
                            >
                                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FAQ Snippet */}
                <section className="bg-slate-50 py-24 px-6 lg:px-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-500 font-medium">Common questions about traveling in Côte d&apos;Ivoire with SmartTrip.</p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { q: "Is it safe to travel solo in CIV?", a: "Yes, particularly with our AI companion providing real-time safe-zones and local logistics support." },
                                { q: "How do I handle medical emergencies?", a: "The 'SOS' button in our app connects you directly to the nearest verified private clinic and our local liaison team." }
                            ].map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 10, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                                >
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                                    <p className="text-slate-600 text-base leading-relaxed">{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust Badge Section */}
                <motion.section
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-20 px-6 text-center"
                >
                    <div className="flex flex-wrap justify-center gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">MINISTÈRE DU TOURISME</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">COTE D&apos;IVOIRE TOURISME</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">CEPAC-CI</span>
                    </div>
                </motion.section>
            </main>

            <Footer />
        </div>
    );
}
