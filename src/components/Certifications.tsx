"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export function Certifications() {
    const certs = [
        {
            title: "Microsoft SQL Server from Scratch",
            issuer: "Udemy",
            year: "2026",
            link: "#"
        },
        {
            title: "Agentic AI: From Learner to Builder",
            issuer: "IBM SkillsBuild",
            year: "2025",
            link: "#"
        }
    ];

    return (
        <section id="certifications" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 flex flex-col items-center text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center justify-center gap-4 mb-4">
                        <span className="text-[#2563EB]">05.</span> Certifications
                    </h2>
                    <p className="text-slate-600 font-medium max-w-2xl">
                        Professional credentials showcasing continual learning and proficiency in key technologies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-64 bg-indigo-400/10 blur-[100px] pointer-events-none rounded-full"></div>

                    {certs.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="group relative bg-[#F8FAFC] rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5 overflow-hidden z-10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/30 rounded-3xl -z-10"></div>

                            <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#2563EB] group-hover:text-white text-[#2563EB] flex-shrink-0">
                                <Award size={24} />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">{cert.issuer}</span>
                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black border border-slate-200">
                                        {cert.year}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 leading-snug mb-3 group-hover:text-slate-800 transition-colors">
                                    {cert.title}
                                </h3>
                                <a href={cert.link} className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 group-hover:text-[#2563EB] transition-colors">
                                    View Credential <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
