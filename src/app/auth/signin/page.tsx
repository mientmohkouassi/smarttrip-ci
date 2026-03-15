"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

function SignInContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email: form.email.toLowerCase().trim(),
            password: form.password,
            redirect: false,
        });

        setIsLoading(false);

        if (result?.error) {
            // Generic message to avoid user enumeration (OWASP A07)
            setError("Invalid email or password. Please try again.");
            return;
        }

        router.push(callbackUrl);
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Bg glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                        <span className="text-white font-black text-2xl uppercase tracking-tight">
                            SmartTrip <span className="text-primary">CI</span>
                        </span>
                    </Link>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-black text-white">Welcome back</h1>
                        <p className="text-slate-400 text-sm mt-1">Sign in to access your SmartTrip account.</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
                        {/* Email */}
                        <div>
                            <label htmlFor="signin-email" className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="signin-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-slate-600 rounded-2xl pl-11 pr-4 py-4 text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-white/[0.1] transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="signin-password" className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    id="signin-password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Your password"
                                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-slate-600 rounded-2xl pl-11 pr-12 py-4 text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-white/[0.1] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-orange-500 transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center space-y-2">
                        <p className="text-slate-500 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="text-primary font-bold hover:underline">Sign up free</Link>
                        </p>
                        <Link href="/" className="text-slate-600 text-xs hover:text-slate-400 transition-colors block">
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
