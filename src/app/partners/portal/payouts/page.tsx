"use client";

import { motion } from "framer-motion";
import { Sidebar, PortalNav } from "../components";
import { Wallet, History, Download, CreditCard, AlertCircle, CheckCircle2, Building2 } from "lucide-react";

export default function PayoutsDashboard() {
    return (
        <div className="flex bg-slate-50 min-h-screen font-poppins">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <PortalNav />
                <main className="flex-1 overflow-y-auto p-12">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-primary font-black uppercase tracking-widest text-xs mb-2">Financial Hub</p>
                            <h1 className="text-4xl font-black text-slate-900">Payouts & Billing</h1>
                        </div>
                        <button className="bg-primary text-white flex items-center gap-2 px-6 py-3 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors">
                            <Wallet className="w-5 h-5" /> Withdraw Funds
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Current Balance */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 size-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <p className="text-white/60 font-black uppercase tracking-widest text-xs mb-4">Available for Payout</p>
                                <h2 className="text-5xl font-black mb-8 border-b border-white/10 pb-8 tracking-tighter">850,420 <span className="text-xl font-medium text-white/40">CFA</span></h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60 font-medium">Pending Clearance</span>
                                        <span className="font-bold">124,000 CFA</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60 font-medium">Next Auto-Payout</span>
                                        <span className="font-bold">15th of Month</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Linked Accounts */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Linked Accounts</h3>
                                    <p className="text-slate-500 font-medium text-sm mt-1">Manage where your funds are deposited.</p>
                                </div>
                                <button className="text-primary font-black text-sm px-4 py-2 hover:bg-primary/5 rounded-xl transition-colors">
                                    + Add New
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                <div className="border-2 border-primary bg-primary/5 rounded-2xl p-6 flex items-start gap-4 relative">
                                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black uppercase px-2 py-1 rounded-md">Primary</div>
                                    <div className="bg-white p-3 rounded-xl shadow-sm">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/WaveMoney.png" alt="Wave" className="w-8 h-8 object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900">Wave Money</h4>
                                        <p className="text-slate-500 text-sm font-medium mb-3">•••• 4589</p>
                                        <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                                            <CheckCircle2 className="w-4 h-4" /> Verified
                                        </span>
                                    </div>
                                </div>

                                <div className="border border-slate-200 hover:border-slate-300 rounded-2xl p-6 flex items-start gap-4 transition-colors">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <Building2 className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900">Ecobank CI</h4>
                                        <p className="text-slate-500 text-sm font-medium mb-3">•••• 1102</p>
                                        <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                            <AlertCircle className="w-4 h-4" /> Action Required
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-50 p-3 rounded-2xl text-slate-600">
                                    <History className="w-6 h-6" />
                                </span>
                                <h3 className="text-2xl font-black text-slate-900">Transaction History</h3>
                            </div>
                            <button className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
                                <Download className="w-5 h-5" /> Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400">Date & Time</th>
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400">Type</th>
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400">Amount</th>
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="py-5 px-10 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: "TXN-094-A", date: "Today, 14:32", type: "Booking Commission", amount: "+ 45,000 CFA", status: "Completed", statusColor: "text-emerald-500 bg-emerald-50" },
                                        { id: "PAY-112-Q", date: "June 15, 08:00", type: "Wave Payout", amount: "- 850,000 CFA", status: "Processing", statusColor: "text-amber-500 bg-amber-50" },
                                        { id: "TXN-093-B", date: "June 14, 19:41", type: "Booking Commission", amount: "+ 12,500 CFA", status: "Completed", statusColor: "text-emerald-500 bg-emerald-50" },
                                        { id: "TXN-092-X", date: "June 12, 10:15", type: "Booking Commission", amount: "+ 110,000 CFA", status: "Completed", statusColor: "text-emerald-500 bg-emerald-50" },
                                    ].map((txn, i) => (
                                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                            <td className="py-5 px-10 font-bold text-slate-600">{txn.id}</td>
                                            <td className="py-5 px-10 text-slate-500 font-medium">{txn.date}</td>
                                            <td className="py-5 px-10 text-slate-900 font-bold">{txn.type}</td>
                                            <td className={`py-5 px-10 font-black ${txn.amount.startsWith('-') ? 'text-slate-900' : 'text-emerald-500'}`}>{txn.amount}</td>
                                            <td className="py-5 px-10">
                                                <span className={`px-3 py-1.5 rounded-lg text-xs font-black ${txn.statusColor}`}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-10 text-right">
                                                <button className="p-2 text-slate-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                                                    <Download className="w-5 h-5 inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
