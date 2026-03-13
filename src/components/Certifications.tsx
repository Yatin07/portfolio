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
        <section id="certifications" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-[#0F172A] mb-4">
                    5. Certifications
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
                {certs.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-8 flex flex-col h-full"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-semibold text-[#475569] uppercase tracking-wider">{cert.issuer}</span>
                            <span className="text-sm font-semibold text-[#94A3B8]">{cert.year}</span>
                        </div>
                        <h3 className="text-[#0F172A] leading-snug mb-4 group-hover:text-[#1E3A8A] transition-colors flex-grow">
                            {cert.title}
                        </h3>
                        <a href={cert.link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#475569] hover:text-[#1E3A8A] transition-colors mt-auto">
                            View Credential <ExternalLink size={14} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
