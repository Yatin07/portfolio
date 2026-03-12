"use client";

import { motion } from "framer-motion";

export function Experience() {
    return (
        <section id="experience" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">4.</span> Experience
                </h2>
            </motion.div>

            <div className="max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between py-6"
                >
                    <div className="flex-1 pr-8">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900">Data Analytics Summer Intern</h3>
                            <span className="text-sm px-2 py-0.5 bg-slate-100 text-slate-600 rounded">Remote</span>
                        </div>
                        <p className="text-slate-500 font-medium mb-4">IBM SkillsBuild</p>

                        <ul className="list-disc leading-relaxed text-slate-600 ml-5 space-y-2">
                            <li>Conducted comprehensive data cleaning, formatting, and exploratory data analysis (EDA) on real-world datasets to extract actionable insights.</li>
                            <li>Designed and built interactive data visualizations and dashboards to effectively communicate analytical findings to stakeholders.</li>
                            <li>Applied predictive modeling techniques to identify trends and improve decision-making processes based on historical data.</li>
                        </ul>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:text-right shrink-0">
                        <span className="text-sm font-mono text-slate-400">
                            June 2024 – August 2024
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
