"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Play, MessageSquarePlus, Heart, MapPin, X, CheckCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";

const CATEGORIES = ["Beach", "Culture", "Nature", "Luxury", "Local", "Cuisine", "Adventure"];

type Testimonial = {
    id: number;
    name: string;
    location: string;
    avatar: string;
    text: string;
    rating: number;
    category: string;
    size: string;
};

const defaultTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Elena Rodriguez",
        location: "Barcelona, Spain",
        avatar: "https://i.pravatar.cc/150?u=elena",
        text: "My trip to Assinie-Mafia was transformative. SmartTrip CI didn't just book a hotel; they curated an entire emotional journey. The concierge's local knowledge is unmatched.",
        rating: 5,
        category: "Beach",
        size: "large"
    },
    {
        id: 2,
        name: "Koffi Mensah",
        location: "Accra, Ghana",
        avatar: "https://i.pravatar.cc/150?u=koffi",
        text: "The Basilica in Yamoussoukro took my breath away. The seamless logistics made it stress-free.",
        rating: 5,
        category: "Culture",
        size: "small"
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        location: "London, UK",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        text: "The mountains of Man are a hidden secret that the world needs to see. SmartTrip's guide was like a walking encyclopedia of tribal history. Truly an Anthropologist-led experience.",
        rating: 5,
        category: "Nature",
        size: "medium"
    },
    {
        id: 4,
        name: "Jean-luc Dubois",
        location: "Paris, France",
        avatar: "https://i.pravatar.cc/150?u=jean",
        text: "Bespoke service at its finest. From the private jet arrival to the private villa, every detail was perfection.",
        rating: 5,
        category: "Luxury",
        size: "large"
    },
    {
        id: 5,
        name: "Ami Traoré",
        location: "Abidjan, CI",
        avatar: "https://i.pravatar.cc/150?u=ami",
        text: "Finally, a platform that understands premium Ivoirian travel. Proud to see our country showcased like this.",
        rating: 4,
        category: "Local",
        size: "small"
    },
    {
        id: 6,
        name: "Michael Chen",
        location: "Singapore",
        avatar: "https://i.pravatar.cc/150?u=michael",
        text: "The food tour in Grand-Bassam was a culinary revelation. I've never tasted anything quite like the authentic Alloco prepared by the village masters.",
        rating: 5,
        category: "Cuisine",
        size: "medium"
    }
];

function ShareModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        name: "",
        location: "",
        category: "Beach",
        rating: 0,
        text: "",
    });

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.location.trim()) e.location = "Location is required";
        if (form.rating === 0) e.rating = "Please choose a star rating";
        if (form.text.trim().length < 20) e.text = "Please write at least 20 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Save to localStorage
        const existing: Testimonial[] = JSON.parse(localStorage.getItem("smarttrip_testimonials") || "[]");
        const newEntry: Testimonial = {
            id: Date.now(),
            name: form.name.trim(),
            location: form.location.trim(),
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(form.name)}`,
            text: form.text.trim(),
            rating: form.rating,
            category: form.category,
            size: "medium",
        };
        localStorage.setItem("smarttrip_testimonials", JSON.stringify([newEntry, ...existing]));
        setStep("success");
    };

    // Close on backdrop click
    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
                onClick={handleBackdrop}
            >
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 60, scale: 0.97 }}
                    transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    className="bg-white w-full sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {step === "form" ? (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Share Your Experience</h2>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Inspire other travellers with your story</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
                                {/* Name + Location */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">Your Name</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="e.g. Marie Koné"
                                            className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">Location</label>
                                        <input
                                            value={form.location}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            placeholder="e.g. Abidjan, CI"
                                            className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.location ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                                        />
                                        {errors.location && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.location}</p>}
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">Experience Type</label>
                                    <div className="flex flex-wrap gap-2">
                                        {CATEGORIES.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setForm({ ...form, category: cat })}
                                                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide transition-all border ${form.category === cat
                                                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                                    : "bg-slate-50 text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">Your Rating</label>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setForm({ ...form, rating: star })}
                                                className="transition-transform hover:scale-110 active:scale-95"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${star <= (hoverRating || form.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {errors.rating && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.rating}</p>}
                                </div>

                                {/* Story text */}
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">Your Story</label>
                                    <textarea
                                        value={form.text}
                                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                                        placeholder="Tell us about your adventure in Côte d'Ivoire…"
                                        rows={4}
                                        className={`w-full px-3 py-2.5 rounded-xl border text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.text ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                                    />
                                    <div className="flex items-center justify-between mt-1">
                                        {errors.text
                                            ? <p className="text-red-500 text-[10px] font-bold">{errors.text}</p>
                                            : <span />
                                        }
                                        <p className={`text-[10px] font-bold tabular-nums ${form.text.length < 20 ? "text-slate-300" : "text-emerald-500"}`}>
                                            {form.text.length} chars
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 pb-6 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSubmit}
                                    className="w-full bg-primary hover:bg-orange-600 text-white font-black py-3.5 rounded-2xl text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-colors"
                                >
                                    <Send className="w-4 h-4" /> Submit My Story
                                </motion.button>
                                <p className="text-center text-[10px] text-slate-400 font-medium mt-2">
                                    Your review will appear instantly in the wall below.
                                </p>
                            </div>
                        </>
                    ) : (
                        /* Success state */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-16 px-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                            >
                                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Thank you, explorer! 🌍</h2>
                            <p className="text-slate-500 font-medium text-sm max-w-xs leading-relaxed mb-8">
                                Your story has been added to the wall below. You're now part of the SmartTrip CI community.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onClose}
                                className="bg-slate-900 text-white font-black px-8 py-3 rounded-2xl text-sm uppercase tracking-wide"
                            >
                                See My Review
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function TestimonialsPage() {
    const [showModal, setShowModal] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);

    // Load any user-submitted reviews from localStorage
    useEffect(() => {
        const stored: Testimonial[] = JSON.parse(localStorage.getItem("smarttrip_testimonials") || "[]");
        if (stored.length > 0) {
            setTestimonials([...stored, ...defaultTestimonials]);
        }
    }, []);

    // Refresh wall after modal closes (in case a new review was submitted)
    const handleModalClose = () => {
        setShowModal(false);
        const stored: Testimonial[] = JSON.parse(localStorage.getItem("smarttrip_testimonials") || "[]");
        setTestimonials([...stored, ...defaultTestimonials]);
    };

    return (
        <div className="min-h-screen bg-savannah font-poppins text-slate-900">
            <Header />

            {showModal && <ShareModal onClose={handleModalClose} />}

            <main className="py-12 md:py-24 px-4 md:px-6 lg:px-20 max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Heart className="w-3 h-3 fill-current" /> Social Proof
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6"
                    >
                        Voices of the <span className="text-primary italic">Savannah</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
                    >
                        Relive the magic through the eyes of our global community. From the golden sands of Assinie to the misty peaks of Man.
                    </motion.p>
                </div>

                {/* Video Stories */}
                <div className="mb-20 md:mb-32">
                    <div className="flex justify-between items-end mb-6 md:mb-12">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Story Mode</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Immersive Video Reviews</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 border border-slate-200 rounded-full hover:bg-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-3 bg-slate-900 text-white rounded-full"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Stacked on mobile, 3-col grid on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {[
                            {
                                id: 1,
                                video: "https://res.cloudinary.com/dbuuemtd4/video/upload/v1773045571/Landscape_rtbaot.mp4",
                                location: "Savannah",
                                quote: "\"A true cultural rebirth\""
                            },
                            {
                                id: 2,
                                video: "https://res.cloudinary.com/dbuuemtd4/video/upload/v1773044852/5433705_Coll_wavebreak_People_3840x2160_zzszr2.mp4",
                                location: "Community",
                                quote: "\"I felt like family here\""
                            },
                            {
                                id: 3,
                                video: "https://res.cloudinary.com/dbuuemtd4/video/upload/v1773044825/4778427_Waterfall_Cliff_3840x2160_ujmgb1.mp4",
                                location: "Man Waterfalls",
                                quote: "\"Pristine and breathtaking\""
                            }
                        ].map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-video md:aspect-[9/16] bg-slate-200 rounded-2xl md:rounded-[2.5rem] overflow-hidden group shadow-lg md:shadow-2xl"
                            >
                                <video
                                    src={item.video}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                {/* Play icon — desktop hover only */}
                                <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="size-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-all">
                                        <Play className="w-6 h-6 text-white fill-current" />
                                    </div>
                                </div>
                                {/* Text overlay */}
                                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
                                    <p className="text-xs md:text-sm font-black uppercase tracking-widest mb-1 md:mb-2 opacity-80">{item.location}</p>
                                    <h3 className="text-lg md:text-xl font-black leading-tight">{item.quote}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Masonry Wall of Love */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="break-inside-avoid bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <img src={t.avatar} className="size-12 rounded-full object-cover border-2 border-primary/20" alt={t.name} />
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm leading-tight">{t.name}</h4>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                            <MapPin className="w-2.5 h-2.5" /> {t.location}
                                        </div>
                                    </div>
                                </div>
                                <Quote className="w-8 h-8 text-slate-100 group-hover:text-primary/10 transition-colors" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 font-medium leading-relaxed italic mb-8">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            <div className="bg-slate-50 px-4 py-2 rounded-xl w-fit text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Experience: {t.category}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-24 md:mt-32 bg-primary rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 lg:p-24 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <MessageSquarePlus className="size-12 md:size-16 mx-auto mb-6 md:mb-8 text-white/50" />
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tighter">What&apos;s your SmartTrip CI Story?</h2>
                        <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
                            Join the movement. Share your photos, videos, and tales of discovery with our community and inspire the next great explorer.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowModal(true)}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg shadow-2xl transition-all flex items-center gap-3 mx-auto"
                        >
                            <MessageSquarePlus className="w-5 h-5" /> Share Your Experience
                        </motion.button>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

// Icons subset
function ChevronLeft({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>;
}
function ChevronRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>;
}
