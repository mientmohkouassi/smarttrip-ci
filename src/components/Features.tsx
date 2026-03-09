'use client';

import { motion } from 'framer-motion';

export default function Features() {
    return (
        <section className="bg-white dark:bg-slate-950 py-24 px-6 lg:px-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Core Innovation</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Redefining West African Travel</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Feature 1: AI Trip Planner */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center text-center p-8 rounded-3xl bg-savannah/30 dark:bg-slate-900 border border-primary/5 hover:border-primary/20 transition-all shadow-sm"
                    >
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">psychology</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">AI Trip Planner</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Personalized itineraries generated in seconds, blending your preferences with real-time local intelligence.
                        </p>
                    </motion.div>

                    {/* Feature 2: Local Logistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center text-center p-8 rounded-3xl bg-savannah/30 dark:bg-slate-900 border border-primary/5 hover:border-primary/20 transition-all shadow-sm ring-2 ring-primary/5"
                    >
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">local_shipping</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Local Logistics</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Seamless transport and translation support provided by a network of verified local agents across the country.
                        </p>
                    </motion.div>

                    {/* Feature 3: Artisan Marketplace */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center text-center p-8 rounded-3xl bg-savannah/30 dark:bg-slate-900 border border-primary/5 hover:border-primary/20 transition-all shadow-sm"
                    >
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">storefront</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Artisan Marketplace</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Support local economies by booking directly with artisans for authentic cultural workshops and hand-crafted goods.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
