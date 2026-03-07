"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "UrbanVoice",
            desc: "Full stack civic issue reporting system.",
            features: "Role based access, Real time tracking, SLA monitoring, AI categorization.",
            tech: ["Flutter", "React", "Firebase", "AI"],
            link: "#"
        },
        {
            title: "Tennis ATP Analytics",
            desc: "Interactive Power BI analytics dashboard analyzing ATP rankings.",
            features: "Galaxy schema, DAX KPIs, ML predictions.",
            tech: ["Power BI", "Python", "XGBoost"],
            link: "#"
        },
        {
            title: "Agro.ai",
            desc: "AI system detecting plant diseases using deep learning.",
            features: "87k images, 38 disease classes, MobileNetV2 feature extraction.",
            tech: ["TensorFlow", "Scikit", "Python"],
            link: "#"
        }
    ];

    return (
        <section id="projects" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-16 flex items-center justify-center gap-3 text-slate-900">
                        <span className="text-secondary text-5xl">{"/"}</span> Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass glass-hover p-8 flex flex-col h-full group"
                        >
                            <h3 className="text-2xl font-black mb-3 text-slate-900 group-hover:text-secondary transition-colors">{p.title}</h3>
                            <p className="text-slate-600 text-base mb-4 flex-grow font-medium leading-relaxed">{p.desc}</p>
                            <p className="text-sm text-slate-500 mb-6 font-medium bg-white/50 p-4 rounded-xl border border-slate-200 shadow-inner">{p.features}</p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {p.tech.map((t, j) => (
                                    <span key={j} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-bold shadow-sm border border-blue-100">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-auto pt-6 border-t border-slate-200">
                                <a href={p.link} className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-secondary transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200">
                                    <ExternalLink size={16} /> Live
                                </a>
                                <a href={p.link} className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm hover:shadow hover:-translate-y-0.5 transform duration-200">
                                    <Github size={16} /> Code
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
