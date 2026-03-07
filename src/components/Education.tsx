export function Education() {
    const edu = [
        {
            title: "B.Tech Information Technology",
            inst: "NMIMS University",
            year: "2023 – 2027",
            score: "CGPA: 3.58 / 4.0"
        },
        {
            title: "HSC",
            inst: "Secondary Education",
            year: "2023",
            score: "81.16%"
        },
        {
            title: "SSC",
            inst: "Primary Education",
            year: "2021",
            score: "60.46%"
        }
    ];

    return (
        <section id="education" className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
                    <span className="text-blue-600">{"//"}</span> Education
                </h2>

                <div className="space-y-6">
                    {edu.map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors">
                            <div>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{item.inst}</p>
                            </div>
                            <div className="md:text-right">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-2">
                                    {item.year}
                                </span>
                                <p className="font-semibold text-slate-800 dark:text-slate-200">{item.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
