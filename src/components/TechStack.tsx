"use client";

import { motion } from "framer-motion";

export function TechStack() {
    const categories = [
        {
            title: "Programming",
            skills: ["Python", "JavaScript", "Java"]
        },
        {
            title: "Web Development",
            skills: ["HTML", "CSS", "React", "Node.js"]
        },
        {
            title: "Data / AI",
            skills: ["Pandas", "NumPy", "Scikit-learn"]
        },
        {
            title: "Tools",
            skills: ["Git", "GitHub", "VS Code"]
        }
    ];

    return (
        <section id="techstack" className="py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-[#0F172A] mb-4">
                    7. Tech Stack
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-8"
                    >
                        <h3 className="text-[#0F172A] mb-6">{cat.title}</h3>
                        <div className="flex flex-wrap gap-3">
                            {cat.skills.map((skill, j) => (
                                <span
                                    key={j}
                                    className="px-4 py-2 bg-[#F8FAFC] text-[#475569] rounded-lg text-sm font-medium border border-[#E2E8F0] shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
