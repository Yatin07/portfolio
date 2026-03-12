"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Send, ArrowUpRight } from "lucide-react";

export function Contact() {
    return (
        <>
            <section id="contact" className="py-32 px-4 bg-[#F8FAFC] relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                            Get In Touch
                        </h2>
                        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-7"
                        >
                            <form className="bg-white p-8 md:p-12 rounded-[2.5rem] flex flex-col gap-6 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2563EB] to-[#9333EA]"></div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2.5">
                                        <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Name</label>
                                        <input type="text" id="name" placeholder="John Doe" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium text-slate-900 placeholder:text-slate-400" />
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email</label>
                                        <input type="email" id="email" placeholder="john@example.com" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium text-slate-900 placeholder:text-slate-400" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                    <input type="text" id="subject" placeholder="Project Inquiry" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium text-slate-900 placeholder:text-slate-400" />
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                    <textarea id="message" rows={5} placeholder="Hello Yatin, I'd like to talk about..." className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="w-full mt-4 py-4 rounded-2xl btn-primary-gradient font-bold flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info & Socials */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5 flex flex-col justify-center gap-6"
                        >
                            <a href="mailto:yatinpatilyp07@gmail.com" className="group p-8 bg-white border border-slate-200/60 rounded-3xl hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300 flex items-start gap-6 cursor-pointer">
                                <div className="p-4 bg-blue-50 text-[#2563EB] rounded-2xl group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email</p>
                                    <p className="text-lg font-bold text-slate-900 break-all group-hover:text-[#2563EB] transition-colors">yatinpatilyp07@gmail.com</p>
                                </div>
                            </a>

                            <div className="grid grid-cols-2 gap-6">
                                <a href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" className="group p-8 bg-white border border-slate-200/60 rounded-3xl hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="p-3 rounded-full bg-slate-50 text-slate-600 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors duration-300">
                                        <Github size={28} />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-slate-900">GitHub</span>
                                </a>

                                <a href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" className="group p-8 bg-white border border-slate-200/60 rounded-3xl hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="p-3 rounded-full bg-slate-50 text-slate-600 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors duration-300">
                                        <Linkedin size={28} />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-slate-900">LinkedIn</span>
                                </a>
                            </div>

                            <a href="tel:9409694297" className="group px-8 py-6 bg-white border border-slate-200/60 rounded-3xl hover:border-[#2563EB]/30 hover:shadow-md transition-all duration-300 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Phone size={20} className="text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                                    <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">9409694297</span>
                                </div>
                                <ArrowUpRight size={18} className="text-slate-300 group-hover:text-[#2563EB] transition-colors" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-slate-200 bg-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-xl tracking-tighter text-slate-900">YP<span className="text-[#2563EB]">.</span></span>
                    </div>

                    <p className="text-slate-500 font-medium text-sm">
                        © {new Date().getFullYear()} Yatin Patil. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm font-bold text-slate-500 hover:text-[#2563EB] transition-colors">Home</a>
                        <a href="#about" className="text-sm font-bold text-slate-500 hover:text-[#2563EB] transition-colors">About</a>
                        <a href="#projects" className="text-sm font-bold text-slate-500 hover:text-[#2563EB] transition-colors">Projects</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
