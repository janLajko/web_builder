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
        <div className="min-h-screen flex flex-col bg-[#111111] text-white font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 mt-8 p-12 rounded-3xl bg-[#1A1A1A] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none"></div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight relative z-10">
                        Explore the DivStack AI<br />Community
                    </h1>
                    <p className="text-lg text-white/60 mb-10 relative z-10 leading-relaxed font-light">
                        Discover and share the next generation of AI workflows, generative art, and<br /> creative outputs.
                    </p>

                    <div className="flex items-center justify-center gap-4 relative z-10">
                        <button className="px-6 py-3 rounded-lg bg-[#14F195] text-white font-medium hover:bg-[#00C2A8] transition-colors">
                            Browse Documentation
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-black/40 border border-white/10 text-white font-medium hover:bg-black/60 transition-colors">
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
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${activeTag === tag
                                    ? 'bg-[#14F195] border-[#14F195] text-white'
                                    : 'bg-[#1A1A1A] border-white/5 text-white/70 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="h-80 rounded-xl bg-[#1A1A1A] animate-pulse border border-white/5"></div>)}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-24 bg-[#1A1A1A] rounded-xl border border-white/5 text-white/50 font-medium">
                        No public projects yet. Be the first to publish!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
                        {projects.map((p) => (
                            <div key={p.id} className="bg-[#1A1A1A] rounded-xl overflow-hidden hover:border-[#14F195]/50 transition-colors border border-white/5 group flex flex-col shadow-xl">

                                {/* Thumbnail Container */}
                                <div className="h-44 bg-black relative overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent z-10 opacity-50"></div>
                                    <iframe
                                        srcDoc={p.versions?.[0]?.code}
                                        title={`Preview of ${p.name}`}
                                        className="w-[1280px] h-[800px] origin-top-left scale-[0.25] pointer-events-none absolute top-0 left-0"
                                    />
                                    {/* Optional "Featured" Tag */}
                                    {p.id === projects[0]?.id && (
                                        <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-bold tracking-wider px-2 py-1 rounded text-white uppercase">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold mb-3 text-white truncate">{p.name || 'Untitled Project'}</h3>

                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#14F195] to-primaryStart flex items-center justify-center text-white text-[10px] font-bold border border-white/10 shrink-0">
                                            {p.user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-xs text-white/60 font-medium truncate">
                                            by @{p.user?.name?.toLowerCase().replace(/\s+/g, '_') || 'unknown'}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-1.5 text-white/50 text-xs font-medium cursor-pointer hover:text-white transition-colors">
                                            <Heart className="w-3.5 h-3.5" />
                                            <span>{Math.floor(Math.random() * 500) + 10}</span>
                                        </div>

                                        <Link
                                            to={`/view/${p.id}`}
                                            className="px-3 py-1.5 rounded bg-[#1A1A1A] border border-white/5 text-xs font-semibold text-[#14F195] hover:bg-[#14F195]/10 transition-colors truncate"
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
                    <div className="mt-8 mb-12 p-10 rounded-2xl bg-[#1A1A1A] border border-white/5 flex flex-col lg:flex-row gap-10 items-center">
                        <div className="w-full lg:w-1/2 aspect-video bg-black rounded-xl overflow-hidden relative shadow-2xl border border-white/10">
                            <iframe
                                srcDoc={projects[Math.floor(Math.random() * projects.length)]?.versions?.[0]?.code}
                                className="w-[1920px] h-[1080px] origin-top-left scale-[0.35] lg:scale-[0.4] pointer-events-none absolute top-0 left-0"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h4 className="text-[#14F195] text-xs font-bold tracking-widest uppercase mb-3">Project of the Month</h4>
                            <h2 className="text-3xl font-extrabold text-white mb-4">Neural Weaver: Multi-Modal Context Engine</h2>
                            <p className="text-white/60 mb-8 leading-relaxed font-light">
                                A revolutionary workflow that stitches together LLMs and latent diffusion models to create cohesive cinematic narratives from a single sentence prompt.
                            </p>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-primaryStart border-2 border-white/10 flex items-center justify-center text-white font-bold">
                                    AI
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">@master_ai</div>
                                    <div className="text-xs text-white/50">AI Research Engineer</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    to={`/view/${projects[0]?.id}`}
                                    className="px-6 py-3 rounded-lg bg-[#14F195] flex-1 text-center text-white font-bold hover:bg-[#00C2A8] transition-colors flex items-center justify-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" /> View Workflow
                                </Link>
                                <button className="p-3 rounded-lg bg-[#1A1A1A] border border-white/10 text-white/70 hover:text-white transition-colors">
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
