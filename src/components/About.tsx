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
                    I am a Data Science and Machine Learning enthusiast with a strong interest in extracting actionable insights from complex datasets. My work revolves around building robust predictive models and implementing end-to-end data analytics pipelines to solve real-world problems.
                </p>
                <p>
                    Most of my recent experience involves analyzing large-scale data, creating interactive data analytics dashboards, and training deep learning models. I also have solid full-stack engineering exposure, which allows me to seamlessly integrate AI and data models into scalable web applications and intuitive user interfaces.
                </p>
                <p>
                    Whether it's designing a Galaxy Schema in Power BI, training a CNN in TensorFlow, or spinning up a responsive React dashboard, I am driven by a passion for continuous learning and engineering excellence.
                </p>
            </motion.div>
        </section>
    );
}
