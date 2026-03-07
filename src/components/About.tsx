"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-black mb-12 flex items-center gap-3 text-slate-900">
                        <span className="text-secondary text-5xl">{"/"}</span> About Me
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass p-8 md:p-12 rounded-3xl"
                >
                    <p className="text-xl leading-relaxed text-slate-700 mb-6 font-medium">
                        I am a B.Tech Information Technology student at NMIMS University with strong interests in Data Science, Artificial Intelligence and Analytics. I enjoy building data-driven applications, machine learning systems and scalable software solutions.
                    </p>
                    <p className="text-xl leading-relaxed text-slate-700 font-medium">
                        My work includes AI models, analytics dashboards and full stack development projects. My goal is to work as a Data Scientist or AI Engineer, solving complex problems through technology.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
