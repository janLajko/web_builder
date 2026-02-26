import { useNavigate } from "react-router-dom"
import { Code2, User, ShoppingBag, Rocket, Palette } from "lucide-react"
import { Link } from "react-router-dom"

export default function Templates() {
    const navigate = useNavigate()

    const handleSelectTemplate = (templatePrompt: string) => {
        navigate("/projects", { state: { initialPrompt: `Generate a ${templatePrompt} website` } })
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#111111] font-['Inter'] selection:bg-primaryStart/30 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6c28d9]/10 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-70"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2A8]/5 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-50"></div>

            {/* Top Navigation */}
            <nav className="w-full flex justify-between items-center px-8 py-6 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#089684] flex items-center justify-center shadow-[0_0_15px_rgba(20,241,149,0.5)]">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">DivStack AI</span>
                </div>
                <div className="flex items-center gap-8">
                    <Link to="#" className="text-sm font-medium text-[#a19db3] hover:text-white transition-colors">How it works</Link>
                    <Link to="#" className="text-sm font-medium text-[#a19db3] hover:text-white transition-colors">Templates</Link>
                    <button className="px-5 py-2.5 rounded-lg border border-[#089684]/50 text-[#00C2A8] bg-[#089684]/10 hover:bg-[#089684]/20 text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(20,241,149,0.1)]">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center -mt-10 px-4 z-10">
                {/* Progress Indicator */}
                <div className="w-full max-w-3xl flex justify-between items-center mb-4 text-[11px] font-bold tracking-widest uppercase">
                    <span className="text-[#14F195]">STEP 1 OF 4</span>
                    <span className="text-[#a19db3]">25% Complete</span>
                </div>
                <div className="w-full max-w-3xl h-1.5 bg-[#1A1A1A]/50 rounded-full mb-12 overflow-hidden flex">
                    <div className="h-full w-1/4 bg-gradient-to-r from-[#14F195] to-[#00C2A8] shadow-[0_0_10px_rgba(20,241,149,0.8)] rounded-full"></div>
                </div>

                {/* Glass Container */}
                <div className="w-full max-w-4xl p-10 md:p-14 mb-8 rounded-[2rem] bg-[#1A1A1A]/20 backdrop-blur-xl border border-white/5 shadow-[0_0_80px_rgba(20,241,149,0.1)] relative">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#14F195]/5 to-transparent pointer-events-none opacity-50"></div>

                    <div className="text-center mb-12 relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">What are you building today?</h1>
                        <p className="text-[#a19db3] text-lg max-w-xl mx-auto">Select a template to help DivStack AI tailor your building experience and components.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 relative z-10">
                        {/* Option 1 */}
                        <div
                            onClick={() => handleSelectTemplate("Personal Portfolio")}
                            className="bg-[#1A1A1A]/80 border border-white/5 p-6 rounded-2xl hover:border-[#14F195]/50 hover:bg-[#25163f]/80 transition-all cursor-pointer group flex items-start gap-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A]/60 flex items-center justify-center shrink-0 group-hover:bg-[#14F195]/20 transition-colors">
                                <User className="w-6 h-6 text-[#14F195]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Personal Portfolio</h3>
                                <p className="text-sm text-[#a19db3] leading-relaxed">Showcase your creative work and professional experience.</p>
                            </div>
                        </div>

                        {/* Option 2 */}
                        <div
                            onClick={() => handleSelectTemplate("E-commerce Store")}
                            className="bg-[#1A1A1A]/80 border border-white/5 p-6 rounded-2xl hover:border-[#14F195]/50 hover:bg-[#25163f]/80 transition-all cursor-pointer group flex items-start gap-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A]/60 flex items-center justify-center shrink-0 group-hover:bg-[#14F195]/20 transition-colors">
                                <ShoppingBag className="w-6 h-6 text-[#14F195]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">E-commerce Store</h3>
                                <p className="text-sm text-[#a19db3] leading-relaxed">Launch your brand with a modern shopping experience.</p>
                            </div>
                        </div>

                        {/* Option 3 */}
                        <div
                            onClick={() => handleSelectTemplate("SaaS Landing Page")}
                            className="bg-[#1A1A1A]/80 border border-white/5 p-6 rounded-2xl hover:border-[#14F195]/50 hover:bg-[#25163f]/80 transition-all cursor-pointer group flex items-start gap-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A]/60 flex items-center justify-center shrink-0 group-hover:bg-[#14F195]/20 transition-colors">
                                <Rocket className="w-6 h-6 text-[#14F195]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">SaaS Landing Page</h3>
                                <p className="text-sm text-[#a19db3] leading-relaxed">Optimize conversions for your software product.</p>
                            </div>
                        </div>

                        {/* Option 4 */}
                        <div
                            onClick={() => handleSelectTemplate("Creative Agency")}
                            className="bg-[#1A1A1A]/80 border border-white/5 p-6 rounded-2xl hover:border-[#14F195]/50 hover:bg-[#25163f]/80 transition-all cursor-pointer group flex items-start gap-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A]/60 flex items-center justify-center shrink-0 group-hover:bg-[#14F195]/20 transition-colors">
                                <Palette className="w-6 h-6 text-[#14F195]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Creative Agency</h3>
                                <p className="text-sm text-[#a19db3] leading-relaxed">A professional home for your studio's services.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-sm mx-auto">
                        <button
                            onClick={() => navigate("/onboarding-complete")}
                            className="w-full py-4 bg-gradient-to-r from-[#089684] to-[#00C2A8] rounded-[14px] font-bold text-lg text-white shadow-[0_0_20px_rgba(20,241,149,0.4)] hover:shadow-[0_0_30px_rgba(20,241,149,0.6)] hover:scale-[1.02] transition-all duration-300"
                        >
                            Next Step
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm font-medium text-[#a19db3] hover:text-white underline decoration-[#a19db3]/50 underline-offset-4 transition-colors"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-[#a19db3]/50 uppercase mt-4">
                    <span className="w-12 border-t border-[#a19db3]/20"></span>
                    Built with AI
                    <span className="w-12 border-t border-[#a19db3]/20"></span>
                </div>
            </main>
        </div>
    )
}
