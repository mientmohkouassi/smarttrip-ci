"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDestinations } from "@/lib/actions";

type DestinationSummary = { id: string; name: string; region: string; category: string };

function Hero() {
    const router = useRouter();
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["Beaches", "Mountains", "Culture", "Cuisine", "Nature"],
        []
    );

    const [searchState, setSearchState] = useState({
        location: '',
        date: '',
        travelers: ''
    });
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [allDestinations, setAllDestinations] = useState<DestinationSummary[]>([]);

    useEffect(() => {
        getDestinations().then((data) => {
            setAllDestinations(data.map(d => ({ id: d.id, name: d.name, region: d.region, category: d.category })));
        });
    }, []);

    // Live autocomplete: filter destinations based on what's typed
    const locationQuery = searchState.location.toLowerCase().trim();
    const filteredLocations = useMemo(() => {
        return allDestinations
            .filter((d) =>
                !locationQuery ||
                d.name.toLowerCase().includes(locationQuery) ||
                d.region.toLowerCase().includes(locationQuery) ||
                d.category.toLowerCase().includes(locationQuery)
            )
            .slice(0, 7); // max 7 suggestions
    }, [locationQuery, allDestinations]);

    const dates = ["This Weekend", "Next Week", "Next Month", "April Special", "Summer 2025"];
    const travelersOptions = ["1 Traveler", "2 Travelers", "3-5 People (Group)", "6+ People (Large)", "Family (with kids)"];

    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        const params = new URLSearchParams();
        if (searchState.location) params.append("location", searchState.location);
        if (searchState.date) params.append("date", searchState.date);
        if (searchState.travelers) params.append("travelers", searchState.travelers);

        setTimeout(() => {
            setIsSearching(false);
            router.push(`/search?${params.toString()}`);
        }, 800);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const selectOption = (field: string, value: string) => {
        setSearchState({ ...searchState, [field]: value });
        setActiveDropdown(null);
    };

    return (
        <section className="relative w-full min-h-[92vh] flex flex-col">
            {/* Background container — overflow-hidden here only, so dropdowns are NOT clipped */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/destinations/assinie.png')" }}
                >
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/75" />
                </motion.div>
                {/* Senufo decorative pattern overlay */}
                <div className="absolute inset-0 senufo-pattern opacity-5 pointer-events-none" />
            </div>

            {/* Content: centered vertically and horizontally */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-8 pt-24 pb-16 text-center">

                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-widest"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    AI-Powered Travel Companion
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="font-poppins text-white text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[1.05] mb-4 tracking-tight max-w-4xl"
                >
                    <span className="block">Explore</span>
                    {/* Rotating keyword — full width so no clipping */}
                    <span className="block relative h-[1.25em] w-full overflow-hidden">
                        {titles.map((title, index) => (
                            <motion.span
                                key={index}
                                className="absolute inset-x-0 group"
                                initial={{ opacity: 0, y: "-100%" }}
                                transition={{ type: "spring", stiffness: 50 }}
                                animate={
                                    titleNumber === index
                                        ? { y: 0, opacity: 1 }
                                        : { y: titleNumber > index ? "-150%" : "150%", opacity: 0 }
                                }
                            >
                                <Link
                                    href={`/explore/${title.toLowerCase()}`}
                                    className="text-primary drop-shadow-[0_2px_20px_rgba(255,128,0,0.6)] cursor-pointer hover:underline decoration-4 underline-offset-8 transition-all"
                                >
                                    {title}
                                </Link>
                            </motion.span>
                        ))}
                    </span>
                    <span className="block">Like a Local</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-white/75 text-lg sm:text-xl mb-12 max-w-2xl leading-relaxed"
                >
                    Discover the hidden gems of the Ivory Coast — from the beaches of Assinie to the peaks of Man.
                </motion.p>

                {/* ── SEARCH BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="w-full max-w-4xl"
                    ref={dropdownRef}
                >
                    <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-2 flex flex-col md:flex-row items-stretch gap-2 ring-1 ring-white/10">

                        {/* Location */}
                        <div className="flex-1 relative group min-w-0">
                            <div
                                className="flex items-center px-5 py-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200 cursor-pointer hover:bg-slate-50/80 transition-colors rounded-xl"
                                onClick={() => toggleDropdown('location')}
                            >
                                <MapPin className="text-primary w-5 h-5 shrink-0" />
                                <div className="flex-1 flex flex-col min-w-0 text-left">
                                    <span className="text-[10px] uppercase font-black text-slate-400 leading-tight">Where to?</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-bold text-sm focus:outline-none p-0 mt-0.5"
                                        placeholder="City or region..."
                                        type="text"
                                        value={searchState.location}
                                        onChange={(e) => setSearchState({ ...searchState, location: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeDropdown === 'location' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 max-h-80 overflow-y-auto overscroll-contain"
                                    >
                                        <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10 border-b border-slate-50">
                                            {locationQuery ? "Matching Destinations" : "Popular Destinations"}
                                        </p>
                                        {filteredLocations.length > 0 ? filteredLocations.map(dest => (
                                            <div key={dest.id} className="px-3 py-2.5 hover:bg-savannah/20 rounded-xl cursor-pointer transition-colors flex items-center gap-3 group" onClick={() => selectOption('location', dest.name)}>
                                                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-700 truncate">{dest.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-semibold">{dest.region} · {dest.category}</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="px-3 py-4 text-sm text-slate-400 text-center">No destinations found</p>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Date */}
                        <div className="flex-1 relative min-w-0">
                            <div
                                className="flex items-center px-5 py-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200 cursor-pointer hover:bg-slate-50/80 transition-colors rounded-xl"
                                onClick={() => toggleDropdown('date')}
                            >
                                <Calendar className="text-primary w-5 h-5 shrink-0" />
                                <div className="flex-1 flex flex-col min-w-0 text-left">
                                    <span className="text-[10px] uppercase font-black text-slate-400 leading-tight">When?</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-bold text-sm focus:outline-none p-0 mt-0.5"
                                        placeholder="Select dates..."
                                        type="text"
                                        value={searchState.date}
                                        onChange={(e) => setSearchState({ ...searchState, date: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeDropdown === 'date' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 max-h-80 overflow-y-auto overscroll-contain"
                                    >
                                        <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10 border-b border-slate-50">Select Timing</p>
                                        {dates.map(d => (
                                            <div key={d} className="px-3 py-2.5 hover:bg-savannah/20 rounded-xl cursor-pointer transition-colors flex items-center gap-3 group" onClick={() => selectOption('date', d)}>
                                                <Calendar className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0" />
                                                <span className="text-sm font-bold text-slate-700">{d}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Travelers */}
                        <div className="flex-1 relative min-w-0">
                            <div
                                className="flex items-center px-5 py-4 gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors rounded-xl"
                                onClick={() => toggleDropdown('travelers')}
                            >
                                <Users className="text-primary w-5 h-5 shrink-0" />
                                <div className="flex-1 flex flex-col min-w-0 text-left">
                                    <span className="text-[10px] uppercase font-black text-slate-400 leading-tight">Travelers</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 w-full font-bold text-sm focus:outline-none p-0 mt-0.5"
                                        placeholder="Who's coming?"
                                        type="text"
                                        value={searchState.travelers}
                                        onChange={(e) => setSearchState({ ...searchState, travelers: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeDropdown === 'travelers' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 max-h-80 overflow-y-auto overscroll-contain"
                                    >
                                        <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10 border-b border-slate-50">Traveler Type</p>
                                        {travelersOptions.map(opt => (
                                            <div key={opt} className="px-3 py-2.5 hover:bg-savannah/20 rounded-xl cursor-pointer transition-colors flex items-center gap-3 group" onClick={() => selectOption('travelers', opt)}>
                                                <Users className="w-4 h-4 text-slate-400 group-hover:text-primary shrink-0" />
                                                <span className="text-sm font-bold text-slate-700">{opt}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Search Button */}
                        <motion.button
                            whileHover={{ scale: 1.03, backgroundColor: "#ea580c" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="bg-primary text-white px-8 py-4 rounded-xl font-black transition-all flex items-center justify-center gap-3 min-w-[150px] shadow-lg shadow-primary/40 shrink-0"
                        >
                            <AnimatePresence mode="wait">
                                {isSearching ? (
                                    <motion.div key="loading" initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: 360 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                        <Search className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <span className="text-base">Search</span>
                                        <Search className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Quick stats below search bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-6 mt-5 text-white/70 text-xs font-semibold"
                    >
                        <span className="flex items-center gap-1.5"><span className="text-primary font-black">200+</span> Destinations</span>
                        <span className="flex items-center gap-1.5"><span className="text-primary font-black">10k+</span> Happy Travelers</span>
                        <span className="flex items-center gap-1.5"><span className="text-primary font-black">4.9★</span> Rated App</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Featured location badge */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-white z-10 hidden lg:block"
            >
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">📍 Featured Location</p>
                <h4 className="text-lg font-black mt-0.5">Assinie-Mafia</h4>
            </motion.div>
        </section>
    );
}

export { Hero };
