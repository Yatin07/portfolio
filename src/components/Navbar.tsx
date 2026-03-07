"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg shadow-black/5 max-w-6xl mx-auto"
        >
            <div className="px-6 h-16 flex items-center justify-between">
                <a href="#" className="font-black text-2xl tracking-tighter text-slate-900 flex items-center gap-1">
                    Yatin<span className="text-secondary text-3xl leading-none">.</span>
                </a>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide">
                        <a href="#about" className="text-slate-600 hover:text-secondary hover:-translate-y-0.5 transition-all">About</a>
                        <a href="#projects" className="text-slate-600 hover:text-secondary hover:-translate-y-0.5 transition-all">Projects</a>
                        <a href="#experience" className="text-slate-600 hover:text-secondary hover:-translate-y-0.5 transition-all">Experience</a>
                        <a href="#contact" className="text-slate-600 hover:text-secondary hover:-translate-y-0.5 transition-all">Contact</a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
