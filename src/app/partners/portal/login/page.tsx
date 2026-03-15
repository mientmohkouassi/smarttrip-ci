"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Building2, ShieldCheck } from "lucide-react";

export default function PartnerLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        setIsLoading(false);

        if (result?.error) {
            setError("Invalid partner credentials. Please check your access details.");
        } else {
            router.push("/partners/portal/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 flex-col justify-between p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/destinations/abidjan.png')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-primary/20" />

                {/* Content */}
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                        <span className="text-white font-black text-2xl uppercase tracking-tight">SmartTrip <span className="text-primary">CI</span></span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-primary font-black uppercase tracking-widest text-xs">Partner Portal</span>
                    </div>
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        Manage your <span className="text-primary">business</span> with SmartTrip
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10">
                        Access your dashboard, track bookings, monitor revenue, and grow your business across Côte d&apos;Ivoire.
                    </p>
                    <div className="space-y-4">
                        {[
                            "Real-time booking analytics",
                            "Instant payout management",
                            "Guest communication tools",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-slate-300 text-sm font-semibold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-slate-600 text-xs relative z-10">Not a partner yet? <Link href="/partners" className="text-primary hover:underline font-bold">Apply to join →</Link></p>
            </div>

            {/* Right panel — login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                            <span className="text-slate-900 font-black text-xl uppercase">SmartTrip <span className="text-primary">CI</span></span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                            <Building2 className="w-3.5 h-3.5" /> Partner Access
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">Partner Sign In</h2>
                        <p className="text-slate-500 mt-2 text-sm">Enter your partner credentials to access the portal.</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Partner Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="partner@yourcompany.com"
                                    className="w-full border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 rounded-2xl pl-11 pr-4 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Your secure password"
                                    className="w-full border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 rounded-2xl pl-11 pr-12 py-4 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
                            ) : (
                                "Access Partner Portal"
                            )}
                        </motion.button>
                    </form>


                    <div className="mt-6 text-center space-y-2">
                        <p className="text-slate-400 text-sm">
                            Regular user?{" "}
                            <Link href="/auth/signin" className="text-primary font-bold hover:underline">Sign in here</Link>
                        </p>
                        <Link href="/" className="text-slate-400 text-xs hover:text-slate-600 transition-colors block">← Back to home</Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
