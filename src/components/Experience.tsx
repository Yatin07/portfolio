"use client";

import { motion } from "framer-motion";

export function Experience() {
    return (
        <section id="experience" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">04</span>
                <h2 className="text-[#0F172A] m-0">Experience</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <div className="max-w-[1100px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="premium-card p-8 flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                            <h3 className="text-[#0F172A]">Data Analytics Summer Intern</h3>
                            <span className="text-xs font-semibold px-3 py-1 bg-[#EEF2FF] text-[#4338CA] rounded-full">Remote</span>
                        </div>
                        <p className="text-[#1E3A8A] font-semibold mb-6">IBM SkillsBuild</p>

                        <ul className="list-none space-y-3">
                            {[
                                "Conducted comprehensive data cleaning, formatting, and exploratory data analysis (EDA) on real-world datasets to extract actionable insights.",
                                "Designed and built interactive data visualizations and dashboards to effectively communicate analytical findings to stakeholders.",
                                "Applied predictive modeling techniques to identify trends and improve decision-making processes based on historical data."
                            ].map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <span className="text-[#7C3AED] mt-1.5">•</span>
                                    <span className="text-[#475569] leading-relaxed">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="shrink-0 pt-2 md:pt-0">
                        <span className="text-sm font-semibold text-[#94A3B8]">
                            June 2024 – August 2024
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
