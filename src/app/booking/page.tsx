"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getDestinationById } from "@/lib/actions";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense, useState, useEffect } from "react";
import { MapPin, Calendar, Users, Shield, CreditCard, CheckCircle, Loader2, Phone, Mail, MessageSquare, ArrowLeft, AlertCircle, Star } from "lucide-react";
import Link from "next/link";
import type { Destination } from "@prisma/client";
import { useSession } from "next-auth/react";

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();
    const destId = searchParams.get("id");

    const [destination, setDestination] = useState<Destination | null>(null);
    const [loadingDest, setLoadingDest] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingData, setBookingData] = useState<{ id: string; destinationName: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: (session?.user?.name) ?? "",
        email: (session?.user?.email) ?? "",
        phone: "",
        checkIn: "",
        checkOut: "",
        travelers: "1",
        requests: "",
    });

    useEffect(() => {
        if (session?.user) {
            setForm(f => ({
                ...f,
                name: session.user?.name ?? "",
                email: session.user?.email ?? "",
            }));
        }
    }, [session]);

    useEffect(() => {
        if (!destId) { setLoadingDest(false); return; }
        getDestinationById(destId).then((d) => {
            setDestination(d as Destination | null);
            setLoadingDest(false);
        });
    }, [destId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    destinationId: destination!.id,
                    startDate: form.checkIn,
                    endDate: form.checkOut,
                    totalPrice: destination!.price,
                    guestName: form.name,
                    guestEmail: form.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong. Please try again.");
                return;
            }

            setBookingData(data);
        } catch (err) {
            console.error("Booking error:", err);
            setError("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingDest) {
        return (
            <div className="flex justify-center py-32">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    if (!destination) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">Destination not found</h2>
                <Link href="/destinations" className="text-primary font-bold hover:underline">← Browse destinations</Link>
            </div>
        );
    }

    if (bookingData) {
        return (
            <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 120 }}>
                    <div className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-14 h-14 text-emerald-500" />
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <h1 className="text-5xl font-black text-slate-900 mb-4">Booking Confirmed! 🎉</h1>
                    <p className="text-slate-500 text-lg mb-10">Your adventure to <span className="font-black text-primary">{destination.name}</span> is all set. We can&apos;t wait to welcome you!</p>
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 mb-8 text-left">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Your Booking Summary</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-500 text-sm font-medium">Booking Ref</span>
                                <span className="font-black text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded-lg text-sm">{bookingData.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-500 text-sm font-medium">Destination</span>
                                <span className="font-bold text-slate-900">{destination.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-500 text-sm font-medium">Guest</span>
                                <span className="font-bold text-slate-900">{form.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-500 text-sm font-medium">Check-in</span>
                                <span className="font-bold text-slate-900">{form.checkIn}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-slate-500 text-sm font-medium">Check-out</span>
                                <span className="font-bold text-slate-900">{form.checkOut}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
                                <span className="font-black text-slate-900">Total Paid</span>
                                <span className="font-black text-2xl text-primary">{destination.price.toLocaleString()} FCFA</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-8">A confirmation email was sent to <span className="font-bold text-slate-600">{form.email}</span></p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/dashboard" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-colors">
                            View My Dashboard
                        </Link>
                        <Link href="/" className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-orange-600 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-bold text-sm group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to results
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Booking Form — 3 cols */}
                <div className="lg:col-span-3">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Book Your Trip</h1>
                    <p className="text-slate-500 mb-8">Complete the form below to reserve your spot.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Name */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Your full name"
                                        className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>
                            {/* Email */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="you@example.com"
                                        className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    placeholder="+225 07 00 00 00 00"
                                    className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Check-in */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Check-in Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="date" required value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                                        className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>
                            {/* Check-out */}
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Check-out Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="date" required value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                                        className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Travelers */}
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Number of Travelers</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                                    className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none bg-white">
                                    {[1, 2, 3, 4, 5, 6, "7+"].map((n) => <option key={n} value={n}>{n} {Number(n) === 1 ? "Traveler" : "Travelers"}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Special Requests <span className="font-normal text-slate-300">(optional)</span></label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                                <textarea value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })}
                                    rows={3}
                                    placeholder="Any special requirements, dietary needs, accessibility notes..."
                                    className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-4 py-4">
                            {[
                                { icon: <Shield className="w-4 h-4 text-emerald-500" />, label: "Secure Booking" },
                                { icon: <CreditCard className="w-4 h-4 text-blue-500" />, label: "No Hidden Fees" },
                                { icon: <CheckCircle className="w-4 h-4 text-primary" />, label: "Instant Confirmation" },
                            ].map((b) => (
                                <div key={b.label} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    {b.icon} {b.label}
                                </div>
                            ))}
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm font-semibold">{error}</p>
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-base shadow-xl shadow-primary/25 hover:bg-orange-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing Booking...</>
                            ) : (
                                <>Confirm Booking — {destination.price.toLocaleString()} FCFA</>
                            )}
                        </motion.button>
                    </form>
                </div>

                {/* Destination Summary — 2 cols */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                            <div className="h-52 overflow-hidden relative">
                                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-black">{destination.name}</h3>
                                    <div className="flex items-center gap-1 text-white/80 text-xs"><MapPin className="w-3 h-3" />{destination.region}</div>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-primary">{destination.category}</div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-1 mb-4">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span className="font-black text-slate-900">{destination.rating}</span>
                                    <span className="text-slate-400 text-xs ml-1">rating</span>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-5">{destination.description}</p>
                                <div className="space-y-3 border-t border-slate-50 pt-5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-semibold">Base price</span>
                                        <span className="font-black text-slate-900">{destination.price.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-semibold">Service fee</span>
                                        <span className="font-bold text-emerald-600">Free</span>
                                    </div>
                                    <div className="flex justify-between border-t border-slate-100 pt-3">
                                        <span className="font-black text-slate-900">Total</span>
                                        <span className="font-black text-xl text-primary">{destination.price.toLocaleString()} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main>
                <Suspense fallback={<div className="container mx-auto px-6 py-24 text-center text-slate-500">Loading booking details...</div>}>
                    <BookingContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
