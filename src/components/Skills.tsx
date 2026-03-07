export function Skills() {
    const skillCategories = [
        {
            title: "Programming",
            skills: ["Python", "SQL", "Java", "C++"]
        },
        {
            title: "Data Science & AI",
            skills: ["Machine Learning", "Deep Learning", "Predictive Modeling"]
        },
        {
            title: "Libraries & Tools",
            skills: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "XGBoost", "Git", "MySQL"]
        },
        {
            title: "Development & Analytics",
            skills: ["React.js", "Firebase", "REST APIs", "Power BI", "Tableau", "DAX", "Data Modeling"]
        }
    ];

    return (
        <section id="skills" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
                    <span className="text-blue-600">{"//"}</span> Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((cat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, j) => (
                                    <span key={j} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
