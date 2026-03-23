import { Link } from 'react-router-dom'
import { useAuth } from '../providers'
import { authClient } from '../lib/authClient'
import { LogOut, Coins, User as UserIcon, Search, Folder, Settings as SettingsIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownSeparator } from './ui/Dropdown'

export const Navbar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await authClient.signOut()
        window.location.reload()
    }

    return (
        <nav className="sticky top-0 z-50 w-full transition-colors duration-500 bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl border-b border-[#EAF2F8] dark:border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center p-1.5 shadow-md dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group-hover:scale-110">
                            <span className="text-white font-bold text-sm tracking-tighter">&lt;/&gt;</span>
                        </div>
                        <span className="text-xl font-bold uppercase tracking-tight text-gray-900 dark:text-white transition-colors">
                            DivStack AI
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/community" className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Discover</Link>
                        <Link to="/community" className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Feed</Link>
                        <Link to="/community" className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 transition-colors">Community</Link>
                    </div>
                </div>

                <div className="hidden lg:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full border-transparent focus-within:border-transparent">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 focus-within:text-blue-500 dark:focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none transition-all duration-300 bg-gray-50 dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-[#222] focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-900/50 shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-blue-600 border border-gray-200 dark:border-white/10 dark:bg-[#1A1A1A] dark:text-gray-300 text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-gray-50 dark:hover:bg-[#222] transition-all">
                        <div className="w-3 h-3 rounded-full border-2 border-blue-600/50 dark:border-white/50 border-t-blue-600 dark:border-t-white animate-spin"></div>
                        Publish
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 bg-gray-50 dark:bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 transition-colors">
                                <Coins className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{user.credits}</span>
                            </div>
                            <div className="relative group">
                                <Dropdown
                                    placement="bottom-end"
                                    trigger={
                                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all">
                                            <UserIcon className="w-5 h-5" />
                                        </button>
                                    }
                                >
                                    <DropdownItem icon={<Folder className="w-4 h-4" />} onClick={() => navigate('/my-projects')}>
                                        My Projects
                                    </DropdownItem>
                                    <DropdownItem icon={<SettingsIcon className="w-4 h-4" />} onClick={() => navigate('/settings')}>
                                        Settings
                                    </DropdownItem>
                                    <DropdownSeparator />
                                    <DropdownItem icon={<LogOut className="w-4 h-4" />} onClick={handleLogout} danger>
                                        Sign out
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth" className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Sign In
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}
