"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export function Experience() {
    return (
        <section id="experience" className="py-24 px-4 bg-[#F8FAFC] relative overflow-hidden">
            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-4">
                        <span className="text-[#2563EB]">04.</span> Experience
                        <div className="h-[1px] bg-slate-200 flex-grow ml-4 rounded-full"></div>
                    </h2>
                </motion.div>

                <div className="relative pl-4 md:pl-0">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 md:-translate-x-1/2 rounded-full"></div>

                    {/* Timeline Item */}
                    <div className="relative mb-12 flex flex-col md:flex-row items-start md:justify-between w-full">
                        {/* Desktop: Empty Left Side */}
                        <div className="hidden md:block md:w-[45%] text-right pr-12 pt-4">
                            <h4 className="text-[#2563EB] font-bold text-lg mb-1">June 2024 – August 2024</h4>
                            <span className="inline-block px-3 py-1 bg-white text-slate-500 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
                                Remote
                            </span>
                        </div>

                        {/* Timeline Marker */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-[#2563EB] flex items-center justify-center translate-x-0 md:-translate-x-1/2 z-10 shadow-md"
                        >
                            <Briefcase size={16} className="text-[#2563EB]" />
                        </motion.div>

                        {/* Content Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full md:w-[45%] pl-12 md:pl-12 pt-1"
                        >
                            <div className="glass-premium p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-md hover:shadow-xl transition-shadow duration-300 relative group">
                                {/* Mobile Date Badge */}
                                <div className="block md:hidden mb-4">
                                    <h4 className="text-[#2563EB] font-bold text-sm mb-2">June 2024 – August 2024</h4>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-[#4F46E5] transition-colors">Data Analytics Summer Internship</h3>
                                <p className="text-[#4F46E5] font-bold text-base mt-1 mb-4">IBM SkillsBuild</p>

                                <p className="text-slate-600 leading-relaxed text-[15px] font-medium mb-5">
                                    Worked on real-world datasets focusing on data cleaning, visualization, exploratory data analysis, and generating data-driven insights. Built comprehensive dashboards and predictive models to aid decision-making processes.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {["Data Cleaning", "EDA", "Visualization", "Predictive Modeling"].map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
