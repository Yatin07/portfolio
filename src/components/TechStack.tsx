"use client";

import { motion } from "framer-motion";

export function TechStack() {
    const categories = [
        {
            title: "Programming",
            skills: ["Python", "JavaScript", "Java"]
        },
        {
            title: "Web",
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
        <section id="techstack" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">7.</span> Tech Stack
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="py-2"
                    >
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{cat.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, j) => (
                                <span
                                    key={j}
                                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
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
