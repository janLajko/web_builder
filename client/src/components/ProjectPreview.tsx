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
        <div className="flex-1 flex w-full flex-col h-full bg-[#050505] relative">
            {/* Canvas Area */}
            <div className="flex-1 overflow-auto flex items-center justify-center"
                style={{ padding: device === 'desktop' ? '0' : '2rem 3rem' }}>

                {device === 'desktop' ? (
                    /* Desktop: Full-screen iframe with no mockup frame */
                    <div className="w-full h-full bg-white relative">
                        <iframe
                            ref={iframeRef}
                            title="Preview"
                            srcDoc={code}
                            className="w-full h-full border-none absolute inset-0 bg-white"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                ) : (
                    /* Tablet & Mobile: keep the device frame */
                    <div className="relative group transition-all duration-500 ease-out flex flex-col items-center drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]">
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
                    </div>
                )}
            </div>
        </div>
    )
})
