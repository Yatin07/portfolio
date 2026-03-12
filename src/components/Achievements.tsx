"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star } from "lucide-react";

export function Achievements() {
    const achievements = [
        {
            title: "Data Analytics Virtual Internship",
            org: "IBM SkillsBuild",
            desc: "Completed an intensive virtual internship focused on real-world data analytics and visualization projects.",
            icon: <Trophy className="text-[#9333EA]" size={24} />
        },
        {
            title: "Buildathon Participant",
            org: "Hackathon / Innovation",
            desc: "Collaborated to build UrbanVoice, a full-stack civic issue reporting platform with AI categorization.",
            icon: <Medal className="text-[#9333EA]" size={24} />
        },
        {
            title: "Agro.ai Innovation",
            org: "Personal Research",
            desc: "Developed a deep learning model for plant disease detection using MobileNetV2 with high accuracy.",
            icon: <Star className="text-[#9333EA]" size={24} />
        }
    ];

    return (
        <section className="py-24 px-4 bg-slate-50 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-16 flex items-center gap-3 text-slate-900 justify-center md:justify-start">
                        <span className="text-secondary text-5xl">{"/"}</span> Achievements Let's see
                    </h2>
                </motion.div>

                <div className="space-y-6">
                    {achievements.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col sm:flex-row gap-6 items-start group"
                        >
                            <div className="p-4 bg-purple-50 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
                                <p className="text-[#6366F1] font-bold text-sm uppercase tracking-wider mb-3">{item.org}</p>
                                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
