import { useState } from 'react'
import { Send, Sparkles, Settings, User as UserIcon, CheckCircle2, RotateCcw } from 'lucide-react'
import type { Version, WebsiteProject } from '../types'

interface SidebarProps {
    project: WebsiteProject | null;
    versions: Version[];
    onPrompt: (prompt: string) => void;
    onRollback: (versionId: string) => void;
    loading?: boolean;
    step?: number;
    pendingPrompt?: string;
}

export const Sidebar = ({ project, versions, onPrompt, onRollback, loading, step = 0, pendingPrompt }: SidebarProps) => {
    const [prompt, setPrompt] = useState('')

    const handleSend = () => {
        if (!prompt.trim()) return
        onPrompt(prompt)
        setPrompt('')
    }

    const suggestions = ["Add Sidebar", "Fix Contrast", "Mobile Menu"];

    // Mock steps matching the UI mockup
    const loadingSteps = [
        "Analyzing requirements...",
        "Architecting chart components...",
        "Generating responsive code..."
    ];

    return (
        <div className="w-[360px] h-full border-r border-[#ffffff0a] bg-[#1A1A1A] flex flex-col font-['Inter'] relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="p-4 border-b border-[#ffffff0a] flex items-center justify-between">
                <div>
                    <div className="text-[10px] font-bold text-[#a19db3] uppercase tracking-wider mb-1">CURRENT PROJECT</div>
                    <div className="text-sm font-bold text-white tracking-wide">{project?.name || "Untitled Project"}</div>
                </div>
                <button className="p-2 rounded-lg text-[#a19db3] hover:text-white hover:bg-white/5 transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Main scrollable area */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
                {/* Chat Area */}
                <div className="p-4 space-y-6 flex-1">
                    {/* Welcome AI Message */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(20,241,149,0.15)]">
                            <Sparkles className="w-4 h-4 text-[#00C2A8]" />
                        </div>
                        <div className="bg-[#1A1A1A]/40 border border-[#ffffff0a] p-3.5 rounded-xl rounded-tl-sm text-[13px] text-[#e2e8f0] leading-relaxed shadow-sm">
                            Hello! I've loaded your dashboard template.<br />
                            What changes would you like to make today?
                        </div>
                    </div>

                    {/* Show the pending prompt if it exists (usually during initial creation) */}
                    {pendingPrompt && !versions.length && (
                        <div className="flex gap-3 justify-end">
                            <div className="bg-gradient-to-r from-[#14F195] to-[#00C2A8] p-3.5 rounded-xl rounded-tr-sm text-[13px] text-white leading-relaxed shadow-[0_0_15px_rgba(20,241,149,0.2)] max-w-[85%]">
                                {pendingPrompt}
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-white/10">
                                <UserIcon className="w-4 h-4 text-[#a19db3]" />
                            </div>
                        </div>
                    )}

                    {/* Show the last prompt submitted by user if available */}
                    {versions.length > 0 && versions[0].prompt && (
                        <div className="flex gap-3 justify-end">
                            <div className="bg-gradient-to-r from-[#14F195] to-[#00C2A8] p-3.5 rounded-xl rounded-tr-sm text-[13px] text-white leading-relaxed shadow-[0_0_15px_rgba(20,241,149,0.2)] max-w-[85%]">
                                {versions[0].prompt}
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 border border-white/10">
                                <UserIcon className="w-4 h-4 text-[#a19db3]" />
                            </div>
                        </div>
                    )}

                    {/* Loading status (if currently generating) */}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(20,241,149,0.15)]">
                                <Sparkles className="w-4 h-4 text-[#00C2A8]" />
                            </div>
                            <div className="bg-[#1A1A1A]/30 border border-[#089684]/30 p-4 rounded-xl rounded-tl-sm text-[13px] w-full space-y-3 relative overflow-hidden">
                                {loadingSteps.map((text, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 ${idx <= step ? 'opacity-100' : 'opacity-40'}`}>
                                        {idx < step ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C2A8]" />
                                        ) : idx === step ? (
                                            <RotateCcw className="w-3.5 h-3.5 text-white animate-spin" />
                                        ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border border-white/20" />
                                        )}
                                        <span className={`text-xs ${idx === step ? 'text-white font-medium' : 'text-[#a19db3]'}`}>{text}</span>
                                    </div>
                                ))}
                                <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#089684] to-[#00C2A8] transition-all duration-500 ease-out" style={{ width: `${Math.min(100, ((step + 1) / loadingSteps.length) * 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Iteration History */}
                {versions.length > 0 && (
                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 mb-3 text-[#a19db3]">
                            <RotateCcw className="w-3.5 h-3.5" />
                            <h3 className="text-[10px] font-bold uppercase tracking-widest">Iteration History</h3>
                        </div>
                        <div className="space-y-2">
                            {versions.map((version, idx) => (
                                <div key={version.id} className="flex items-center justify-between p-3 rounded-lg bg-[#ffffff05] border border-[#ffffff0a] hover:bg-[#ffffff0a] transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white">v{versions.length - idx}.{versions.length - idx === versions.length ? '2' : '1'} - {version.prompt ? version.prompt.substring(0, 15) + '...' : 'Initial Gen'}</span>
                                        <span className="text-[10px] text-[#a19db3] mt-0.5">Just now</span>
                                    </div>
                                    <button
                                        onClick={() => onRollback(version.id)}
                                        className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-[#00C2A8] border border-[#00C2A8]/30 rounded hover:bg-[#00C2A8]/10 transition-colors"
                                    >
                                        Rollback
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#ffffff0a] bg-[#1A1A1A] pb-6">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#089684] to-[#00C2A8] rounded-[14px] opacity-10 group-focus-within:opacity-40 blur-[2px] transition-opacity duration-500"></div>
                    <div className="relative bg-[#1A1A1A]/40 border border-[#ffffff1a] rounded-xl overflow-hidden focus-within:border-[#089684]/50 transition-colors flex items-center pr-2">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                            placeholder="Type a prompt to update the UI..."
                            className="w-full h-[52px] py-3.5 px-4 bg-transparent resize-none focus:outline-none text-[13px] text-white placeholder:text-[#a19db3]/60 font-medium no-scrollbar flex-1"
                        />
                        <button
                            onClick={handleSend}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${prompt.trim() && !loading
                                ? 'bg-gradient-to-tr from-[#089684] to-[#00C2A8] text-white shadow-[0_0_15px_rgba(20,241,149,0.3)]'
                                : 'bg-white/5 text-[#a19db3] cursor-not-allowed'
                                }`}
                            disabled={!prompt.trim() || loading}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                    {suggestions.map((s, i) => (
                        <button key={i} onClick={() => setPrompt(s)} className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-medium text-[#a19db3] hover:text-white transition-colors whitespace-nowrap">
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    )
}
