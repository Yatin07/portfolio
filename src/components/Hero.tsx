"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, FileText, Github, Linkedin } from "lucide-react";

export function Hero() {
    const [imgError, setImgError] = useState(false);

    return (
        <section
            id="hero"
            className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 min-h-[85vh] flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}
        >
            <div className="hidden lg:block absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EEF2FF] rounded-full blur-[80px] -z-10"></div>

            <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Right / Top Side: Profile Photo */}
                {!imgError ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-[280px] h-[280px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-[#E2E8F0] bg-white group ring-4 ring-white"
                        >
                            <img
                                src="/profile.png"
                                alt="Yatin Patil"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={() => setImgError(true)}
                            />
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="hidden lg:block order-1 lg:order-2"></div>
                )}

                {/* Left Side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col justify-center order-2 lg:order-1 ${imgError ? 'lg:col-span-2 items-center text-center' : ''}`}
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
                        className={`text-lg md:text-xl font-medium text-[#475569] mb-4 leading-relaxed ${imgError ? 'max-w-2xl' : 'max-w-xl'}`}
                    >
                        Building intelligent systems using machine learning and data-driven engineering.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-base text-[#64748B] mb-10 leading-relaxed ${imgError ? 'max-w-2xl' : 'max-w-xl'}`}
                    >
                        I specialize in extracting actionable insights from complex datasets and engineering robust, scalable software solutions that solve real-world problems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`flex flex-wrap items-center gap-4 ${imgError ? 'justify-center' : ''}`}
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

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className={`flex items-center gap-6 mt-10 ${imgError ? 'justify-center' : ''}`}
                    >
                        <a href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" className="text-[#64748B] hover:text-[#1E3A8A] transition-colors" aria-label="GitHub">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" className="text-[#64748B] hover:text-[#1E3A8A] transition-colors" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:yatinpatilyp07@gmail.com" className="text-[#64748B] hover:text-[#1E3A8A] transition-colors" aria-label="Email">
                            <Mail size={24} />
                        </a>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
