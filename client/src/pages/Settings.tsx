import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useAuth } from "../providers"
import { User, Mail, Shield, Coins, Activity } from "lucide-react"

export default function Settings() {
    const { user } = useAuth()

    if (!user) return <div className="h-screen flex items-center justify-center bg-background">Please sign in.</div>

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 bg-secondary/80 rounded-lg text-sm font-medium border border-border/50 text-foreground">
                            <User className="w-4 h-4" /> Profile
                        </button>
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-secondary/50 rounded-lg text-sm font-medium text-muted-foreground transition-colors">
                            <Coins className="w-4 h-4" /> Billing & Credits
                        </button>
                        <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-secondary/50 rounded-lg text-sm font-medium text-muted-foreground transition-colors">
                            <Shield className="w-4 h-4" /> Security
                        </button>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="glass rounded-xl p-6 border border-border shadow-sm flex flex-col">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" /> Profile Information
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={user.name}
                                            readOnly
                                            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-xl p-6 border border-border shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Coins className="w-5 h-5 text-yellow-500" /> Current Plan
                            </h2>
                            <div className="bg-secondary/50 rounded-lg p-6 border border-border/50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-foreground mb-1 text-lg">Pay as you go</p>
                                    <p className="text-sm text-muted-foreground">You currently have <strong className="text-foreground text-base">{user.credits}</strong> credits remaining.</p>
                                </div>
                                <a href="/pricing" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-md">
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
