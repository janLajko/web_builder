import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function Loading() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionId) {
            const timer = setTimeout(() => {
                navigate("/")
            }, 3000)
            return () => clearTimeout(timer)
        } else {
            navigate("/")
        }
    }, [sessionId, navigate])

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-background">
            <div className="glass p-12 rounded-2xl flex flex-col items-center max-w-md text-center border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 gradient-bg"></div>
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Payment Successful!</h2>
                <p className="text-muted-foreground mb-8 text-sm">Your credits have been added to your account. You will be redirected shortly.</p>
                <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
        </div>
    )
}
