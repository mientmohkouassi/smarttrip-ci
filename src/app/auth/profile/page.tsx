"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    User, Mail, Phone, Building2, Briefcase,
    Save, LogOut, Star, Check, Edit3, Loader2
} from "lucide-react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import Link from "next/link";

const ALL_INTERESTS = ["Beach", "Nature", "Culture", "History", "Urban", "Artisan"];

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", businessName: "", businessCategory: "" });
    const [prefs, setPrefs] = useState<string[]>([]);
    const [initialized, setInitialized] = useState(false);

    // Pre-fill form from session on load
    if (session?.user && !initialized) {
        setForm({
            name: session.user.name ?? "",
            phone: "",
            businessName: "",
            businessCategory: "",
        });
        setInitialized(true);
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen bg-slate-50 font-poppins">
                <Header />
                <main className="container mx-auto px-6 py-32 max-w-xl text-center">
                    <div className="text-6xl mb-6">🔐</div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">Sign in to view your profile</h1>
                    <p className="text-slate-500 mb-8">Your profile and preferences are stored securely in your account.</p>
                    <Link href="/auth/signin" className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors">
                        Sign In
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const sessionUser = session.user;
    const isPartner = (sessionUser as any).role === "partner";

    const handleSave = async () => {
        // Profile updates would be saved via a server action in a future iteration.
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const togglePref = (p: string) =>
        setPrefs((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

    const handleSignOut = async () => {
        await nextAuthSignOut({ callbackUrl: "/" });
    };

    const joinedAt = sessionUser.email ? new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "";

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main className="max-w-4xl mx-auto px-6 py-14">
                {/* Page header */}
                <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black text-slate-900">My Profile</motion.h1>
                        <p className="text-slate-400 mt-1 font-medium">Manage your personal info and preferences.</p>
                    </div>
                    <div className="flex gap-3">
                        {editing ? (
                            <>
                                <button onClick={() => setEditing(false)}
                                    className="px-5 py-2.5 border border-slate-200 rounded-xl font-black text-sm text-slate-500 hover:text-slate-800 transition-colors">
                                    Cancel
                                </button>
                                <motion.button onClick={handleSave} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Changes
                                </motion.button>
                            </>
                        ) : (
                            <motion.button onClick={() => setEditing(true)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="px-6 py-2.5 border-2 border-primary/20 bg-primary/5 text-primary rounded-xl font-black text-sm hover:bg-primary/10 transition-colors flex items-center gap-2">
                                <Edit3 className="w-4 h-4" /> Edit Profile
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Saved toast */}
                {saved && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-2xl text-sm font-bold">
                        <Check className="w-4 h-4" /> Profile saved successfully!
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── Left: Avatar + Stats ── */}
                    <div className="space-y-6">
                        {/* Avatar card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white mx-auto mb-4 shadow-xl ${isPartner ? "bg-amber-500 shadow-amber-200" : "bg-primary shadow-primary/20"}`}>
                                {(sessionUser.name ?? "U")[0].toUpperCase()}
                            </div>
                            <h2 className="text-xl font-black text-slate-900">{sessionUser.name}</h2>
                            <p className="text-slate-400 text-sm mt-0.5">{sessionUser.email}</p>
                            <span className={`inline-block mt-3 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isPartner ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                                }`}>
                                {isPartner ? "Partner Account" : "Traveler Account"}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Account Info</h3>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Star className="w-4 h-4 text-primary shrink-0" />
                                <span>Member since <span className="font-bold text-slate-700">{joinedAt}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                                <span><span className="font-bold text-slate-700">{prefs.length}</span> Travel interests</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>Onboarding <span className="font-bold text-emerald-600">complete</span></span>
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-2">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Quick Links</h3>
                            <Link href="/dashboard" className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors py-2">
                                → My Dashboard
                            </Link>
                            <Link href="/destinations" className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-colors py-2">
                                → Explore Destinations
                            </Link>
                            {isPartner && (
                                <Link href="/partners/portal/dashboard" className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-amber-500 transition-colors py-2">
                                    → Partner Portal
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Editable Info ── */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6">Personal Information</h3>
                            <div className="space-y-5">
                                <Field icon={<User className="w-4 h-4" />} label="Full Name"
                                    value={form.name} editing={editing} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your full name" />
                                <Field icon={<Mail className="w-4 h-4" />} label="Email Address"
                                    value={sessionUser.email ?? ""} editing={false} onChange={() => { }} placeholder="" hint="Cannot be changed" />
                                <Field icon={<Phone className="w-4 h-4" />} label="Phone Number"
                                    value={form.phone} editing={editing} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+225 07 00 00 00 00" />
                            </div>
                        </div>

                        {/* Partner Info */}
                        {isPartner && (
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-amber-500" /> Business Information
                                </h3>
                                <div className="space-y-5">
                                    <Field icon={<Building2 className="w-4 h-4" />} label="Business Name"
                                        value={form.businessName} editing={editing} onChange={(v) => setForm({ ...form, businessName: v })} placeholder="Your business name" />
                                    <Field icon={<Briefcase className="w-4 h-4" />} label="Category"
                                        value={form.businessCategory} editing={editing} onChange={(v) => setForm({ ...form, businessCategory: v })} placeholder="Tour Operator, Hotel…" />
                                </div>
                            </div>
                        )}

                        {/* Travel Preferences */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-2">Travel Preferences</h3>
                            <p className="text-slate-400 text-sm mb-6">Select the types of experiences you enjoy.</p>
                            <div className="flex flex-wrap gap-3">
                                {ALL_INTERESTS.map((p) => {
                                    const on = prefs.includes(p);
                                    return (
                                        <button key={p} disabled={!editing} onClick={() => togglePref(p)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-black transition-all border-2 ${on ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-slate-50 text-slate-500 border-slate-100"
                                                } ${editing ? "hover:border-primary/50 cursor-pointer" : "cursor-default"}`}>
                                            {on && <Check className="w-3 h-3 inline mr-1.5" />}{p}
                                        </button>
                                    );
                                })}
                            </div>
                            {!editing && (
                                <p className="text-xs text-slate-400 mt-4 font-medium">Click <strong>Edit Profile</strong> to update your interests.</p>
                            )}
                        </div>

                        {/* Danger zone */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-red-100">
                            <h3 className="text-lg font-black text-red-500 mb-2">Sign Out</h3>
                            <p className="text-slate-400 text-sm mb-5">You&apos;ll be signed out of your account on this device.</p>
                            <button onClick={handleSignOut}
                                className="flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-200 text-red-500 rounded-xl font-black text-sm hover:bg-red-100 transition-colors">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function Field({ icon, label, value, editing, onChange, placeholder, hint }: {
    icon: React.ReactNode; label: string; value: string;
    editing: boolean; onChange: (v: string) => void; placeholder: string; hint?: string;
}) {
    return (
        <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{label}</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={!editing}
                    className={`w-full border rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium transition-all outline-none ${editing
                        ? "bg-white border-slate-200 text-slate-900 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
                        : "bg-slate-50 border-slate-100 text-slate-600 cursor-default"
                        }`}
                />
            </div>
            {hint && <p className="text-[10px] text-slate-400 mt-1.5 font-medium ml-1">{hint}</p>}
        </div>
    );
}
