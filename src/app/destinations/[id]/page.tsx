import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationGallery from "@/components/destinations/DestinationGallery";
import WeatherWidget from "@/components/destinations/WeatherWidget";
import { MapPin, Star, Calendar, Users, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DestinationPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const destination = await prisma.destination.findUnique({
        where: { id: resolvedParams.id },
    });

    if (!destination) {
        notFound();
    }

    // Mock gallery images - in a real app, these would come from the DB
    const galleryImages = [
        destination.image,
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000&auto=format&fit=crop",
    ];

    return (
        <div className="min-h-screen bg-white font-poppins">
            <Header />
            <main>
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Gallery */}
                        <div className="lg:sticky lg:top-24">
                            <DestinationGallery images={galleryImages} />
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                        {destination.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                                        <Star className="w-4 h-4 fill-amber-500" /> {destination.rating}
                                    </div>
                                </div>
                                <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4">{destination.name}</h1>
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    {destination.region}, Côte d'Ivoire
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 mb-3">About this destination</h3>
                                <p className="text-slate-500 leading-relaxed whitespace-pre-line text-sm md:text-base">
                                    {destination.details || destination.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <WeatherWidget location={destination.name} />
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                            <Users className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Availability</p>
                                            <p className="text-sm font-bold text-slate-900">Year-round</p>
                                        </div>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                            </div>

                            {/* Nearby Guides */}
                            <section>
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    Nearby Guides <CheckCircle2 className="w-5 h-5 text-primary" />
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { name: "Koffi A.", rating: 4.9, role: "Cultural Expert" },
                                        { name: "Yao M.", rating: 4.8, role: "Local Explorer" },
                                    ].map((guide) => (
                                        <div key={guide.name} className="p-4 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-200" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{guide.name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{guide.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Booking Action */}
                            <div className="sticky bottom-8 lg:static p-6 md:p-8 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Price per person</p>
                                    <div className="text-3xl font-black text-slate-900">
                                        {destination.price.toLocaleString()} <span className="text-sm text-slate-400 font-medium">FCFA</span>
                                    </div>
                                </div>
                                <Link
                                    href={`/booking?id=${destination.id}`}
                                    className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/30 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 group"
                                >
                                    Book This Experience <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
