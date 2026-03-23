import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Terminal, Code2, Zap } from "lucide-react"

export default function Documentation() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] text-gray-900 dark:text-white font-sans transition-colors duration-500">
            <Navbar />

            <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl page-fade-in relative z-10">
                <div className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-sm border border-[#EAF2F8] dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] transition-colors duration-500">
                    <h1 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 uppercase tracking-tight">Documentation</h1>
                    <p className="text-gray-600 dark:text-[#9CA3AF] mb-8 text-lg font-medium transition-colors">Learn how to build, deploy, and manage your AI-generated websites with DivStack AI.</p>

                    <div className="space-y-10 text-gray-600 dark:text-[#9CA3AF] font-medium leading-relaxed transition-colors">

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg transition-colors">
                                    <Zap className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wide transition-colors">Getting Started</h2>
                            </div>
                            <p className="mb-4">
                                Generating your first website is incredibly simple. You don't need any prior coding experience—just a clear idea of what you want to build.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-blue-500 dark:marker:text-blue-400">
                                <li><strong className="text-gray-900 dark:text-white transition-colors">Sign up</strong> for a free DivStack AI account.</li>
                                <li>Navigate to the <strong className="text-gray-900 dark:text-white transition-colors">AI Builder</strong> dashboard.</li>
                                <li>Type a detailed prompt describing your desired website (e.g., "A modern portfolio for a freelance photographer featuring a dark theme and a masonry gallery").</li>
                                <li>Click <strong className="text-gray-900 dark:text-white transition-colors">Generate</strong> and watch the AI construct your site in real-time.</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg transition-colors">
                                    <Terminal className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wide transition-colors">Writing Effective Prompts</h2>
                            </div>
                            <p className="mb-4">
                                The quality of the generated code heavily depends on how descriptive your prompt is. Follow these best practices to get optimal results:
                            </p>
                            <div className="bg-gray-50 dark:bg-[#050505] p-5 rounded-xl border border-gray-200 dark:border-white/10 font-mono text-sm text-gray-700 dark:text-gray-300 shadow-inner transition-colors">
                                "Create a SaaS landing page for an analytics tool. Use a dark theme with vibrant purple gradients. Include a hero section with a mockup image, a features grid with glowing icons, and a staggered pricing table."
                            </div>
                            <p className="mt-4">Be specific about color palettes, layout structures (like grids or flexboxes), and the vibe you're aiming for.</p>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg transition-colors">
                                    <Code2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wide transition-colors">Viewing and Exporting Code</h2>
                            </div>
                            <p className="mb-4">
                                Once your website is generated, DivStack AI provides full access to the underlying React and Tailwind CSS source code.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500 dark:marker:text-emerald-400">
                                <li>Toggle to the <strong className="text-gray-900 dark:text-white transition-colors">Code View</strong> to inspect the React components.</li>
                                <li>Your code is automatically structured following modern standard practices.</li>
                                <li>Click the <strong className="text-gray-900 dark:text-white transition-colors">Download Code</strong> button to export a complete Vite application that you can run locally via <code className="bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 transition-colors">npm install && npm run dev</code>.</li>
                            </ul>
                        </section>


                        <section className="pt-8 border-t border-gray-200 dark:border-white/10 transition-colors">
                            <p className="text-sm font-bold tracking-wide">
                                Still need help? Visit our <a href="/community" className="text-blue-500 hover:text-blue-600 dark:text-[#00E87B] dark:hover:text-[#34D399] transition-colors">Community Forums</a> or contact support.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
