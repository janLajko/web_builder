import { useNavigate, useLocation } from "react-router-dom"
import { CheckCircle2, Rocket, PlayCircle, BookOpen } from "lucide-react"

export default function OnboardingComplete() {
    const navigate = useNavigate()
    const location = useLocation()
    const templateName = location.state?.templatePrompt || "modern SaaS landing page"

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#111111] font-['Inter'] selection:bg-primaryStart/30 px-4">

            <div className="w-full max-w-[800px] p-8 md:p-12 rounded-[2rem] bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/5 shadow-[0_0_80px_rgba(20,241,149,0.1)] relative overflow-hidden">
                {/* Internal Glow Effect */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6c28d9]/10 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

                {/* Progress Indicator */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#00C2A8]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Onboarding Complete</span>
                    </div>
                    <span className="text-sm font-medium text-[#a19db3]">100%</span>
                </div>
                <div className="w-full h-[3px] bg-gradient-to-r from-[#14F195] to-[#00C2A8] rounded-full mb-12 shadow-[0_0_10px_rgba(20,241,149,0.8)]"></div>

                <div className="text-center mb-10 relative z-10">
                    <h1 className="text-4xl md:text-[44px] font-bold text-white mb-6 tracking-tight">You're all set, Alex.</h1>
                    <p className="text-lg text-[#a19db3] max-w-xl mx-auto leading-relaxed font-light">
                        Our AI is ready to bring your vision to life. Explore your new workspace and start generating components in seconds.
                    </p>
                </div>

                {/* Simulated Workspace Preview Graphic */}
                <div className="w-full h-[280px] bg-[#111111] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative mb-12 flex items-center justify-center">

                    {/* Fake window controls */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>

                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1A1A]/60 border border-[#089684]/30 text-xs font-semibold text-[#14F195] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] shadow-[0_0_8px_#00C2A8] animate-pulse"></div>
                        LIVE PREVIEW
                    </div>

                    {/* Gradient floating lines background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #1f1433 1px, transparent 1px), linear-gradient(to bottom, #1f1433 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Glowing AI prompt simulation */}
                    <div className="relative z-10 w-[420px] bg-[#221536]/80 backdrop-blur-md rounded-2xl border border-[#089684]/30 p-5 shadow-[0_0_40px_rgba(20,241,149,0.15)] flex flex-col">
                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#00C2A8]/60 to-[#14F195]/60 blur opacity-40 -z-10"></div>
                        <span className="text-[10px] font-bold tracking-widest text-[#00C2A8] uppercase mb-2">AI Prompt</span>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-white italic text-lg font-light flex-1">
                                <span className="text-[#14F195] font-serif font-black flex items-center gap-1">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5L18.5 19h-13L12 6.5z" /></svg>
                                    _RK
                                </span>
                                "{`Create a ${templateName.toLowerCase()}...`}"
                            </div>
                            <div className="bg-[#14F195] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow">
                                Generate
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => navigate("/projects", { state: { initialPrompt: `Create a ${templateName}` } })}
                        className="px-10 py-4 bg-[#14F195] hover:bg-[#089684] rounded-xl font-bold text-lg text-white flex items-center gap-3 shadow-[0_0_20px_rgba(20,241,149,0.4)] hover:shadow-[0_0_30px_rgba(20,241,149,0.6)] hover:scale-[1.02] transition-all duration-300"
                    >
                        <Rocket className="w-5 h-5" />
                        Start Building
                    </button>
                </div>

                <div className="flex justify-center items-center gap-8 text-sm font-medium text-[#a19db3]">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <PlayCircle className="w-5 h-5" /> Watch quick tutorial
                    </button>
                    <div className="w-px h-4 bg-white/10"></div>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" /> Read documentation
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-[#a19db3] font-medium">
                Need help? <a href="#" className="text-[#00C2A8] hover:underline">Contact our success team</a> available 24/7.
            </div>
        </div>
    )
}
