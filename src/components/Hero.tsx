"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, FileText } from "lucide-react";

export function Hero() {
    return (
        <section
            className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 min-h-[85vh] flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}
        >
            {/* Subtle background shape behind photo on desktop */}
            <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EEF2FF] rounded-full blur-[80px] -z-10"></div>

            <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* Left Side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center order-2 lg:order-1"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#0F172A] mb-4"
                    >
                        Yatin Patil
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#1E3A8A] mb-6"
                    >
                        Data Science & AI Engineer
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-medium text-[#475569] mb-4 max-w-xl leading-relaxed"
                    >
                        Building intelligent systems using machine learning and data-driven engineering.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-base text-[#64748B] mb-10 max-w-xl leading-relaxed"
                    >
                        I specialize in extracting actionable insights from complex datasets and engineering robust, scalable software solutions that solve real-world problems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a href="#projects" className="btn-primary flex items-center gap-2">
                            View Projects <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="btn-secondary flex items-center gap-2">
                            <Mail size={18} /> Contact Me
                        </a>
                        <a href="/Yatin_Patil_resume.pdf" download="Yatin_Patil_Resume.pdf" className="text-[#475569] hover:text-[#1E3A8A] font-medium flex items-center gap-2 px-4 py-3 transition-colors">
                            <FileText size={18} /> Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Side: Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center lg:justify-end order-1 lg:order-2"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[#E2E8F0] bg-white group"
                    >
                        <img
                            src="/yatin-photo.jpg"
                            alt="Yatin Patil"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                // Fallback placeholder if photo is missing
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Yatin+Patil&background=EEF2FF&color=1E3A8A&size=320";
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
