"use client";

import { motion } from "framer-motion";

export function Education() {
    const edu = [
        {
            title: "B.Tech Information Technology",
            inst: "NMIMS University",
            year: "2023 – 2027",
            score: "CGPA: 3.58 / 4.0"
        },
        {
            title: "HSC",
            inst: "Secondary Education",
            year: "2023",
            score: "81.16%"
        },
        {
            title: "SSC",
            inst: "Primary Education",
            year: "2021",
            score: "60.46%"
        }
    ];

    return (
        <section id="education" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">2.</span> Education
                </h2>
            </motion.div>

            <div className="space-y-6 max-w-3xl">
                {edu.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex flex-col sm:flex-row sm:items-baseline justify-between py-6 border-b border-slate-200 last:border-0"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="text-slate-500 font-medium">{item.inst}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:text-right">
                            <span className="text-sm font-mono text-slate-400 block mb-1">
                                {item.year}
                            </span>
                            <p className="font-semibold text-slate-700">{item.score}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
