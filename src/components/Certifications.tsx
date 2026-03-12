"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

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
        <section id="certifications" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">5.</span> Certifications
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {certs.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="p-6 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{cert.issuer}</span>
                            <span className="text-sm font-mono text-slate-400">{cert.year}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-4 group-hover:text-slate-800 transition-colors flex-grow">
                            {cert.title}
                        </h3>
                        <a href={cert.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mt-auto">
                            View Credential <ExternalLink size={14} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
