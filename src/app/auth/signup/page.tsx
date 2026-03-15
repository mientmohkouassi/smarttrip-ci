"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, Loader2,
    Building2, ArrowRight, ArrowLeft, Plane, Briefcase, Check
} from "lucide-react";
import { type UserRole } from "@/lib/auth-client";
import { signUpUser } from "@/lib/actions";
import { signIn } from "next-auth/react";

type Step = 1 | 2 | 3;

export default function SignUpPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [role, setRole] = useState<UserRole>("user");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        phone: "",
        businessName: "",
        businessCategory: "",
    });

    const update = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    // ── Step validation ──────────────────────────────────────────────
    const validateStep1 = () => {
        if (!form.name.trim()) return "Please enter your full name.";
        if (!form.email.trim() || !form.email.includes("@")) return "Please enter a valid email.";
        return null;
    };

    const validateStep2 = () => {
        if (form.password.length < 8) return "Password must be at least 8 characters.";
        if (!/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password))
            return "Password must contain at least one letter and one number.";
        if (form.password !== form.confirm) return "Passwords don't match.";
        return null;
    };

    const handleNext = () => {
        setError("");
        if (step === 1) {
            const err = validateStep1();
            if (err) { setError(err); return; }
            setStep(2);
        } else if (step === 2) {
            const err = validateStep2();
            if (err) { setError(err); return; }
            setStep(3);
        }
    };

    const handleBack = () => {
        setError("");
        setStep((s) => (s - 1) as Step);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        const result = await signUpUser({
            name: form.name,
            email: form.email,
            password: form.password,
            role,
            phone: form.phone,
            businessName: form.businessName,
            businessCategory: form.businessCategory,
        });

        setIsLoading(false);

        if (!result.success) {
            const msg = result.error || "Signup failed. Please try again.";
            // Route the user back to the step that corresponds to the error
            if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("account")) {
                setStep(1);
            } else if (msg.toLowerCase().includes("password") || msg.toLowerCase().includes("name")) {
                setStep(2);
            } else {
                setStep(3);
            }
            setError(msg);
            return;
        }

        // Auto sign-in
        await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        // Always go to onboarding after signup
        router.push("/auth/onboarding");
    };

    const STEPS = [
        { n: 1, label: "Your Identity" },
        { n: 2, label: "Secure It" },
        { n: 3, label: "Account Type" },
    ];

    const CATEGORIES = ["Tour Operator", "Hotel / Lodge", "Restaurant", "Transport", "Artisan / Craft", "Activity Provider", "Other"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg relative"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                        <span className="text-white font-black text-2xl uppercase tracking-tight">
                            SmartTrip <span className="text-primary">CI</span>
                        </span>
                    </Link>
                    <p className="text-slate-500 mt-2 text-sm">Join thousands of explorers</p>
                </div>

                {/* Step progress */}
                <div className="flex items-center justify-center gap-0 mb-8">
                    {STEPS.map((s, i) => (
                        <div key={s.n} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${step > s.n ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" :
                                    step === s.n ? "bg-primary text-white shadow-xl shadow-primary/40 ring-4 ring-primary/20" :
                                        "bg-white/5 text-slate-500 border border-white/10"
                                    }`}>
                                    {step > s.n ? <Check className="w-4 h-4" /> : s.n}
                                </div>
                                <span className={`text-[10px] font-black mt-1.5 uppercase tracking-wider transition-colors ${step === s.n ? "text-primary" : "text-slate-600"}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-20 h-px mx-2 mb-5 transition-all duration-700 ${step > s.n ? "bg-emerald-500/60" : "bg-white/10"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem] p-8 shadow-2xl">
                    <AnimatePresence mode="wait">
                        {/* ── STEP 1: Identity ──────────────────────────────────── */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-black text-white">Who are you?</h1>
                                    <p className="text-slate-500 text-sm mt-1">Tell us a bit about yourself</p>
                                </div>

                                <ErrorBanner error={error} />

                                <InputField
                                    icon={<User className="w-4 h-4" />}
                                    label="Full Name"
                                    type="text"
                                    placeholder="Kouamé Traoré"
                                    value={form.name}
                                    onChange={(v) => update("name", v)}
                                    autoFocus
                                />
                                <InputField
                                    icon={<Mail className="w-4 h-4" />}
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(v) => update("email", v)}
                                />
                                <InputField
                                    icon={<Phone className="w-4 h-4" />}
                                    label="Phone (optional)"
                                    type="tel"
                                    placeholder="+225 07 00 00 00 00"
                                    value={form.phone}
                                    onChange={(v) => update("phone", v)}
                                />

                                <PrimaryBtn onClick={handleNext} label="Continue" />
                            </motion.div>
                        )}

                        {/* ── STEP 2: Password ──────────────────────────────────── */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-black text-white">Secure your account</h1>
                                    <p className="text-slate-500 text-sm mt-1">Choose a strong password</p>
                                </div>

                                <ErrorBanner error={error} />

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={form.password}
                                            onChange={(e) => update("password", e.target.value)}
                                            placeholder="Min. 8 chars, include a number"
                                            autoFocus
                                            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-2xl pl-11 pr-12 py-4 text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {/* Password strength bar */}
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3, 4].map((n) => (
                                            <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-500 ${form.password.length >= n * 3 ?
                                                (form.password.length >= 10 ? "bg-emerald-500" : form.password.length >= 7 ? "bg-amber-500" : "bg-red-500")
                                                : "bg-white/10"
                                                }`} />
                                        ))}
                                    </div>
                                </div>

                                <InputField
                                    icon={<Lock className="w-4 h-4" />}
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Repeat your password"
                                    value={form.confirm}
                                    onChange={(v) => update("confirm", v)}
                                />

                                <div className="flex gap-3 pt-2">
                                    <button onClick={handleBack}
                                        className="flex-1 border border-white/10 text-slate-400 py-4 rounded-2xl font-black text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button onClick={handleNext}
                                        className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
                                        Continue <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 3: Account type ──────────────────────────────── */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-black text-white">Your account type</h1>
                                    <p className="text-slate-500 text-sm mt-1">How will you use SmartTrip CI?</p>
                                </div>

                                <ErrorBanner error={error} />

                                <div className="grid grid-cols-2 gap-4">
                                    {([
                                        { value: "user", icon: <Plane className="w-8 h-8" />, title: "Traveler", desc: "Explore & book destinations" },
                                        { value: "partner", icon: <Briefcase className="w-8 h-8" />, title: "Partner", desc: "List your services & earn" },
                                    ] as const).map((opt) => (
                                        <button key={opt.value} type="button" onClick={() => setRole(opt.value)}
                                            className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 ${role === opt.value
                                                ? "border-primary bg-primary/10 shadow-xl shadow-primary/20"
                                                : "border-white/10 bg-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <div className={`mb-4 transition-colors ${role === opt.value ? "text-primary" : "text-slate-500"}`}>{opt.icon}</div>
                                            <p className={`font-black mb-1 ${role === opt.value ? "text-white" : "text-slate-400"}`}>{opt.title}</p>
                                            <p className="text-[11px] text-slate-500 leading-snug">{opt.desc}</p>
                                            {role === opt.value && (
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    className="mt-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Partner extra fields */}
                                <AnimatePresence>
                                    {role === "partner" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                                            <InputField
                                                icon={<Building2 className="w-4 h-4" />}
                                                label="Business Name"
                                                type="text"
                                                placeholder="My Amazing Tours CI"
                                                value={form.businessName}
                                                onChange={(v) => update("businessName", v)}
                                            />
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Business Category</label>
                                                <select value={form.businessCategory} onChange={(e) => update("businessCategory", e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-primary/60 transition-all appearance-none">
                                                    <option value="" className="bg-slate-900">Select category...</option>
                                                    {CATEGORIES.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex gap-3 pt-2">
                                    <button onClick={handleBack}
                                        className="flex-1 border border-white/10 text-slate-400 py-4 rounded-2xl font-black text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                        whileTap={{ scale: isLoading ? 1 : 0.97 }}
                                        className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-orange-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : "Create My Account →"}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-primary font-bold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function ErrorBanner({ error }: { error: string }) {
    return (
        <AnimatePresence>
            {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium overflow-hidden">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function InputField({ icon, label, type, placeholder, value, onChange, autoFocus }: {
    icon: React.ReactNode; label: string; type: string; placeholder: string;
    value: string; onChange: (v: string) => void; autoFocus?: boolean;
}) {
    return (
        <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{label}</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-2xl pl-11 pr-4 py-4 text-sm font-medium focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
        </div>
    );
}

function PrimaryBtn({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <motion.button onClick={onClick} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/30 hover:bg-orange-500 transition-all flex items-center justify-center gap-2 mt-2">
            {label} <ArrowRight className="w-4 h-4" />
        </motion.button>
    );
}
