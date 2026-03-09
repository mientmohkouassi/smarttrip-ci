"use client";

import { motion } from "framer-motion";
import { Sidebar, PortalNav } from "../components";
import { CreditCard, TrendingUp, Users, Wallet, Download, ExternalLink } from "lucide-react";

export default function PartnerDashboard() {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <PortalNav />
                <main className="p-12">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Welcome Back</p>
                            <h1 className="text-4xl font-black text-slate-900">Partner Intelligence Hub</h1>
                        </div>
                        <button className="bg-white flex items-center gap-3 px-6 py-3 rounded-2xl border border-slate-200 shadow-sm font-black text-sm hover:shadow-md transition-all">
                            <Download className="w-4 h-4" /> Export June Report
                        </button>
                    </div>

                    {/* Quick Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Active Bookings", val: "1,284", icon: <Users className="text-blue-500" />, change: "+12%" },
                            { label: "Total Revenue", val: "4.2M CFA", icon: <TrendingUp className="text-emerald-500" />, change: "+8.4%" },
                            { label: "Pending Payout", val: "850k CFA", icon: <Wallet className="text-orange-500" />, change: "Ready" },
                            { label: "Avg. Rating", val: "4.9/5", icon: <CreditCard className="text-purple-500" />, change: "+0.2" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
                            >
                                <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                                    {stat.icon}
                                </div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Chart Area */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-2xl font-black text-slate-900">Revenue Velocity</h3>
                                <div className="flex gap-2">
                                    <span className="text-[10px] font-black bg-slate-900 text-white px-4 py-1.5 rounded-full">Monthly</span>
                                    <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-4 py-1.5 rounded-full">Quarterly</span>
                                </div>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-4">
                                {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 100].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            className="w-full bg-primary/20 rounded-t-xl group-hover:bg-primary transition-colors cursor-pointer relative"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {(h * 10).toLocaleString()}k
                                            </div>
                                        </motion.div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payout Management */}
                        <div className="bg-primary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary/30 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-48 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                            <h3 className="text-2xl font-black mb-8 relative z-10">Instant Payout</h3>
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-8 relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Available Balance</p>
                                <p className="text-4xl font-black">850,420 <span className="text-xs">CFA</span></p>
                            </div>
                            <div className="space-y-4 mb-10 relative z-10">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="opacity-60">Payout Method</span>
                                    <span className="font-black flex items-center gap-1">Wave Money <ExternalLink className="w-3 h-3" /></span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="opacity-60">Processing Fee</span>
                                    <span className="font-black">0.0% (Promo)</span>
                                </div>
                            </div>
                            <button className="mt-auto w-full bg-white text-primary py-5 rounded-2xl font-black shadow-xl hover:scale-[1.02] transition-transform">
                                Transfer Funds Now
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
