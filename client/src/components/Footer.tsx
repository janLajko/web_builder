import { Link } from "react-router-dom"

export const Footer = () => (
    <footer className="bg-[#050505]/50 backdrop-blur-md border-t border-white/5 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9CA3AF]">
            <p className="font-medium">© 2024 DivStack AI, Inc.</p>
            <div className="flex gap-6 font-medium">
                <Link to="/about-us" className="hover:text-[#00E87B] transition-colors">About Us</Link>
                <Link to="/docs" className="hover:text-[#0bf2f2] transition-colors">Documentation</Link>
                <Link to="/privacy" className="hover:text-[#0bdfee] transition-colors">Privacy</Link>
            </div>
        </div>
    </footer>
)
