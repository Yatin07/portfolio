"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TypewriterText = ({ text }: { text: string }) => {
    const characters = text.split("");
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.03 } },
                hidden: {}
            }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, display: "none" },
                        visible: { opacity: 1, display: "inline" }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 -z-10 bg-animated-mesh mix-blend-multiply"></div>

            {/* Glowing orb behind profile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
                className="max-w-4xl mx-auto relative z-10 pt-12 md:pt-20"
            >
                {/* Floating Profile Image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: [-8, 8, -8]
                    }}
                    transition={{
                        scale: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                    }}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden mx-auto mb-10 border-[4px] border-white/60 shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] relative bg-white transition-transform duration-500 hover:scale-105 group"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-[2rem]"></div>
                    <Image
                        src="/profile.png"
                        alt="Yatin Patil"
                        fill
                        className="object-contain object-bottom scale-110"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-8 text-xs font-bold text-slate-700 shadow-sm"
                >
                    <Sparkles size={14} className="text-[#2563EB]" />
                    <span>Available for new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-black tracking-tight mb-6 text-slate-900 leading-[1.1]"
                    style={{ fontSize: "clamp(48px, 6vw, 72px)" }}
                >
                    Hi, I'm <br className="sm:hidden" /><span className="text-gradient-premium">Yatin Patil</span>
                </motion.h1>

                <div className="h-10 sm:h-12 mb-6">
                    {mounted && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-600 tracking-tight">
                            <TypewriterText text="Data Science & AI Engineer" />
                        </h2>
                    )}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    I build intelligent systems using machine learning, analytics dashboards, and scalable web technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-primary-gradient font-bold flex items-center justify-center gap-2"
                    >
                        View Projects <ArrowRight size={18} />
                    </a>
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-premium glass-premium-hover text-slate-800 font-bold flex items-center justify-center gap-2"
                    >
                        <Download size={18} /> Download Resume
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200 hover:bg-slate-50 font-bold flex items-center justify-center gap-2 transition-all"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
