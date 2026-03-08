interface LoaderStepsProps {
    step: number;
    steps?: string[]
}

export const LoaderSteps = ({ step, steps = ["Analyzing requirements...", "Architecting components...", "Generating responsive code..."] }: LoaderStepsProps) => {
    return (
        <div className="glass-card p-6 space-y-4 animate-slide-up">
            {steps.map((text, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-sm ${idx <= step ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${idx < step ? 'bg-[#00E87B] text-black' : idx === step ? 'border-2 border-[#00E87B] text-[#00E87B] animate-pulse' : 'border border-white/20 text-[#9CA3AF]'}`}>
                        {idx < step ? '✓' : idx + 1}
                    </div>
                    <span className={idx === step ? 'text-[#00E87B] font-medium' : 'text-[#9CA3AF]'}>{text}</span>
                </div>
            ))}
        </div>
    )
}
