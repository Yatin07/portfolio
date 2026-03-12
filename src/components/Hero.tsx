"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export function Hero() {
    return (
        <section className="pt-32 pb-24 px-4 min-h-[75vh] flex flex-col justify-center items-start text-left">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl w-full"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-4"
                >
                    Yatin Patil
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-medium text-slate-600 mb-6"
                >
                    Data Science & AI Engineer
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-slate-500 mb-10 max-w-2xl leading-relaxed"
                >
                    Building intelligent systems using machine learning, analyzing data for actionable insights, and engineering robust web applications.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors"
                    >
                        <Mail size={18} /> Contact Me
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
