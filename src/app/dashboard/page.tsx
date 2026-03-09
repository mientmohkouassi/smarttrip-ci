"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Clock, Heart, Plane, ArrowRight, Star, Compass } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { destinations } from "@/lib/data";

interface StoredBooking {
    id: string;
    destinationId: string;
    destinationName: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    guestName: string;
    guestEmail: string;
    status: string;
    bookedAt: string;
}

export default function DashboardPage() {
    const [bookings, setBookings] = useState<StoredBooking[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("smarttrip_bookings");
            if (raw) setBookings(JSON.parse(raw));
        } catch {
            setBookings([]);
        }
        setLoaded(true);
    }, []);

    const now = new Date();
    const upcomingTrips = bookings.filter((b) => new Date(b.startDate) >= now);
    const pastTrips = bookings.filter((b) => new Date(b.startDate) < now);

    // Enrich bookings with destination image from data.ts
    const getDestImage = (destId: string) => {
        const d = destinations.find((x) => x.id === destId);
        return d?.image ?? "/images/destinations/assinie.png";
    };

    const getDestDetails = (destId: string) => {
        return destinations.find((x) => x.id === destId);
    };

    if (!loaded) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main className="container mx-auto px-6 py-12 max-w-6xl">
                {/* Header row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black text-slate-900"
                        >
                            My Trips 🌍
                        </motion.h1>
                        <p className="text-slate-500 mt-1">All your adventures in one place.</p>
                    </div>
                    <Link
                        href="/"
                        className="bg-primary text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        Find New Trips <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content — 2 cols */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Upcoming Trips */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                    <Plane className="w-6 h-6 text-primary" /> Upcoming Trips
                                </h2>
                                <span className="text-xs font-black text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">
                                    {upcomingTrips.length} Total
                                </span>
                            </div>

                            {upcomingTrips.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingTrips.map((booking, i) => {
                                        const dest = getDestDetails(booking.destinationId);
                                        const nights = Math.ceil(
                                            (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) /
                                            (1000 * 60 * 60 * 24)
                                        );
                                        return (
                                            <motion.div
                                                key={booking.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-6 group hover:border-primary/20 transition-all"
                                            >
                                                <div className="md:w-48 h-36 rounded-2xl overflow-hidden shrink-0">
                                                    <img
                                                        src={getDestImage(booking.destinationId)}
                                                        alt={booking.destinationName}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="text-xl font-black text-slate-900">{booking.destinationName}</h3>
                                                        <span className="text-xs font-black px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full capitalize">
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    {dest && (
                                                        <div className="flex items-center gap-1 text-slate-400 text-xs mb-4 font-medium">
                                                            <MapPin className="w-3 h-3" /> {dest.region}
                                                            <span className="ml-2 flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {dest.rating}</span>
                                                        </div>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-4 mt-3">
                                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                            <Calendar className="w-4 h-4 text-primary" />
                                                            {new Date(booking.startDate).toLocaleDateString("fr-CI", { day: "2-digit", month: "short", year: "numeric" })}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                            <Clock className="w-4 h-4 text-primary" />
                                                            {nights} Night{nights !== 1 ? "s" : ""}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                                                        <p className="text-xs text-slate-400 font-medium">Booking ref: <span className="font-mono font-black text-slate-600">{booking.id.slice(0, 12)}</span></p>
                                                        <p className="text-primary font-black text-sm">{booking.totalPrice.toLocaleString()} FCFA</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                                    <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-black text-slate-900 mb-2">No upcoming trips</h3>
                                    <p className="text-slate-400 mb-6 max-w-xs mx-auto text-sm">
                                        You haven&apos;t booked any trips yet. Explore our beautiful destinations!
                                    </p>
                                    <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl font-black hover:bg-orange-600 transition-colors text-sm inline-block shadow-lg shadow-primary/20">
                                        Explore destinations
                                    </Link>
                                </div>
                            )}
                        </section>

                        {/* Past Trips */}
                        {pastTrips.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-slate-400" /> Booking History
                                </h2>
                                <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 border-b border-slate-100">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Destination</th>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Price</th>
                                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {pastTrips.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-slate-50/40 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-slate-900">{booking.destinationName}</td>
                                                    <td className="px-6 py-4 text-slate-500 text-sm">{new Date(booking.startDate).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 font-bold text-slate-900">{booking.totalPrice.toLocaleString()} FCFA</td>
                                                    <td className="px-6 py-4"><span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full uppercase">Completed</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Stats card */}
                        <section className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-6 text-white shadow-xl shadow-primary/20">
                            <h2 className="text-lg font-black mb-5">Trip Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm border-t border-white/20 pt-4">
                                    <span className="opacity-75">Total bookings</span>
                                    <span className="font-black">{bookings.length}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-white/20 pt-4">
                                    <span className="opacity-75">Upcoming</span>
                                    <span className="font-black">{upcomingTrips.length}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-white/20 pt-4">
                                    <span className="opacity-75">Completed</span>
                                    <span className="font-black">{pastTrips.length}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-white/20 pt-4">
                                    <span className="opacity-75">Loyalty Points</span>
                                    <span className="font-black">{bookings.length * 250} PTS</span>
                                </div>
                            </div>
                        </section>

                        {/* Saved Gems */}
                        <section className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Saved Gems
                            </h2>
                            <p className="text-slate-400 text-xs mb-4">Your wishlist of favourite places.</p>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                                <p className="text-sm text-slate-400 font-medium">Start exploring and save your first gem!</p>
                                <Link href="/" className="text-primary text-xs font-black mt-2 inline-block hover:underline">Browse destinations →</Link>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
