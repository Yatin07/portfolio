"use client";

import { motion } from "framer-motion";

export function Achievements() {
    const achievements = [
        {
            title: "Data Analytics Virtual Internship",
            org: "IBM SkillsBuild",
            desc: "Completed an intensive virtual internship focused on real-world data analytics and visualization projects."
        },
        {
            title: "Buildathon Participant",
            org: "Hackathon / Innovation",
            desc: "Collaborated to build UrbanVoice, a full-stack civic issue reporting platform with AI categorization."
        },
        {
            title: "Agro.ai Innovation",
            org: "Personal Research",
            desc: "Developed a deep learning model for plant disease detection using MobileNetV2 with high accuracy."
        }
    ];

    return (
        <section id="achievements" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">6.</span> Achievements
                </h2>
            </motion.div>

            <div className="space-y-6 max-w-3xl">
                {achievements.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="py-6 border-b border-slate-200 last:border-0"
                    >
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{item.org}</p>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
