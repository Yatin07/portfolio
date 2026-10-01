"use client";

import { motion } from "framer-motion";

export function Experience() {
    const experiences = [
        {
            role: "Data Analytics Summer Intern",
            company: "IBM SkillsBuild",
            period: "June 2024 – August 2024",
            responsibilities: [
                "Performed data preprocessing, exploratory data analysis, and visualization on real datasets",
                "Built analytical dashboards and reports for data-driven insights",
                "Applied predictive modeling techniques to support decision making"
            ]
        }
    ];

    return (
        <section id="experience" className="py-[100px] px-4 bg-[#F8FAFC]">
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

            <div className="max-w-[1100px] mx-auto border-l border-[#E2E8F0] ml-6 md:ml-auto">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-8 pb-12 last:pb-0"
                    >
                        <div className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] bg-[#1E3A8A] rounded-full ring-4 ring-[#F8FAFC]"></div>

                        <div className="premium-card p-8 hover:-translate-y-[8px] hover:border-[#CBD5E1]">
                            <span className="text-sm font-semibold text-[#1E3A8A] bg-[#EEF2FF] px-3 py-1 rounded-md mb-4 inline-block">
                                {exp.period}
                            </span>
                            <h3 className="text-xl font-bold text-[#0F172A] mb-1">{exp.role}</h3>
                            <p className="text-[#1E3A8A] font-semibold mb-6">{exp.company}</p>

                            <ul className="space-y-3">
                                {exp.responsibilities.map((resp, j) => (
                                    <li key={j} className="flex items-start gap-3 text-[#475569] leading-relaxed font-medium">
                                        <span className="text-[#1E3A8A] mt-1.5">•</span>
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
