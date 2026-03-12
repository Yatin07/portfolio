"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-20 px-4 mb-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">8.</span> Contact
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4">
                        <a href="mailto:yatinpatilyp07@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                            <Mail size={18} />
                            <span className="font-medium">yatinpatilyp07@gmail.com</span>
                        </a>
                        <a href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                            <Github size={18} />
                            <span className="font-medium">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                            <Linkedin size={18} />
                            <span className="font-medium">LinkedIn</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</label>
                            <input type="text" id="name" className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors text-slate-900" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors text-slate-900" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</label>
                            <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors text-slate-900 resize-none"></textarea>
                        </div>
                        <button
                            type="button"
                            className="mt-2 w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
