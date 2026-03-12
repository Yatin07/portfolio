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
        <section id="education" className="py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center md:text-left"
            >
                <h2 className="text-[#0F172A] mb-4">
                    2. Education
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {edu.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-8 flex flex-col h-full"
                    >
                        <span className="text-sm font-semibold text-[#94A3B8] block mb-2">{item.year}</span>
                        <h3 className="text-[#0F172A] mb-2">{item.title}</h3>
                        <p className="text-[#1E3A8A] font-semibold mb-3">{item.inst}</p>
                        <div className="mt-auto">
                            <span className="inline-block px-3 py-1 bg-[#EEF2FF] text-[#4338CA] rounded-full text-sm font-semibold">
                                {item.score}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
