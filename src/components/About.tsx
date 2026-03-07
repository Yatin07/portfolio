export function About() {
    return (
        <section id="about" className="py-20 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
                    <span className="text-secondary">{"//"}</span> About Me
                </h2>

                <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-lg leading-relaxed text-slate-700 mb-6">
                        I am a B.Tech Information Technology student at NMIMS University with strong interests in Data Science, Artificial Intelligence and Analytics. I enjoy building data-driven applications, machine learning systems and scalable software solutions.
                    </p>
                    <p className="text-lg leading-relaxed text-slate-700">
                        My work includes AI models, analytics dashboards and full stack development projects. My goal is to work as a Data Scientist or AI Engineer, solving complex problems through technology.
                    </p>
                </div>
            </div>
        </section>
    );
}
