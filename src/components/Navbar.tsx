"use client";

import { useState, useEffect } from "react";

export function Navbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="#" className="font-extrabold text-2xl tracking-tighter text-primary">Yatin.</a>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
                        <a href="#about" className="text-slate-600 hover:text-secondary transition-colors">About</a>
                        <a href="#projects" className="text-slate-600 hover:text-secondary transition-colors">Projects</a>
                        <a href="#experience" className="text-slate-600 hover:text-secondary transition-colors">Experience</a>
                        <a href="#contact" className="text-slate-600 hover:text-secondary transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
