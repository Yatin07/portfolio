"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

export function Hero() {
    return (
        <section className="pt-32 pb-20 px-4 min-h-[80vh] flex flex-col justify-center items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto mb-8 bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl">
                    {/* Default user placeholder if image not found */}
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400">
                        YP
                    </div>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                    Hi, I'm <span className="text-blue-600 dark:text-blue-500">Yatin Patil</span>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto font-light">
                    Building intelligent systems with Data Science, AI, and scalable software solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="#"
                        className="w-full sm:w-auto px-8 py-3 rounded-full border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={18} /> Resume
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-3 rounded-full border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <Mail size={18} /> Contact
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
