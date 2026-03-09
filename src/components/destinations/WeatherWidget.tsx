"use client";

import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

interface WeatherProps {
    location: string;
}

export default function WeatherWidget({ location }: WeatherProps) {
    const [temp, setTemp] = useState(28);
    const [condition, setCondition] = useState("Sunny");

    // Mock weather data - in a real app, this would call an API
    useEffect(() => {
        const timer = setTimeout(() => {
            setTemp(Math.floor(Math.random() * (32 - 24) + 24));
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {condition === "Sunny" ? <Sun className="w-8 h-8" /> : <Cloud className="w-8 h-8" />}
                </div>
                <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Local Weather</p>
                    <p className="text-sm font-bold text-slate-900">{location}</p>
                </div>
            </div>
            <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-2xl font-black text-slate-900">
                    <Thermometer className="w-5 h-5 text-rose-500" /> {temp}°C
                </div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{condition}</p>
            </div>
        </div>
    );
}
