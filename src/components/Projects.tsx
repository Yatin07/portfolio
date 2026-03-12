"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Code, Database, BrainCircuit, Activity, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Projects() {
    const [activeTab, setActiveTab] = useState("All");

    const projects = [
        {
            title: "UrbanVoice",
            category: "Full Stack",
            desc: "Full stack civic issue reporting system.",
            features: "Role based access, Real time tracking, SLA monitoring, AI categorization.",
            tech: ["Flutter", "React", "Firebase", "AI"],
            link: "https://github.com/Yatin07/Buildathon",
            icon: <Activity className="text-[#2563EB]" size={28} />
        },
        {
            title: "Tennis ATP Analytics",
            category: "Data Analytics",
            desc: "Interactive Power BI analytics dashboard analyzing ATP rankings.",
            features: "Galaxy schema, DAX KPIs, ML predictions.",
            tech: ["Power BI", "Python", "XGBoost"],
            link: "https://github.com/Yatin07/Tennis_ATP_Analytics",
            icon: <Database className="text-[#2563EB]" size={28} />
        },
        {
            title: "Agro.ai",
            category: "AI",
            desc: "AI system detecting plant diseases using deep learning.",
            features: "87k images, 38 disease classes, MobileNetV2 feature extraction.",
            tech: ["TensorFlow", "Scikit", "Python"],
            link: "https://github.com/Yatin07/Agro_AI",
            icon: <BrainCircuit className="text-[#2563EB]" size={28} />
        }
    ];

    const tabs = ["All", "AI", "Data Analytics", "Full Stack"];
    const filteredProjects = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

    return (
        <section id="projects" className="py-24 px-4 bg-[#F8FAFC] relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-4">
                        <span className="text-[#2563EB]">02.</span> Projects
                        <div className="h-[1px] bg-slate-200 flex-grow ml-4 rounded-full"></div>
                    </h2>
                </motion.div>

                {/* Filtering Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab
                                    ? "bg-[#0F172A] text-white shadow-md"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p, i) => (
                            <motion.div
                                layout
                                key={p.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-white rounded-3xl overflow-hidden glass-premium-hover border border-slate-200/60 shadow-md flex flex-col h-full z-10"
                            >
                                {/* Gradient Border Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>

                                <div className="bg-white rounded-3xl flex flex-col h-full relative z-20 m-[1px]">
                                    {/* Project Image Placeholder */}
                                    <div className="h-56 w-full bg-slate-100/50 flex items-center justify-center relative overflow-hidden border-b border-slate-100">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/5 to-[#9333EA]/5 group-hover:opacity-0 transition-opacity duration-500"></div>
                                        <div className="p-5 bg-white rounded-2xl shadow-sm z-10 group-hover:scale-110 transition-transform duration-500">
                                            {p.icon}
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider mb-2 block">{p.category}</span>
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#2563EB] transition-colors">{p.title}</h3>
                                            </div>
                                        </div>

                                        <p className="text-slate-600 text-base mb-6 flex-grow leading-relaxed">{p.desc}</p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {p.tech.map((t, j) => (
                                                <span key={j} className="text-[11px] px-3 py-1.5 bg-slate-50 text-slate-600 rounded-md font-bold border border-slate-200 flex items-center gap-1 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-700 transition-colors">
                                                    <Code size={10} /> {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200">
                                                <Github size={16} /> GitHub
                                            </a>
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-white btn-primary-gradient rounded-xl">
                                                <ExternalLink size={16} /> Live Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
