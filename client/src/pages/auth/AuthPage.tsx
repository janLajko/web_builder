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
                        onSuccess: () => navigate("/templates"), // Redirect to new onboarding flow
                        onError: (ctx) => setError(ctx.error.message),
                    }
                )
            } else {
                await authClient.signUp.email(
                    { email, password, name },
                    {
                        onSuccess: () => navigate("/templates"), // Redirect to new onboarding flow
                        onError: (ctx) => setError(ctx.error.message),
                    }
                )
            }
        } catch (err: any) {
            setError(err.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#111111] relative overflow-hidden px-4 font-['Inter'] selection:bg-primaryStart/30">
            {/* Background Glows matching Screenshot 4 */}
            <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] bg-[#6c28d9]/20 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-70"></div>
            <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-[#00C2A8]/15 rounded-full blur-[150px] -z-10 mix-blend-screen opacity-50"></div>

            <div className="mb-8 flex flex-col items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#14F195] to-[#00C2A8] flex items-center justify-center shadow-[0_0_30px_rgba(20,241,149,0.4)]">
                    <Code2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">DivStack AI</h1>
                <p className="text-[#a19db3] text-sm">Design your future, seamlessly.</p>
            </div>

            <div className="w-full max-w-[440px] p-8 md:p-10 rounded-[2rem] bg-[#1A1A1A]/40 backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_rgba(20,241,149,0.15)] relative z-10">
                {/* Internal Glow Effect */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#14F195]/10 to-transparent opacity-50 pointer-events-none"></div>
                <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-[#00C2A8]/40 via-[#14F195]/20 to-transparent blur-[2px] -z-10"></div>

                <div className="flex bg-[#1A1A1A]/60 p-1.5 rounded-xl mb-8 relative border border-white/5">
                    <button
                        onClick={() => { setIsLogin(true); setError(""); }}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${isLogin ? 'bg-[#089684] text-white shadow-md' : 'text-[#a19db3] hover:text-white'}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError(""); }}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLogin ? 'bg-[#089684] text-white shadow-md' : 'text-[#a19db3] hover:text-white'}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* OAuth Provider Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white">
                        <Github className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white">
                        <Apple className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white">
                        <Code2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative mb-8 text-center flex items-center before:content-[''] before:flex-1 before:border-t before:border-white/10 after:content-[''] after:flex-1 after:border-t after:border-white/10">
                    <span className="px-4 text-[11px] font-medium text-[#a19db3] tracking-wider uppercase">OR CONTINUE WITH EMAIL</span>
                </div>

                {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-bold text-[#a19db3] mb-2 tracking-wider uppercase">Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3.5 pl-4 rounded-xl bg-[#1A1A1A]/40 border border-[#6B46A3]/30 text-white text-sm focus:outline-none focus:border-[#00C2A8] focus:ring-1 focus:ring-[#00C2A8]/50 transition-all placeholder:text-[#a19db3]/50"
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-[#a19db3] mb-2 tracking-wider uppercase">Email Address</label>
                        <div className="relative flex items-center">
                            <svg className="w-5 h-5 absolute left-4 text-[#a19db3]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3.5 pl-12 rounded-xl bg-[#1A1A1A]/40 border border-[#6B46A3]/30 text-white text-sm focus:outline-none focus:border-[#00C2A8] focus:ring-1 focus:ring-[#00C2A8]/50 transition-all placeholder:text-[#a19db3]/50"
                                required
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-[#a19db3] tracking-wider uppercase">Password</label>
                            {isLogin && <button type="button" className="text-xs text-[#00C2A8] hover:text-[#f0abfc] transition-colors">Forgot?</button>}
                        </div>
                        <div className="relative flex items-center">
                            <svg className="w-5 h-5 absolute left-4 text-[#a19db3]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3.5 pl-12 rounded-xl bg-[#1A1A1A]/40 border border-[#6B46A3]/30 text-white text-sm focus:outline-none focus:border-[#00C2A8] focus:ring-1 focus:ring-[#00C2A8]/50 transition-all placeholder:text-white/30"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="remember" className="rounded bg-[#1A1A1A]/40 border-[#6B46A3]/30 text-[#089684] focus:ring-[#089684]/50 cursor-pointer" />
                            <label htmlFor="remember" className="text-xs text-[#a19db3] cursor-pointer selection:bg-transparent">Remember me for 30 days</label>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 bg-[#089684] hover:bg-[#14F195] rounded-xl font-bold shadow-[0_0_20px_rgba(20,241,149,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-white text-[15px] hover:shadow-[0_0_25px_rgba(20,241,149,0.6)]"
                    >
                        {loading ? <Loader2 className="w-5 h-5 border-2 animate-spin" /> : (isLogin ? "Sign In to DivStack AI" : "Sign Up for DivStack AI")}
                    </button>
                </form>
            </div>

            <div className="mt-10 flex gap-6 text-[13px] text-[#a19db3] font-medium z-10">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
        </div>
    )
}
