import { useImperativeHandle, forwardRef, useMemo } from 'react'
import { SandpackProvider, SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react"
import { parseVFS, getAppStructure } from '../lib/vfs'

interface ProjectPreviewProps {
    code: string;
    device?: 'desktop' | 'tablet' | 'mobile';
}

export const ProjectPreview = forwardRef(({ code, device = 'desktop' }: ProjectPreviewProps, ref) => {
    const vfs = useMemo(() => parseVFS(code), [code]);

    useImperativeHandle(ref, () => ({
        getCode: () => {
            return code;
        }
    }));

    const getDeviceWidth = () => {
        switch (device) {
            case 'mobile': return 'w-[360px] h-[720px] rounded-[3rem]'
            case 'tablet': return 'w-[768px] h-[1024px] rounded-[1.5rem]'
            case 'desktop': return 'w-full h-full'
        }
    }

    const sandpackFiles = useMemo(() => getAppStructure(vfs), [vfs]);

    return (
        <div className="flex-1 flex w-full flex-col h-full bg-[#050505] relative overflow-hidden">
            <div className={`flex-1 overflow-auto bg-[#0A0A0B] ${device === 'desktop' ? '' : 'flex items-center justify-center'}`}
                style={{ padding: device === 'desktop' ? '0' : '2rem' }}>
                
                <div className={`relative transition-all duration-500 ease-out flex flex-col items-center ${device !== 'desktop' ? 'drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]' : 'w-full h-full'}`}>
                    <div className={`${device !== 'desktop' ? 'bg-[#1a1a1a] p-3 rounded-[3.5rem] border-[6px] border-[#333] shadow-2xl relative overflow-hidden' : 'w-full h-full'} ${getDeviceWidth()}`}>
                        {device !== 'desktop' && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#1a1a1a] w-32 h-6 rounded-b-3xl z-20"></div>
                        )}

                        <div className={`${device !== 'desktop' ? 'bg-white w-full h-full rounded-[2.5rem] overflow-hidden' : 'w-full h-full'} relative border border-[#222]`}>
                            <SandpackProvider
                                template="vanilla"
                                theme="dark"
                                files={sandpackFiles}
                                className="h-full w-full"
                                options={{
                                    externalResources: ["https://cdn.tailwindcss.com"],
                                }}
                            >
                                <SandpackLayout style={{ height: '100%', border: 'none' }}>
                                    <SandpackPreview 
                                        style={{ height: '100%', width: '100%' }}
                                        showNavigator={false}
                                        showOpenInCodeSandbox={false}
                                    />
                                </SandpackLayout>
                            </SandpackProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})
ProjectPreview.displayName = "ProjectPreview";
