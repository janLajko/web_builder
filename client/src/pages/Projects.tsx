import { useState, useEffect, useRef, useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { ProjectPreview } from "../components/ProjectPreview"
import { api } from "../config/axios"
import { useAuth } from "../providers"
import type { WebsiteProject } from "../types"
import { Code2, Monitor, Smartphone, Tablet, Download, Save, Eye, Wand2, Columns, FileCode } from "lucide-react"
import { parseVFS, getAppStructure } from '../lib/vfs'
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackFileExplorer } from "@codesandbox/sandpack-react"

export default function Projects() {
    const location = useLocation()
    const { id } = useParams()
    const { checkAuth } = useAuth()
    const initialPrompt = location.state?.initialPrompt || ""

    const [project, setProject] = useState<WebsiteProject | null>(null)
    const [prompt, setPrompt] = useState<string>("")
    const [streamingCode, setStreamingCode] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('preview')
    const [progress, setProgress] = useState(0)
    const [copied, setCopied] = useState(false)
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
                    if (p < 30) return p + (Math.random() * 2 + 1);
                    if (p < 60) return p + (Math.random() * 1.5 + 0.5);
                    if (p < 85) return p + (Math.random() * 0.8 + 0.2);
                    if (p < 99) return p + 0.1;
                    return 99;
                })
            }, 2500)
        } else {
            setProgress(100)
            setTimeout(() => setProgress(0), 1000)
        }
        return () => window.clearInterval(progressInterval)
    }, [loading])

    const handleInitialGeneration = async (promptText: string) => {
        setLoading(true)
        setStep(0)
        abortControllerRef.current = new AbortController()

        try {
            const pRes = await api.post('/api/project', {
                initialPrompt: promptText
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
                    } else if (Date.now() - startTime > 20 * 60 * 1000) {
                        window.clearInterval(pollInterval)
                        setLoading(false)
                        alert("Generation is taking longer than expected. Please check your project list in a few minutes.")
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
                const errorMsg = error.response?.data?.message || error.message || "Unknown error";
                alert(`Failed to start project generation: ${errorMsg}`)
            }
            setLoading(false)
        }
    }

    const handlePrompt = async (userPrompt: string) => {
        if (!userPrompt.trim() || loading || !project) return

        setLoading(true)
        setStreamingCode("")

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5678'}/api/project/revise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    prompt: userPrompt,
                    projectId: project.id,
                    currentCode: project.currentCode
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Streaming failed");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) throw new Error("No reader found");

            let accumulatedCode = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6).trim();
                        if (dataStr === '[DONE]') break;
                        try {
                            const parsed = JSON.parse(dataStr);
                            accumulatedCode += parsed.content;
                            setStreamingCode(accumulatedCode);
                        } catch (e) {
                            // Suppress partial JSON errors
                        }
                    }
                }
            }

            await checkAuth()
            const updatedProject = await api.get(`/api/project/${project.id}`)
            setProject(updatedProject.data)
            setStreamingCode(null)
        } catch (error: any) {
            console.error("Revision error", error)
            alert(error.message || "Failed to update project")
            setStreamingCode(null)
        } finally {
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
        if (!currentCode) return;
        const blob = new Blob([currentCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project?.name || 'project'}-source.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleCopyCode = () => {
        if (!currentCode) return;
        navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleStopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
        }
        setLoading(false)
    }

    const currentCode = streamingCode ?? (project?.versions?.[0]?.code || project?.currentCode || "")
    const vfs = useMemo(() => parseVFS(currentCode), [currentCode])
    const sandpackFiles = useMemo(() => getAppStructure(vfs), [vfs])

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-[#050505] font-['Inter'] selection:bg-[#3B82F6]/30">
            <nav className="h-[60px] border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-6 z-30 shrink-0 relative shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center p-1.5 shadow-md">
                        <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white leading-tight truncate max-w-[300px]">{project?.name || "Untitled Project"}</span>
                        <span className="text-xs text-[#9CA3AF]">Previewing last saved version</span>
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded-lg p-1">
                    <button
                        onClick={() => setDevice('mobile')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'mobile' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white'}`}
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDevice('tablet')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'tablet' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white'}`}
                    >
                        <Tablet className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDevice('desktop')}
                        disabled={viewMode === 'code'}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'code' ? 'opacity-30 cursor-not-allowed text-[#9CA3AF]' : device === 'desktop' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30' : 'text-[#9CA3AF] hover:text-white'}`}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
                    <button
                        onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'code' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-[#9CA3AF] hover:text-white'}`}
                    >
                        <Code2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === 'split' ? 'preview' : 'split')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'split' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-[#9CA3AF] hover:text-white'}`}
                    >
                        <Columns className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#60A5FA]/20 text-[#60A5FA] hover:bg-[#60A5FA]/30 text-sm border border-[#60A5FA]/30 rounded-lg">
                        <Save className="w-4 h-4" /> Save
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white text-sm rounded-lg hover:opacity-90">
                        <Download className="w-4 h-4" /> Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-sm rounded-lg hover:opacity-90 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Eye className="w-4 h-4" /> Publish
                    </button>
                </div>
            </nav>

            <div className="flex-1 flex overflow-hidden relative">
                <Sidebar
                    project={project}
                    versions={project?.versions || []}
                    conversations={project?.conversations || []}
                    onPrompt={handlePrompt}
                    onRollback={handleRollback}
                    loading={loading}
                    step={step}
                    pendingPrompt={!project && loading ? initialPrompt : undefined}
                    onStop={handleStopGeneration}
                    prompt={prompt}
                    setPrompt={setPrompt}
                />

                <div className="flex-1 relative z-10 w-full min-h-0 bg-[#050505]">
                    {currentCode ? (
                        viewMode === 'code' || viewMode === 'split' ? (
                            <div className={`w-full h-full flex ${viewMode === 'split' ? 'flex-row' : 'flex-col'} overflow-hidden`}>
                                <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full bg-[#0D1117] flex flex-col`}>
                                    <SandpackProvider
                                        files={sandpackFiles}
                                        theme="dark"
                                        template="vanilla"
                                        className="h-full border-none"
                                        options={{
                                            externalResources: ["https://cdn.tailwindcss.com"],
                                            activeFile: '/index.html',
                                            visibleFiles: ['/index.html', '/style.css', '/script.js']
                                        }}
                                    >
                                        <SandpackLayout style={{ flex: 1, border: 'none' }}>
                                            {viewMode === 'code' && (
                                                <div className="w-64 border-r border-white/5 bg-[#050505] hidden md:block">
                                                    <SandpackFileExplorer />
                                                </div>
                                            )}
                                            <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0B]">
                                                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0D1117]">
                                                    <div className="flex items-center gap-2 text-[#9CA3AF] text-xs">
                                                        <FileCode className="w-3.5 h-3.5" /> Source
                                                    </div>
                                                    <button onClick={handleCopyCode} className="p-1 px-2 bg-white/5 text-white text-[10px] rounded border border-white/5">
                                                        {copied ? "Copied!" : "Copy Code"}
                                                    </button>
                                                </div>
                                                <SandpackCodeEditor
                                                    showLineNumbers={true}
                                                    style={{ height: '100%', fontSize: '13px' }}
                                                />
                                            </div>
                                        </SandpackLayout>
                                    </SandpackProvider>
                                </div>
                                {viewMode === 'split' && (
                                    <div className="w-1/2 h-full">
                                        <ProjectPreview code={currentCode} device={device} ref={previewRef} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full">
                                <ProjectPreview code={currentCode} device={device} ref={previewRef} />
                            </div>
                        )
                    ) : loading ? (
                        <div className="flex-1 w-full bg-[#0A0A0B] relative flex items-center justify-center overflow-hidden">
                            <div className="w-full max-w-xl relative flex flex-col items-center">
                                <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] animate-pulse"></div>
                                <div className="w-full bg-[#111]/90 rounded-2xl border border-white/10 p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-2xl">
                                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                                            <Wand2 className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-white font-bold uppercase text-[10px] tracking-widest">DivStack Engine v2</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2">Building project...</h3>
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-8">
                                        <span>Progress</span>
                                        <span className="text-blue-400">{Math.floor(progress)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-12 max-w-sm">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#0D1117] border border-white/10 flex items-center justify-center">
                                <Code2 className="w-8 h-8 text-[#3B82F6]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Ready to create</h3>
                            <p className="text-[#9CA3AF] text-sm">Submit your prompt in the chat to start generating components in real-time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
