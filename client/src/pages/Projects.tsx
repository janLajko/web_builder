import { useState, useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { ProjectPreview } from "../components/ProjectPreview"
import { api } from "../config/axios"
import type { WebsiteProject } from "../types"
import { Sparkles, Code2, Monitor, Smartphone, Tablet, Download, Save, Eye, Scan } from "lucide-react"

export default function Projects() {
    const location = useLocation()
    const { id } = useParams()
    const initialPrompt = location.state?.initialPrompt || ""

    const [project, setProject] = useState<WebsiteProject | null>(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const previewRef = useRef<{ getCode: () => string }>(null)
    const generationTriggeredRef = useRef(false)

    // Load an existing project when opened from /projects/:id
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

    // Start fresh generation when coming from flows that pass initialPrompt state
    useEffect(() => {
        if (!id && initialPrompt && !generationTriggeredRef.current && !project && !loading) {
            generationTriggeredRef.current = true
            handleInitialGeneration(initialPrompt)
        }
    }, [id, initialPrompt, project, loading])

    const handleInitialGeneration = async (prompt: string) => {
        setLoading(true)
        setStep(0)

        try {
            // Create project first (this kicks off async AI generation on backend)
            const pRes = await api.post('/api/project', {
                initialPrompt: prompt
            })
            const newProjectId = pRes.data.projectId

            // Poll for completion (up to 5 minutes)
            const startTime = Date.now()
            const pollInterval = window.setInterval(async () => {
                try {
                    const fullRes = await api.get(`/api/project/${newProjectId}`)
                    const projectData = fullRes.data

                    // Generation is complete once we have a version
                    if (projectData && projectData.versions && projectData.versions.length > 0) {
                        setProject(projectData)
                        setLoading(false)
                        window.clearInterval(pollInterval)

                        // Clear location state so we don't regenerate on refresh
                        window.history.replaceState({}, document.title)
                    } else if (Date.now() - startTime > 5 * 60 * 1000) {
                        // Timeout after 5 minutes
                        window.clearInterval(pollInterval)
                        setLoading(false)
                        alert("Generation timed out. Please try again.")
                    }
                } catch (e) {
                    console.error("Polling error", e)
                }
            }, 5000) // Poll every 5 seconds

        } catch (error) {
            console.error("Failed to start generation:", error)
            alert("Failed to start project generation. Please check your credits or try again.")
            setLoading(false)
        }
    }

    const handlePrompt = async (prompt: string) => {
        if (!project) {
            return handleInitialGeneration(prompt)
        }
        setLoading(true)
        setStep(0)

        const interval = window.setInterval(() => {
            setStep(s => (s < 3 ? s + 1 : s))
        }, 2000)

        try {
            const currentCode = project.versions?.[0]?.code || ""
            await api.post('/api/project/revise', {
                projectId: project.id,
                prompt,
                currentCode
            })
            const fullRes = await api.get(`/api/project/${project.id}`)
            setProject(fullRes.data)
        } catch (error) {
            console.error(error)
            alert("Revision failed")
        } finally {
            clearInterval(interval)
            setLoading(false)
        }
    }

    const handleRollback = async (versionId: string) => {
        // In this basic implementation, we just set the target version as latest by duplicating it.
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

    const currentCode = project?.versions?.[0]?.code || ""

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#111111] font-['Inter'] selection:bg-primaryStart/30">
            {/* Unified Top Navigation for Builder */}
            <nav className="h-[60px] border-b border-white/5 bg-[#1A1A1A]/80 backdrop-blur-xl flex items-center justify-between px-6 z-30 shrink-0 relative shadow-sm">
                {/* Left: Brand & Project Name */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white leading-tight truncate max-w-[300px]">{project?.name || "Untitled Project"}</span>
                        <span className="text-xs text-[#a19db3]">Previewing last saved version</span>
                    </div>
                </div>

                {/* Center: Device Controls */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#1A1A1A] border border-white/5 rounded-lg p-1">
                    <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                        <Smartphone className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDevice('tablet')} className={`p-1.5 rounded-md transition-colors ${device === 'tablet' ? 'bg-white/10 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                        <Monitor className="w-4 h-4" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-[#a19db3] hover:text-white text-sm font-medium border border-[#a19db3]/30 rounded-lg transition-colors">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-[#a19db3] hover:text-white text-sm font-medium border border-[#a19db3]/30 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                        <Download className="w-4 h-4" /> Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#14F195] text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors">
                        <Eye className="w-4 h-4" /> Publish
                    </button>
                </div>
            </nav>

            {/* Main Layout Area */}
            <div className="flex-1 flex overflow-hidden bg-[#111111] relative">

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
                />

                <div className="flex-1 relative flex flex-col items-center justify-center z-10 w-full overflow-hidden bg-[#111111]">
                    {currentCode ? (
                        <ProjectPreview code={currentCode} device={device} ref={previewRef} />
                    ) : loading ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center mb-4 transition-all">
                                <div className="w-16 h-16 border border-[#ffffff1a] rounded-full flex items-center justify-center animate-[spin_3s_linear_infinite] relative before:absolute before:inset-0 before:border-t-2 before:border-[#14F195] before:rounded-full"></div>
                                <Scan className="w-6 h-6 text-[#a19db3] absolute" />
                            </div>
                            <h3 className="text-white text-lg font-medium">Analyzing your request...</h3>
                            <p className="text-[#a19db3] text-sm">This may take around 2-3 minutes...</p>
                        </div>
                    ) : (
                        <div className="text-center max-w-md p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#1A1A1A] to-[#1A1A1A] border border-white/10 flex items-center justify-center shadow-lg">
                                <Code2 className="w-8 h-8 text-[#00C2A8]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Ready to build</h3>
                            <p className="text-[#a19db3] text-sm leading-relaxed mb-6">Enter a prompt in the sidebar to generate your first website components. The AI will do the heavy lifting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
