import { useRef, useImperativeHandle, forwardRef } from 'react'

interface ProjectPreviewProps {
    code: string;
    device?: 'desktop' | 'tablet' | 'mobile';
}

export const ProjectPreview = forwardRef(({ code, device = 'desktop' }: ProjectPreviewProps, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useImperativeHandle(ref, () => ({
        getCode: () => {
            const doc = iframeRef.current?.contentDocument;
            if (!doc) return undefined;

            doc.querySelectorAll('.ai-selected-element, [data-ai-selected]').forEach((element) => {
                element.classList.remove('ai-selected-element');
                element.removeAttribute('data-ai-selected');
                (element as HTMLElement).style.outline = '';
            });

            doc.getElementById('ai-preview-style')?.remove();
            doc.getElementById('ai-preview-script')?.remove();

            return doc.documentElement.outerHTML;
        }
    }));

    const getDeviceWidth = () => {
        switch (device) {
            case 'mobile': return 'w-[320px] h-[600px] rounded-[2rem]'
            case 'tablet': return 'w-[768px] h-[1024px] rounded-[1.5rem]'
            case 'desktop': return 'w-full aspect-video rounded-md'
        }
    }

    return (
        <div className="flex-1 flex w-full flex-col h-full bg-[#111111] relative">
            {/* Canvas Area (Centered Device Mockup) */}
            <div className="flex-1 p-4 md:p-12 overflow-auto flex items-center justify-center">

                {/* Device Container */}
                <div className="relative group transition-all duration-500 ease-out flex flex-col items-center drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]">

                    {/* Mockup Frame (MacBook style for Desktop) */}
                    {device === 'desktop' ? (
                        <div className="flex flex-col items-center w-[900px]">
                            {/* Screen Bezel */}
                            <div className="bg-[#1a1a1a] p-4 pb-6 rounded-t-3xl border-[3px] border-[#333] shadow-2xl relative z-10 w-full">
                                {/* Camera */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>

                                {/* Browser Window Chrome */}
                                <div className="bg-[#2b2b2b] rounded-t-lg overflow-hidden flex flex-col h-[560px]">
                                    <div className="h-10 bg-[#323232] flex items-center px-4 gap-3 shrink-0 border-b border-[#1a1a1a] shadow-sm relative">
                                        {/* Mac dots */}
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                                        </div>
                                        {/* URL Bar */}
                                        <div className="absolute left-1/2 -translate-x-1/2 w-80 h-6 rounded-md bg-[#1a1a1a] border border-[#444] flex items-center justify-center text-[10px] text-[#888] font-mono shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] gap-2">
                                            <div className="w-2 h-3 border-2 border-current rounded-[3px] opacity-70 flex shrink-0"></div>
                                            localhost:3000/dashboard
                                        </div>
                                    </div>

                                    {/* Iframe content */}
                                    <div className="flex-1 bg-white relative">
                                        <iframe
                                            ref={iframeRef}
                                            title="Preview"
                                            srcDoc={code}
                                            className="w-full h-full border-none absolute inset-0 bg-white"
                                            sandbox="allow-scripts allow-same-origin"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Keyboard Base */}
                            <div className="relative z-0 w-[105%]">
                                {/* Base top surface */}
                                <div className="h-6 bg-gradient-to-b from-[#b0b0b0] to-[#737373] rounded-b-3xl border-t border-[#d1d1d1] flex justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                    {/* Trackpad notch */}
                                    <div className="w-32 h-1.5 bg-[#555] rounded-b-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
                                </div>
                                {/* Base bottom lip */}
                                <div className="h-2 bg-[#444] rounded-b-[3rem] mx-2 shadow-xl"></div>
                            </div>
                        </div>
                    ) : (
                        /* Tablet & Mobile generic frame */
                        <div className={`bg-[#1a1a1a] p-3 rounded-[2.5rem] border-[4px] border-[#333] shadow-2xl relative overflow-hidden transition-all duration-500 ease-out ${getDeviceWidth()}`}>
                            {/* Notch/Camera array */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#1a1a1a] w-32 h-6 rounded-b-3xl z-20"></div>

                            <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden relative border border-[#222]">
                                <iframe
                                    ref={iframeRef}
                                    title="Preview"
                                    srcDoc={code}
                                    className="w-full h-full border-none absolute inset-0 bg-white"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})
