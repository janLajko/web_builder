import { Loader2, CheckCircle2 } from "lucide-react"

export const LoaderSteps = ({ step }: { step: number }) => {
    const steps = [
        "Analyzing prompt...",
        "Planning layout architecture...",
        "Writing Tailwind CSS styling...",
        "Finalizing code...",
    ]

    return (
        <div className="space-y-5 w-full max-w-sm mx-auto p-8 rounded-xl glass border border-primary/20 shadow-[0_0_30px_rgba(20,241,149,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primaryStart to-primaryEnd animate-[pulse_2s_ease-in-out_infinite]"></div>
            {steps.map((s, i) => {
                const isActive = i === step
                const isCompleted = i < step
                return (
                    <div key={i} className={`flex items-center gap-4 text-sm transition-all duration-300 ${isActive ? 'text-primary scale-105 font-medium bg-primary/5 -ml-2 p-2 rounded-lg' : isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/30'}`}>
                        {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : isActive ? (
                            <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-current opacity-30 shrink-0"></div>
                        )}
                        <span>{s}</span>
                    </div>
                )
            })}
        </div>
    )
}
