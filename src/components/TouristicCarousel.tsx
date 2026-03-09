"use client";

import { motion, AnimatePresence } from "framer-motion";
import { carouselImages } from "@/lib/data";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";

export default function TouristicCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    // Use ref so the interval always has access to the latest state
    const isHoveredRef = useRef(false);

    const goNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }, []);

    // Keep ref in sync with state so the interval can check it
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    // Single, stable interval that checks the ref to decide whether to advance
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHoveredRef.current) {
                setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
            }
        }, 7000);
        return () => clearInterval(timer);
    }, []); // empty deps = runs once, never restarts

    const currentImage = carouselImages[currentSlide];

    return (
        <section className="py-32 px-6 lg:px-20 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4">
                            <Camera className="w-4 h-4" /> Visual Journey
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter capitalize">
                            Discover the <span className="text-primary italic">Soul</span> <br /> of Côte d&apos;Ivoire
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed"
                    >
                        Immerse yourself in a land of contrast. Hover to pause, click to book your adventure.
                    </motion.p>
                </div>

                <div
                    className="relative h-[600px] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${currentImage.url}')` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                            <div className="absolute bottom-16 left-16 max-w-xl">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span className="bg-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4 inline-block">Featured Destination</span>
                                    <h3 className="text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                                        {currentImage.title}
                                    </h3>
                                    <p className="text-white/70 text-xl font-medium leading-relaxed">
                                        {currentImage.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Clickable booking overlay */}
                    <Link
                        href={`/booking?id=${currentImage.id}`}
                        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                        aria-label={`Book ${currentImage.title}`}
                    >
                        <motion.div
                            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.85 }}
                            transition={{ duration: 0.3 }}
                            className="bg-primary/90 backdrop-blur-md text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-wide shadow-2xl flex items-center gap-3 pointer-events-none"
                        >
                            Book This Trip <ChevronRight className="w-5 h-5" />
                        </motion.div>
                    </Link>

                    {/* Navigation arrows — z-20 to be above the Link overlay */}
                    <div className="absolute bottom-16 right-16 flex gap-4 z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); goPrev(); }}
                            className="size-16 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); goNext(); }}
                            className="size-16 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-3 px-8 z-20">
                        {carouselImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrentSlide(i); }}
                                className={`w-1 transition-all duration-700 rounded-full ${currentSlide === i ? 'h-12 bg-primary' : 'h-4 bg-white/30 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>

                    {/* Pause pill */}
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-6 right-6 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 pointer-events-none"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Paused
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
