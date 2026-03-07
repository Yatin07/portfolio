"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";

export function Contact() {
    return (
        <>
            <section id="contact" className="py-24 px-4 bg-white relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-black mb-6 flex items-center justify-center gap-3 text-slate-900">
                            <span className="text-secondary text-5xl">{"/"}</span> Get In Touch
                        </h2>
                        <p className="text-slate-600 mb-12 text-xl font-medium leading-relaxed">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="mailto:yatinpatil07@example.com"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-secondary to-blue-800 text-white font-black rounded-full transition-all text-lg shadow-xl shadow-blue-500/30"
                        >
                            <Sparkles size={20} /> Say Hello
                        </motion.a>

                        <div className="flex justify-center gap-6 mt-20">
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer"
                                className="p-4 glass glass-hover rounded-2xl text-slate-700 font-bold"
                            >
                                <Github size={28} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer"
                                className="p-4 glass glass-hover rounded-2xl text-slate-700 font-bold"
                            >
                                <Linkedin size={28} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="tel:9409694297"
                                className="p-4 glass glass-hover rounded-2xl text-slate-700 font-bold"
                            >
                                <Phone size={28} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-10 text-center bg-slate-50 border-t border-slate-200/50 text-slate-500 text-sm font-bold">
                <p>Built with Next.js, Tailwind CSS & Framer Motion. © {new Date().getFullYear()} Yatin Patil.</p>
            </footer>
        </>
    );
}
