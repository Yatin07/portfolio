"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 -z-10 bg-animated-mesh opacity-50 mix-blend-multiply"></div>

            {/* Soft glowing orb behind profile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden mx-auto mb-8 border-4 border-white shadow-2xl relative ring-4 ring-accent/20"
                >
                    <Image
                        src="/profile.png"
                        alt="Yatin Patil"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm font-bold text-slate-800"
                >
                    <Sparkles size={16} className="text-secondary" />
                    Available for new opportunities
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 text-slate-900"
                >
                    Hi, I'm <br className="sm:hidden" /><span className="text-gradient">Yatin Patil</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    Software Engineer & AI Enthusiast building intelligent systems, analytics dashboards, and scalable web applications.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-blue-800 text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="w-full sm:w-auto px-8 py-4 rounded-full glass glass-hover text-slate-800 font-bold flex items-center justify-center gap-2"
                    >
                        <Download size={18} /> Resume
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-4 rounded-full glass glass-hover text-slate-800 font-bold flex items-center justify-center gap-2"
                    >
                        <Mail size={18} /> Contact Me
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
