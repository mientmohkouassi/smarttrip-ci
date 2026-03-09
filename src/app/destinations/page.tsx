"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Star, Search, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Beach", "Culture", "History", "Nature", "Urban", "Artisan"];

export default function DestinationsPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = destinations.filter((d) => {
        const matchesSearch =
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.region.toLowerCase().includes(search.toLowerCase()) ||
            d.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "All" || d.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />
            <main>
                {/* Hero Banner */}
                <section className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 senufo-pattern" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative z-10 max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-black uppercase tracking-widest mb-6">
                            <Compass className="w-4 h-4" /> All Destinations
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6">
                            Where will you <span className="text-primary italic">go next?</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto mb-10">
                            Browse all {destinations.length} curated destinations across Côte d&apos;Ivoire. Filter by category or search by name.
                        </p>

                        {/* Search bar */}
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search destinations, regions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-slate-500 font-medium focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-all text-sm"
                            />
                        </div>
                    </motion.div>
                </section>

                <section className="max-w-7xl mx-auto px-6 py-16">
                    {/* Category filters */}
                    <div className="flex flex-wrap gap-3 mb-12 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-black transition-all ${activeCategory === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <p className="text-slate-400 text-sm font-medium mb-8 text-center">
                        {filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
                        {activeCategory !== "All" && ` in ${activeCategory}`}
                    </p>

                    {/* Destination grid */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((dest, i) => (
                                <motion.div
                                    key={dest.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur text-slate-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {dest.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-black text-slate-800">{dest.rating}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-2">
                                            <MapPin className="w-3.5 h-3.5" /> {dest.region}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{dest.name}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">{dest.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">From</p>
                                                <p className="text-lg font-black text-slate-900">{dest.price.toLocaleString()} <span className="text-xs font-bold text-slate-400">FCFA</span></p>
                                            </div>
                                            <Link
                                                href={`/booking?id=${dest.id}`}
                                                className="bg-primary text-white px-5 py-3 rounded-xl font-black text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center gap-2 group/btn"
                                            >
                                                Book <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">No destinations found</h3>
                            <p className="text-slate-500 mb-6">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                                className="text-primary font-bold hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
