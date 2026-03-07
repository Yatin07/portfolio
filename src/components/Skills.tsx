"use client";

import { motion } from "framer-motion";

export function Skills() {
    const skillCategories = [
        {
            title: "Programming",
            skills: ["Python", "SQL", "Java", "C++"]
        },
        {
            title: "Data Science & AI",
            skills: ["Machine Learning", "Deep Learning", "Predictive Modeling"]
        },
        {
            title: "Libraries & Tools",
            skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "XGBoost", "Git", "MySQL"]
        },
        {
            title: "Development & Analytics",
            skills: ["React.js", "Firebase", "REST APIs", "Power BI", "Tableau", "DAX", "Data Modeling"]
        }
    ];

    return (
        <section id="skills" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-16 flex items-center justify-center gap-3 text-slate-900">
                        <span className="text-secondary text-5xl">{"/"}</span> Skills
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass glass-hover p-8 rounded-3xl"
                        >
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {cat.skills.map((skill, j) => (
                                    <span key={j} className="px-4 py-2 bg-white/60 border border-slate-200/50 text-slate-800 rounded-xl text-sm font-bold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
