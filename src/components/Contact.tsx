import { Github, Linkedin, Mail } from "lucide-react";

export function Contact() {
    return (
        <>
            <section id="contact" className="py-20 px-4">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                        <span className="text-blue-600">{"//"}</span> Get In Touch
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors text-lg"
                    >
                        <Mail size={20} /> Say Hello
                    </a>

                    <div className="flex justify-center gap-6 mt-16">
                        <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-blue-600 transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-blue-600 transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:hello@example.com" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-blue-600 transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-8 text-center border-t border-slate-100 dark:border-slate-800 text-slate-500 text-sm">
                <p>Built with Next.js & Tailwind CSS. © {new Date().getFullYear()} Yatin Patil.</p>
            </footer>
        </>
    );
}
