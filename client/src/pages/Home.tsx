import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Wand2, Play, Layers, Settings, Menu, X, Star, Users, Zap, Database, Repeat, Quote } from "lucide-react"
import { useSession, authClient } from "../lib/authClient"
import { useTheme } from "../providers/ThemeProvider"
import toast from "react-hot-toast"

export default function Home() {
    const [input, setInput] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [activeTestimonial, setActiveTestimonial] = useState(0)
    const [testimonialFading, setTestimonialFading] = useState(false)

    const testimonials = [
        {
            name: "Divyesh Soni",
            role: "Frontend Developer",
            quote: "DivStack AI Frontend made by me and Mr Vivek yadav .",
            rating: 5,
            color: "bg-blue-500"
        },
        {
            name: "vivek yadav",
            role: "Frontend Developer",
            quote: "half of this frontend made by me and Mr Soni Divyesh.",
            rating: 5,
            color: "bg-purple-500"
        },
        {
            name: "SAchin Kharat",
            role: "Backend Developer",
            quote: "I build this half backend server and half build by yash rathod.",
            rating: 5,
            color: "bg-teal-500"
        },
        {
            name: "Yash Rathod",
            role: "Backend Developer",
            quote: "i build the backend with the help of sachin kharat.",
            rating: 5,
            color: "bg-indigo-500"
        },
        {
            name: "Dhaval Joshi",
            role: "Database and APi testing",
            quote: "I made the database of this website plus tested API which are used in this website.",
            rating: 5,
            color: "bg-pink-500"
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialFading(true)
            setTimeout(() => {
                setActiveTestimonial(prev => (prev + 1) % testimonials.length)
                setTestimonialFading(false)
            }, 600)
        }, 5000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    const { theme, setTheme } = useTheme()

    const navigate = useNavigate()
    const { data: session } = useSession()

    const handleLogout = async () => {
        await authClient.signOut()
        window.location.reload()
    }

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
            navigate('/projects', { state: { initialPrompt: input } })
        } catch (error: any) {
            toast.error("An error occurred")
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] font-['Inter'] selection:bg-blue-500/30 flex flex-col items-center overflow-x-hidden transition-colors duration-500">

            {/* Standard Top Navigation */}
            <nav className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-xl sticky top-0 z-50 border-b border-white/50 dark:border-white/10 transition-colors duration-500">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center p-1.5 shadow-md dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight hidden sm:block text-gray-900 dark:text-white transition-colors">DivStack AI</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
                        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                        <Link to="/ai-builder" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Builder</Link>
                        {session?.user && <Link to="/my-projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Projects</Link>}
                        <Link to="/community" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Community</Link>
                        <Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        {session?.user ? (
                            <>
                                <Link to="/projects" className="hidden sm:block text-gray-700 hover:text-blue-600 transition-colors">Dashboard</Link>
                                <button onClick={handleLogout} className="px-3 py-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-600 transition-all flex items-center gap-2">
                                    <span className="hidden sm:block">Sign Out</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/auth" className="hidden sm:block text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
                                <Link to="/auth" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-[#0A0A0B]/95 border-b border-gray-100 dark:border-white/10 py-4 px-6 shadow-2xl z-40 backdrop-blur-xl transition-colors">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-900 dark:text-white font-medium transition-colors">Home</Link>
                            <Link to="/ai-builder" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium transition-colors">AI Builder</Link>
                            {session?.user && <Link to="/my-projects" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium transition-colors">My Projects</Link>}
                            <Link to="/community" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium transition-colors">Community</Link>
                            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300 font-medium transition-colors">Pricing</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Interactive Hero App Container (The 3-column Layout) */}
            <div className="w-full max-w-[1400px] mt-8 mb-24 h-[90vh] min-h-[750px] max-h-[900px] bg-[#F5F9FD]/90 dark:bg-[#0D1117]/80 backdrop-blur-3xl rounded-[2.5rem] border-2 border-white/80 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-hidden transition-all duration-500">

                {/* ------------------------------------- */}
                {/* LEFT SIDEBAR SECTION (Controls)       */}
                {/* ------------------------------------- */}
                <div className="w-full md:w-[300px] lg:w-[340px] flex flex-col gap-4 shrink-0 transition-transform">
                    {/* Top Header - App Header */}
                    <div className="flex items-center justify-between bg-white dark:bg-[#1A1A1A] rounded-3xl p-4 shadow-sm border border-[#EAF2F8] dark:border-white/5 transition-colors duration-500">
                        <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-black text-xl leading-none transition-colors">
                            <Wand2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 mx-4 h-0.5 bg-gray-100 dark:bg-white/10 rounded-full relative transition-colors">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-[#222] border border-gray-200 dark:border-white/20 rounded-full shadow-sm transition-colors"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                                AI
                            </div>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center border-2 overflow-hidden hover:scale-105 transition-all bg-gradient-to-tr from-gray-100 to-white dark:from-[#222] dark:to-[#1A1A1A] border-white dark:border-white/10"
                            >
                                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {showSettings && (
                        <div className="rounded-[2rem] p-4 shadow-sm border text-sm flex flex-col gap-2 bg-white dark:bg-[#1A1A1A] border-[#EAF2F8] dark:border-white/5 text-gray-600 dark:text-gray-300 transition-colors duration-500">
                            <div className="font-bold mb-1 ml-2 text-xs uppercase tracking-wider">Builder Settings</div>
                            <button className="w-full text-left px-4 py-2 rounded-xl text-xs font-semibold hover:bg-opacity-80 transition-colors bg-gray-50 dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-[#333]">API Configuration</button>
                            <button className="w-full text-left px-4 py-2 rounded-xl text-xs font-semibold hover:bg-opacity-80 transition-colors bg-gray-50 dark:bg-[#222] hover:bg-gray-100 dark:hover:bg-[#333]">Project Defaults</button>
                        </div>
                    )}

                    {/* App Config Pills (Light/Dark Toggle) */}
                    <div className="rounded-[2rem] p-5 shadow-sm border bg-white dark:bg-[#1A1A1A] border-[#EAF2F8] dark:border-white/5 transition-colors duration-500">
                        <div className="flex bg-gray-100/50 dark:bg-black/50 p-1.5 rounded-2xl relative transition-colors">
                            {/* Sliding Indicator */}
                            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-[#333] rounded-xl shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>

                            <button
                                onClick={() => setTheme("light")}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-[11px] font-bold uppercase tracking-widest relative z-10 transition-colors ${theme !== 'dark' ? 'text-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
                            >
                                Light
                            </button>
                            <button
                                onClick={() => setTheme("dark")}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-[11px] font-bold uppercase tracking-widest relative z-10 transition-colors ${theme === 'dark' ? 'text-gray-800 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
                            >
                                Dark
                            </button>
                        </div>
                    </div>

                    {/* Abstract App Graphic Card */}
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-[2rem] p-5 shadow-sm border border-[#EAF2F8] dark:border-white/5 group relative overflow-hidden flex-1 min-h-[140px] flex items-center justify-center transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-[#1A1A1A] opacity-50"></div>
                        {/* Abstract Wireframe Graphic */}
                        <div className="relative z-10 w-full h-full flex flex-col gap-2 opacity-80 group-hover:scale-105 transition-transform duration-500">
                            <div className="w-full h-1/2 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center transition-colors"><Layers className="w-4 h-4 text-blue-500" /></div>
                            </div>
                            <div className="flex gap-2 h-1/2">
                                <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10 transition-colors"></div>
                                <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10 transition-colors"></div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Prompt Builder Card */}
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] p-6 shadow-sm border border-[#EAF2F8] dark:border-white/5 relative transition-colors duration-500">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-[1.1] mb-2 tracking-tight uppercase transition-colors">Describe Your<br />Vision</h3>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="A modern portfolio for a freelance designer..."
                                className="w-full h-20 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/10 rounded-2xl p-3 text-xs text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
                            />
                            <div className="flex justify-end mt-3">
                                <button type="submit" className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                                    <Wand2 className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ------------------------------------- */}
                {/* CENTER HERO SECTION (Preview)         */}
                {/* ------------------------------------- */}
                <div className="flex-1 flex flex-col gap-4 relative">
                    {/* Main "Browser" Image Area */}
                    <div className="w-full h-full bg-white dark:bg-[#111] rounded-[2.5rem] overflow-hidden relative shadow-sm border border-[#EAF2F8] dark:border-white/10 group flex flex-col transition-colors duration-500">

                        {/* Browser Top Bar */}
                        <div className="h-12 bg-gray-50 dark:bg-black/50 border-b border-gray-100 dark:border-white/5 flex items-center px-6 transition-colors duration-500">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex-1 mx-8">
                                <div className="w-full h-6 bg-white dark:bg-[#222] rounded-md border border-gray-200 dark:border-white/10 flex items-center justify-center transition-colors">
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">localhost:3000/preview</span>
                                </div>
                            </div>
                        </div>

                        {/* Animated Code/UI Generation Content */}
                        <div className="flex-1 bg-[#0A0A0B] relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <div className="w-3/4 h-3/4 relative flex items-center justify-center">
                                {/* Glowing orbs */}
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>

                                {/* Animated "Built with AI" widget */}
                                <div className="w-full max-w-lg bg-[#111]/90 rounded-2xl border border-white/10 p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative z-10 backdrop-blur-2xl group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                                    {/* Decorative top bar */}
                                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                                                <Wand2 className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-white font-bold tracking-widest uppercase text-xs">DivStack Engine</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Main Animated Text */}
                                        <div className="relative">
                                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                                                Built with AI.
                                            </h3>
                                            <p className="text-gray-400 font-mono text-xs max-w-[80%] leading-relaxed flex items-center">
                                                <span className="text-blue-500 mr-2">❯</span>
                                                Generating interactive UI components...
                                                <span className="inline-block w-1.5 h-3 ml-1 bg-blue-400 animate-[pulse_1s_infinite]"></span>
                                            </p>
                                        </div>

                                        {/* Animated UI lines */}
                                        <div className="pt-4 space-y-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500 cursor-default">
                                            <div className="flex gap-3">
                                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 flex items-center justify-center p-3 animate-pulse">
                                                    <Star className="w-full h-full text-blue-400/50 group-hover:text-blue-400 transition-colors duration-500" />
                                                </div>
                                                <div className="h-12 flex-1 bg-white/5 rounded-xl border border-white/5 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                                </div>
                                            </div>
                                            <div className="h-24 w-full bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl border border-blue-500/10 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[2000ms] ease-in-out"></div>
                                                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-[60%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* overlay geometric decoration */}
                            <div className="absolute bottom-6 right-6">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    <rect x="10" y="10" width="40" height="40" rx="10" stroke="#3B82F6" strokeWidth="2" fill="none" />
                                    <path d="M25 30H35M30 25V35" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="30" cy="30" r="15" fill="#3B82F6" className="opacity-10 animate-ping" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------------------------- */}
                {/* RIGHT SIDEBAR SECTION (Analytics)     */}
                {/* ------------------------------------- */}
                <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col gap-4 shrink-0 px-2 lg:px-6 py-4 justify-between">

                    {/* Title and Text */}
                    <div className="pt-2">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-4 uppercase transition-colors">
                            Build The<br />Future
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium transition-colors">
                            Experience real-time UI generation powered by our proprietary LLM. Transform descriptions into production-ready React applications instantly.
                        </p>
                    </div>

                    {/* Speed Stat Card */}
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-5 shadow-sm border border-[#EAF2F8] dark:border-white/5 relative flex items-center justify-between transition-colors duration-500">
                        <div className="flex items-center gap-4">
                            {/* Circular Widget Small */}
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-gray-100 dark:text-gray-800 transition-colors" strokeWidth="10" fill="none" />
                                    <circle cx="50" cy="50" r="40" stroke="#3B82F6" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset="40" strokeLinecap="round" />
                                </svg>
                                <div className="text-[10px] font-bold text-gray-400 absolute">
                                    <Zap className="w-4 h-4 text-blue-500" />
                                </div>
                            </div>
                            <div>
                                <div className="text-lg font-black text-gray-900 dark:text-white leading-none mb-1 transition-colors">0.8s</div>
                                <div className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold leading-tight w-24 transition-colors">
                                    Average generation time for full layouts
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-3 -right-2">
                            <div className="w-10 h-10 flex items-center justify-center transform hover:scale-110 transition-all cursor-pointer bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800">
                                <Database className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 right-4 text-3xl font-black text-gray-100 dark:text-gray-800/50 -z-10 tracking-tighter transition-colors">
                            FAST
                        </div>
                    </div>

                    {/* Media Card (Code Snippet) */}
                    <div className="bg-gray-900 p-4 rounded-[2rem] shadow-sm border border-gray-800 relative h-[160px] cursor-pointer group flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-[10px] font-mono text-gray-400">src/App.tsx</div>
                            <div className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">React</div>
                        </div>
                        <div className="flex-1 font-mono text-[9px] text-gray-300 leading-relaxed overflow-hidden">
                            <div className="text-blue-400">export default function <span className="text-yellow-200">Hero</span>() {'{'}</div>
                            <div className="pl-4 text-pink-400">return (</div>
                            <div className="pl-8 text-gray-400">{'<div className="flex...">'}</div>
                            <div className="pl-12">{'<h1>Build Faster</h1>'}</div>
                            <div className="pl-8 text-gray-400">{'</div>'}</div>
                            <div className="pl-4 text-pink-400">)</div>
                            <div className="text-blue-400">{'}'}</div>
                        </div>

                        <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <span className="text-gray-400 font-bold text-xs uppercase">Preview</span>
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:bg-blue-600 transition-colors">
                                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats & Avatars */}
                    <div className="flex items-end justify-between px-2 pt-2 pb-2">
                        {/* Token Chart */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center mb-1">Token Use</span>
                            <div className="flex items-end gap-1.5 h-10">
                                <div className="w-1.5 h-full rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                <div className="w-1.5 h-[60%] rounded-full bg-blue-400"></div>
                                <div className="w-1.5 h-[80%] rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                <div className="w-1.5 h-[40%] rounded-full bg-gray-200"></div>
                                <div className="w-1.5 h-[30%] rounded-full bg-gray-200"></div>
                            </div>
                        </div>

                        {/* Avatars & ProgressBar */}
                        <div className="flex flex-col items-end gap-3 flex-1 ml-8">
                            <div className="flex items-center gap-4 w-full justify-end">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-[#1A1A1A] flex items-center justify-center shadow-sm z-30 transition-colors">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-[#1A1A1A] flex items-center justify-center shadow-sm z-20 transition-colors">
                                        <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full"></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-900 border-2 border-white dark:border-[#1A1A1A] flex items-center justify-center shadow-sm z-10 transition-colors">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex-1 max-w-[100px] h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden transition-colors">
                                    <div className="w-[85%] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                </div>
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors">12k+</span>
                            </div>

                            {/* Repeat Icon Bottom Right */}
                            <div className="mt-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer mr-2">
                                <Repeat className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  =============================================  */}
            {/*  RESTORED SECTIONS (Styled to match Light Theme) */}
            {/*  =============================================  */}

            <div className="w-full bg-white dark:bg-[#0A0A0B] flex flex-col items-center pb-24 transition-colors duration-500">

                {/* Trusted By Section */}
                <section className="w-full py-16 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0A0A0B] transition-colors duration-500">
                    <div className="container mx-auto px-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 font-bold uppercase tracking-widest transition-colors">Trusted by leading teams</p>
                        <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
                            {["JOBSAGE", "ioasis", "VIRTUO", "Altura", "Stratifi", "Luminary"].map(name => (
                                <span key={name} className="text-xl font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase transition-colors">{name}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 py-24 bg-white dark:bg-[#0A0A0B] transition-colors duration-500">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase transition-colors">What You Can Build<br />Instantly</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto transition-colors">No coding, no drag-and-drop complexity. Describe your idea, and AI turns it into a fully functional app or website.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:shadow-lg transition-all duration-500">
                            <div className="w-14 h-14 bg-white dark:bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-colors">
                                <Wand2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">AI Generator</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Turn text into fully responsive HTML/CSS/JS instantly with our proprietary LLM tuned for modern UI patterns.</p>
                        </div>
                        <div className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:shadow-lg transition-all duration-500">
                            <div className="w-14 h-14 bg-white dark:bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-colors">
                                <Layers className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Live Editor</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Real-time visual adjustments without touching code. Click any element and tell the AI what you want to change.</p>
                        </div>
                        <div className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:shadow-lg transition-all duration-500">
                            <div className="w-14 h-14 bg-white dark:bg-[#1A1A1A] rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-colors">
                                <Users className="w-6 h-6 text-teal-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Community Hub</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Share templates, prompt recipes, and get inspired by a global community of modern web developers.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 py-24 bg-white dark:bg-[#0A0A0B] transition-colors duration-500">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase transition-colors">What People<br />Are Saying</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto transition-colors">Join thousands of developers and designers who build with DivStack AI every day.</p>
                    </div>

                    <div className="relative min-h-[320px] flex items-center justify-center">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/40 dark:bg-blue-500/10 rounded-full blur-[80px] pointer-events-none transition-colors"></div>

                        {/* Testimonial Card */}
                        <div
                            key={activeTestimonial}
                            className={`w-full max-w-2xl mx-auto ${testimonialFading ? 'testimonial-fade-out' : 'testimonial-fade-in'}`}
                        >
                            <div className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2.5rem] p-10 md:p-12 border border-[#EAF2F8] dark:border-white/5 shadow-sm relative transition-colors duration-500">
                                {/* Quote Icon */}
                                <div className="absolute -top-5 left-10">
                                    <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Quote className="w-5 h-5 text-white fill-white" />
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-6 mt-2">
                                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                                    ))}
                                </div>

                                {/* Quote Text */}
                                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium mb-8 transition-colors">
                                    "{testimonials[activeTestimonial].quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 ${testimonials[activeTestimonial].color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                        {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-sm transition-colors">{testimonials[activeTestimonial].name}</div>
                                        <div className="text-gray-500 dark:text-gray-400 text-xs font-medium transition-colors">{testimonials[activeTestimonial].role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dot Indicators */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-500 ${i === activeTestimonial
                                        ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                        : 'w-2 bg-gray-300 dark:bg-gray-700'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-[1000px] mx-auto px-6 py-12 mb-12">
                    <div className="rounded-[3rem] bg-blue-600 dark:bg-blue-700 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">Build better apps, faster</h2>
                            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">DivStack is the AI tool for websites. Design freely, publish fast, and scale with AI, SEO, analytics, and more.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to={session?.user ? "/projects" : "/auth"} className="px-8 py-4 bg-white hover:bg-gray-50 rounded-2xl text-blue-600 font-bold text-lg w-full sm:w-auto shadow-xl transition-transform hover:scale-105">
                                    Get Started Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Light Footer */}
            <footer className="w-full bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-500">
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 mb-16">
                        <div className="lg:col-span-2">
                            <Link to="/" className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center p-1.5 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
                                    <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                                </div>
                                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white transition-colors">DivStack AI</span>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-sm font-medium transition-colors">
                                The future of front-end development is here. Build faster, design better, and deploy instantly with the power of artificial intelligence.
                            </p>
                            <div className="flex gap-3">
                                {["𝕏", "gh", "in"].map(label => (
                                    <div key={label} className="w-10 h-10 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 flex items-center justify-center hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer text-gray-400 dark:text-gray-500 font-bold text-sm shadow-sm transition-colors">
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {[
                            {
                                title: "Platform", links: [
                                    { label: "AI Generator", href: "/ai-builder" },
                                    { label: "Components", href: "/templates" },
                                    { label: "Integrations", href: "#" },
                                    { label: "Templates", href: "/templates" }
                                ]
                            },
                            {
                                title: "Resources", links: [
                                    { label: "Documentation", href: "/docs" },
                                    { label: "Tutorials", href: "/docs" },
                                    { label: "API Reference", href: "/docs" },
                                    { label: "Changelog", href: "#" }
                                ]
                            },
                            {
                                title: "Company", links: [
                                    { label: "About Us", href: "/about-us" },
                                    { label: "Careers", href: "#" },
                                    { label: "Privacy", href: "/privacy" },
                                    { label: "Terms", href: "/privacy" }
                                ]
                            },
                        ].map(col => (
                            <div key={col.title}>
                                <h4 className="text-gray-900 dark:text-gray-200 font-bold mb-6 text-sm uppercase tracking-wider transition-colors">{col.title}</h4>
                                <ul className="space-y-4">
                                    {col.links.map(link => (
                                        <li key={link.label}>
                                            <Link to={link.href} className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-medium transition-colors">© 2024 DivStack AI, Inc. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-gray-400 dark:text-gray-500 text-xs font-medium transition-colors">All systems operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
