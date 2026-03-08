import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export default function AboutUs() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] text-gray-900 dark:text-white font-sans transition-colors duration-500">
            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl page-fade-in relative z-10">
                <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-sm border border-[#EAF2F8] dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] transition-colors duration-500">
                    <h1 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 uppercase tracking-tight">About DivStack AI</h1>

                    <div className="space-y-8 text-gray-600 dark:text-[#9CA3AF] font-medium leading-relaxed transition-colors">
                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">Our Mission</h2>
                            <p>
                                At DivStack AI, our mission is to empower creators, developers, and businesses to build stunning, production-ready web applications without writing a single line of code by hand. We believe that state-of-the-art design and robust engineering should be accessible to everyone.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">What We Do</h2>
                            <p>
                                We provide an advanced, AI-driven website builder that translates simple text prompts into fully functional, aesthetically brilliant web pages. By integrating cutting-edge large language models with modern frontend frameworks like React and Tailwind CSS, we craft performant websites that are as beautiful as they are functional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">Why Choose Us?</h2>
                            <p>
                                Unlike legacy website builders that lock you into rigid templates, DivStack AI builds from the ground up based on your exact specifications. You get clean, exportable code, seamless dark-mode themes, and interactive micro-animations out of the box. Whether you need a landing page, a portfolio, or a SaaS dashboard, DivStack AI delivers premium quality in seconds.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wide transition-colors">The Team</h2>
                            <p>
                                We are a passionate team of designers, engineers, and AI researchers dedicated to pushing the boundaries of automated web development. We continually refine our models to ensure that every generated site meets the highest standards of modern web design.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-gray-200 dark:border-white/10 transition-colors">
                            <p className="text-sm font-bold tracking-wide">
                                Have questions or want to collaborate? Get in touch with us at <a href="mailto:contact@divstack.ai" className="text-blue-500 hover:text-blue-600 dark:text-[#08f1f1] dark:hover:text-[#07f3f3] transition-colors">contact@divstack.ai</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
