import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../config/axios"
import { Loader2, ArrowLeft } from "lucide-react"

export default function Preview() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [code, setCode] = useState("")

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const { data } = await api.get(`/api/project/preview/${id}`)
                setCode(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCode()
    }, [id])

    if (!code) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>

    return (
        <div className="h-screen flex flex-col bg-background">
            <div className="h-14 bg-card border-b border-border flex items-center px-4">
                <button onClick={() => navigate(-1)} className="text-sm flex items-center gap-2 hover:bg-secondary px-3 py-1.5 rounded-md transition-colors text-foreground">
                    <ArrowLeft className="w-4 h-4" /> Back to Project
                </button>
            </div>
            <div className="flex-1 overflow-hidden bg-white">
                <iframe title="Preview" srcDoc={code} className="w-full h-full border-none" sandbox="allow-scripts" />
            </div>
        </div>
    )
}
