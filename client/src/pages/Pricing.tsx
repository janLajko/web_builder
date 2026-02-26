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
        <div className="min-h-screen flex flex-col bg-[#111111] text-white font-['Inter'] selection:bg-[#14F195]/30 relative overflow-hidden">

            {/* Ambient Background */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14F195]/20 rounded-full blur-[140px] -z-10 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00C2A8]/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

            <nav className="p-6 relative z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-[#a19db3] hover:text-white transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center relative z-10 w-full mb-12">

                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-12 text-center">
                    Scale your creativity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] via-[#00C2A8] to-[#14F195]">DivStack AI</span>
                </h1>

                {/* Split Checkout Card */}
                <div className="w-full max-w-5xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(20,241,149,0.15)] overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Column: Summary */}
                    <div className="lg:w-[45%] bg-[#1A1A1A]/40 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Subscribe to Starter Pro</h2>
                            <div className="text-4xl font-black text-white">$278.40 <span className="text-[#a19db3] text-lg font-medium">per year</span></div>
                        </div>

                        <div className="flex-1">
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#14F195] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-white text-sm">Billed annually ($23.20/mo)</div>
                                        <div className="text-[#a19db3] text-xs mt-1">Save 20% with annual billing compared to monthly.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#14F195] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-white text-sm">Access to all Pro features</div>
                                        <div className="text-[#a19db3] text-xs mt-1">Unlimited generations, premium layouts, and export options.</div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#14F195] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-white text-sm">Dedicated priority support</div>
                                        <div className="text-[#a19db3] text-xs mt-1">Get answers within 1 hour from our engineering team.</div>
                                    </div>
                                </li>
                            </ul>

                            <div className="bg-[#111111]/50 rounded-xl p-5 border border-white/5 space-y-3">
                                <div className="flex justify-between text-sm text-[#a19db3]">
                                    <span>Starter Pro (Annual)</span>
                                    <span className="text-white">$278.40</span>
                                </div>
                                <div className="flex justify-between text-sm text-[#a19db3]">
                                    <span>Taxes</span>
                                    <span className="text-white">Calculated at next step</span>
                                </div>
                                <div className="h-px w-full bg-white/10 my-2"></div>
                                <div className="flex justify-between font-bold">
                                    <span className="text-white">Total due today</span>
                                    <span className="text-white">$278.40</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Form */}
                    <div className="lg:w-[55%] p-8 lg:p-12 relative">
                        <form onSubmit={handleBuy} className="space-y-6">

                            <div>
                                <label className="block text-sm font-bold text-white mb-2">Email address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ""}
                                    placeholder="alex@example.com"
                                    required
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#a19db3] focus:outline-none focus:border-[#14F195]/50 shadow-inner transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-white mb-2">Card Information</label>
                                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#14F195]/50 transition-colors shadow-inner">
                                    <div className="relative border-b border-white/10">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a19db3]">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            required
                                            className="w-full bg-transparent px-4 py-3.5 pl-12 text-white placeholder:text-[#a19db3] focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            required
                                            className="w-1/2 bg-transparent border-r border-white/10 px-4 py-3.5 text-white placeholder:text-[#a19db3] focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            required
                                            className="w-1/2 bg-transparent px-4 py-3.5 text-white placeholder:text-[#a19db3] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-white mb-2">Cardholder name</label>
                                <input
                                    type="text"
                                    placeholder="Name on card"
                                    required
                                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-[#a19db3] focus:outline-none focus:border-[#14F195]/50 shadow-inner transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-white mb-2">Country or region</label>
                                <select className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#14F195]/50 shadow-inner transition-colors appearance-none">
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
                                className="w-full mt-4 bg-[#14F195] hover:bg-[#089684] text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(20,241,149,0.3)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>Pay $278.40</>
                                )}
                            </button>

                            <p className="text-center text-xs text-[#a19db3] flex items-center justify-center gap-1.5 mt-4">
                                <Lock className="w-3.5 h-3.5" /> Payments are secure and encrypted
                            </p>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    )
}
