"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Building2, Code2, Users2, Send } from "lucide-react";
import { useState } from "react";

export default function EnterprisePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
            <Header />
            <main className="flex-1 py-32 px-6 lg:px-20 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Benefits Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-black uppercase tracking-widest text-xs mb-6">
                                <Building2 className="w-4 h-4" /> B2B & Enterprise
                            </span>
                            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                                Scale Your <span className="text-primary italic">Operations</span> in West Africa
                            </h1>
                            <p className="text-xl text-slate-500 font-medium">
                                SmartTrip CI offers dedicated infrastructure for film crews, corporate retreats, and travel agencies seeking bulk access to vetted Ivoirian logistics.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: <Users2 className="w-6 h-6 text-indigo-500" />, title: "Group Logistics Hub", desc: "Manage bulk hotel bookings, specialized private transport fleets, and multi-trip itineraries from a unified dashboard." },
                                { icon: <Code2 className="w-6 h-6 text-emerald-500" />, title: "Direct API Access", desc: "Integrate our AI recommendation engine and artisan database directly into your own corporate travel platform." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <div className="shrink-0 size-14 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-10 lg:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-20 px-6">
                                <div className="size-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">Request Sent Successfully</h3>
                                <p className="text-slate-500 font-medium mb-8">
                                    Our enterprise sales team will review your requirements and reach out within 24 hours to schedule a consultation.
                                </p>
                                <button onClick={() => setIsSubmitted(false)} className="text-primary font-bold hover:underline">Submit another request</button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Contact Sales</h2>
                                <p className="text-slate-500 mb-8 font-medium">Fill out the form below and we'll connect you with an enterprise specialist.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">First Name</label>
                                            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Last Name</label>
                                            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Work Email</label>
                                        <input required type="email" placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Company Name</label>
                                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Estimated Group Size</label>
                                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none">
                                            <option>10 - 50 people</option>
                                            <option>51 - 200 people</option>
                                            <option>200+ people</option>
                                            <option>Just API Access</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Project Details</label>
                                        <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
                                        Request Consultation
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
