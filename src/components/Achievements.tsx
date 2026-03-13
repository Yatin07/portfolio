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
        <section id="achievements" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-[#0F172A] mb-4">
                    6. Achievements
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {achievements.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="premium-card p-8 flex flex-col h-full"
                    >
                        <h3 className="text-[#0F172A] mb-2">{item.title}</h3>
                        <p className="text-sm font-semibold text-[#1E3A8A] uppercase tracking-wider mb-4">{item.org}</p>
                        <p className="text-[#475569] leading-relaxed flex-grow">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
