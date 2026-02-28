import { ReactNode } from "react"
import { useAuth } from "../providers"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
    Search, Zap, Bell, ChevronDown, LayoutGrid, Folder,
    Bot, Users, CreditCard, Settings, LogOut
} from "lucide-react"
import { authClient } from "../lib/authClient"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate("/");
                }
            }
        });
    };

    return (
        <div className="flex h-screen bg-[#111111] text-white font-['Inter'] selection:bg-[#14F195]/30 overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-[260px] border-r border-white/5 bg-[#1A1A1A]/40 flex-col justify-between hidden md:flex shrink-0">
                <div>
                    <div className="p-6 flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14F195] to-[#00C2A8] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(20,241,149,0.4)]">
                            <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">DivStack AI</span>
                    </div>

                    <nav className="px-3 space-y-1">
                        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm hover:translate-x-0.5 ${location.pathname === '/' ? 'bg-white/5 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                            {location.pathname === '/' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#14F195] rounded-r-md"></div>}
                            <LayoutGrid className="w-5 h-5" /> Home
                        </Link>
                        <Link to="/my-projects" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm relative hover:translate-x-0.5 ${location.pathname === '/my-projects' ? 'bg-white/5 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                            {location.pathname === '/my-projects' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#14F195] rounded-r-md"></div>}
                            <Folder className="w-5 h-5" /> My Projects
                        </Link>
                        <Link to="/ai-builder" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm relative hover:translate-x-0.5 ${location.pathname === '/ai-builder' ? 'bg-white/5 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                            {location.pathname === '/ai-builder' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#14F195] rounded-r-md"></div>}
                            <Bot className="w-5 h-5" /> AI Builder
                        </Link>
                        <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a19db3] hover:text-white hover:bg-white/5 transition-all duration-200 font-medium text-sm hover:translate-x-0.5">
                            <Users className="w-5 h-5" /> Community
                        </Link>
                        <Link to="/pricing" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm relative hover:translate-x-0.5 ${location.pathname === '/pricing' ? 'bg-white/5 text-white' : 'text-[#a19db3] hover:text-white hover:bg-white/5'}`}>
                            {location.pathname === '/pricing' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#14F195] rounded-r-md"></div>}
                            <CreditCard className="w-5 h-5" /> Pricing
                        </Link>
                        <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a19db3] hover:text-white hover:bg-white/5 transition-all duration-200 font-medium text-sm hover:translate-x-0.5">
                            <Settings className="w-5 h-5" /> Settings
                        </Link>
                    </nav>
                </div>

                <div className="p-4">
                    <div className="bg-[#111111]/80 border border-white/5 rounded-xl p-4 shadow-lg">
                        <div className="text-xs font-bold text-[#14F195] uppercase tracking-wider mb-3">PRO PLAN</div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-to-r from-[#14F195] to-[#00C2A8] w-[75%]"></div>
                        </div>
                        <p className="text-xs text-[#a19db3] leading-relaxed">750/1000 generation credits used.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
                {/* Top Nav Bar */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a19db3] group-focus-within:text-[#14F195] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full bg-[#1A1A1A]/60 border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-[#a19db3] focus:outline-none focus:border-[#14F195]/50 focus:bg-[#1A1A1A] focus:shadow-[0_0_15px_rgba(20,241,149,0.1)] transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 ml-4">
                        <Link to="/pricing" className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#14F195] to-[#00C2A8] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(20,241,149,0.3)] hover:opacity-90 transition-opacity">
                            <Zap className="w-3.5 h-3.5 fill-current" /> CREDITS: 50
                        </Link>

                        <button className="relative text-[#a19db3] hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute 1 top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-[#111111]"></span>
                        </button>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            {user ? (
                                <>
                                    <div className="text-right hidden sm:block">
                                        <div className="text-sm font-bold text-white group-hover:text-[#14F195] transition-colors">{user.name || "Alex Rivera"}</div>
                                        <div className="text-xs text-[#a19db3]">Founder</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-[#1A1A1A] flex items-center justify-center relative overflow-hidden group-hover:border-[#14F195]/50 transition-colors">
                                        <span className="text-sm font-bold text-[#14F195]">{user.name ? user.name.substring(0, 2).toUpperCase() : 'AR'}</span>
                                        <div className="absolute inset-0 border border-white/10 rounded-full"></div>
                                        {/* Decorative rings */}
                                        <div className="absolute -inset-1 border border-[#14F195]/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-[#a19db3]" />
                                    <button
                                        onClick={handleLogout}
                                        className="ml-2 p-2 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                        title="Log Out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <Link to="/auth" className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <div
                    className="flex-1 overflow-y-auto p-8 no-scrollbar"
                    style={{
                        backgroundColor: 'rgba(17,17,17,0.98)',
                        backgroundBlendMode: 'overlay',
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                    }}
                >
                    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
