"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="pt-32 pb-20 px-4 min-h-[85vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto mb-8 border-4 border-white shadow-xl relative">
                    <Image
                        src="/profile.png"
                        alt="Yatin Patil"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-6 text-primary">
                    Hi, I'm <span className="text-secondary">Yatin Patil</span>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Building intelligent systems with Data Science, AI, and scalable software solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-secondary text-white font-semibold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Download size={18} /> Resume
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Mail size={18} /> Contact
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
