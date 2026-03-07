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
        <section id="education" className="py-20 px-4 bg-slate-50">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2 text-primary">
                    <span className="text-secondary">{"//"}</span> Education
                </h2>

                <div className="space-y-6">
                    {edu.map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                            <div>
                                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                <p className="text-slate-600 mt-1 font-medium">{item.inst}</p>
                            </div>
                            <div className="md:text-right">
                                <span className="inline-block px-4 py-1.5 bg-accent text-secondary rounded-full text-sm font-bold mb-2">
                                    {item.year}
                                </span>
                                <p className="font-semibold text-slate-800">{item.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
