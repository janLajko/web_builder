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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#111] border border-blue-100 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 font-bold mb-6 animate-slide-up delay-1 overflow-hidden relative shadow-sm transition-colors duration-500">
                        <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest shadow-sm">NEW</span>
                        Try 30 days free trial option <span className="text-blue-500">&gt;</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-6 leading-tight max-w-3xl mx-auto animate-slide-up delay-2 transition-colors duration-500">
                        Turn thoughts into websites instantly, with AI.
                    </h1>

                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed animate-slide-up delay-3 transition-colors duration-500">
                        Create, customize and publish websites faster than ever with our AI Site Builder.
                    </p>
                </div>

                {/* Prompt Bar */}
                <form onSubmit={handleSubmit} className="w-full max-w-4xl relative animate-slide-up delay-4">
                    <div className="relative bg-white/80 dark:bg-black/60 border border-gray-200 dark:border-white/10 rounded-[2rem] flex flex-col items-end shadow-lg transition-all duration-500 focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 focus-within:bg-white dark:focus-within:bg-[#111] h-[160px] overflow-hidden backdrop-blur-3xl group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your presentation in detail"
                            className="w-full flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 text-base px-6 py-6 resize-none font-medium transition-colors"
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
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:scale-95 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Create with AI
                            </button>
                        </div>
                    </div>
                </form>

                {/* Brand Logos */}
                <div className="mt-16 pt-8 w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 opacity-50 grayscale flex-wrap animate-slide-up delay-5 mix-blend-multiply dark:mix-blend-screen transition-all duration-500">
                    <span className="text-xl font-bold tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 hover:opacity-100 transition-all duration-300 cursor-default text-gray-800 dark:text-gray-300">Framer</span>
                    <span className="text-xl font-black hover:text-blue-500 dark:hover:text-blue-400 hover:opacity-100 transition-all duration-300 cursor-default text-gray-800 dark:text-gray-300">HUAWEI</span>
                    <span className="text-xl font-serif italic hover:text-blue-600 dark:hover:text-blue-400 hover:opacity-100 transition-all duration-300 cursor-default text-gray-800 dark:text-gray-300">Instagram</span>
                    <span className="text-xl font-black hover:text-blue-500 dark:hover:text-blue-400 hover:opacity-100 transition-all duration-300 cursor-default text-gray-800 dark:text-gray-300">Microsoft</span>
                    <span className="text-xl font-black tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 hover:opacity-100 transition-all duration-300 cursor-default text-gray-800 dark:text-gray-300">Walmart</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
