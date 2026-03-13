"use client";

import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

export function Achievements() {
    const items = [
        {
            title: "Buildathon 2026 Participant",
            desc: "Developed a civic issue management prototype under hackathon constraints.",
            icon: Trophy
        },
        {
            title: "SAS Curiosity Cup Competition",
            desc: "Participated in global data analytics competition applying statistical analysis and data reasoning.",
            icon: Star
        }
    ];

    return (
        <section id="achievements" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">06</span>
                <h2 className="text-[#0F172A] m-0">Achievements</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
                {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="premium-card p-8 flex flex-col sm:flex-row items-start gap-6 hover:-translate-y-[8px] hover:border-[#CBD5E1]"
                        >
                            <div className="p-4 bg-[#EEF2FF] rounded-xl text-[#1E3A8A] shrink-0">
                                <Icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
                                <p className="text-[#475569] font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
