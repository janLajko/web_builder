import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authClient } from "../../lib/authClient"
import { Loader2, Github, Apple, Code2 } from "lucide-react"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            if (isLogin) {
                await authClient.signIn.email(
                    { email, password },
                    {
                        onSuccess: () => navigate("/my-projects"),
                        onError: (ctx) => setError(ctx.error.message),
                    }
                )
            } else {
                await authClient.signUp.email(
                    { email, password, name },
                    {
                        onSuccess: () => navigate("/my-projects"),
                        onError: (ctx) => setError(ctx.error.message),
                    }
                )
            }
        } catch (err: any) {
            const msg = err.message || "An error occurred"
            if (msg.toLowerCase().includes("failed to fetch") || msg.toLowerCase().includes("network")) {
                setError("Unable to connect to the server. Please make sure the backend is running.")
            } else {
                setError(msg)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 font-['Inter'] selection:bg-blue-500/30 bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] transition-colors duration-500">
            {/* Background Glows (Subtle for light mode) */}
            <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] bg-white/40 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10 mix-blend-overlay transition-colors"></div>
            <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-blue-100/40 dark:bg-purple-900/10 rounded-full blur-[100px] -z-10 mix-blend-overlay transition-colors"></div>

            <div className="mb-8 flex flex-col items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center p-1.5 shadow-lg dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                    <span className="text-white font-bold text-xl tracking-widest">&lt;/&gt;</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase transition-colors">DivStack AI</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Design your future, seamlessly.</p>
            </div>

            <div className="w-full max-w-[440px] p-8 md:p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl shadow-sm border border-[#EAF2F8] dark:border-white/10 relative z-10 transition-colors duration-500">

                <div className="flex bg-gray-50/80 dark:bg-[#1A1A1A]/80 p-1.5 rounded-2xl mb-8 relative border border-gray-100 dark:border-white/5 transition-colors duration-500">
                    <button
                        onClick={() => { setIsLogin(true); setError(""); }}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${isLogin ? 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 relative z-10 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError(""); }}
                        className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${!isLogin ? 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 relative z-10 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* OAuth Provider Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <button className="flex items-center justify-center p-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300 shadow-sm">
                        <Github className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center p-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300 shadow-sm">
                        <Apple className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center p-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-gray-700 dark:text-gray-300 shadow-sm">
                        <Code2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative mb-8 text-center flex items-center before:content-[''] before:flex-1 before:border-t before:border-gray-200 dark:before:border-white/10 after:content-[''] after:flex-1 after:border-t after:border-gray-200 dark:after:border-white/10 transition-colors">
                    <span className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase transition-colors">Or Continue With Email</span>
                </div>

                {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {!isLogin && (
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 tracking-widest uppercase transition-colors">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3.5 pl-4 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 tracking-widest uppercase transition-colors">Email Address</label>
                        <div className="relative flex items-center">
                            <svg className="w-5 h-5 absolute left-4 text-gray-400 dark:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3.5 pl-12 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                required
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase transition-colors">Password</label>
                            {isLogin && <button type="button" className="text-[10px] font-bold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 uppercase tracking-wide transition-colors">Forgot?</button>}
                        </div>
                        <div className="relative flex items-center">
                            <svg className="w-5 h-5 absolute left-4 text-gray-400 dark:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3.5 pl-12 rounded-xl bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="remember" className="rounded bg-gray-50 dark:bg-[#1A1A1A] border-gray-300 dark:border-white/10 text-blue-500 focus:ring-blue-500/50 cursor-pointer" />
                            <label htmlFor="remember" className="text-[11px] font-bold text-gray-500 dark:text-gray-400 cursor-pointer uppercase tracking-wide transition-colors">Remember me for 30 days</label>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-white text-[15px] shadow-lg hover:-translate-y-1 hover:shadow-xl uppercase tracking-wide"
                    >
                        {loading ? <Loader2 className="w-5 h-5 border-2 animate-spin" /> : (isLogin ? "Sign In to DivStack AI" : "Sign Up for DivStack AI")}
                    </button>
                </form>
            </div>

            <div className="mt-10 flex gap-6 text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold z-10 transition-colors">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</a>
            </div>
        </div>
    )
}
