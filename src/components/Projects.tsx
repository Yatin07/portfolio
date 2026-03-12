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
        <section id="projects" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">3.</span> Projects
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="bg-white border border-slate-200 p-8 rounded-xl hover:shadow-sm hover:border-slate-300 transition-all flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                            <div className="flex items-center gap-3">
                                {p.github !== "#" && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <Github size={20} />
                                    </a>
                                )}
                                {p.live !== "#" && (
                                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                            {p.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {p.tech.map((t, j) => (
                                <span key={j} className="text-xs font-mono px-2.5 py-1 bg-slate-50 text-slate-600 rounded border border-slate-200">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
