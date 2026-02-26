import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <footer className="border-t border-border mt-auto glass">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">DivStack AI</p>
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="flex gap-6 text-sm">
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                    <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link>
                </div>
            </div>
        </footer>
    )
}
