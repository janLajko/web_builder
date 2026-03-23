import { useEffect, useRef } from 'react'
import { Send, Sparkles, Settings, User as UserIcon, CheckCircle2, RotateCcw, Square, Code2, Paintbrush, FileJson, Cpu } from 'lucide-react'
import type { Version, WebsiteProject, Conversation } from '../types'
import { Tooltip } from './ui/Tooltip'

interface SidebarProps {
    project: WebsiteProject | null;
    versions: Version[];
    conversations: Conversation[];
    onPrompt: (prompt: string) => void;
    onRollback: (versionId: string) => void;
    loading?: boolean;
    step?: number;
    pendingPrompt?: string;
    onStop: () => void;
    prompt: string;
    setPrompt: (val: string) => void;
}

export const Sidebar = ({ project, versions, conversations, onPrompt, onRollback, loading, step = 0, pendingPrompt, onStop, prompt, setPrompt }: SidebarProps) => {
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [conversations, loading])

    const handleSend = () => {
        if (!prompt.trim()) return
        onPrompt(prompt)
        setPrompt('')
    }

    const suggestions = ["Add Sidebar", "Fix Contrast", "Mobile Menu"];

    const loadingSteps = [
        { text: "Generating index.html...", icon: <Code2 className="w-3.5 h-3.5" /> },
        { text: "Generating styles.css...", icon: <Paintbrush className="w-3.5 h-3.5" /> },
        { text: "Generating script.js...", icon: <FileJson className="w-3.5 h-3.5" /> },
        { text: "Wiring up logic...", icon: <Cpu className="w-3.5 h-3.5" /> }
    ];

    return (
        <div className="w-[360px] h-full border-r border-white/5 bg-[#0A0A0A] flex flex-col font-['Inter'] relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div>
                    <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">CURRENT PROJECT</div>
                    <div className="text-sm font-bold text-white tracking-wide">{project?.name || "Untitled Project"}</div>
                </div>
                <Tooltip content="Project Settings" placement="bottom">
                    <button className="p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </Tooltip>
            </div>

            {/* Main scrollable area */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
                {/* Chat Area */}
                <div className="p-4 space-y-6 flex-1">
                    {/* Welcome AI Message (only if no conversation history) */}
                    {conversations.length === 0 && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[#3B82F6]/20">
                                <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                            </div>
                            <div className="bg-[#0D1117]/60 border border-white/5 p-3.5 rounded-xl rounded-tl-sm text-[13px] text-[#e2e8f0] leading-relaxed shadow-sm backdrop-blur-sm">
                                Hello! I'm ready to help you build.<br />
                                What would you like to create today?
                            </div>
                        </div>
                    )}

                    {/* Render full conversation history */}
                    {conversations.map((msg) => (
                        msg.role === 'user' ? (
                            <div key={msg.id} className="flex gap-3 justify-end">
                                <div className="bg-[#3B82F6] p-3.5 rounded-xl rounded-tr-sm text-[13px] text-white font-medium leading-relaxed shadow-[0_0_15px_rgba(59,130,246,0.2)] max-w-[85%]">
                                    {msg.content}
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0 border border-white/10">
                                    <UserIcon className="w-4 h-4 text-[#9CA3AF]" />
                                </div>
                            </div>
                        ) : (
                            <div key={msg.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[#3B82F6]/20">
                                    <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                                </div>
                                <div className="bg-[#0D1117]/60 border border-white/5 p-3.5 rounded-xl rounded-tl-sm text-[13px] text-[#e2e8f0] leading-relaxed shadow-sm backdrop-blur-sm max-w-[85%]">
                                    {msg.content}
                                </div>
                            </div>
                        )
                    ))}

                    {/* Show the pending prompt if generating for the first time */}
                    {pendingPrompt && !versions.length && conversations.length === 0 && (
                        <div className="flex gap-3 justify-end">
                            <div className="bg-[#3B82F6] p-3.5 rounded-xl rounded-tr-sm text-[13px] text-white font-medium leading-relaxed shadow-[0_0_15px_rgba(59,130,246,0.2)] max-w-[85%]">
                                {pendingPrompt}
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0 border border-white/10">
                                <UserIcon className="w-4 h-4 text-[#9CA3AF]" />
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />

                    {/* Loading status */}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0D1117] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[#3B82F6]/20">
                                <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                            </div>
                            <div className="bg-[#0D1117]/40 border border-[#3B82F6]/30 p-4 rounded-xl rounded-tl-sm text-[13px] w-full space-y-3 relative overflow-hidden backdrop-blur-sm">
                                {loadingSteps.map((item, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 ${idx <= step ? 'opacity-100' : 'opacity-40'}`}>
                                        {idx < step ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                                        ) : idx === step ? (
                                            <RotateCcw className="w-3.5 h-3.5 text-white animate-spin" />
                                        ) : (
                                            <span className="text-white/40">{item.icon}</span>
                                        )}
                                        <span className={`text-xs ${idx === step ? 'text-[#3B82F6] font-medium' : 'text-[#9CA3AF]'}`}>{item.text}</span>
                                    </div>
                                ))}
                                <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-[#3B82F6] transition-all duration-500 ease-out" style={{ width: `${Math.min(100, ((step + 1) / loadingSteps.length) * 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Iteration History */}
                {versions.length > 0 && (
                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 mb-3 text-[#9CA3AF]">
                            <RotateCcw className="w-3.5 h-3.5" />
                            <h3 className="text-[10px] font-bold uppercase tracking-widest">Iteration History</h3>
                        </div>
                        <div className="space-y-2">
                            {versions.map((version, idx) => (
                                <div key={version.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0D1117]/40 border border-white/5 hover:bg-[#0D1117]/60 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white">v{versions.length - idx}.{versions.length - idx === versions.length ? '2' : '1'} - {version.prompt ? version.prompt.substring(0, 15) + '...' : 'Initial Gen'}</span>
                                        <span className="text-[10px] text-[#9CA3AF] mt-0.5">Just now</span>
                                    </div>
                                    <button
                                        onClick={() => onRollback(version.id)}
                                        className="px-2 py-1 text-[9px] font-bold tracking-widest uppercase text-[#3B82F6] border border-[#3B82F6]/30 rounded hover:bg-[#3B82F6]/10 transition-colors"
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
            <div className="p-4 border-t border-white/5 bg-[#0A0A0A] pb-6">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-[#3B82F6] rounded-[14px] opacity-10 group-focus-within:opacity-30 blur-[2px] transition-opacity duration-500"></div>
                    <div className="relative bg-[#0D1117]/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#3B82F6]/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex items-center pr-2 backdrop-blur-sm">
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
                            className="w-full h-[52px] py-3.5 px-4 bg-transparent resize-none focus:outline-none text-[13px] text-white placeholder:text-[#9CA3AF]/60 font-medium no-scrollbar flex-1"
                        />
                        {loading ? (
                            <Tooltip content="Stop Generation" placement="top">
                                <button
                                    onClick={onStop}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:scale-105 active:scale-90"
                                >
                                    <Square className="w-4 h-4 fill-current" />
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip content="Send Prompt" placement="top">
                                <button
                                    onClick={handleSend}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${prompt.trim()
                                        ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-90'
                                        : 'bg-white/5 text-[#9CA3AF] cursor-not-allowed'
                                        }`}
                                    disabled={!prompt.trim()}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Suggestions */}
                <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
                    {suggestions.map((s, i) => (
                        <button key={i} onClick={() => setPrompt(s)} className="px-3 py-1.5 rounded bg-[#0D1117]/60 hover:bg-[#0D1117] border border-white/5 text-[10px] font-medium text-[#9CA3AF] hover:text-white transition-all duration-200 whitespace-nowrap active:scale-95 hover:border-[#3B82F6]/30">
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    )
}
