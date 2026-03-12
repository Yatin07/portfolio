"use client";

import { motion } from "framer-motion";
import { Github, GitPullRequest, GitCommit } from "lucide-react";

export function GitHubActivity() {
    return (
        <section id="github" className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center justify-center gap-4">
                        <Github className="text-[#2563EB]" size={36} />
                        GitHub Activity
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-5 h-full"
                    >
                        <div className="glass-premium p-8 lg:p-10 rounded-3xl flex flex-col justify-center items-center text-center group border border-slate-200 shadow-sm h-full relative overflow-hidden">
                            {/* Decorative glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500"></div>

                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
                                <Github size={40} className="text-[#2563EB]" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2 relative z-10 tracking-tight">@Yatin07</h3>
                            <p className="text-slate-500 font-medium mb-10 relative z-10">Active contributor to open source & personal projects.</p>

                            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
                                <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50 hover:bg-white transition-colors">
                                    <GitCommit className="mx-auto text-[#4F46E5] mb-3" size={24} />
                                    <span className="block text-3xl font-black text-slate-900 mb-1 tracking-tight">100+</span>
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Commits</span>
                                </div>
                                <div className="bg-white/60 p-5 rounded-2xl border border-slate-200/50 hover:bg-white transition-colors">
                                    <GitPullRequest className="mx-auto text-[#4F46E5] mb-3" size={24} />
                                    <span className="block text-3xl font-black text-slate-900 mb-1 tracking-tight">15+</span>
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Repos</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* API Generated Graph (Using generic GitHub Readme Stats API) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7 h-full"
                    >
                        <div className="bg-[#F8FAFC] p-8 lg:p-12 rounded-3xl flex items-center justify-center border border-slate-200 shadow-sm h-full hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=Yatin07&show_icons=true&theme=transparent&hide_border=true&title_color=0F172A&icon_color=2563EB&text_color=64748B&bg_color=ffffff00"
                                alt="Yatin07 GitHub Stats"
                                className="w-full max-w-lg object-contain drop-shadow-sm mix-blend-multiply"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
