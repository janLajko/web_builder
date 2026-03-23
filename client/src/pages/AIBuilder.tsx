import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Sparkles } from "lucide-react"
import loopVideo from "../assets/Glowing_digital_globe_202603231856.mp4"

export default function AIBuilder() {
    const [input, setInput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const navigate = useNavigate()

    const placeholders = [
        "Build a SaaS landing page...",
        "Create a portfolio website...",
        "Generate a dashboard UI...",
        "Design an e-commerce storefront..."
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((current) => (current + 1) % placeholders.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [placeholders.length])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) {
            toast.error("Please enter a description for your website.")
            return
        }

        setIsGenerating(true)


        try {
            setTimeout(() => {
                navigate('/projects', { state: { initialPrompt: input } })
            }, 2500) // Simulated AI processing delay for UX
        } catch (error: any) {
            toast.error("An error occurred launching the builder")
            console.error(error)
            setIsGenerating(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col items-center justify-center -mt-20 relative">
                
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-20" style={{
                    backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Subtle Radial Glow Behind Hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-[pulse_6s_infinite]"></div>

                {/* Looping Video Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none -z-10 flex items-center justify-center mix-blend-screen opacity-70">
                    <video 
                        src={loopVideo} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-contain [mask-image:radial-gradient(circle,black_40%,transparent_70%)]"
                    />
                </div>

                {/* Hero / Header Text with Floating Motion */}
                <motion.div 
                    className="text-center mb-10 relative z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#111] border border-blue-100 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 font-bold mb-6 animate-slide-up delay-1 overflow-hidden relative shadow-sm transition-colors duration-500 hover:shadow-md cursor-pointer">
                        <div className="absolute inset-0 animate-shimmer pointer-events-none hover:bg-white/10 transition-colors"></div>
                        <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest shadow-sm">NEW</span>
                        Try 30 days free trial option <span className="text-blue-500">&gt;</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-6 leading-tight max-w-3xl mx-auto animate-slide-up delay-2 transition-colors duration-500">
                        Turn thoughts into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">websites instantly</span>, with AI.
                    </h1>

                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed animate-slide-up delay-3 transition-colors duration-500">
                        Create, customize and publish websites faster than ever with our AI Site Builder.
                    </p>
                </motion.div>

                {/* Prompt Bar */}
                <form onSubmit={handleSubmit} className="w-full max-w-4xl relative animate-slide-up delay-4 z-10">
                    <div className="relative bg-white/80 dark:bg-black/80 border border-gray-200 dark:border-white/10 rounded-[2rem] flex flex-col items-end shadow-lg transition-all duration-500 focus-within:border-purple-500/50 dark:focus-within:border-purple-500/50 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.15)] focus-within:bg-white dark:focus-within:bg-[#111] h-[160px] overflow-hidden backdrop-blur-3xl group">
                        
                        {/* Animated Typewriter Placeholder logic */}
                        {!input && !isGenerating && (
                            <div className="absolute top-[26px] left-[25px] pointer-events-none overflow-hidden h-6 flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={placeholderIndex}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-gray-400 dark:text-gray-600 text-base font-medium"
                                    >
                                        {placeholders[placeholderIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        )}

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isGenerating}
                            className="w-full flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white text-base px-6 py-6 resize-none font-medium transition-colors disabled:opacity-50 relative z-10"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                            autoFocus
                        />
                        <div className="absolute bottom-4 right-4 z-20">
                            <button
                                type="submit"
                                disabled={isGenerating || !input.trim()}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 disabled:opacity-70 flex items-center gap-2 overflow-hidden relative group/btn"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={placeholderIndex} // Re-use the tick interval for loading phrases
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="inline-block"
                                            >
                                                {["Analyzing idea...", "Generating layout...", "Building components..."][placeholderIndex % 3]}
                                            </motion.span>
                                        </AnimatePresence>
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] animate-[line-swipe_2s_ease-out_infinite]"></div>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" /> Create with AI
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Brand Logos */}
                <div className="mt-16 pt-8 w-full max-w-4xl flex items-center justify-center gap-8 md:gap-16 flex-wrap animate-slide-up delay-5 mix-blend-multiply dark:mix-blend-screen transition-all duration-500">
                    <span className="text-xl font-bold tracking-tighter opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 cursor-default text-gray-800 dark:text-gray-300">Framer</span>
                    <span className="text-xl font-black opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-500 cursor-default text-gray-800 dark:text-gray-300">HUAWEI</span>
                    <span className="text-xl font-serif italic opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 cursor-default text-gray-800 dark:text-gray-300">Instagram</span>
                    <span className="text-xl font-black opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-500 cursor-default text-gray-800 dark:text-gray-300">Microsoft</span>
                    <span className="text-xl font-black tracking-tighter opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-500 cursor-default text-gray-800 dark:text-gray-300">Walmart</span>
                </div>
            </div>
        </DashboardLayout>
    )
}
