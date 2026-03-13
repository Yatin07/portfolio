"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[1100px] mx-auto"
            >
                <h2 className="text-[#0F172A] mb-4">Contact</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1100px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <p className="text-lg mb-8 leading-[1.7] text-[#475569] max-w-md font-medium">
                        I'm currently open to internships, collaborations, and interesting projects. Whether you have a question or just want to say hi, my inbox is always open!
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:yatinpatilyp07@gmail.com" className="flex items-center gap-4 text-[#475569] hover:text-[#1E3A8A] transition-colors group">
                            <div className="p-3 bg-[#EEF2FF] rounded-lg group-hover:bg-[#E0E7FF] transition-colors">
                                <Mail size={20} className="text-[#4338CA]" />
                            </div>
                            <span className="font-semibold">yatinpatilyp07@gmail.com</span>
                        </a>
                        <a href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#475569] hover:text-[#1E3A8A] transition-colors group">
                            <div className="p-3 bg-[#EEF2FF] rounded-lg group-hover:bg-[#E0E7FF] transition-colors">
                                <Github size={20} className="text-[#4338CA]" />
                            </div>
                            <span className="font-semibold">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#475569] hover:text-[#1E3A8A] transition-colors group">
                            <div className="p-3 bg-[#EEF2FF] rounded-lg group-hover:bg-[#E0E7FF] transition-colors">
                                <Linkedin size={20} className="text-[#4338CA]" />
                            </div>
                            <span className="font-semibold">LinkedIn</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <form className="premium-card p-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold text-[#0F172A]">Name</label>
                            <input type="text" id="name" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors text-[#0F172A] placeholder:text-[#94A3B8]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-[#0F172A]">Email</label>
                            <input type="email" id="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors text-[#0F172A] placeholder:text-[#94A3B8]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-semibold text-[#0F172A]">Message</label>
                            <textarea id="message" rows={4} placeholder="Hello Yatin..." className="w-full px-4 py-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors text-[#0F172A] placeholder:text-[#94A3B8] resize-none"></textarea>
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full btn-primary"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
