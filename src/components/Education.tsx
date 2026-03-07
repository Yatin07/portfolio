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
        <section id="education" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-16 flex items-center gap-3 text-slate-900">
                        <span className="text-secondary text-5xl">{"/"}</span> Education
                    </h2>
                </motion.div>

                <div className="space-y-6">
                    {edu.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="flex flex-col md:flex-row gap-4 justify-between glass glass-hover p-8 rounded-2xl border-l-4 border-l-secondary"
                        >
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 font-bold">{item.inst}</p>
                            </div>
                            <div className="md:text-right flex flex-col justify-center">
                                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-black mb-3 self-start md:self-end shadow-sm">
                                    {item.year}
                                </span>
                                <p className="font-black text-slate-800 text-lg">{item.score}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
