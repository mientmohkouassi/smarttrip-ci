"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Compass, UserCircle, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        category: "General",
        icon: <Compass className="w-5 h-5" />,
        items: [
            { q: "What is SmartTrip CI?", a: "SmartTrip CI is the premier digital gateway to Côte d'Ivoire. We provide a luxury platform for discovering hidden gems, booking high-end accommodations, and accessing elite local guides." },
            { q: "Is it safe to travel in Côte d'Ivoire?", a: "Yes, Côte d'Ivoire is an increasingly popular and safe destination. We provide a dedicated 'Safety' section with real-time updates and emergency contacts." }
        ]
    },
    {
        category: "Booking & Payments",
        icon: <CreditCard className="w-5 h-5" />,
        items: [
            { q: "How do I pay for my booking?", a: "We support major credit cards and local digital payment methods including Wave and Orange Money for your convenience." },
            { q: "Can I cancel my reservation?", a: "Cancellations are managed through your profile. Most bookings are eligible for a partial refund if cancelled at least 7 days prior to travel." }
        ]
    },
    {
        category: "Partner Program",
        icon: <UserCircle className="w-5 h-5" />,
        items: [
            { q: "How do I become a partner?", a: "Agencies, hotels, and transportation providers can apply via our 'Partners' section. Once vetted, you'll gain access to our elite distribution network." },
            { q: "What are the commission rates?", a: "Commission structures vary by partner tier (Standard, Gold, Premium). Detailed rates are provided during the onboarding process." }
        ]
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<string | null>("General-0");

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main className="py-20 px-6 lg:px-20 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6"
                    >
                        <HelpCircle className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">Frequently Asked Questions</h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">Everything you need to know about exploring Côte d'Ivoire with SmartTrip CI.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1 space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Categories</p>
                        {faqs.map((category) => (
                            <button
                                key={category.category}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-white hover:text-primary transition-all shadow-sm border border-transparent hover:border-slate-100"
                            >
                                {category.icon}
                                {category.category}
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        {faqs.map((category) => (
                            <div key={category.category} className="mb-10">
                                <h2 className="text-xl font-black text-slate-900 mb-6">{category.category}</h2>
                                <div className="space-y-4">
                                    {category.items.map((item, idx) => {
                                        const id = `${category.category}-${idx}`;
                                        const isOpen = openIndex === id;
                                        return (
                                            <motion.div
                                                key={id}
                                                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => setOpenIndex(isOpen ? null : id)}
                                                    className="w-full text-left px-6 py-5 flex justify-between items-center group"
                                                >
                                                    <span className={`font-bold transition-colors ${isOpen ? 'text-primary' : 'text-slate-700'}`}>
                                                        {item.q}
                                                    </span>
                                                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-slate-600'}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: "auto" }}
                                                            exit={{ height: 0 }}
                                                            className="px-6 pb-6 text-slate-500 font-medium leading-relaxed text-sm"
                                                        >
                                                            {item.a}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl opacity-50 rounded-full"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
                        <p className="text-slate-400 font-medium mb-8">Our concierge team is available 24/7 to guide you.</p>
                        <Link href="/pricing/bespoke">
                            <button className="bg-primary hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary/20">
                                Talk to a Specialist
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
