import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Wand2, Play, Layers, Settings, Menu, X, Star, Users, Quote } from "lucide-react"
import { useSession, authClient } from "../lib/authClient"
import { useTheme } from "../providers/ThemeProvider"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

function AnimatedHeroBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[2.5rem]">
            {/* Animated Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] animate-[pulse_4s_infinite]"></div>
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-[pulse_6s_infinite_1s]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-[pulse_5s_infinite_2s]"></div>

            {/* Moving Grid */}
            <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: `radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%),
                                  linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px',
                animation: 'pulse 10s ease-in-out infinite'
            }}></div>
        </div>
    )
}

function AnimatedPreview() {
    const [progress, setProgress] = useState(0)
    const [statusText, setStatusText] = useState("Initializing DivStack Engine...")

    useEffect(() => {
        const statuses = [
            "Initializing DivStack Engine...",
            "Analyzing requirements...",
            "Generating layout structure...",
            "Applying Tailwind patterns...",
            "Adding micro-animations...",
            "Finalizing Code..."
        ]

        let p = 0
        let statusIndex = 0

        const interval = setInterval(() => {
            p += Math.random() * 5 + 1

            if (p >= 100) {
                p = 0
                statusIndex = (statusIndex + 1) % statuses.length
                setStatusText(statuses[statusIndex])
            }

            setProgress(Math.min(100, p))
        }, 150)

        return () => clearInterval(interval)
    }, [])

    const totalBlocks = 20
    const filledBlocks = Math.floor((progress / 100) * totalBlocks)
    const emptyBlocks = totalBlocks - filledBlocks
    const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks)

    return (
        <div className="flex-1 bg-[#0A0A0B] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="w-4/5 h-4/5 relative flex items-center justify-center">
                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Animated "Built with AI" widget */}
                <div className="w-full max-w-lg bg-[#111]/90 rounded-2xl border border-blue-500/30 p-8 shadow-[0_0_50px_rgba(59,130,246,0.2)] relative z-10 backdrop-blur-2xl group hover:border-blue-500/60 transition-all duration-500 hover:-translate-y-2">
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
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 truncate">
                                {statusText}
                            </h3>
                            <div className="text-gray-400 font-mono text-xs max-w-full leading-relaxed flex flex-col mt-4">
                                <span className="text-blue-500 mb-1">❯ Generating Components: {Math.floor(progress)}%</span>
                                <span className="text-blue-400 tracking-[0.2em] opacity-80">{progressBar}</span>
                            </div>
                        </div>

                        {/* Animated UI lines */}
                        <div className="pt-4 space-y-3 opacity-90 transition-opacity duration-500 cursor-default">
                            <div className="flex gap-3">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 flex items-center justify-center p-3 animate-[pulse_2s_infinite]">
                                    <Star className="w-full h-full text-blue-400 transition-colors duration-500" />
                                </div>
                                <div className="h-12 flex-1 bg-white/5 rounded-xl border border-white/5 overflow-hidden relative">
                                    <div className="absolute inset-y-0 left-0 bg-white/10 w-1/4 animate-[line-swipe_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                            <div className="h-24 w-full bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl border border-blue-500/10 relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-blue-500/10 w-1/3 animate-[line-swipe_3s_ease-in-out_infinite]"></div>
                                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
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
    )
}


export default function Home() {
    const [input, setInput] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

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
            <div className="w-full max-w-[1400px] mt-8 mb-24 h-[90vh] min-h-[750px] max-h-[900px] bg-[#F5F9FD]/90 dark:bg-[#0D1117]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-hidden transition-all duration-500">
                <AnimatedHeroBackground />

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
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">localhost:5678/preview</span>
                                </div>
                            </div>
                        </div>

                        {/* Animated Code/UI Generation Content */}
                        <AnimatedPreview />
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



                    {/* Media Card (Code Snippet) */}
                    <div onClick={() => navigate('/my-projects')} className="bg-gray-900 p-4 rounded-[2rem] shadow-sm border border-gray-800 relative h-[160px] cursor-pointer group flex flex-col">
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


                </div>
            </div>

            {/*  =============================================  */}
            {/*  RESTORED SECTIONS (Styled to match Light Theme) */}
            {/*  =============================================  */}

            <div className="w-full bg-white dark:bg-[#0A0A0B] flex flex-col items-center pb-24 transition-colors duration-500 relative overflow-hidden">

                {/* Background Depth Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                {/* Trusted By Section */}
                <section className="w-full py-16 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-[#0A0A0B]/50 backdrop-blur-sm transition-colors duration-500 overflow-hidden relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="container mx-auto px-6 text-center"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 font-bold uppercase tracking-widest transition-colors">Trusted by leading teams</p>

                        {/* CSS Marquee wrapper */}
                        <div className="flex overflow-hidden relative w-full gradient-mask-x">
                            <div className="flex items-center gap-16 md:gap-24 animate-scroll-left whitespace-nowrap px-8">
                                {[...Array(2)].map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-16 md:gap-24">
                                        {["JOBSAGE", "ioasis", "VIRTUO", "Altura", "Stratifi", "Luminary"].map(name => (
                                            <span
                                                key={`${idx}-${name}`}
                                                className="text-2xl font-black tracking-wider text-gray-400 dark:text-gray-500 uppercase transition-all duration-300 opacity-40 hover:opacity-100 hover:scale-105 cursor-pointer"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* How it Works Section */}
                <section className="w-full max-w-[1200px] mx-auto px-6 py-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase transition-colors">How DivStack Works</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto transition-colors">From concept to production in three simple steps.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Decorative connection line hidden on mobile */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/10 to-transparent z-0"></div>

                        {[
                            { step: "1", title: "Describe Your Idea", desc: "Type what you want to build in plain English. The more details, the better.", icon: Wand2 },
                            { step: "2", title: "AI Generates UI", desc: "Our engine instantly writes clean, production-ready React & Tailwind CSS code.", icon: Layers },
                            { step: "3", title: "Edit & Deploy", desc: "Tweak the design visually or edit the code directly. Deploy with one click.", icon: Play }
                        ].map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 shadow-xl flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                                    <div className="relative w-full h-full bg-white dark:bg-[#111] rounded-3xl flex items-center justify-center">
                                        <s.icon className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg border-2 border-white dark:border-[#0A0A0B]">
                                        {s.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">{s.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-[260px] transition-colors">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="w-full max-w-[1200px] mx-auto px-6 py-24 bg-transparent transition-colors duration-500 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <div className="inline-block relative">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase transition-colors">What You Can Build<br />Instantly</h2>
                            {/* Animated Line */}
                            <div className="absolute -bottom-2 left-0 w-full h-1.5 overflow-hidden rounded-full opacity-0 animate-[fade-in_1s_ease-out_forwards_0.5s]">
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[line-swipe_2.5s_ease-out_infinite]"></div>
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto transition-colors mt-6">No coding, no drag-and-drop complexity. Describe your idea, and AI turns it into a fully functional app or website.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
                            className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:rotate-6">
                                    <Wand2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">AI Generator</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Turn text into fully responsive HTML/CSS/JS instantly with our proprietary LLM tuned for modern UI patterns.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
                            className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:rotate-6">
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Live Editor</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Real-time visual adjustments without touching code. Click any element and tell the AI what you want to change.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
                            className="bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:rotate-6">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Community Hub</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">Share templates, prompt recipes, and get inspired by a global community of modern web developers.</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full py-24 bg-transparent transition-colors duration-500 overflow-hidden relative z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/40 dark:bg-blue-500/10 rounded-full blur-[80px] pointer-events-none transition-colors"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 relative z-10 px-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6 uppercase transition-colors">What our developers<br />Are Saying</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-xl mx-auto transition-colors">Join thousands of developers and designers who build with DivStack AI every day.</p>
                    </motion.div>

                    <div className="relative w-full flex items-center pt-8">
                        {/* CSS Marquee wrapper for testimonials */}
                        <div className="flex overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                            <div className="flex animate-scroll-left whitespace-nowrap px-4 hover:[animation-play-state:paused] w-max">
                                {[...Array(2)].map((_, idx) => (
                                    <div key={idx} className="flex gap-6 pr-6">
                                        {testimonials.map((test, i) => (
                                            <div key={`${idx}-${i}`} className="w-[400px] whitespace-normal bg-[#F8FAFC] dark:bg-[#111] rounded-[2rem] p-8 border border-[#EAF2F8] dark:border-white/5 shadow-sm relative transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group">
                                                {/* Quote Icon */}
                                                <div className="absolute -top-4 left-6">
                                                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                                        <Quote className="w-4 h-4 text-white fill-white" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 mb-4 mt-2">
                                                    {Array.from({ length: test.rating }).map((_, r) => (
                                                        <Star key={r} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                                                    ))}
                                                </div>

                                                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed font-medium mb-8 transition-colors">
                                                    "{test.quote}"
                                                </p>

                                                <div className="flex items-center gap-4 mt-auto">
                                                    {/* Simulated Avatar */}
                                                    <div className={`w-12 h-12 ${test.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white dark:ring-[#0A0A0B] relative overflow-hidden group-hover:scale-110 transition-transform`}>
                                                        {test.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-gray-900 dark:text-white text-sm transition-colors flex items-center gap-2">
                                                            {test.name}
                                                            <div className="bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-400 text-[10px] px-2 py-0.5 rounded-full font-mono">@{test.name.split(' ')[0].toLowerCase()}</div>
                                                        </div>
                                                        <div className="text-gray-500 dark:text-gray-400 text-xs font-medium transition-colors flex items-center gap-1">
                                                            {test.role} <span className="text-gray-300 dark:text-gray-600">•</span> DivStack AI
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-[1000px] mx-auto px-6 py-12 mb-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="rounded-[3rem] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.5)] dark:shadow-[0_0_80px_rgba(59,130,246,0.3)] transition-all duration-500 group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-indigo-400/40 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">Build better apps, faster</h2>
                            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-medium">DivStack is the AI tool for websites. Design freely, publish fast, and scale with AI, SEO, analytics, and more.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to={session?.user ? "/projects" : "/auth"} className="px-8 py-4 bg-white hover:bg-gray-50 rounded-2xl text-blue-600 font-bold text-lg w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1 active:scale-95 duration-300">
                                    Get Started Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
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

                        {/* Footer Columns */}
                        {[
                            {
                                title: "Platform", links: [
                                    { label: "AI Generator", href: "/ai-builder" },
                                    { label: "Components", href: "#" },
                                    { label: "Integrations", href: "#" }
                                ]
                            },
                            {
                                title: "Resources", links: [
                                    { label: "Documentation", href: "/docs" },
                                    { label: "Community", href: "/community" },
                                    { label: "Discord", href: "#" },
                                    { label: "Product Roadmap", href: "#" }
                                ]
                            },
                            {
                                title: "Company", links: [
                                    { label: "About Us", href: "/about-us" },
                                    { label: "Twitter / X", href: "#" },
                                    { label: "Github", href: "#" },
                                    { label: "Privacy", href: "/privacy" }
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
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-medium transition-colors">© 2026DivStack AI, Inc. All rights reserved.</p>
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
