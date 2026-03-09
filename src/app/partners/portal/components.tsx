"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BarChart2, CreditCard, LifeBuoy, LogOut, Search, Bell, MapPin } from 'lucide-react';

export function Sidebar() {
    const menuItems = [
        { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/partners/portal/dashboard' },
        { name: 'Analytics', icon: <BarChart2 className="w-5 h-5" />, href: '/partners/portal/analytics' },
        { name: 'Payouts', icon: <CreditCard className="w-5 h-5" />, href: '/partners/portal/payouts' },
        { name: 'Support', icon: <LifeBuoy className="w-5 h-5" />, href: '/partners/portal/support' },
    ];

    return (
        <div className="w-72 bg-slate-900 h-screen sticky top-0 flex flex-col p-8 text-white">
            <div className="flex items-center gap-3 mb-16 px-2">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">map</span>
                </div>
                <h2 className="text-xl font-black tracking-tighter">SmartTrip <span className="text-primary italic">Portal</span></h2>
            </div>

            <nav className="flex-1 space-y-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/10 transition-all font-bold group"
                    >
                        <span className="text-white/40 group-hover:text-primary transition-colors">{item.icon}</span>
                        <span className="text-sm tracking-wide">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
                <Link href="/partners" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/10 text-red-400 transition-all font-bold">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Public Page</span>
                </Link>
            </div>
        </div>
    );
}

export function PortalNav() {
    return (
        <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
            <div className="bg-slate-100 px-6 py-2 rounded-2xl flex items-center gap-3 w-96 ring-1 ring-slate-200">
                <Search className="w-4 h-4 text-slate-400" />
                <input className="bg-transparent border-none focus:ring-0 text-sm font-bold placeholder:text-slate-400 w-full" placeholder="Quick search..." />
            </div>
            <div className="flex items-center gap-6">
                <button className="p-3 hover:bg-slate-100 rounded-full text-slate-400 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-black text-slate-900 leading-tight">Yamoussa Sylla</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-primary">Premium Partner</p>
                    </div>
                    <div className="size-12 rounded-2xl bg-slate-900 overflow-hidden ring-4 ring-primary/10">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSglTK7rAxTb3EOSCi1j-RzywgdMO5mwlZHR41t1yUwmA6Q4dw_-pmQbdZ0Qu8qwhg8cdEiaHAcKuquyErK78casCBt1ZCZEFa-70rkDDOiKsX1MrjzCRyBSc2tZ6Hi7Zn_ccyL3C1y8oS1CxLPfW-oi34_KjyiRrM-TiDohvaSmhl1gPDEBHtwcWz9wQK1YVb9fO0A7YSyMMgSTqbFxkMpT7OCjae-eMzQaPowGphcQ1vuBPjZFSlKV4ZdYQk11VldUN8NHyGcy4r" className="w-full h-full object-cover" alt="Profile" />
                    </div>
                </div>
            </div>
        </div>
    );
}
