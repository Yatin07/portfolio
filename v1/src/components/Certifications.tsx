"use client";

import { motion } from "framer-motion";

export function Certifications() {
    const certs = [
        {
            title: "Microsoft SQL Server from Scratch",
            provider: "Udemy",
            year: "2026"
        },
        {
            title: "Agentic AI: From Learner to Builder",
            provider: "IBM SkillsBuild",
            year: "2025"
        },
        {
            title: "IBM SkillsBuild Summer Internship – Data Analytics",
            provider: "IBM SkillsBuild",
            year: "2024"
        }
    ];

    return (
        <section id="certifications" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">05</span>
                <h2 className="text-[#0F172A] m-0">Certifications</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {certs.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-6 flex flex-col justify-between hover:-translate-y-[8px] hover:border-[#CBD5E1]"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2">{cert.title}</h3>
                            <p className="text-[#475569] font-medium">{cert.provider}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#94A3B8] block mt-6">{cert.year}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
