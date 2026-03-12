"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => setMounted(true), []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-7xl">
                <a href="#" className="font-black text-2xl tracking-tighter text-slate-900 flex items-center gap-1 group">
                    Yatin<span className="text-[#2563EB] text-3xl leading-none group-hover:text-[#4F46E5] transition-colors">.</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-8 text-sm font-bold tracking-wide">
                        {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative text-slate-600 hover:text-slate-900 transition-colors py-1 group"
                            >
                                {item}
                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-[#6366F1] to-[#9333EA] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="hidden md:block">
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="px-6 py-2.5 rounded-full btn-primary-gradient text-sm font-bold flex items-center justify-center gap-2 group"
                    >
                        Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
