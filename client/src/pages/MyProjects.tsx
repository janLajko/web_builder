import { useEffect, useState } from "react"
import { api } from "../config/axios"
import type { WebsiteProject } from "../types"
import { Link } from "react-router-dom"
import { Plus, Calendar } from "lucide-react"
import DashboardLayout from "../components/DashboardLayout"

export default function MyProjects() {
    const [projects, setProjects] = useState<WebsiteProject[]>([])

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/user/projects')
            setProjects(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">My Projects</h1>
                    <p className="text-[#a19db3] text-lg">Manage and deploy your high-performance AI models.</p>
                </div>
                <Link to="/ai-builder" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#14F195] to-[#00C2A8] text-white font-bold text-sm md:text-base hover:opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(20,241,149,0.4)] transition-all">
                    <Plus className="w-5 h-5" /> Create New
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-[#14F195]/50 hover:bg-[#1A1A1A] transition-all shadow-lg flex flex-col cursor-pointer hover:-translate-y-1">
                        <div className="h-48 w-full bg-[#111111] relative overflow-hidden flex items-center justify-center">
                            {/* Simple visual placeholder, could use an iframe screenshot later */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 to-[#111111]/50"></div>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md z-10 group-hover:bg-[#14F195]/20 transition-colors">
                                <span className="text-2xl font-bold text-white/50 group-hover:text-white transition-colors">&lt;/&gt;</span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#14F195] transition-colors leading-tight line-clamp-1">{project.name || "Untitled Project"}</h3>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">READY</span>
                                </div>
                            </div>
                            <p className="text-sm text-[#a19db3] line-clamp-2 mb-6 flex-1">{project.description || "A custom AI-generated website."}</p>
                            <div className="mt-auto flex items-center gap-4 text-xs text-[#a19db3] font-medium border-t border-white/5 pt-4">
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Create New Card */}
                <Link to="/ai-builder" className="bg-[#111111]/40 border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#14F195]/50 hover:bg-[#1A1A1A]/40 transition-all cursor-pointer min-h-[300px]">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#14F195]/20 transition-all shadow-[0_0_20px_rgba(20,241,149,0)] group-hover:shadow-[0_0_30px_rgba(20,241,149,0.3)]">
                        <Plus className="w-6 h-6 text-[#a19db3] group-hover:text-[#14F195] transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">New Website</h3>
                    <p className="text-sm text-[#a19db3]">Start from scratch</p>
                </Link>

            </div>
        </DashboardLayout>
    )
}
