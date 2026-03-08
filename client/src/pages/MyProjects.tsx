import { useEffect, useState, useRef } from "react"
import { api } from "../config/axios"
import type { WebsiteProject } from "../types"
import { Link } from "react-router-dom"
import { Plus, Calendar, MoreVertical, Pencil, Trash2, X, Sparkles, Eye, Code2 } from "lucide-react"
import DashboardLayout from "../components/DashboardLayout"
import toast from "react-hot-toast"

export default function MyProjects() {
    const [projects, setProjects] = useState<WebsiteProject[]>([])
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
    const [renameModalProject, setRenameModalProject] = useState<WebsiteProject | null>(null)
    const [deleteModalProject, setDeleteModalProject] = useState<WebsiteProject | null>(null)
    const [newName, setNewName] = useState("")
    const [actionLoading, setActionLoading] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpenId(null)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleRename = async () => {
        if (!renameModalProject || !newName.trim()) return
        setActionLoading(true)
        try {
            await api.patch(`/api/project/rename/${renameModalProject.id}`, { name: newName.trim() })
            toast.success("Project renamed successfully")
            setRenameModalProject(null)
            setNewName("")
            fetchProjects()
        } catch {
            toast.error("Failed to rename project")
        } finally {
            setActionLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteModalProject) return
        setActionLoading(true)
        try {
            await api.delete(`/api/project/delete/${deleteModalProject.id}`)
            toast.success("Project deleted successfully")
            setDeleteModalProject(null)
            fetchProjects()
        } catch {
            toast.error("Failed to delete project")
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 transition-colors duration-500">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-2 uppercase transition-colors">My Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg transition-colors">Manage and deploy your high-performance AI models.</p>
                </div>
                <Link to="/ai-builder" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <Plus className="w-5 h-5" /> Create New
                </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-colors duration-500">

                {projects.map((project) => (
                    <div key={project.id} className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-3xl rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden group hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 shadow-sm flex flex-col relative hover:shadow-xl hover:-translate-y-1">
                        {/* 3-dot menu button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setMenuOpenId(menuOpenId === project.id ? null : project.id)
                            }}
                            className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#222] transition-colors backdrop-blur-md shadow-sm"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown menu */}
                        {menuOpenId === project.id && (
                            <div
                                ref={menuRef}
                                className="absolute top-14 right-3 z-40 w-44 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 backdrop-blur-3xl transition-colors duration-500"
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setMenuOpenId(null)
                                        setNewName(project.name || "")
                                        setRenameModalProject(project)
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
                                >
                                    <Pencil className="w-4 h-4 text-blue-500" /> Rename
                                </button>
                                <div className="h-px bg-gray-100 dark:bg-white/10 transition-colors" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setMenuOpenId(null)
                                        setDeleteModalProject(project)
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        )}

                        {/* Card content as a Link */}
                        <Link to={`/projects/${project.id}`} className="flex flex-col flex-1 cursor-pointer">
                            <div className="h-48 w-full bg-gray-100 dark:bg-[#222] relative overflow-hidden flex items-center justify-center transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-200/50 dark:from-[#111]/50 dark:to-[#050505]/50 transition-colors"></div>
                                <div className="w-16 h-16 rounded-3xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm z-10 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-500/50 transition-all duration-300">
                                    <span className="text-2xl font-black text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">&lt;/&gt;</span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col bg-white dark:bg-[#111] transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-1 uppercase tracking-tight">{project.name || "Untitled Project"}</h3>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-xl shadow-sm">READY</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-2 mb-6 flex-1">{project.description || "A custom AI-generated website."}</p>

                                {/* Quick Actions */}
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                                    <div className="flex items-center gap-2">
                                        <Link to={`/preview/${project.id}`} onClick={(e) => e.stopPropagation()} className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm cursor-pointer">
                                            <Eye className="w-3.5 h-3.5" /> Preview
                                        </Link>
                                        <Link to={`/projects/${project.id}`} onClick={(e) => e.stopPropagation()} className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#222] transition-colors shadow-sm cursor-pointer">
                                            <Code2 className="w-3.5 h-3.5" /> Edit
                                        </Link>
                                    </div>
                                    <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                        <Calendar className="w-3.5 h-3.5" /> {new Date(project.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* Create New Card */}
                <Link to="/ai-builder" className="relative overflow-hidden bg-white/50 dark:bg-black/30 border-2 border-dashed border-blue-200/50 dark:border-blue-500/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-blue-400 hover:bg-white dark:hover:bg-[#0A0A0A] transition-all duration-500 cursor-pointer min-h-[300px] shadow-sm hover:shadow-2xl hover:-translate-y-2 backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/10 group-hover:to-purple-600/10 transition-colors duration-500 z-0" />
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner relative z-10">
                        <Sparkles className="w-10 h-10 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight transition-colors relative z-10">Build with AI</h3>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors relative z-10 leading-relaxed max-w-[80%]">Generate a stunning website using your imagination.</p>
                </Link>

            </div>

            {/* Rename Modal */}
            {renameModalProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-colors duration-500" onClick={() => setRenameModalProject(null)}>
                    <div className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-3xl border border-gray-200 dark:border-white/10 p-10 rounded-[2rem] w-full max-w-md shadow-2xl transition-colors duration-500" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight transition-colors">Rename Project</h2>
                            <button onClick={() => setRenameModalProject(null)} className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Enter new project name"
                            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white font-medium text-base focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-[#222] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-inner transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 mb-8"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRename()
                            }}
                        />
                        <div className="flex gap-4 justify-end">
                            <button onClick={() => setRenameModalProject(null)} className="px-6 py-3 rounded-xl bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest transition-colors border border-gray-200 dark:border-white/10 shadow-sm">
                                Cancel
                            </button>
                            <button
                                onClick={handleRename}
                                disabled={actionLoading || !newName.trim()}
                                className="px-6 py-3 rounded-xl bg-blue-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                {actionLoading ? "Renaming..." : "Rename"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-colors duration-500" onClick={() => setDeleteModalProject(null)}>
                    <div className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-3xl border border-gray-200 dark:border-white/10 p-10 rounded-[2rem] w-full max-w-md shadow-2xl transition-colors duration-500" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight transition-colors">Delete Project</h2>
                            <button onClick={() => setDeleteModalProject(null)} className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-base mb-3 leading-relaxed transition-colors">Are you sure you want to delete <span className="text-gray-900 dark:text-white font-black transition-colors">"{deleteModalProject.name || 'Untitled Project'}"</span>?</p>
                        <p className="text-red-500 dark:text-red-400 font-bold text-xs uppercase tracking-widest mb-8 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20 transition-colors">This action cannot be undone. All versions and data will be permanently removed.</p>
                        <div className="flex gap-4 justify-end">
                            <button onClick={() => setDeleteModalProject(null)} className="px-6 py-3 rounded-xl bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest transition-colors border border-gray-200 dark:border-white/10 shadow-sm">
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={actionLoading}
                                className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {actionLoading ? "Deleting..." : "Delete Project"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
