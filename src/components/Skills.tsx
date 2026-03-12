"use client";

import { motion } from "framer-motion";
import { Terminal, BrainCircuit, Library, LineChart, Wrench, CheckCircle2 } from "lucide-react";

export function Skills() {
    const skillCategories = [
        {
            title: "Programming",
            icon: <Terminal className="text-[#2563EB]" size={24} />,
            skills: ["Python", "SQL", "Java", "C++", "JavaScript", "TypeScript"]
        },
        {
            title: "Data Science",
            icon: <BrainCircuit className="text-[#2563EB]" size={24} />,
            skills: ["Machine Learning", "Deep Learning", "Predictive Modeling", "NLP"]
        },
        {
            title: "Libraries",
            icon: <Library className="text-[#2563EB]" size={24} />,
            skills: ["TensorFlow", "Scikit-[learn]", "Pandas", "NumPy", "XGBoost", "React", "Next.js"]
        },
        {
            title: "Analytics",
            icon: <LineChart className="text-[#2563EB]" size={24} />,
            skills: ["Power BI", "Tableau", "DAX", "Data Visualization"]
        },
        {
            title: "Tools",
            icon: <Wrench className="text-[#2563EB]" size={24} />,
            skills: ["Git", "Docker", "VS Code", "Jupyter Note...", "MySQL"]
        }
    ];

    return (
        <section id="skills" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-4">
                        <span className="text-[#2563EB]">03.</span> Tech Stack
                        <div className="h-[1px] bg-slate-200 flex-grow ml-4 rounded-full"></div>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-[#F8FAFC] p-6 lg:p-8 rounded-3xl border border-slate-200/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="flex flex-col items-start mb-8">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                    {cat.title}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-3">
                                {cat.skills.map((skill, j) => (
                                    <div
                                        key={j}
                                        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[13px] font-bold shadow-sm hover:border-[#6366F1] hover:text-[#4F46E5] transition-colors cursor-default"
                                    >
                                        <CheckCircle2 size={14} className="text-[#9333EA]" />
                                        <span className="truncate">{skill.replace("[learn]", "learn")}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
