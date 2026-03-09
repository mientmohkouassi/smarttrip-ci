"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Quote, Play, MessageSquarePlus, Heart, MapPin } from "lucide-react";

const testimonials = [
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
        text: "Finally, a платфорm that understands premium Ivoirian travel. Proud to see our country showcased like this.",
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

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-savannah font-poppins text-slate-900">
            <Header />

            <main className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-24">
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
                        className="text-5xl lg:text-7xl font-black tracking-tighter mb-6"
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

                {/* Video Stories Placeholder */}
                <div className="mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Story Mode</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Immersive Video Reviews</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 border border-slate-200 rounded-full hover:bg-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-3 bg-slate-900 text-white rounded-full"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                className="relative aspect-[9/16] bg-slate-200 rounded-[2.5rem] overflow-hidden group shadow-2xl"
                            >
                                <video
                                    src={item.video}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="size-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-all cursor-pointer">
                                        <Play className="w-8 h-8 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <p className="text-sm font-black uppercase tracking-widest mb-2">{item.location}</p>
                                    <h3 className="text-xl font-black">{item.quote}</h3>
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
                            transition={{ delay: i * 0.1 }}
                            className="break-inside-avoid bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group"
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
                                "{t.text}"
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
                    className="mt-32 bg-primary rounded-[4rem] p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-primary/20"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <MessageSquarePlus className="size-16 mx-auto mb-8 text-white/50" />
                        <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">What's your SmartTrip CI Story?</h2>
                        <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                            Join the movement. Share your photos, videos, and tales of discovery with our community and inspire the next great explorer.
                        </p>
                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all">
                            Share Your Experience
                        </button>
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
