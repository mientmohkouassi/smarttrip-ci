"use client";

import { motion } from "framer-motion";
import { Sidebar, PortalNav } from "../components";
import { LifeBuoy, BookOpen, MessageSquare, PhoneCall, ChevronDown } from "lucide-react";

export default function SupportDashboard() {
    return (
        <div className="flex bg-slate-50 min-h-screen font-poppins">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <PortalNav />
                <main className="flex-1 overflow-y-auto p-12">
                    <div className="flex justify-between items-end mb-12">
                        <div className="max-w-xl">
                            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Partner Success</p>
                            <h1 className="text-4xl font-black text-slate-900 mb-4">How can we help you?</h1>
                            <p className="text-slate-500 font-medium">Get instant answers from our knowledge base or contact the elite partner support team directly.</p>
                        </div>
                        <button className="bg-slate-900 text-white flex items-center gap-2 px-6 py-4 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-colors">
                            <MessageSquare className="w-5 h-5" /> Open a Ticket
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            { title: "API Documentation", icon: <BookOpen className="text-blue-500 w-8 h-8" />, desc: "Integrate our booking engine directly into your system." },
                            { title: "Live Chat Support", icon: <MessageSquare className="text-emerald-500 w-8 h-8" />, desc: "Chat instantly with your dedicated partner manager." },
                            { title: "Priority Hotline", icon: <PhoneCall className="text-orange-500 w-8 h-8" />, desc: "Call us 24/7 for urgent booking modifications." }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                            >
                                <div className="size-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{card.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
                        <div className="p-12 lg:w-1/2 bg-slate-900 text-white relative">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                            </div>
                            <div className="relative z-10">
                                <LifeBuoy className="w-12 h-12 text-primary mb-8" />
                                <h2 className="text-3xl font-black mb-6">Send us a message</h2>
                                <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                                    Complex itinerary requests? API token issues? Fill out the form below and your dedicated account manager will respond within 2 hours.
                                </p>

                                <form className="space-y-6">
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Subject</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors appearance-none outline-none">
                                            <option className="text-slate-900">Technical Issue (API/Integrations)</option>
                                            <option className="text-slate-900">Billing & Payouts</option>
                                            <option className="text-slate-900">Booking Modification</option>
                                            <option className="text-slate-900">General Inquiry</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">Message</label>
                                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Describe your issue passing booking IDs if relevant..."></textarea>
                                    </div>
                                    <button type="submit" className="bg-primary text-white font-black px-8 py-4 rounded-2xl w-full hover:bg-orange-600 transition-colors">
                                        Submit Ticket
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="p-12 lg:w-1/2">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {[
                                    { q: "When do you process Wave payouts?", a: "Payouts are automated and processed instantly on the 15th and 30th of every month. Manual withdrawals take up to 24 hours." },
                                    { q: "How do I upgrade from Gold to Premium?", a: "Premium upgrades require sustaining a 4.8+ rating over 50 bookings. Contact your account manager for eligibility review." },
                                    { q: "Are booking modifications free?", a: "Yes, modifications made >72 hours before check-in do not incur system fees. Local provider fees may still apply." },
                                    { q: "Where can I find API Sandbox credentials?", a: "In the Developer Settings found in the portal dashboard footer. Keys reset every 90 days." }
                                ].map((faq, i) => (
                                    <div key={i} className="border border-slate-100 rounded-2xl p-6 hover:border-slate-300 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-slate-900">{faq.q}</h4>
                                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
