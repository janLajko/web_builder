import { useState } from "react"
import { ArrowLeft, Lock, CheckCircle2, CreditCard } from "lucide-react"
import { useAuth } from "../providers"
import { useNavigate, Link } from "react-router-dom"

export default function Pricing() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleBuy = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            navigate('/auth')
            return
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert("Payments are currently disabled for testing. Thank you!")
        }, 1500)
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0A0A0B] text-gray-900 dark:text-gray-100 font-['Inter'] selection:bg-blue-500/30 relative overflow-hidden transition-colors duration-500">

            {/* Ambient Background */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/50 rounded-full blur-[140px] -z-10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px] -z-10 mix-blend-overlay pointer-events-none"></div>

            <nav className="p-6 relative z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center relative z-10 w-full mb-12">

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-12 text-center animate-slide-up delay-1 uppercase transition-colors">
                    Scale your creativity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">DivStack AI</span>
                </h1>

                {/* Split Checkout Card */}
                <div className="w-full max-w-5xl bg-white/80 dark:bg-[#111]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-xl border border-white/50 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row animate-scale-in transition-colors duration-500">

                    {/* Left Column: Summary */}
                    <div className="lg:w-[45%] bg-gray-50/50 dark:bg-[#050505]/50 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-white/10 flex flex-col backdrop-blur-sm transition-colors duration-500">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-wide transition-colors">Subscribe to Starter Pro</h2>
                            <div className="text-4xl font-black text-gray-900 dark:text-white transition-colors">$278.40 <span className="text-gray-500 dark:text-gray-400 text-lg font-bold">per year</span></div>
                        </div>

                        <div className="flex-1">
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-sm transition-colors">Billed annually ($23.20/mo)</div>
                                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs mt-1 transition-colors">Save 20% with annual billing compared to monthly.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-sm transition-colors">Access to all Pro features</div>
                                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs mt-1 transition-colors">Unlimited generations, premium layouts, and export options.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-sm transition-colors">Dedicated priority support</div>
                                        <div className="text-gray-500 dark:text-gray-400 font-medium text-xs mt-1 transition-colors">Get answers within 1 hour from our engineering team.</div>
                                    </div>
                                </li>
                            </ul>

                            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3 transition-colors duration-500">
                                <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors">
                                    <span>Starter Pro (Annual)</span>
                                    <span className="text-gray-900 dark:text-white">$278.40</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors">
                                    <span>Taxes</span>
                                    <span className="text-gray-900 dark:text-white">Calculated at next step</span>
                                </div>
                                <div className="h-px w-full bg-gray-100 dark:bg-white/10 my-2 transition-colors"></div>
                                <div className="flex justify-between font-black uppercase tracking-wide text-gray-900 dark:text-white transition-colors">
                                    <span>Total due today</span>
                                    <span>$278.40</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Form */}
                    <div className="lg:w-[55%] p-8 lg:p-12 relative bg-white dark:bg-[#111] transition-colors duration-500">
                        <form onSubmit={handleBuy} className="space-y-6">

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest transition-colors">Email address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ""}
                                    placeholder="alex@example.com"
                                    required
                                    className="w-full bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-sm transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest transition-colors">Card Information</label>
                                <div className="bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all duration-300 shadow-sm">
                                    <div className="relative border-b border-gray-200 dark:border-white/10 transition-colors">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            required
                                            className="w-full bg-transparent px-4 py-3.5 pl-12 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            required
                                            className="w-1/2 bg-transparent border-r border-gray-200 dark:border-white/10 px-4 py-3.5 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-colors"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            required
                                            className="w-1/2 bg-transparent px-4 py-3.5 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest transition-colors">Cardholder name</label>
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    required
                                    className="w-full bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-sm transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest transition-colors">Country or region</label>
                                <select className="w-full bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white font-medium focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-sm transition-all duration-300 appearance-none">
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                    <option value="IN">India</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 uppercase tracking-wide"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Pay $278.40</>
                                )}
                            </button>

                            <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 flex items-center justify-center gap-1.5 mt-4 transition-colors">
                                <Lock className="w-3.5 h-3.5" /> Payments are secure and encrypted
                            </p>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    )
}
