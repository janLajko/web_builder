import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../config/axios"
import { Loader2 } from "lucide-react"

export default function View() {
    const { id } = useParams()
    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const { data } = await api.get(`/api/project/preview/${id}`)
                setCode(data)
            } catch (error) {
                setError("Website not found or is private.")
            }
        }
        fetchCode()
    }, [id])

    if (error) return <div className="h-screen flex items-center justify-center text-red-400 bg-[#050505] text-lg">{error}</div>
    if (!code) return <div className="h-screen flex items-center justify-center bg-[#050505]"><Loader2 className="animate-spin w-8 h-8 text-[#00E87B]" /></div>

    return (
        <iframe title="View" srcDoc={code} className="w-full h-screen border-none bg-white block" sandbox="allow-scripts" />
    )
}
