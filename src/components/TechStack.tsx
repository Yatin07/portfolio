"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Database, Wrench } from "lucide-react";

export function TechStack() {
    const categories = [
        {
            title: "Programming",
            icon: Code2,
            skills: ["Python", "JavaScript", "Java"]
        },
        {
            title: "Web Development",
            icon: Globe,
            skills: ["HTML", "CSS", "React", "Node.js"]
        },
        {
            title: "Data / AI",
            icon: Database,
            skills: ["Pandas", "NumPy", "Scikit-learn"]
        },
        {
            title: "Tools",
            icon: Wrench,
            skills: ["Git", "GitHub", "VS Code"]
        }
    ];

    return (
        <section id="techstack" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">07</span>
                <h2 className="text-[#0F172A] m-0">Tech Stack</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
                {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#EEF2FF] rounded-xl text-[#1E3A8A]">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-[#0F172A] text-xl font-bold m-0">{cat.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {cat.skills.map((skill, j) => (
                                    <span
                                        key={j}
                                        className="px-4 py-2 bg-[#F8FAFC] text-[#475569] rounded-lg text-sm font-semibold border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
