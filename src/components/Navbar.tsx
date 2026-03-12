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
        setScrolled(latest > 20);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between max-w-6xl">
                <a href="#" className="font-extrabold text-2xl tracking-tighter text-[#0F172A] flex items-center group">
                    Yatin<span className="text-[#1E3A8A]">.</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-8 text-[15px] font-semibold tracking-wide">
                        {['About', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => {
                            // Map 'Skills' to '#techstack' id
                            const href = item === 'Skills' ? '#techstack' : `#${item.toLowerCase()}`;
                            return (
                                <a
                                    key={item}
                                    href={href}
                                    className="text-[#475569] hover:text-[#1E3A8A] transition-colors py-1 group relative"
                                >
                                    {item}
                                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#1E3A8A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="hidden md:block">
                    <a
                        href="/Yatin_Patil_resume.pdf"
                        download="Yatin_Patil_Resume.pdf"
                        className="btn-primary text-sm font-semibold flex items-center justify-center gap-2 group"
                    >
                        Resume <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
