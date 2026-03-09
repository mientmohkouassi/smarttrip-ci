"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryProps {
    images: string[];
}

export default function DestinationGallery({ images }: GalleryProps) {
    const [index, setIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <motion.div
                className="relative aspect-[16/9] rounded-3xl overflow-hidden cursor-zoom-in group shadow-2xl"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.01 }}
            >
                <img src={images[index]} alt="Destination" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

                {/* Navigation Overlay */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); prev(); }} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); next(); }} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest pointer-events-none">
                    {index + 1} / {images.length}
                </div>
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${index === i ? 'border-primary scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Fullscreen Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
                    <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-white hover:text-primary transition-colors z-10">
                        <X className="w-10 h-10" />
                    </button>
                    <button onClick={prev} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                        <ChevronLeft className="w-12 h-12" />
                    </button>
                    <button onClick={next} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                        <ChevronRight className="w-12 h-12" />
                    </button>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={images[index]}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}
