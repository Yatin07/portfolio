"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-lg">1.</span> About
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-3xl text-slate-600 space-y-6 text-lg leading-relaxed"
            >
                <p>
                    I'm an Information Technology student currently focusing on Data Science, Artificial Intelligence, and Web Development. I enjoy digging into messy datasets to find patterns, and I build end-to-end applications to serve those insights.
                </p>
                <p>
                    Most of my recent work involves training machine learning models, creating analytics dashboards, and writing robust backend code. I like solving problems that require both a solid understanding of data and the engineering skills to put that data to work in a real product.
                </p>
                <p>
                    Whether it's building a predictive model with Scikit-learn or spinning up a Next.js interface, I focus on writing clean, maintainable code.
                </p>
            </motion.div>
        </section>
    );
}
