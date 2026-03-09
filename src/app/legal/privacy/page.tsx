"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
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
                            <Shield className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 leading-none">Privacy Policy</h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Last Updated: June 2024</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-primary" /> 1. Data Collection
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                At SmartTrip CI, we collect information that helps us provide a premium, personalized travel experience. This includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-600 font-medium">
                                <li>Personal identification (Name, email address, phone number)</li>
                                <li>Travel preferences and booking history</li>
                                <li>Payment information (processed securely through certified partners like Wave)</li>
                                <li>Device information and IP addresses for security and analytics</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <Lock className="w-6 h-6 text-primary" /> 2. Information Security
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                Your data is protected by industry-standard encryption. We implement strict access controls to ensure that only authorized personnel can view your personal information. We do not sell your data to third parties.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <FileText className="w-6 h-6 text-primary" /> 3. Cookies & Tracking
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-medium">
                                We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage your cookie settings through your browser at any time.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-slate-100">
                            <h2 className="text-2xl font-black text-slate-900 mb-4">4. Your Rights</h2>
                            <p className="text-slate-600 leading-relaxed font-medium mb-8">
                                Under Ivoirian and international data protection laws, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact our privacy team at privacy@smarttrip.ci.
                            </p>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 italic text-slate-500 text-sm">
                                "Our commitment to your privacy is as deep as our passion for Ivoirian landscapes. Every traveler deserves a safe and confidential experience."
                            </div>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
