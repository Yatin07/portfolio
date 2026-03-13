"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-[100px] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-[650px] mx-auto flex items-center gap-4"
            >
                <span className="text-4xl md:text-5xl font-light text-[#CBD5E1]">01</span>
                <h2 className="text-[#0F172A] m-0">About</h2>
                <div className="flex-grow h-px bg-[#E2E8F0] ml-4 md:ml-6"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-[650px] mx-auto text-[#475569] space-y-6 text-lg leading-[1.7] font-medium"
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
