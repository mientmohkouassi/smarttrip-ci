'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { LogOut, LayoutDashboard, ChevronDown, User, Briefcase, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser, signOutLocal, type AuthUser } from '@/lib/auth-client';

export default function Header() {
    const { data: session } = useSession();
    const [localUser, setLocalUser] = useState<AuthUser | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    // Read localStorage user on mount + whenever storage changes
    useEffect(() => {
        const read = () => setLocalUser(getCurrentUser());
        read();
        window.addEventListener("storage", read);
        // Poll every 2s for in-tab changes (localStorage doesn't fire storage events in the same tab)
        const interval = setInterval(read, 2000);
        return () => {
            window.removeEventListener("storage", read);
            clearInterval(interval);
        };
    }, []);

    // Merged user: prefer localStorage user (more complete), fall back to NextAuth session
    const user = localUser ?? (session?.user ? {
        name: session.user.name ?? "User",
        email: session.user.email ?? "",
        role: (session.user as { role?: string }).role ?? "user",
        avatar: session.user.image ?? null,
    } : null);

    const isPartner = user?.role === "partner";

    const handleSignOut = async () => {
        signOutLocal();
        setLocalUser(null);
        setShowMenu(false);
        await nextAuthSignOut({ callbackUrl: "/" });
    };

    const navItems = [
        { key: 'explore', label: 'Explore', href: '/destinations' },
        { key: 'about', label: 'About', href: '/about' },
        { key: 'pricing', label: 'Pricing', href: '/pricing' },
        { key: 'partners', label: 'Partners', href: '/partners' },
        { key: 'testimonials', label: 'Testimonials', href: '/testimonials' },
        { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 px-6 py-4 lg:px-20 bg-savannah/80 backdrop-blur-md sticky top-0 z-50"
        >
            <div className="flex items-center gap-4">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="text-primary">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                </motion.div>
                <Link href="/" className="text-slate-900 font-bold text-xl tracking-tight uppercase">
                    SmartTrip <span className="text-primary">CI</span>
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-center gap-6">
                {navItems.map((item) => (
                    <motion.div key={item.key} whileHover={{ y: -2 }}>
                        <Link
                            className="text-slate-700 hover:text-primary text-xs lg:text-sm font-bold tracking-tight transition-colors uppercase"
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex items-center gap-2 bg-white/60 hover:bg-white/90 border border-slate-200 rounded-full px-3 py-1.5 transition-all"
                        >
                            {/* Avatar */}
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black uppercase ${isPartner ? "bg-amber-500" : "bg-primary"}`}>
                                {user.name?.[0] || "U"}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-slate-800 text-xs font-black leading-none max-w-[90px] truncate">{user.name?.split(' ')[0]}</p>
                                <p className={`text-[9px] font-black uppercase tracking-wider leading-none mt-0.5 ${isPartner ? "text-amber-500" : "text-primary"}`}>
                                    {user.role}
                                </p>
                            </div>
                            <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
                                >
                                    {/* User info */}
                                    <div className="px-3 py-3 mb-1">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                                        <p className="text-sm font-black text-slate-900 mt-0.5 truncate">{user.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                    </div>
                                    <div className="border-t border-slate-50 pt-1 space-y-0.5">
                                        {/* Partner portal */}
                                        {isPartner && (
                                            <Link href="/partners/portal/dashboard"
                                                onClick={() => setShowMenu(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 rounded-xl text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors">
                                                <Briefcase className="w-4 h-4 text-amber-500" /> Partner Portal
                                            </Link>
                                        )}
                                        {/* My dashboard */}
                                        <Link href="/dashboard"
                                            onClick={() => setShowMenu(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary/5 rounded-xl text-sm font-bold text-slate-700 hover:text-primary transition-colors">
                                            <LayoutDashboard className="w-4 h-4 text-primary" /> My Dashboard
                                        </Link>
                                        {/* Destinations */}
                                        <Link href="/destinations"
                                            onClick={() => setShowMenu(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                                            <MapPin className="w-4 h-4 text-slate-400" /> Explore
                                        </Link>
                                        {/* Profile */}
                                        <Link href="/auth/profile"
                                            onClick={() => setShowMenu(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                                            <User className="w-4 h-4 text-slate-400" /> My Profile
                                        </Link>
                                        {/* Sign out */}
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-xl text-sm font-bold text-red-500 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/auth/signin" className="text-slate-700 hover:text-primary font-bold text-sm transition-colors">
                            Sign In
                        </Link>
                        <Link href="/auth/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg transition-all shadow-md shadow-primary/20"
                            >
                                Sign Up
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.header>
    );
}
