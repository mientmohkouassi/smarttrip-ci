"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Star, CreditCard, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PremiumPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleUpgrade = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate network request
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
            <Header />
            <main className="flex-1 py-32 px-6 lg:px-20 max-w-7xl mx-auto w-full">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center max-w-2xl mx-auto mt-20"
                    >
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Welcome to Premium!</h2>
                        <p className="text-slate-500 text-lg mb-8">
                            Your account has been successfully upgraded to Savannah Elite. You now have exclusive access to a dedicated VIP concierge and private logistics globally.
                        </p>
                        <Link href="/explore/all" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
                            Start Planning
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Information Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-10"
                        >
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black uppercase tracking-widest text-xs mb-6">
                                    Account Upgrade
                                </span>
                                <h1 className="text-5xl font-black text-slate-900 leading-tight mb-6">
                                    Unlock the Ultimate <br /><span className="text-primary italic">Travel Experience.</span>
                                </h1>
                                <p className="text-xl text-slate-500 font-medium">
                                    Upgrade to Savannah Elite to let our dedicated VIP concierges and private logistics teams handle every magnificent detail of your journey.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6">
                                <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">What's Included</h3>
                                {[
                                    { icon: <Star className="w-5 h-5 text-yellow-500" />, title: "Dedicated VIP Concierge", desc: "A personal travel designer on call 24/7." },
                                    { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, title: "Anthropologist-led Tours", desc: "Deep cultural immersion with vetted local experts." },
                                    { icon: <CreditCard className="w-5 h-5 text-blue-500" />, title: "Private Aviation Access", desc: "Priority booking for helicopters and charters." }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1">{feature.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{feature.title}</h4>
                                            <p className="text-slate-500 text-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payment Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900 text-white p-10 lg:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-2">Checkout</h2>
                                <p className="text-slate-400 mb-8">Savannah Elite • 450,000 CFA / Year</p>

                                <form onSubmit={handleUpgrade} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">Cardholder Name</label>
                                            <input required type="text" placeholder="Amadou Touré" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">Card Number</label>
                                            <div className="relative">
                                                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors" />
                                                <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">Expiry</label>
                                                <input required type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-widest">CVC</label>
                                                <input required type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center mb-6 text-lg">
                                            <span className="font-medium text-slate-300">Total</span>
                                            <span className="font-black text-2xl px-2">450,000 CFA</span>
                                        </div>
                                        <button
                                            disabled={isProcessing}
                                            type="submit"
                                            className="w-full bg-primary hover:bg-orange-600 text-white font-black py-5 rounded-2xl text-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 flex justify-center"
                                        >
                                            {isProcessing ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                "Pay 450,000 CFA"
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-500 mt-4 font-medium flex items-center justify-center gap-1">
                                            <ShieldCheck className="w-4 h-4" /> Secure encrypted payment
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
