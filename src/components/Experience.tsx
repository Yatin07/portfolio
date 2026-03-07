export function Experience() {
    const certs = [
        "Microsoft SQL Server from Scratch – Udemy (2026)",
        "Agentic AI: From Learner to Builder – IBM SkillsBuild (2025)"
    ];

    return (
        <section id="experience" className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2 text-primary">
                    <span className="text-secondary">{"//"}</span> Experience & Certs
                </h2>

                <div className="mb-10 p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-primary">Data Analytics Summer Internship</h3>
                            <p className="text-secondary font-bold mt-1">IBM SkillsBuild</p>
                        </div>
                        <p className="text-slate-500 mt-2 md:mt-0 font-medium">June 2024 – August 2024</p>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        Worked on real world datasets focusing on data cleaning, visualization, exploratory data analysis, and generating data driven insights.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4 text-primary">Certifications</h3>
                    <ul className="space-y-3">
                        {certs.map((cert, i) => (
                            <li key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                <span className="text-slate-700 font-medium">{cert}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
