export function About() {
    return (
        <section id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <span className="text-blue-600">{"//"}</span> About Me
                </h2>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                        I am a B.Tech Information Technology student at NMIMS University with strong interests in Data Science, Artificial Intelligence and Analytics. I enjoy building data-driven applications, machine learning systems and scalable software solutions.
                    </p>
                    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                        My work includes AI models, analytics dashboards and full stack development projects. My goal is to work as a Data Scientist or AI Engineer, solving complex problems through technology.
                    </p>
                </div>
            </div>
        </section>
    );
}
