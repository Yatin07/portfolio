"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(from + (to - from) * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(to);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, from, to, duration]);

    return <span ref={ref}>{count}</span>;
};

export function StatsStrip() {
    const stats = [
        { label: "Major Projects", value: 3, suffix: "+" },
        { label: "Internship", value: 1, suffix: "" },
        { label: "Technologies", value: 5, suffix: "+" },
    ];

    return (
        <section className="py-12 px-4 border-y border-slate-200/50 bg-slate-50/50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/50">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="pt-8 md:pt-0 first:pt-0"
                        >
                            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                                <AnimatedCounter to={stat.value} />
                                <span className="text-[#2563EB]">{stat.suffix}</span>
                            </div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
