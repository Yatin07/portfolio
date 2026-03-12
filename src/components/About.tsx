"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function About() {
    const highlights = [
        "B.Tech IT Student – NMIMS",
        "Data Science & AI Enthusiast",
        "Machine Learning Projects",
        "Hackathon Participant"
    ];

    return (
        <section id="about" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-4">
                        <span className="text-[#2563EB]">01.</span> About
                        <div className="h-[1px] bg-slate-200 flex-grow ml-4 rounded-full"></div>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 relative group"
                    >
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative border border-slate-200/50 shadow-lg">
                            {/* We use an abstract gradient or a secondary photo here. For now, an abstract glass graphic */}
                            <div className="absolute inset-0 bg-slate-50"></div>
                            <Image
                                src="/profile.png"
                                alt="Yatin Patil Profile"
                                fill
                                className="object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 to-transparent mix-blend-multiply rounded-[2rem]"></div>
                        </div>
                        {/* Decorative background block */}
                        <div className="absolute -z-10 top-6 -left-6 w-full h-full rounded-[2rem] border-2 border-slate-200 group-hover:border-[#4F46E5]/30 transition-colors duration-500"></div>
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-7"
                    >
                        <div className="glass-premium p-8 md:p-10 rounded-3xl mb-8">
                            <p className="text-lg leading-relaxed text-slate-600 mb-6">
                                I am a B.Tech Information Technology student at NMIMS University with strong interests in Data Science, Artificial Intelligence and Analytics. I enjoy building data-driven applications, machine learning systems, and scalable software solutions.
                            </p>
                            <p className="text-lg leading-relaxed text-slate-600">
                                My work encompasses training AI models, designing analytics dashboards, and developing full-stack projects. My ultimate goal is to work as a Data Scientist or AI Engineer, solving complex problems through innovative technology.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 size={18} className="text-[#2563EB]" />
                                    <span className="text-slate-700 font-medium text-sm md:text-base">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
