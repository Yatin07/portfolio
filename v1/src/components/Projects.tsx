"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "Tennis ATP Analytics & Prediction Dashboard",
            desc: "Interactive Power BI dashboard analyzing ATP rankings, match statistics, and player performance metrics.",
            features: [
                "Designed a Galaxy Schema data model",
                "Implemented optimized DAX measures and KPIs",
                "Integrated an XGBoost model to predict match win probabilities"
            ],
            tech: ["Power BI", "Python", "XGBoost", "DAX"],
            github: "https://github.com/Yatin07/Tennis_ATP_Analytics",
            live: "#"
        },
        {
            title: "Agro.ai – AI-Based Crop Disease Detection",
            desc: "Computer vision system detecting crop diseases using over 87,000 labeled images across 38 classes.",
            features: [
                "MobileNetV2 feature extraction",
                "Random Forest and CNN model evaluation",
                "End-to-end ML pipeline with automated disease identification"
            ],
            tech: ["TensorFlow", "Scikit-learn", "Python", "Computer Vision"],
            github: "https://github.com/Yatin07/Agro_AI",
            live: "#"
        },
        {
            title: "UrbanVoice – Civic Issue Management System",
            desc: "Full-stack civic issue reporting platform built during a hackathon.",
            features: [
                "Role-based access control (RBAC)",
                "Real-time issue tracking and SLA monitoring",
                "AI-based complaint categorization and geolocation routing"
            ],
            tech: ["Flutter", "React (TypeScript)", "Firebase"],
            github: "https://github.com/Yatin07/Buildathon",
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
                        className="premium-card p-8 flex flex-col h-full hover:-translate-y-[8px] hover:border-[#CBD5E1] transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold text-[#0F172A] mb-3">{p.title}</h3>

                        <p className="text-[#475569] mb-4 leading-relaxed font-medium">
                            {p.desc}
                        </p>

                        <ul className="mb-6 space-y-2 text-sm text-[#475569]">
                            {p.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-[#1E3A8A] mt-1">•</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

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
