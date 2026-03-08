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
        <div className="h-screen flex flex-col items-center justify-center bg-[#050505]">
            <div className="glass-card p-12 flex flex-col items-center max-w-md text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#059669] to-[#00E87B]"></div>
                <div className="w-20 h-20 bg-[#00E87B]/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#00E87B]" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-white">Payment Successful!</h2>
                <p className="text-[#9CA3AF] mb-8 text-sm">Your credits have been added to your account. You will be redirected shortly.</p>
                <Loader2 className="animate-spin text-[#00E87B] w-8 h-8" />
            </div>
        </div>
    )
}
