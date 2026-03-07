"use client";

import { motion } from "framer-motion";

export function Experience() {
    const certs = [
        "Microsoft SQL Server from Scratch – Udemy (2026)",
        "Agentic AI: From Learner to Builder – IBM SkillsBuild (2025)"
    ];

    return (
        <section id="experience" className="py-24 px-4 relative overflow-hidden bg-white">
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-16 flex items-center gap-3 text-slate-900">
                        <span className="text-secondary text-5xl">{"/"}</span> Experience & Certs
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12 p-8 md:p-10 glass glass-hover rounded-3xl"
                >
                    <div className="flex flex-col md:flex-row justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900">Data Analytics Summer Internship</h3>
                            <p className="text-secondary font-black text-lg mt-1">IBM SkillsBuild</p>
                        </div>
                        <p className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-black mt-4 md:mt-0 self-start shadow-sm">
                            June 2024 – August 2024
                        </p>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg font-medium">
                        Worked on real world datasets focusing on data cleaning, visualization, exploratory data analysis, and generating data driven insights.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h3 className="text-2xl font-black mb-6 text-slate-900">Certifications</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certs.map((cert, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                                className="flex items-center gap-4 p-5 glass glass-hover rounded-2xl"
                            >
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"></div>
                                <span className="text-slate-800 font-bold">{cert}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
