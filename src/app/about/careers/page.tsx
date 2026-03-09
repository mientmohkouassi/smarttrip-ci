"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ArrowRight, Star, Heart, Users, X, Mail, Phone, Building } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface JobListing {
    id: string;
    title: string;
    location: string;
    type: string;
    department: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

export default function CareersPage() {
    const jobListings: JobListing[] = [
        {
            id: "job-1",
            title: "Local Experience Curator",
            location: "Abidjan / Remote",
            type: "Full-time",
            department: "Operations",
            description: "Design and vet authentic, culturally immersive experiences across Côte d'Ivoire. You'll partner directly with local artisans.",
            responsibilities: [
                "Travel to various regions in Côte d'Ivoire to discover new artisans and cultural sites.",
                "Work closely with our local partners to design premium, sustainable tour packages.",
                "Ensure all experiences meet our high standards for authenticity and safety.",
                "Negotiate fair partnerships with local creators without middlemen."
            ],
            requirements: [
                "Deep understanding of Ivoirian geography, culture, and traditions.",
                "Excellent interpersonal and negotiation skills.",
                "Fluency in French; local languages (Baoulé, Dioula, etc.) are a massive plus.",
                "Ability to travel domestically 50% of the time."
            ]
        },
        {
            id: "job-2",
            title: "Senior AI Engineer",
            location: "Remote (Global)",
            type: "Full-time",
            department: "Engineering",
            description: "Enhance our personalized travel recommendation engine using advanced ML models to predict perfect itineraries.",
            responsibilities: [
                "Develop and refine the core AI recommendation engine powering SmartTrip CI.",
                "Integrate NLP to analyze user travel prompts and generate highly localized itineraries.",
                "Optimize model performance for fast, real-time search autocomplete.",
                "Collaborate with product teams to design new AI-driven features."
            ],
            requirements: [
                "5+ years of experience in Machine Learning, NLP, or backend engineering (Python/Go/TS).",
                "Experience with modern LLMs and vector databases.",
                "Track record of deploying AI models to high-traffic production environments.",
                "A passion for travel technology and African tourism."
            ]
        },
        {
            id: "job-3",
            title: "Community Manager (Artisans)",
            location: "Korhogo / Abidjan",
            type: "Full-time",
            department: "Community",
            description: "Be the primary liaison for our artisan network. Help them digitize their offerings and onboard them to the SmartTrip CI platform.",
            responsibilities: [
                "Onboard new local artisans, guides, and drivers to the SmartTrip CI partner portal.",
                "Provide training and support on using our digital tools.",
                "Gather feedback from the community to improve our platform features.",
                "Organize community events and workshops in key cultural hubs."
            ],
            requirements: [
                "Exceptional communication skills and empathy.",
                "Experience in community building, customer success, or NGO work.",
                "Tech-savvy with the ability to teach basic digital literacy to others.",
                "Strong ties to local communities in northern or coastal Côte d'Ivoire."
            ]
        },
        {
            id: "job-4",
            title: "Travel Logistics Coordinator",
            location: "San Pédro",
            type: "Contract",
            department: "Logistics",
            description: "Ensure seamless ground transportation and accommodation check-ins for our premium coastal travelers.",
            responsibilities: [
                "Manage daily scheduling for partner drivers and local guides.",
                "Handle real-time support for travelers experiencing logistical issues.",
                "Audit accommodation partners for quality assurance.",
                "Coordinate with the Abidjan headquarters on coastal operations."
            ],
            requirements: [
                "Highly organized and capable of handling high-pressure, real-time situations.",
                "Previous experience in hospitality, logistics, or event management.",
                "Based in or near San Pédro.",
                "Fluent in French and English."
            ]
        }
    ];

    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 font-poppins flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 lg:px-20 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest"
                    >
                        <Briefcase className="w-4 h-4" />
                        Careers at SmartTrip CI
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Build the Future of <br /><span className="text-primary italic">African Travel</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 font-medium leading-relaxed"
                    >
                        We are looking for bold innovators, cultural enthusiasts, and tech pioneers to help us connect the world to the true essence of Côte d'Ivoire.
                    </motion.p>
                </section>

                {/* Culture Perks */}
                <section className="py-20 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                {
                                    icon: <Heart />,
                                    title: "Purpose-Driven Work",
                                    desc: "Every line of code and every partnership directly empowers local Ivoirian communities and artisans."
                                },
                                {
                                    icon: <Users />,
                                    title: "Remote-First, Roots Local",
                                    desc: "Work from anywhere in the world, but enjoy annual company retreats in stunning Ivoirian destinations."
                                },
                                {
                                    icon: <Star />,
                                    title: "Pioneering AI",
                                    desc: "Work at the cutting edge of artificial intelligence applied to highly localized, culturally-aware datasets."
                                }
                            ].map((perk, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto bg-primary/10 text-primary flex items-center justify-center rounded-2xl mb-6">
                                        {perk.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3">{perk.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{perk.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="py-32 px-6 lg:px-20 max-w-5xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black text-slate-900">Open Roles</h2>
                        <p className="text-slate-500 font-medium mt-2">Join us in shaping the narrative of African tourism.</p>
                    </div>

                    <div className="space-y-6">
                        {jobListings.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedJob(job)}
                                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:-translate-y-1"
                            >
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{job.department}</span>
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {job.location}
                                        </span>
                                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-100">{job.type}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <p className="text-slate-500 leading-relaxed max-w-2xl">{job.description}</p>
                                </div>
                                <div className="shrink-0 flex items-center">
                                    <button className="bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-900 size-14 rounded-full flex items-center justify-center transition-all shadow-sm">
                                        <ArrowRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-savannah/10 p-12 rounded-[3rem] border border-savannah/20">
                        <h3 className="text-2xl font-black text-slate-900 mb-4">Don't see a fit?</h3>
                        <p className="text-slate-600 mb-8 max-w-xl mx-auto">We're always looking for exceptional talent. Send your resume and a brief intro about how you can contribute to our mission.</p>
                        <Link href="mailto:careers@smarttrip.ci" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
                            Email Us
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Job Details Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 overscroll-contain"
                        >
                            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-slate-100 flex justify-between items-start z-20">
                                <div>
                                    <div className="flex gap-2 mb-2">
                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedJob.department}</span>
                                        <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedJob.type}</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900">{selectedJob.title}</h2>
                                    <div className="flex items-center gap-1 text-slate-500 font-medium text-sm mt-1">
                                        <MapPin className="w-4 h-4" /> {selectedJob.location}
                                    </div>
                                </div>
                                <button onClick={() => setSelectedJob(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors shrink-0">
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-primary" /> About the Role
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {selectedJob.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-3">Key Responsibilities</h4>
                                    <ul className="space-y-3">
                                        {selectedJob.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                                                <span className="text-primary font-black mt-1">•</span>
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-black text-slate-900 mb-3">What We're Looking For</h4>
                                    <ul className="space-y-3">
                                        {selectedJob.requirements.map((req, i) => (
                                            <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                                                <span className="text-primary font-black mt-1">•</span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h4 className="text-lg font-black text-slate-900 mb-4">How to Apply</h4>
                                    <p className="text-slate-600 text-sm mb-6">
                                        Interested in shaping the future of African tourism? Send your resume and a brief cover letter outlining why you'd be a great fit for this role.
                                    </p>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                                            <div className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100"><Mail className="w-4 h-4 text-primary" /></div>
                                            careers@smarttrip.ci
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                                            <div className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100"><Phone className="w-4 h-4 text-primary" /></div>
                                            +225 01 02 03 04 05
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                                            <div className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100"><Building className="w-4 h-4 text-primary" /></div>
                                            Riviera 2, Cocody, Abidjan, Côte d'Ivoire
                                        </div>
                                    </div>

                                    <a
                                        href={`mailto:careers@smarttrip.ci?subject=Application for ${encodeURIComponent(selectedJob.title)}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-black text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-primary/30"
                                    >
                                        <Mail className="w-5 h-5" /> Apply via Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
