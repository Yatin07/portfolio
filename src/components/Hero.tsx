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
                className="max-w-4xl mx-auto relative z-10"
            >
                {/* Floating Profile Image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: [-10, 10, -10]
                    }}
                    transition={{
                        scale: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden mx-auto mb-8 border-[6px] border-white shadow-2xl relative bg-white hover:scale-105 transition-transform duration-500"
                >
                    <Image
                        src="/profile.png"
                        alt="Yatin Patil"
                        fill
                        className="object-contain object-bottom scale-110" // object-contain to prevent cropping, object-bottom to align
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-6 text-sm font-black text-slate-800 shadow-sm"
                >
                    <Sparkles size={16} className="text-[#6366F1]" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#9333EA]">
                        Available for new opportunities
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4 text-slate-900"
                >
                    Hi, I'm <br className="sm:hidden" /><span className="text-gradient">Yatin Patil</span>
                </motion.h1>

                <div className="h-10 sm:h-12 mb-6">
                    {mounted && (
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">
                            <TypewriterText text="Data Science & AI Enthusiast" />
                        </h2>
                    )}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    Building intelligent systems using Machine Learning, Analytics and scalable web technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl btn-gradient font-black flex items-center justify-center gap-2 text-lg"
                    >
                        View Projects <ArrowRight size={20} />
                    </a>
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl glass glass-hover text-slate-800 font-bold flex items-center justify-center gap-2 text-lg"
                    >
                        <Download size={20} /> Download Resume
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl glass glass-hover text-slate-800 font-bold flex items-center justify-center gap-2 text-lg"
                    >
                        <Mail size={20} /> Contact Me
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
