import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import toast from "react-hot-toast"

export default function AIBuilder() {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) {
            toast.error("Please enter a description for your website.")
            return
        }

        try {
            // Forward the user to the Generative workspace where the AI logic lives
            navigate('/projects', { state: { initialPrompt: input } })
        } catch (error: any) {
            toast.error("An error occurred launching the builder")
            console.error(error)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                {/* Hero / Header Text */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white mb-6">
                        <span className="bg-gradient-to-r from-blue-500 to-primaryStart text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">NEW</span>
                        Try 30 days free trial option <span className="text-[#a19db3]">&gt;</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-3xl mx-auto">
                        Turn thoughts into websites instantly, with AI.
                    </h1>

                    <p className="text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Create, customize and publish website faster than ever with our AI Site Builder.
                    </p>
                </div>

                {/* Prompt Bar (Matching Reference) */}
                <form onSubmit={handleSubmit} className="w-full max-w-4xl relative">
                    <div className="relative bg-[#1A1A1A]/40 border border-[#089684]/30 rounded-2xl flex flex-col items-end shadow-2xl transition-colors focus-within:border-[#14F195] focus-within:bg-[#1A1A1A]/60 h-[160px] overflow-hidden backdrop-blur-sm">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your presentation in details"
                            className="w-full flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#a19db3]/70 text-base px-6 py-6 resize-none font-light"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                            autoFocus
                        />
                        <div className="absolute bottom-4 right-4 z-10">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-[#14F195] to-[#14F195] hover:from-[#00C2A8] hover:to-[#14F195] rounded-lg text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(20,241,149,0.4)]"
                            >
                                Create with AI
                            </button>
                        </div>
                    </div>
                </form>

                {/* Brand Logos (Optional, matching screenshot) */}
                <div className="mt-16 pt-8 w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 opacity-40 grayscale flex-wrap">
                    <span className="text-xl font-bold tracking-tighter">Framer</span>
                    <span className="text-xl font-bold">HUAWEI</span>
                    <span className="text-xl font-serif italic">Instagram</span>
                    <span className="text-xl font-bold">Microsoft</span>
                    <span className="text-xl font-bold">Walmart</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
