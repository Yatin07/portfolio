"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "UrbanVoice",
            desc: "A full-stack civic issue reporting system built to streamline community problem-solving. It features role-based access, real-time ticket tracking, SLA monitoring, and AI-driven categorization for incoming requests.",
            tech: ["Flutter", "React", "Firebase", "AI"],
            github: "https://github.com/Yatin07/Buildathon",
            live: "#"
        },
        {
            title: "Tennis ATP Analytics",
            desc: "An interactive Power BI dashboard analyzing historical ATP match data and rankings. Implementing a Galaxy schema design, it tracks key performance indicators (KPIs) and integrates machine learning for match outcome predictions.",
            tech: ["Power BI", "Python", "XGBoost"],
            github: "https://github.com/Yatin07/Tennis_ATP_Analytics",
            live: "#"
        },
        {
            title: "Agro.ai",
            desc: "A computer vision and deep learning system designed to detect plant diseases from leaf imagery. Trained on 87k+ images across 38 disease classes utilizing a fine-tuned MobileNetV2 architecture for feature extraction.",
            tech: ["TensorFlow", "Scikit-learn", "Python"],
            github: "https://github.com/Yatin07/Agro_AI",
            live: "#"
        }
    ];

    return (
        <section id="projects" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">03</span>
                <h2 className="text-[#0F172A] m-0">Projects</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-8 flex flex-col h-full hover:-translate-y-[6px] hover:border-[#CBD5E1] transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-[#0F172A] mb-4">{p.title}</h3>

                        <p className="text-[#475569] mb-6 leading-relaxed">
                            {p.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                            {p.tech.map((t, j) => (
                                <span key={j} className="text-xs font-semibold px-3 py-1 bg-[#EEF2FF] text-[#4338CA] rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            {p.github !== "#" && (
                                <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2 px-4 rounded-lg border border-[#E2E8F0] text-sm font-semibold text-[#475569] hover:text-[#1E3A8A] hover:bg-[#F8FAFC] transition-colors">
                                    <Github size={16} /> GitHub
                                </a>
                            )}
                            {p.live !== "#" ? (
                                <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-[#1E3A8A] text-white text-sm font-semibold hover:bg-[#1E3A8A]/90 transition-colors">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            ) : (
                                <span className="flex-1 flex justify-center items-center gap-2 py-2 px-4 rounded-lg border border-[#E2E8F0] text-sm font-semibold text-[#94A3B8] cursor-not-allowed bg-slate-50">
                                    <ExternalLink size={16} /> Live Demo
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
