"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Scaling, Gavel, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main className="py-20 px-6 lg:px-20 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-12 lg:p-16 shadow-xl border border-slate-100"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                            <Gavel className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 leading-none">Terms of Service</h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Last Updated: June 2024</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none font-medium text-slate-600">
                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary" /> 1. Acceptance of Terms
                            </h2>
                            <p className="leading-relaxed">
                                By accessing SmartTrip CI, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <Scaling className="w-6 h-6 text-primary" /> 2. Booking & Payments
                            </h2>
                            <p className="leading-relaxed">
                                All bookings are subject to availability. Prices are listed in CFA and include applicable local taxes. Full payment is required to confirm high-demand bookings (e.g., peak season in Assinie).
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-primary" /> 3. Cancellation Policy
                            </h2>
                            <p className="leading-relaxed">
                                Cancellations made more than 7 days prior to travel are eligible for a 90% refund. Cancellations made within 48 hours of travel are non-refundable unless specified otherwise by the specific service provider (hotel/airline).
                            </p>
                        </section>

                        <section className="pt-8 border-t border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Liability</h2>
                            <p className="leading-relaxed mb-8">
                                SmartTrip CI acts as an intermediary between travelers and service providers. While we vet all partners for quality, we are not liable for services rendered by third parties. We strongly recommend travel insurance for all journeys.
                            </p>
                            <div className="bg-slate-900 text-white p-8 rounded-3xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full"></div>
                                <p className="relative z-10 text-sm italic opacity-80">
                                    "Transparency is the cornerstone of trust. These terms ensure that every interaction with SmartTrip CI is fair, clear, and focused on your adventure."
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
