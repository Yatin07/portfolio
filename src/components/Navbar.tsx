"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <a href="#" className="font-bold text-xl tracking-tight">Yatin.</a>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
                        <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
                        <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
                        <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                    </div>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
