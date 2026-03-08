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

    const navItems = [
        { to: '/', icon: LayoutGrid, label: 'Home' },
        { to: '/my-projects', icon: Folder, label: 'My Projects' },
        { to: '/ai-builder', icon: Bot, label: 'AI Builder' },
        { to: '/community', icon: Users, label: 'Community' },
        { to: '/pricing', icon: CreditCard, label: 'Pricing' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <div className="flex h-screen bg-[#F4F7F9] dark:bg-[#050505] text-gray-900 dark:text-gray-100 font-['Inter'] selection:bg-blue-500/30 overflow-hidden transition-colors duration-500">
            {/* Left Sidebar */}
            <aside className="w-[260px] border-r border-[#EAF2F8] dark:border-white/10 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl flex-col justify-between hidden md:flex shrink-0 transition-colors duration-500">
                <div>
                    <div className="p-6 flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
                            <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                        </div>
                        <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white uppercase transition-colors">DivStack AI</span>
                    </div>

                    <nav className="px-3 space-y-1">
                        {navItems.map(({ to, icon: Icon, label }) => {
                            const isActive = location.pathname === to
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-wider relative hover:translate-x-0.5 ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-md bg-blue-500"></div>
                                    )}
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4">
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-4 shadow-sm border border-[#EAF2F8] dark:border-white/5 transition-colors">
                        <div className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-3 transition-colors">YOUR CREDITS</div>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3 transition-colors">
                            <div className="h-full bg-blue-500 dark:bg-blue-600 transition-colors" style={{ width: `${Math.min(100, Math.max(0, ((user?.credits || 0) / 50) * 100))}%` }}></div>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 transition-colors">{user?.credits || 0} credits remaining.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
                {/* Top Nav Bar */}
                <header className="h-20 border-b border-[#EAF2F8] dark:border-white/10 flex items-center justify-between px-8 bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-xl sticky top-0 z-20 shrink-0 transition-colors duration-500">
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-[#1A1A1A] focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-sm transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 ml-4">
                        <Link to="/pricing" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                            <Zap className="w-3.5 h-3.5 fill-current" /> CREDITS: {user?.credits || 0}
                        </Link>

                        <button className="relative text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#1A1A1A] animate-pulse transition-colors"></span>
                        </button>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            {user ? (
                                <>
                                    <div className="text-right hidden sm:block">
                                        <div className="text-[11px] font-black text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors uppercase tracking-widest">{user.name || "Alex Rivera"}</div>
                                        <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-colors">Founder</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#111] flex items-center justify-center relative overflow-hidden group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors shadow-sm">
                                        <span className="text-xs font-black text-blue-500 dark:text-blue-400 transition-colors">{user.name ? user.name.substring(0, 2).toUpperCase() : 'AR'}</span>
                                        <div className="absolute inset-0 border border-gray-200/50 dark:border-white/5 rounded-full transition-colors"></div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors" />
                                    <button
                                        onClick={handleLogout}
                                        className="ml-2 p-2 rounded-lg text-red-500/70 hover:bg-red-500/10 hover:text-red-500 dark:text-red-400/70 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors"
                                        title="Log Out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <Link to="/auth" className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors shadow-sm uppercase tracking-widest">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <div
                    className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar bg-gradient-to-br from-[#E2EAF1] to-[#CCDDEB] dark:from-[#050505] dark:to-[#0D1117] transition-colors duration-500"
                >
                    <div className="max-w-[1400px] mx-auto h-full flex flex-col page-fade-in">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
