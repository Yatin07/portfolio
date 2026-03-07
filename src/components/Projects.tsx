import { ExternalLink, Github } from "lucide-react";

export function Projects() {
    const projects = [
        {
            title: "UrbanVoice",
            desc: "Full stack civic issue reporting system.",
            features: "Role based access, Real time tracking, SLA monitoring, AI categorization.",
            tech: ["Flutter", "React", "Firebase", "AI"],
            link: "#"
        },
        {
            title: "Tennis ATP Analytics",
            desc: "Interactive Power BI analytics dashboard analyzing ATP rankings.",
            features: "Galaxy schema, DAX KPIs, ML predictions.",
            tech: ["Power BI", "Python", "XGBoost"],
            link: "#"
        },
        {
            title: "Agro.ai",
            desc: "AI system detecting plant diseases using deep learning.",
            features: "87k images, 38 disease classes, MobileNetV2 feature extraction.",
            tech: ["TensorFlow", "Scikit", "Python"],
            link: "#"
        }
    ];

    return (
        <section id="projects" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
                    <span className="text-blue-600">{"//"}</span> Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col h-full">
                            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{p.desc}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">{p.features}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {p.tech.map((t, j) => (
                                    <span key={j} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                <a href={p.link} className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition-colors">
                                    <ExternalLink size={16} /> Live
                                </a>
                                <a href={p.link} className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition-colors">
                                    <Github size={16} /> Code
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
