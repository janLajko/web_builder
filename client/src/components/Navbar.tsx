import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../providers'
import { authClient } from '../lib/authClient'
import { LogOut, Coins, User as UserIcon, Search } from 'lucide-react'

export const Navbar = () => {
    const { user } = useAuth()
    const location = useLocation()

    // Determine if we should use the transparent/glass navbar or the solid dark one
    // For the community page, we want it to match the solid dark theme
    const isCommunity = location.pathname === '/community'

    const handleLogout = async () => {
        await authClient.signOut()
        window.location.reload()
    }

    return (
        <nav className={`sticky top-0 z-50 w-full transition-colors ${isCommunity ? 'bg-[#111111] border-b border-white/5' : 'glass'}`}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Left: Logo and Nav Links */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#14F195] to-primaryStart flex items-center justify-center">
                            <span className="text-white font-bold text-xs">D</span>
                        </div>
                        <span className={`text-xl font-bold ${isCommunity ? 'text-white' : 'gradient-text'}`}>
                            DivStack AI
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/community" className={`text-sm font-medium transition-colors ${isCommunity ? 'text-white/70 hover:text-white' : 'hover:text-primary'}`}>
                            Discover
                        </Link>
                        <Link to="/community" className={`text-sm font-medium transition-colors ${isCommunity ? 'text-white/70 hover:text-white' : 'hover:text-primary'}`}>
                            Feed
                        </Link>
                        <Link to="/community" className={`text-sm font-medium transition-colors ${isCommunity ? 'text-white' : 'hover:text-primary'}`}>
                            Community
                        </Link>
                    </div>
                </div>

                {/* Center: Search Bar (Only visibly styled on Community page for now, but exists globally) */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isCommunity ? 'text-white/40' : 'text-muted-foreground'}`} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className={`w-full pl-10 pr-4 py-1.5 rounded-md text-sm outline-none transition-colors ${isCommunity
                                ? 'bg-[#1A1A1A] border border-white/5 text-white placeholder:text-white/40 focus:border-[#14F195] focus:ring-1 focus:ring-[#14F195]'
                                : 'bg-secondary/50 border border-border text-foreground focus:border-primary'
                                }`}
                        />
                    </div>
                </div>

                {/* Right: Actions and User */}
                <div className="flex items-center gap-4">
                    {/* Mock Publish Button - matched from screenshot */}
                    <button className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#14F195] hover:bg-[#00C2A8] text-white text-sm font-medium transition-colors">
                        <div className="w-3 h-3 rounded-full border-2 border-white/50 border-t-white animate-spin"></div>
                        Publish
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            {!isCommunity && (
                                <div className="hidden sm:flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full border border-border/50">
                                    <Coins className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-semibold">{user.credits}</span>
                                </div>
                            )}
                            <div className="relative group">
                                <button className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors border ${isCommunity
                                    ? 'bg-[#1A1A1A] border-white/10 text-white/70 hover:text-white'
                                    : 'bg-primary/20 text-primary hover:bg-primary/30'
                                    }`}>
                                    <UserIcon className="w-4 h-4" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card ring-1 ring-black ring-opacity-5 hidden group-hover:block border border-border">
                                    <Link to="/my-projects" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary">My Projects</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary">Settings</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary flex items-center gap-2">
                                        <LogOut className="w-4 h-4" /> Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className={`px-4 py-1.5 rounded-md text-sm font-medium transition-opacity ${isCommunity ? 'bg-white/10 text-white hover:bg-white/20' : 'gradient-bg hover:opacity-90'
                            }`}>
                            Sign In
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}

