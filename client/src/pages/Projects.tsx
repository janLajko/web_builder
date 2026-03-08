import { useState, useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { ProjectPreview } from "../components/ProjectPreview"
import { api } from "../config/axios"
import { useAuth } from "../providers"
import type { WebsiteProject } from "../types"
import { Sparkles, Code2, Monitor, Smartphone, Tablet, Download, Save, Eye, Wand2, Star, Columns } from "lucide-react"

export default function Projects() {
    const location = useLocation()
    const { id } = useParams()
    const { checkAuth } = useAuth()
    const initialPrompt = location.state?.initialPrompt || ""

    const [project, setProject] = useState<WebsiteProject | null>(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('preview')
    const [progress, setProgress] = useState(0)
    const previewRef = useRef<{ getCode: () => string }>(null)
    const generationTriggeredRef = useRef(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
        const fetchProjectById = async (projectId: string) => {
            try {
                setLoading(true)
                const fullRes = await api.get(`/api/project/${projectId}`)
                setProject(fullRes.data)
            } catch (error) {
                console.error("Failed to load project:", error)
                alert("Failed to load this project.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProjectById(id)
        }
    }, [id])

    useEffect(() => {
        if (!id && initialPrompt && !generationTriggeredRef.current && !project && !loading) {
            generationTriggeredRef.current = true
            handleInitialGeneration(initialPrompt)
        }
    }, [id, initialPrompt, project, loading])

    // Simulate progress bar during loading
    useEffect(() => {
        let progressInterval: number;
        if (loading) {
            setProgress(0)
            progressInterval = window.setInterval(() => {
                setProgress(p => {
                    // Slow down significantly as it gets closer to 99% to account for 3-5m generation times
                    if (p < 30) return p + (Math.random() * 2 + 1); // 1-3% jumps
                    if (p < 60) return p + (Math.random() * 1.5 + 0.5); // 0.5-2% jumps
                    if (p < 85) return p + (Math.random() * 0.8 + 0.2); // 0.2-1% jumps
                    if (p < 99) return p + 0.1; // 0.1% jumps at the end
                    return 99; // Hold at 99% until complete
                })
            }, 2500) // update every 2.5 seconds
        } else {
            setProgress(100)
            setTimeout(() => setProgress(0), 1000) // Reset after delay
        }
        return () => window.clearInterval(progressInterval)
    }, [loading])

    const handleInitialGeneration = async (prompt: string) => {
        setLoading(true)
        setStep(0)

        abortControllerRef.current = new AbortController()

        try {
            const pRes = await api.post('/api/project', {
                initialPrompt: prompt
            }, {
                signal: abortControllerRef.current.signal
            })
            const newProjectId = pRes.data.projectId

            const startTime = Date.now()
            const pollInterval = window.setInterval(async () => {
                try {
                    const fullRes = await api.get(`/api/project/${newProjectId}`)
                    const projectData = fullRes.data

                    if (projectData && projectData.versions && projectData.versions.length > 0) {
                        setProject(projectData)
                        setLoading(false)
                        checkAuth()
                        window.clearInterval(pollInterval)
                        window.history.replaceState({}, document.title)
                    } else if (Date.now() - startTime > 10 * 60 * 1000) {
                        window.clearInterval(pollInterval)
                        setLoading(false)
                        alert("Generation timed out. Please try again.")
                    }
                } catch (e) {
                    console.error("Polling error", e)
                }
            }, 5000)

        } catch (error: any) {
            if (error.name === 'CanceledError' || error.message?.includes('aborted')) {
                console.log("Generation stopped by user")
            } else {
                console.error("Failed to start generation:", error)
                alert("Failed to start project generation. Please check your credits or try again.")
            }
            setLoading(false)
        }
    }

    const handlePrompt = async (prompt: string) => {
        if (!project) {
            return handleInitialGeneration(prompt)
        }
        setLoading(true)
        setStep(0)

        abortControllerRef.current = new AbortController()

        const interval = window.setInterval(() => {
            setStep(s => (s < 3 ? s + 1 : s))
        }, 2000)

        try {
            const currentCode = project.versions?.[0]?.code || ""
            await api.post('/api/project/revise', {
                projectId: project.id,
                prompt,
                currentCode
            }, {
                signal: abortControllerRef.current.signal
            })
            const fullRes = await api.get(`/api/project/${project.id}`)
            setProject(fullRes.data)
            checkAuth()
        } catch (error: any) {
            if (error.name === 'CanceledError' || error.message?.includes('aborted')) {
                console.log("Revision stopped by user")
            } else {
                console.error(error)
                alert("Revision failed")
            }
        } finally {
            clearInterval(interval)
            setLoading(false)
        }
    }

    const handleRollback = async (versionId: string) => {
        if (!project) return
        try {
            setLoading(true)
            const vRes = await api.get(`/api/project/rollback/${versionId}`)
            const targetVersion = vRes.data

            await api.post('/api/project/save', {
                projectId: project.id,
                code: targetVersion.code
            })

            const fullRes = await api.get(`/api/project/${project.id}`)
            setProject(fullRes.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (!previewRef.current) return;
        const finalCode = previewRef.current.getCode();
        if (!finalCode) return;

        const blob = new Blob([finalCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleStopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
        }
        setLoading(false)
    }

    const currentCode = project?.versions?.[0]?.code || ""

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#050505] font-['Inter'] selection:bg-[#3B82F6]/30">
            {/* Unified Top Navigation for Builder */}
            <nav className="h-[60px] border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-6 z-30 shrink-0 relative shadow-sm">
                {/* Left: Brand & Project Name */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white leading-tight truncate max-w-[300px]">{project?.name || "Untitled Project"}</span>
                        <span className="text-xs text-[#9CA3AF]">Previewing last saved version</span>
                    </div>
                </div>

                {/* Center: Device & View Controls */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded-lg p-1">
                    <button
                        onClick={() => setDevice('mobile')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'mobile' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}
                        title="Mobile Preview"
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDevice('tablet')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'tablet' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}
                        title="Tablet Preview"
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDevice('desktop')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'desktop' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}
                        title="Desktop Preview"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                    <button
                        onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
                        className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'code' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}
                        title="View Code"
                    >
                        <Code2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === 'split' ? 'preview' : 'split')}
                        className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'split' ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'}`}
                        title="Split View"
                    >
                        <Columns className="w-4 h-4" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#60A5FA]/20 text-[#60A5FA] hover:bg-[#60A5FA]/30 text-sm font-medium border border-[#60A5FA]/30 rounded-lg transition-colors">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity btn-ripple">
                        <Download className="w-4 h-4" /> Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all btn-ripple shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Eye className="w-4 h-4" /> Publish
                    </button>
                </div>
            </nav>

            {/* Main Layout Area */}
            <div className="flex-1 flex overflow-hidden bg-[#050505] relative">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                <Sidebar
                    project={project}
                    versions={project?.versions || []}
                    onPrompt={handlePrompt}
                    onRollback={handleRollback}
                    loading={loading}
                    step={step}
                    pendingPrompt={!project && loading ? initialPrompt : undefined}
                    onStop={handleStopGeneration}
                />

                <div className="flex-1 relative z-10 w-full min-h-0 bg-[#050505]">
                    {currentCode ? (
                        viewMode === 'code' ? (
                            <div className="w-full h-full bg-[#1e1e1e] p-6 overflow-y-scroll">
                                <pre className="font-mono text-sm leading-relaxed text-[#d4d4d4] whitespace-pre-wrap break-words m-0">
                                    <code>{currentCode}</code>
                                </pre>
                            </div>
                        ) : viewMode === 'split' ? (
                            <div className="w-full h-full flex">
                                <div className="w-1/2 h-full bg-[#1e1e1e] p-6 overflow-y-scroll border-r border-[#333]">
                                    <pre className="font-mono text-sm leading-relaxed text-[#d4d4d4] whitespace-pre-wrap break-words m-0">
                                        <code>{currentCode}</code>
                                    </pre>
                                </div>
                                <div className="w-1/2 h-full relative border-l border-[#111] bg-[#050505] overflow-auto">
                                    <ProjectPreview code={currentCode} device={device} ref={previewRef} />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <ProjectPreview code={currentCode} device={device} ref={previewRef} />
                            </div>
                        )
                    ) : loading ? (
                        <div className="flex-1 w-full bg-[#0A0A0B] relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <div className="w-full max-w-xl relative flex items-center justify-center px-4">
                                {/* Glowing orbs */}
                                <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] animate-pulse"></div>
                                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>

                                {/* Animated "Built with AI" widget */}
                                <div className="w-full bg-[#111]/90 rounded-2xl border border-white/10 p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative z-10 backdrop-blur-2xl transition-all duration-500">
                                    {/* Decorative top bar */}
                                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                                                <Wand2 className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <span className="text-white font-bold tracking-widest uppercase text-xs">DivStack Engine</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Main Animated Text */}
                                        <div className="relative">
                                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                                                Building your website...
                                            </h3>
                                            <p className="text-gray-400 font-mono text-xs max-w-[90%] leading-relaxed flex items-center">
                                                <span className="text-blue-500 mr-2">❯</span>
                                                {progress < 30 ? "Analyzing project requirements..." : progress < 60 ? "Architecting layout and components..." : progress < 90 ? "Writing Tailwind CSS styles..." : "Finalizing code generation..."}
                                                <span className="inline-block w-1.5 h-3 ml-1 bg-blue-400 animate-[pulse_1s_infinite]"></span>
                                            </p>
                                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                                Estimated time: ~2-5 minutes
                                            </div>
                                        </div>

                                        {/* Progressive Bar Section */}
                                        <div className="pt-6">
                                            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                <span>Progress</span>
                                                <span className="text-blue-400">{Math.floor(progress)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.8)] relative"
                                                    style={{ width: `${progress}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Animated UI lines */}
                                        <div className="pt-4 space-y-3 opacity-70">
                                            <div className="flex gap-3">
                                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 flex items-center justify-center p-3 animate-pulse">
                                                    <Star className="w-full h-full text-blue-400/50" />
                                                </div>
                                                <div className="h-12 flex-1 bg-white/5 rounded-xl border border-white/5 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] transition-transform duration-1000 ease-in-out"></div>
                                                </div>
                                            </div>
                                            <div className="h-16 w-full bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl border border-blue-500/10 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full animate-[shimmer_4s_infinite] transition-transform duration-[2000ms] ease-in-out"></div>
                                                {/* Lines inside */}
                                                <div className="absolute top-4 left-4 right-1/4 h-2 bg-white/5 rounded-full"></div>
                                                <div className="absolute top-8 left-4 right-1/2 h-2 bg-white/5 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center max-w-md p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#0D1117] to-[#0D1117] border border-white/10 flex items-center justify-center shadow-lg">
                                <Code2 className="w-8 h-8 text-[#3B82F6]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Ready to build</h3>
                            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">Enter a prompt in the sidebar to generate your first website components. The AI will do the heavy lifting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
