import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useAuth } from "../providers"
import { User, Mail, Shield, Coins, Activity } from "lucide-react"

export default function Settings() {
    const { user } = useAuth()

    if (!user) return <div className="h-screen flex items-center justify-center bg-[#050505] text-white">Please sign in.</div>

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-white">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl page-fade-in">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 bg-[#0D1117] rounded-lg text-sm font-medium border border-[#3B82F6]/30 text-white">
                            <User className="w-4 h-4 text-[#3B82F6]" /> Profile
                        </button>
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-[#0D1117]/60 rounded-lg text-sm font-medium text-[#9CA3AF] transition-colors">
                            <Coins className="w-4 h-4" /> Billing & Credits
                        </button>
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-[#0D1117]/60 rounded-lg text-sm font-medium text-[#9CA3AF] transition-colors">
                            <Shield className="w-4 h-4" /> Security
                        </button>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card p-6 shadow-sm flex flex-col">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-[#3B82F6]" /> Profile Information
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                                        <input
                                            type="text"
                                            value={user.name}
                                            readOnly
                                            className="w-full bg-[#0D1117]/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="w-full bg-[#0D1117]/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Coins className="w-5 h-5 text-yellow-500" /> Current Plan
                            </h2>
                            <div className="bg-[#0D1117]/60 rounded-lg p-6 border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-white mb-1 text-lg">Pay as you go</p>
                                    <p className="text-sm text-[#9CA3AF]">You currently have <strong className="text-white text-base">{user.credits}</strong> credits remaining.</p>
                                </div>
                                <a href="/pricing" className="px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] btn-ripple">
                                    Add Credits
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
