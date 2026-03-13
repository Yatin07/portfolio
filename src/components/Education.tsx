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
        <section id="education" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-16 max-w-[700px] mx-auto"
            >
                <h2 className="text-[#0F172A] mb-4">
                    2. Education
                </h2>
            </motion.div>

            <div className="max-w-[700px] mx-auto border-l border-[#E2E8F0] ml-6 md:ml-auto">
                {edu.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-8 pb-12 last:pb-0"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] bg-[#1E3A8A] rounded-full ring-4 ring-[#F8FAFC]"></div>

                        <span className="text-sm font-semibold text-[#94A3B8] block mb-2">{item.year}</span>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-1">{item.title}</h3>
                        <p className="text-[#475569] font-medium mb-4">{item.inst}</p>
                        <span className="inline-block px-3 py-1 bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] rounded-md text-sm font-semibold">
                            {item.score}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
