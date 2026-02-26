import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Wand2, Layers, History, Users, CreditCard, ChevronRight, Check, Menu, X } from "lucide-react"
import { useSession } from "../lib/authClient"
import toast from "react-hot-toast"
import videoFile from "../assets/Ai_startup_product_launch_5fd098b72c.mp4"

export default function Home() {
    const [input, setInput] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!session?.user) {
            navigate('/auth')
            return
        }
        if (!input.trim()) {
            toast.error("Please enter a message")
            return
        }

        try {
            // Let the projects page handle the API call and loading steps!
            navigate('/projects', { state: { initialPrompt: input } })
        } catch (error: any) {
            toast.error("An error occurred")
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#111111] text-white font-['Inter'] selection:bg-primaryStart/30 overflow-x-hidden relative">

            {/* Top Navigation */}
            <nav className="border-b border-white/5 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden text-[#a19db3] hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14F195] to-[#00C2A8] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(20,241,149,0.4)]">
                                <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">DivStack AI</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-[#a19db3] font-medium">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/ai-builder" className="hover:text-white transition-colors">AI Builder</Link>
                        {session?.user && <Link to="/my-projects" className="hover:text-white transition-colors">My Projects</Link>}
                        <Link to="/community" className="hover:text-white transition-colors">Community</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        {session?.user ? (
                            <Link to="/projects" className="hidden sm:block text-white hover:text-[#14F195] transition-colors">Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/auth" className="hidden sm:block text-white hover:text-[#14F195] transition-colors">Sign In</Link>
                                <Link to="/auth" className="px-5 py-2.5 bg-[#14F195] hover:bg-[#089684] rounded-lg text-white shadow-[0_0_15px_rgba(20,241,149,0.3)] transition-all">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-[#1A1A1A] border-b border-white/5 py-4 px-6 shadow-2xl z-40">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-[#14F195] transition-colors">Home</Link>
                            <Link to="/ai-builder" onClick={() => setIsMenuOpen(false)} className="text-[#a19db3] hover:text-white transition-colors">AI Builder</Link>
                            {session?.user && <Link to="/my-projects" onClick={() => setIsMenuOpen(false)} className="text-[#a19db3] hover:text-white transition-colors">My Projects</Link>}
                            <Link to="/community" onClick={() => setIsMenuOpen(false)} className="text-[#a19db3] hover:text-white transition-colors">Community</Link>
                            <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="text-[#a19db3] hover:text-white transition-colors">Privacy</Link>
                            {!session?.user && (
                                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-[#a19db3] hover:text-white transition-colors pt-2 border-t border-white/5">Sign In</Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-1 flex flex-col items-center">

                {/* Hero Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-white/10 text-[11px] font-bold text-[#14F195] uppercase tracking-wider mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#00C2A8] animate-pulse"></span>
                        Now in Beta: OPen GLM AIr free Integrations
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl">
                        Build Production <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] via-[#00C2A8] to-[#14F195]">Websites with AI</span> in Seconds
                    </h1>

                    <p className="text-lg text-[#a19db3] max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        The world's most advanced AI engine for front-end development. From natural language prompt to a hosted production site in one click.
                    </p>

                    {/* Prompt Bar (Matching Reference) */}
                    <form onSubmit={handleSubmit} className="w-full max-w-3xl relative mb-24 mt-8">
                        <div className="relative bg-[#1A1A1A]/40 border border-[#089684]/30 rounded-2xl flex flex-col items-end shadow-2xl transition-colors focus-within:border-[#14F195] focus-within:bg-[#1A1A1A]/60 h-[140px] overflow-hidden">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Describe your presentation in details"
                                className="w-full flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#a19db3]/70 text-base md:text-lg px-6 py-5 resize-none placeholder:font-light"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmit(e)
                                    }
                                }}
                            />
                            <div className="absolute bottom-4 right-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#14F195] to-[#14F195] hover:from-[#00C2A8] hover:to-[#14F195] rounded-lg text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(20,241,149,0.4)]"
                                >
                                    Create with AI
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Mock Browser Window */}
                    <div className="w-full max-w-5xl rounded-3xl bg-[#1A1A1A] border border-white/10 shadow-[0_0_100px_rgba(20,241,149,0.15)] overflow-hidden relative group">
                        {/* Browser Chrome */}
                        <div className="h-12 bg-[#1A1A1A]/80 border-b border-white/5 flex items-center px-4 relative z-20">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/5 text-[10px] text-[#a19db3] font-mono border border-white/5">
                                divstack-ai-preview.localhost
                            </div>
                        </div>

                        {/* Canvas Image / Content */}
                        <div className="relative aspect-video flex items-center justify-center bg-black overflow-hidden pb-10">
                            <video
                                src={videoFile}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />

                            {/* Floating Badges */}
                            <div className="absolute bottom-10 left-10 bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#14F195]/20 flex items-center justify-center border border-[#14F195]/40">
                                    <span className="text-[#14F195] font-bold text-[10px]">&lt;/&gt;</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="text-[10px] font-bold text-white uppercase tracking-wider">Auto-Code Generated</div>
                                    <div className="w-16 h-1.5 bg-white/10 rounded-full"></div>
                                    <div className="w-12 h-1.5 bg-white/10 rounded-full"></div>
                                </div>
                            </div>

                            <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Status</div>
                                    <div className="text-xs font-semibold text-white">Production Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 py-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Powerful Features for the Modern Web</h2>
                            <p className="text-[#a19db3] text-lg font-light leading-relaxed">Everything you need to go from idea to production-ready site in record time.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-[#1A1A1A]/50 border border-white/5 rounded-2xl p-4">
                            <div>
                                <div className="text-[10px] text-[#a19db3] font-bold uppercase tracking-widest mb-1">TOTAL WEBSITES</div>
                                <div className="text-3xl font-black text-white">1,250</div>
                            </div>
                            <div className="h-10 w-px bg-white/10 mx-2"></div>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-sm transition-colors border border-white/10">Try AI</button>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">
                        {/* Edge mask for fade effect */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none"></div>

                        {/* Row 1: Scrolling Right (Left to Right) */}
                        <div className="flex w-max animate-scroll-right group/row">
                            {[0, 1].map((i) => (
                                <div key={i} className="flex gap-6 pr-6">
                                    <div className="w-[350px] bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8">
                                        <div className="w-12 h-12 bg-[#14F195]/20 border border-[#14F195]/30 rounded-xl flex items-center justify-center mb-6">
                                            <Wand2 className="w-6 h-6 text-[#14F195]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">AI Generator</h3>
                                        <p className="text-[#a19db3] text-sm leading-relaxed mb-6 font-light">Turn text into fully responsive HTML/CSS/JS instantly with our proprietary LLM tuned for modern UI patterns.</p>
                                        <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#14F195]">
                                            Learn more <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="w-[350px] bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8">
                                        <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-6">
                                            <Layers className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">Live Editor</h3>
                                        <p className="text-[#a19db3] text-sm leading-relaxed mb-6 font-light">Real-time visual adjustments without touching code. Click any element and tell the AI what you want to change.</p>
                                        <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400">
                                            Learn more <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="w-[350px] bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8">
                                        <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center mb-6">
                                            <History className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">Version Rollback</h3>
                                        <p className="text-[#a19db3] text-sm leading-relaxed mb-6 font-light">Never fear an experiment. One-click recovery of any previous site state with full historical tracking and diffs.</p>
                                        <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-yellow-400">
                                            Learn more <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 2: Scrolling Left (Right to Left) */}
                        <div className="flex w-max animate-scroll-left">
                            {[0, 1].map((i) => (
                                <div key={i} className="flex gap-6 pr-6">
                                    <div className="w-[350px] bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8">
                                        <div className="w-12 h-12 bg-primaryEnd/20 border border-primaryEnd/30 rounded-xl flex items-center justify-center mb-6">
                                            <Users className="w-6 h-6 text-primaryEnd" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">Community Hub</h3>
                                        <p className="text-[#a19db3] text-sm leading-relaxed mb-6 font-light">Share templates, prompt recipes, and get inspired by a global community of modern web developers.</p>
                                        <Link to="#" className="inline-flex items-center gap-2 text-sm font-bold text-primaryEnd">
                                            Learn more <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="w-[724px] bg-[#1A1A1A] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center">
                                        <div className="flex-1">
                                            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-6">
                                                <CreditCard className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">Flexible Credit System</h3>
                                            <p className="text-[#a19db3] text-sm leading-relaxed mb-6 font-light">Transparent pricing that scales with your team. Only pay for the generations you use, with no hidden monthly fees for smaller projects.</p>
                                            <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400">
                                                View pricing <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>

                                        {/* Graphic for credits */}
                                        <div className="w-full md:max-w-[280px] bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 shadow-2xl shrink-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] text-[#a19db3] font-bold uppercase tracking-wider">Live Token Usage</span>
                                                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">Optimized</span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1.5 font-bold text-white"><span>Layout Gen</span> <span className="text-[#a19db3]">12 Credits</span></div>
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="w-[60%] h-full bg-emerald-400"></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1.5 font-bold text-white"><span>Model GPT</span> <span className="text-[#a19db3]">4 Credits</span></div>
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="w-[20%] h-full bg-blue-400"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 py-24 mb-12">
                    <div className="relative rounded-[3rem] bg-gradient-to-b from-[#1A1A1A] to-[#111111] border border-white/5 p-12 md:p-24 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14F195]/10 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C2A8]/10 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Ready to launch your vision?</h2>
                            <p className="text-[#a19db3] text-lg mb-10 max-w-xl mx-auto font-light">Join 15,000+ creators building the next generation of the web with DivStack AI.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to={session?.user ? "/projects" : "/auth"} className="px-8 py-4 bg-[#14F195] hover:bg-[#089684] rounded-xl text-white font-bold text-lg transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(20,241,149,0.4)]">
                                    Get Started for Free
                                </Link>
                                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-lg transition-colors w-full sm:w-auto">
                                    Book a Demo
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-[#111111] pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 mb-16">
                        <div className="lg:col-span-2">
                            <Link to="/" className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14F195] to-[#00C2A8] flex items-center justify-center p-1.5">
                                    <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight text-white">DivStack AI</span>
                            </Link>
                            <p className="text-[#a19db3] text-sm leading-relaxed mb-6 max-w-sm">
                                The future of front-end development is here. Build faster, design better, and deploy instantly with the power of artificial intelligence.
                            </p>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-[#a19db3] text-sm">𝕏</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-[#a19db3] text-sm">gh</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                                    <span className="text-[#a19db3] text-sm">in</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">AI Generator</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Components</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Integrations</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Templates</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Documentation</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Tutorials</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">API Reference</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Changelog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
                            <ul className="space-y-4">
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">About Us</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Careers</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Privacy</Link></li>
                                <li><Link to="#" className="text-[#a19db3] hover:text-[#14F195] text-sm transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[#a19db3] text-xs">© 2024 DivStack AI, Inc. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[#a19db3] text-xs">All systems operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
