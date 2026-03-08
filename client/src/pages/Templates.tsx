import { useNavigate } from "react-router-dom"
import { Code2, User, ShoppingBag, Rocket, Palette } from "lucide-react"
import { Link } from "react-router-dom"

export default function Templates() {
    const navigate = useNavigate()

    const handleSelectTemplate = (templatePrompt: string) => {
        navigate("/projects", { state: { initialPrompt: `Generate a ${templatePrompt} website` } })
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] font-['Inter'] selection:bg-[#00E87B]/30 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#059669]/10 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-70"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E87B]/5 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-50"></div>

            {/* Top Navigation */}
            <nav className="w-full flex justify-between items-center px-8 py-6 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#059669] to-[#00E87B] flex items-center justify-center shadow-[0_0_15px_rgba(0,232,123,0.5)]">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">DivStack AI</span>
                </div>
                <div className="flex items-center gap-8">
                    <Link to="#" className="text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors">How it works</Link>
                    <Link to="#" className="text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors">Templates</Link>
                    <button className="px-5 py-2.5 rounded-lg border border-[#00E87B]/50 text-[#00E87B] bg-[#00E87B]/10 hover:bg-[#00E87B]/20 text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(0,232,123,0.1)]">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center -mt-10 px-4 z-10">
                {/* Progress Indicator */}
                <div className="w-full max-w-3xl flex justify-between items-center mb-4 text-[11px] font-bold tracking-widest uppercase">
                    <span className="text-[#00E87B]">STEP 1 OF 4</span>
                    <span className="text-[#9CA3AF]">25% Complete</span>
                </div>
                <div className="w-full max-w-3xl h-1.5 bg-[#0D1117]/50 rounded-full mb-12 overflow-hidden flex relative">
                    <div className="h-full w-1/4 bg-gradient-to-r from-[#059669] to-[#00E87B] shadow-[0_0_10px_rgba(0,232,123,0.8)] rounded-full"></div>
                    <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
                </div>

                {/* Glass Container */}
                <div className="w-full max-w-4xl p-10 md:p-14 mb-8 rounded-[2rem] glass-card shadow-[0_0_80px_rgba(0,232,123,0.08)] relative animate-scale-in">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#00E87B]/5 to-transparent pointer-events-none opacity-50"></div>

                    <div className="text-center mb-12 relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">What are you building today?</h1>
                        <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">Select a template to help DivStack AI tailor your building experience and components.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 relative z-10">
                        {[
                            { prompt: "Personal Portfolio", icon: User, label: "Personal Portfolio", desc: "Showcase your creative work and professional experience." },
                            { prompt: "E-commerce Store", icon: ShoppingBag, label: "E-commerce Store", desc: "Launch your brand with a modern shopping experience." },
                            { prompt: "SaaS Landing Page", icon: Rocket, label: "SaaS Landing Page", desc: "Optimize conversions for your software product." },
                            { prompt: "Creative Agency", icon: Palette, label: "Creative Agency", desc: "A professional home for your studio's services." },
                        ].map(({ prompt, icon: Icon, label, desc }, idx) => (
                            <div
                                key={prompt}
                                onClick={() => handleSelectTemplate(prompt)}
                                className={`bg-[#0D1117]/60 border border-white/5 p-6 rounded-2xl hover:border-[#00E87B]/40 hover:bg-[#0D1117]/80 transition-all duration-300 cursor-pointer group flex items-start gap-4 hover:shadow-[0_0_30px_rgba(0,232,123,0.1)] active:scale-[0.97] animate-slide-up delay-${idx + 1}`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#0D1117]/60 flex items-center justify-center shrink-0 group-hover:bg-[#00E87B]/20 transition-colors border border-white/5">
                                    <Icon className="w-6 h-6 text-[#00E87B]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{label}</h3>
                                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-sm mx-auto">
                        <button
                            onClick={() => navigate("/onboarding-complete")}
                            className="w-full py-4 bg-gradient-to-r from-[#059669] to-[#00E87B] rounded-[14px] font-bold text-lg text-white shadow-[0_0_20px_rgba(0,232,123,0.4)] hover:shadow-[0_0_30px_rgba(0,232,123,0.6)] hover:scale-[1.02] transition-all duration-300 btn-glow btn-ripple"
                        >
                            Next Step
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm font-medium text-[#9CA3AF] hover:text-white underline decoration-[#9CA3AF]/50 underline-offset-4 transition-colors"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-[#9CA3AF]/50 uppercase mt-4">
                    <span className="w-12 border-t border-[#9CA3AF]/20"></span>
                    Built with AI
                    <span className="w-12 border-t border-[#9CA3AF]/20"></span>
                </div>
            </main>
        </div>
    )
}
