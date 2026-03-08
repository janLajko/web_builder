import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { api } from "../config/axios"
import { Link } from "react-router-dom"
import { ExternalLink, Heart, Share2 } from "lucide-react"

const TAGS = [
    "#All", "#Generative", "#LLM", "#ImageGen", "#Automation", "#Code", "#Datasets"
]

export default function Community() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTag, setActiveTag] = useState("#All")

    useEffect(() => {
        const fetchPublic = async () => {
            try {
                const { data } = await api.get('/api/project/public')
                setProjects(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPublic()
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] text-gray-900 dark:text-gray-100 font-['Inter'] transition-colors duration-500">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl relative z-10">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 mt-8 p-12 rounded-[2.5rem] bg-white/80 dark:bg-black/40 backdrop-blur-3xl shadow-sm border border-[#EAF2F8] dark:border-white/10 relative overflow-hidden animate-scale-in transition-colors duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-100/40 dark:bg-blue-900/20 blur-[100px] pointer-events-none mix-blend-overlay transition-colors"></div>

                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight relative z-10 uppercase text-gray-900 dark:text-white transition-colors">
                        Explore the DivStack AI<br />Community
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 relative z-10 leading-relaxed font-medium transition-colors">
                        Discover and share the next generation of AI workflows, generative art, and<br /> creative outputs.
                    </p>

                    <div className="flex items-center justify-center gap-4 relative z-10">
                        <button className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            Browse Documentation
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 dark:hover:bg-[#222] transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 active:scale-[0.97] shadow-sm">
                            Join Discord
                        </button>
                    </div>
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                    {TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 border active:scale-95 shadow-sm ${activeTag === tag
                                ? 'bg-blue-500 border-blue-500 text-white shadow-md'
                                : 'bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-80 rounded-2xl bg-white/60 dark:bg-white/5 animate-pulse border border-gray-200 dark:border-white/5 transition-colors"></div>)}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-24 bg-white/80 dark:bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-[#EAF2F8] dark:border-white/10 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm transition-colors">
                        No public projects yet. Be the first to publish!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
                        {projects.map((p) => (
                            <div key={p.id} className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-3xl rounded-2xl border border-white/50 dark:border-white/10 overflow-hidden hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 group flex flex-col shadow-md hover:shadow-xl hover:-translate-y-1">

                                {/* Thumbnail Container */}
                                <div className="h-44 bg-gray-100 dark:bg-[#050505] relative overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#050505] to-transparent z-10 opacity-50 dark:opacity-80 transition-colors"></div>
                                    <iframe
                                        srcDoc={p.versions?.[0]?.code}
                                        title={`Preview of ${p.name}`}
                                        className="w-[1280px] h-[800px] origin-top-left scale-[0.25] pointer-events-none absolute top-0 left-0 bg-white"
                                    />
                                    {p.id === projects[0]?.id && (
                                        <div className="absolute top-3 right-3 z-20 bg-white dark:bg-[#222]/90 shadow-sm border border-gray-100 dark:border-white/10 text-[10px] font-bold tracking-wider px-2 py-1 rounded-lg text-blue-600 dark:text-blue-400 uppercase transition-colors">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col bg-white/50 dark:bg-black/50 transition-colors duration-500">
                                    <h3 className="text-lg font-black mb-3 text-gray-900 dark:text-white truncate uppercase tracking-tight transition-colors">{p.name || 'Untitled Project'}</h3>

                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold border border-white/50 dark:border-white/10 shrink-0 shadow-sm transition-colors">
                                            {p.user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-bold truncate transition-colors">
                                            by @{p.user?.name?.toLowerCase().replace(/\s+/g, '_') || 'unknown'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/10 transition-colors">
                                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs font-bold cursor-pointer hover:text-rose-500 dark:hover:text-rose-400 transition-colors">
                                            <Heart className="w-3.5 h-3.5" />
                                            <span>{Math.floor(Math.random() * 500) + 10}</span>
                                        </div>

                                        <Link
                                            to={`/view/${p.id}`}
                                            className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors truncate"
                                        >
                                            View Project
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Featured Project of the Month */}
                {projects.length > 0 && (
                    <div className="mt-8 mb-12 p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-xl border border-white/50 dark:border-white/10 flex flex-col lg:flex-row gap-10 items-center transition-colors duration-500">
                        <div className="w-full lg:w-1/2 aspect-video bg-gray-100 dark:bg-[#050505] rounded-2xl overflow-hidden relative shadow-md border border-gray-200 dark:border-white/5 transition-colors">
                            <iframe
                                srcDoc={projects[Math.floor(Math.random() * projects.length)]?.versions?.[0]?.code}
                                className="w-[1920px] h-[1080px] origin-top-left scale-[0.35] lg:scale-[0.4] pointer-events-none absolute top-0 left-0 bg-white"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h4 className="text-blue-500 dark:text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-3 text-shadow-sm transition-colors">Project of the Month</h4>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight transition-colors">Neural Weaver: Multi-Modal Context Engine</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium transition-colors">
                                A revolutionary workflow that stitches together LLMs and latent diffusion models to create cohesive cinematic narratives from a single sentence prompt.
                            </p>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-white/50 dark:border-white/10 flex items-center justify-center text-white font-bold shadow-sm transition-colors">
                                    AI
                                </div>
                                <div>
                                    <div className="text-sm font-black text-gray-900 dark:text-white uppercase transition-colors">@master_ai</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide transition-colors">AI Research Engineer</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/view/${projects[0]?.id}`}
                                    className="px-8 py-4 rounded-2xl bg-blue-600 flex-1 text-center text-white text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 uppercase tracking-widest"
                                >
                                    <ExternalLink className="w-5 h-5" /> View Workflow
                                </Link>
                                <button className="p-3.5 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#222] transition-colors shadow-sm">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
