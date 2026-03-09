"use client";

import { motion } from "framer-motion";
import { Sidebar, PortalNav } from "../components";
import { BarChart, Map, TrendingUp, Users, Target, Activity } from "lucide-react";

export default function AnalyticsDashboard() {
    return (
        <div className="flex bg-slate-50 min-h-screen font-poppins">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <PortalNav />
                <main className="flex-1 overflow-y-auto p-12">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Deep Insights</p>
                            <h1 className="text-4xl font-black text-slate-900">Performance Analytics</h1>
                        </div>
                        <div className="flex gap-4">
                            <select className="bg-white border text-sm font-bold border-slate-200 rounded-xl px-4 py-2 outline-none">
                                <option>Last 30 Days</option>
                                <option>This Quarter</option>
                                <option>Year to Date</option>
                            </select>
                            <button className="bg-slate-900 text-white flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black hover:bg-slate-800 transition-colors">
                                <Activity className="w-4 h-4" /> Generate Report
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { title: "Conversion Rate", value: "14.2%", trend: "+2.1%", trendColor: "text-emerald-500", icon: <Target className="w-6 h-6 text-indigo-500" /> },
                            { title: "Avg. Booking Value", value: "485k CFA", trend: "+12.5%", trendColor: "text-emerald-500", icon: <TrendingUp className="w-6 h-6 text-emerald-500" /> },
                            { title: "Bounce Rate", value: "32.4%", trend: "-4.2%", trendColor: "text-emerald-500", icon: <Users className="w-6 h-6 text-blue-500" /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6"
                            >
                                <div className="p-4 bg-slate-50 rounded-2xl">{stat.icon}</div>
                                <div>
                                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.title}</h4>
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                                        <span className={`text-xs font-black ${stat.trendColor} bg-slate-50 px-2 py-1 rounded-lg`}>{stat.trend}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Traffic Sources */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Traffic Sources</h3>
                                    <p className="text-sm font-medium text-slate-500 mt-1">Where your bookings are originating.</p>
                                </div>
                                <BarChart className="w-6 h-6 text-slate-300" />
                            </div>
                            <div className="space-y-6">
                                {[
                                    { source: "Direct App Nav", pct: 45, color: "bg-primary" },
                                    { source: "SmartTrip Search", pct: 35, color: "bg-blue-500" },
                                    { source: "Partner API Referrals", pct: 15, color: "bg-emerald-500" },
                                    { source: "External Campaigns", pct: 5, color: "bg-slate-300" }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-slate-700">{item.source}</span>
                                            <span className="text-slate-900">{item.pct}%</span>
                                        </div>
                                        <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.pct}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full rounded-full ${item.color}`}
                                            ></motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Regional Heatmap Stub */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                                <Map className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="size-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                                    <Map className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black">Regional Heatmap</h3>
                                <p className="text-slate-400 font-medium">Activate Location Services to see live geographic distribution of your guests.</p>
                                <button className="mt-4 bg-primary text-white font-black px-6 py-3 rounded-full text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                    Enable Mapping
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
