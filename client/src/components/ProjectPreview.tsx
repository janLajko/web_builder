import { forwardRef, useImperativeHandle, useMemo } from "react";
import { parseVFS } from "../lib/vfs";

interface ProjectPreviewProps {
    code: string;
    device?: "desktop" | "tablet" | "mobile";
}

function buildPreviewDocument(vfs: Record<string, string>) {
    const html =
        vfs["index.html"] ||
        vfs["/index.html"] ||
        `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body><p>Preview unavailable.</p></body></html>`;

    const script =
        vfs["script.js"] ||
        vfs["/script.js"] ||
        vfs["index.js"] ||
        vfs["/index.js"] ||
        "";

    const style =
        vfs["style.css"] ||
        vfs["/style.css"] ||
        "";

    let previewDoc = html;

    if (style) {
        previewDoc = previewDoc.replace(
            /<link[^>]+href=["']\.?\/?style\.css["'][^>]*>/i,
            `<style>${style}</style>`
        );
    }

    if (script) {
        previewDoc = previewDoc.replace(
            /<script[^>]+src=["']\.?\/?script\.js["'][^>]*><\/script>/i,
            `<script>${script}<\/script>`
        );
    }

    if (style && !/<style[\s>]/i.test(previewDoc)) {
        previewDoc = previewDoc.replace("</head>", `<style>${style}</style></head>`);
    }

    if (script && !/<script[\s>][\s\S]*<\/script>/i.test(previewDoc)) {
        previewDoc = previewDoc.replace("</body>", `<script>${script}<\/script></body>`);
    }

    return previewDoc;
}

export const ProjectPreview = forwardRef(({ code, device = "desktop" }: ProjectPreviewProps, ref) => {
    const vfs = useMemo(() => parseVFS(code), [code]);
    const previewDocument = useMemo(() => buildPreviewDocument(vfs), [vfs]);

    useImperativeHandle(ref, () => ({
        getCode: () => code,
    }));

    const getDeviceWidth = () => {
        switch (device) {
            case "mobile":
                return "w-[360px] h-[720px] rounded-[3rem]";
            case "tablet":
                return "w-[768px] h-[1024px] rounded-[1.5rem]";
            case "desktop":
                return "w-full h-full";
        }
    };

    return (
        <div className="flex-1 flex w-full flex-col h-full bg-[#050505] relative overflow-hidden">
            <div
                className={`flex-1 overflow-auto bg-[#0A0A0B] ${device === "desktop" ? "" : "flex items-center justify-center"}`}
                style={{ padding: device === "desktop" ? "0" : "2rem" }}
            >
                <div
                    className={`relative transition-all duration-500 ease-out flex flex-col items-center ${device !== "desktop" ? "drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" : "w-full h-full"}`}
                >
                    <div
                        className={`${device !== "desktop" ? "bg-[#1a1a1a] p-3 rounded-[3.5rem] border-[6px] border-[#333] shadow-2xl relative overflow-hidden" : "w-full h-full"} ${getDeviceWidth()}`}
                    >
                        {device !== "desktop" && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#1a1a1a] w-32 h-6 rounded-b-3xl z-20"></div>
                        )}

                        <div
                            className={`${device !== "desktop" ? "bg-white w-full h-full rounded-[2.5rem] overflow-hidden" : "w-full h-full"} relative border border-[#222]`}
                        >
                            <iframe
                                title="Project preview"
                                srcDoc={previewDocument}
                                sandbox="allow-scripts allow-forms allow-modals allow-popups"
                                className="w-full h-full border-0 bg-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectPreview.displayName = "ProjectPreview";
