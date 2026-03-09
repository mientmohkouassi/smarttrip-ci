"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { carouselImages } from "@/lib/data";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Target, Eye, Heart } from "lucide-react";
import Link from "next/link";

export default function About() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-poppins">
            <Header />

            <main>
                {/* Luxury Hero Section */}
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/destinations/abidjan.png')" }}
                    >
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                    </motion.div>

                    <div className="relative z-10 text-center px-6 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-6 py-2 rounded-full border border-primary/30 text-primary font-black uppercase tracking-[0.2em] text-xs mb-8 bg-white/10 backdrop-blur-md"
                        >
                            Beyond The Destination
                        </motion.span>
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter"
                        >
                            Our Heart. <br />Your <span className="text-primary italic">Journey.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-slate-200 font-medium leading-relaxed"
                        >
                            We are on a mission to redefine travel in West Africa, connecting curious souls with the authentic spirit of Côte d'Ivoire through AI innovation and deep local roots.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-white text-[10px] uppercase font-black tracking-widest opacity-60">Scroll to Explore</span>
                        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
                    </motion.div>
                </section>

                {/* Vision & Mission Grid */}
                <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Target className="w-10 h-10" />,
                                title: "Our Mission",
                                desc: "To empower local communities and artisans by providing a direct, transparent bridge to global travelers seekers authenticity.",
                                link: "/about/impact"
                            },
                            {
                                icon: <Eye className="w-10 h-10" />,
                                title: "Our Vision",
                                desc: "Becoming the digital gateway to West Africa, where every traveler experiences the true warmth of Akwaba hospitality.",
                                link: "/about/team"
                            },
                            {
                                icon: <Heart className="w-10 h-10" />,
                                title: "Our Values",
                                desc: "Rooted in respect, driven by innovation, and committed to sustainable cultural preservation across all eighteen mountains.",
                                link: "/about/impact"
                            }
                        ].map((item, i) => (
                            <Link href={item.link} key={i}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 hover:scale-[1.05] hover:border-primary/20 transition-all duration-500 group h-full cursor-pointer flex flex-col"
                                >
                                    <div className="size-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium flex-1">{item.desc}</p>
                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Learn More <span className="ml-2">→</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Premium Image Carousel */}
                <section className="py-32 bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 senufo-pattern"></div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-4">Masterpieces of the Coast</h2>
                            <h3 className="text-4xl lg:text-5xl font-black text-white">Touristic Places of Ivory Coast</h3>
                        </div>

                        <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                            <AnimatePresence mode="wait">
                                <Link href={`/booking?id=${carouselImages[currentSlide].id}`} key={currentSlide} className="absolute inset-0 block group/carousel cursor-pointer">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url('${carouselImages[currentSlide].url}')` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/carousel:bg-black/40 transition-colors duration-500"></div>
                                        <div className="absolute bottom-12 left-12 max-w-lg">
                                            <motion.h4
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-4xl font-black text-white mb-4 group-hover/carousel:text-primary transition-colors"
                                            >
                                                {carouselImages[currentSlide].title}
                                            </motion.h4>
                                            <motion.p
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="text-white/70 font-medium"
                                            >
                                                {carouselImages[currentSlide].description}
                                            </motion.p>
                                        </div>
                                        {/* Hover Booking Indicator */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
                                            <div className="bg-primary/90 text-white px-8 py-4 rounded-full font-black text-lg tracking-wide uppercase backdrop-blur-md shadow-2xl scale-95 group-hover/carousel:scale-100 transition-transform flex items-center gap-3">
                                                Book This Trip <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </AnimatePresence>

                            <div className="absolute inset-y-0 left-0 flex items-center px-6">
                                <button onClick={prevSlide} className="size-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center px-6">
                                <button onClick={nextSlide} className="size-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 mt-10">
                            {carouselImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-primary' : 'w-4 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-10 bg-primary/5 rounded-[4rem] blur-3xl -z-10 animate-pulse"></div>
                            <img
                                src="/images/destinations/korhogo.png"
                                className="rounded-[3rem] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all duration-700"
                                alt="Ivoirian Artisan at work in Korhogo"
                            />
                            <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block max-w-xs">
                                <Quote className="text-primary size-10 mb-4 opacity-20" />
                                <p className="text-slate-900 font-black italic text-lg leading-tight">
                                    "We don't just sell trips; we build memories that last a lifetime."
                                </p>
                                <p className="text-sm text-slate-400 font-bold mt-4 uppercase tracking-widest text-right">— Our Founder</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div>
                                <h2 className="text-primary font-black tracking-[0.2em] uppercase text-xs mb-4">Our Heritage</h2>
                                <h3 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">Authenticity is Our <span className="text-primary uppercase">Compass</span></h3>
                            </div>
                            <div className="space-y-6 text-xl text-slate-500 font-medium leading-relaxed">
                                <p>
                                    SmartTrip CI was born from a simple realization: the true essence of Côte d'Ivoire was being missed by the casual observer. We wanted to peel back the layers and show the world the soul of our nation.
                                </p>
                                <p>
                                    By integrating advanced AI with local wisdom, we've created a platform that honors traditional practices while embracing the future. From the weavers of Korhogo to the surfers of Assinie, we are your local companion.
                                </p>
                            </div>
                            <Link href="/about/careers">
                                <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-primary transition-all shadow-xl shadow-slate-900/20 group flex items-center gap-4 cursor-pointer mt-4">
                                    Join Our Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
