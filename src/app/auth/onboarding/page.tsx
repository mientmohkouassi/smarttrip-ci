"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Check, ArrowRight, MapPin, Compass, Mountain, Building2, Palette, Waves, Leaf } from "lucide-react";
import Link from "next/link";

const INTERESTS = [
    { id: "Beach", icon: <Waves className="w-5 h-5" />, label: "Beach & Coast", color: "from-blue-500 to-cyan-400" },
    { id: "Nature", icon: <Mountain className="w-5 h-5" />, label: "Mountains & Nature", color: "from-green-500 to-emerald-400" },
    { id: "Culture", icon: <Palette className="w-5 h-5" />, label: "Culture & Arts", color: "from-purple-500 to-violet-400" },
    { id: "History", icon: <Compass className="w-5 h-5" />, label: "History & Heritage", color: "from-amber-500 to-orange-400" },
    { id: "Urban", icon: <Building2 className="w-5 h-5" />, label: "City & Urban Life", color: "from-slate-500 to-gray-400" },
    { id: "Artisan", icon: <Leaf className="w-5 h-5" />, label: "Artisan & Craft", color: "from-rose-500 to-pink-400" },
];

type Phase = "welcome" | "interests" | "ready";

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [phase, setPhase] = useState<Phase>("welcome");
    const [selected, setSelected] = useState<string[]>([]);

    const user = session?.user ? {
        name: session.user.name ?? "Traveler",
        email: session.user.email ?? "",
        role: (session.user as any).role ?? "user",
    } : null;

    if (status === "loading") return null;
    if (!user) {
        router.replace("/auth/signin");
        return null;
    }

    const toggleInterest = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleFinish = () => {
        // Interests can be saved to DB via a server action in a future iteration.
        // For now we just proceed to the next phase.
        setPhase("ready");
    };

    const isPartner = user.role === "partner";
    const destination = isPartner ? "/partners/portal/dashboard" : "/dashboard";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/6 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "4s" }} />
            </div>

            <div className="w-full max-w-2xl relative">
                <AnimatePresence mode="wait">

                    {/* ── PHASE 1: Welcome ───────────────────────────────── */}
                    {phase === "welcome" && (
                        <motion.div key="welcome"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center"
                        >
                            {/* Animated avatar */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30"
                            >
                                <span className="text-6xl">
                                    {isPartner ? "🤝" : "🌍"}
                                </span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                    <MapPin className="w-3.5 h-3.5" /> Welcome to SmartTrip CI
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter">
                                    Hello, <span className="text-primary italic">{user.name.split(" ")[0]}</span>! 👋
                                </h1>
                                <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto mb-10 leading-relaxed">
                                    {isPartner
                                        ? "You're joining as a partner. Let's personalize your experience before you start managing listings."
                                        : "You're now part of the SmartTrip family. Let's personalize your journey through Côte d'Ivoire."}
                                </p>

                                {/* Account summary card */}
                                <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-6 mb-8 text-left max-w-sm mx-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl">
                                            {user.name[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-black text-white">{user.name}</p>
                                            <p className="text-slate-500 text-sm">{user.email}</p>
                                        </div>
                                        <span className={`ml-auto text-[10px] font-black px-3 py-1 rounded-full uppercase ${isPartner ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                            : "bg-primary/20 text-primary border border-primary/30"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => setPhase("interests")}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:bg-orange-500 transition-all inline-flex items-center gap-3"
                                >
                                    Let&apos;s set up your profile <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── PHASE 2: Interests ─────────────────────────────── */}
                    {phase === "interests" && (
                        <motion.div key="interests"
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -80 }}
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-4xl font-black text-white mb-3">
                                    What excites you?
                                </h2>
                                <p className="text-slate-400 text-lg">
                                    Select your travel interests — we&apos;ll tailor your recommendations.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                                {INTERESTS.map((interest, i) => {
                                    const isOn = selected.includes(interest.id);
                                    return (
                                        <motion.button
                                            key={interest.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            onClick={() => toggleInterest(interest.id)}
                                            className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-300 overflow-hidden group ${isOn
                                                ? "border-primary/60 bg-primary/10 shadow-xl shadow-primary/20"
                                                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                                                }`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 transition-opacity duration-300 ${isOn ? "opacity-10" : "group-hover:opacity-5"}`} />
                                            <div className={`mb-3 transition-colors ${isOn ? "text-primary" : "text-slate-500"}`}>
                                                {interest.icon}
                                            </div>
                                            <p className={`font-black text-sm leading-tight ${isOn ? "text-white" : "text-slate-400"}`}>
                                                {interest.label}
                                            </p>
                                            {isOn && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                                                    <Check className="w-3.5 h-3.5 text-white" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-slate-500 text-sm">
                                    {selected.length} selected
                                    {selected.length === 0 && " — you can skip this"}
                                </p>
                                <motion.button
                                    onClick={handleFinish}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:bg-orange-500 transition-all flex items-center gap-2"
                                >
                                    {selected.length === 0 ? "Skip for now" : "Save Interests"} <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* ── PHASE 3: Ready ─────────────────────────────────── */}
                    {phase === "ready" && (
                        <motion.div key="ready"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                className="w-32 h-32 rounded-full bg-emerald-500/20 border-4 border-emerald-500/50 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20"
                            >
                                <Check className="w-14 h-14 text-emerald-400" />
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">
                                    You&apos;re all set! 🎉
                                </h2>
                                <p className="text-slate-400 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                                    {isPartner
                                        ? "Your partner account is ready. Start listing your services and reach thousands of travelers."
                                        : "Your account is ready. Start exploring the most beautiful destinations in Côte d'Ivoire."}
                                </p>

                                <Link href={destination}>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:bg-orange-500 transition-all inline-flex items-center gap-3"
                                    >
                                        {isPartner ? "Go to Partner Portal" : "Start Exploring"} <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
