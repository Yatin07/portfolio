import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Contact() {
    return (
        <>
            <section id="contact" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-primary">
                        <span className="text-secondary">{"//"}</span> Get In Touch
                    </h2>
                    <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <a
                        href="mailto:yatinpatil07@example.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-blue-700 text-white font-bold rounded-full transition-colors text-lg shadow-md"
                    >
                        <Mail size={20} /> Say Hello
                    </a>

                    <div className="flex justify-center gap-6 mt-16">
                        <a href="https://github.com/Yatin07" target="_blank" rel="noopener noreferrer" className="p-4 bg-white border border-slate-200 shadow-sm rounded-full text-slate-600 hover:text-secondary hover:border-secondary transition-all">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/yatinpatil07" target="_blank" rel="noopener noreferrer" className="p-4 bg-white border border-slate-200 shadow-sm rounded-full text-slate-600 hover:text-secondary hover:border-secondary transition-all">
                            <Linkedin size={24} />
                        </a>
                        <a href="tel:9409694297" className="p-4 bg-white border border-slate-200 shadow-sm rounded-full text-slate-600 hover:text-secondary hover:border-secondary transition-all">
                            <Phone size={24} />
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-8 text-center bg-white text-slate-500 text-sm font-medium">
                <p>Built with Next.js & Tailwind CSS. © {new Date().getFullYear()} Yatin Patil.</p>
            </footer>
        </>
    );
}
