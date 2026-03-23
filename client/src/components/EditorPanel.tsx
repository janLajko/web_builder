import { SlidersHorizontal, Palette, Type, Layout, Hexagon } from 'lucide-react'
import { Popover } from './ui/Popover'

export const EditorPanel = () => {
    return (
        <div className="w-[280px] border-l border-white/5 bg-[#0A0A0A] hidden xl:flex flex-col h-full font-['Inter'] relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#050505]/80 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#00E87B]" />
                    <h3 className="font-semibold text-sm text-white tracking-wide">Properties</h3>
                </div>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        <div className="flex items-center gap-2"><Layout className="w-3.5 h-3.5" /> Layout</div>
                    </div>
                    <div className="space-y-4 bg-[#050505]/50 p-3 rounded-xl border border-white/5">
                        <div>
                            <div className="text-[11px] text-[#9CA3AF] mb-1.5 font-medium">Display</div>
                            <div className="grid grid-cols-4 gap-1 p-1 bg-[#0D1117] rounded-lg border border-white/5">
                                <button className="p-1.5 rounded flex items-center justify-center bg-[#0D1117] text-white shadow-sm border border-white/10"><div className="w-3 h-3 border border-current"></div></button>
                                <button className="p-1.5 rounded flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/5"><div className="w-3 h-3 flex gap-[1px]"><div className="w-1.5 bg-current h-full"></div><div className="w-1.5 bg-current h-full"></div></div></button>
                                <button className="p-1.5 rounded flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/5"><div className="w-3 h-3 border-t border-b border-current flex items-center justify-center"><div className="w-full h-px bg-current"></div></div></button>
                                <button className="p-1.5 rounded flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/5"><div className="text-[10px] leading-none font-bold">none</div></button>
                            </div>
                        </div>
                        <div>
                            <div className="text-[11px] text-[#9CA3AF] mb-1.5 font-medium flex justify-between">Spacing <span className="text-white/30 text-[9px] uppercase tracking-widest">px</span></div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-[#0D1117] border border-white/5 rounded-lg p-2 flex items-center justify-between group focus-within:border-[#00E87B]/50 transition-colors">
                                    <span className="text-[10px] text-[#9CA3AF] font-medium">P</span>
                                    <input type="text" defaultValue="16" className="w-8 bg-transparent text-right text-xs text-white outline-none" />
                                </div>
                                <div className="bg-[#0D1117] border border-white/5 rounded-lg p-2 flex items-center justify-between group focus-within:border-[#00E87B]/50 transition-colors">
                                    <span className="text-[10px] text-[#9CA3AF] font-medium">M</span>
                                    <input type="text" defaultValue="0" className="w-8 bg-transparent text-right text-xs text-white outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        <div className="flex items-center gap-2"><Type className="w-3.5 h-3.5" /> Typography</div>
                    </div>
                    <div className="space-y-3 bg-[#050505]/50 p-3 rounded-xl border border-white/5">
                        <div className="bg-[#0D1117] border border-white/5 rounded-lg p-2.5 flex justify-between items-center cursor-pointer hover:border-white/10 transition-colors">
                            <span className="text-xs font-medium text-white">Inter</span>
                            <span className="text-xs text-[#9CA3AF]">Regular</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#0D1117] border border-white/5 rounded-lg p-2 flex justify-between items-center focus-within:border-[#00E87B]/50 transition-colors">
                                <span className="text-[10px] text-[#9CA3AF]">Size</span>
                                <input type="text" defaultValue="14px" className="w-10 bg-transparent text-right text-xs text-white outline-none" />
                            </div>
                            <div className="bg-[#0D1117] border border-white/5 rounded-lg p-2 flex justify-between items-center focus-within:border-[#00E87B]/50 transition-colors">
                                <span className="text-[10px] text-[#9CA3AF]">Line</span>
                                <input type="text" defaultValue="1.5" className="w-10 bg-transparent text-right text-xs text-white outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        <div className="flex items-center gap-2"><Palette className="w-3.5 h-3.5" /> Styles</div>
                        <Popover
                            placement="left-start"
                            trigger={
                                <button className="text-[10px] text-[#00E87B] hover:text-white transition-colors cursor-pointer">
                                    Edit Theme
                                </button>
                            }
                            content={
                                <div className="space-y-4 w-[200px]">
                                    <div className="text-sm font-bold text-white flex items-center gap-2">
                                        <Hexagon className="w-4 h-4 text-[#FF3FD8]" /> Theme Settings
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs text-[#9CA3AF]">Accent Color</div>
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#9333EA] cursor-pointer hover:scale-110 transition-transform ring-2 ring-white/20"></div>
                                            <div className="w-6 h-6 rounded-full bg-[#FF3FD8] cursor-pointer hover:scale-110 transition-transform"></div>
                                            <div className="w-6 h-6 rounded-full bg-[#3B82F6] cursor-pointer hover:scale-110 transition-transform"></div>
                                            <div className="w-6 h-6 rounded-full bg-[#10B981] cursor-pointer hover:scale-110 transition-transform"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-white/10">
                                        <div className="text-xs text-[#9CA3AF]">Radius</div>
                                        <select className="w-full bg-[#0D1117] border border-white/10 text-white rounded-lg p-1.5 text-xs outline-none focus:border-[#FF3FD8]/50">
                                            <option>Sharp (0px)</option>
                                            <option>Default (8px)</option>
                                            <option>Round (16px)</option>
                                            <option>Pill (99px)</option>
                                        </select>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                    <div className="space-y-3 bg-[#050505]/50 p-3 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#9CA3AF] font-medium">Fill</div>
                            <div className="flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded p-1 pl-2">
                                <span className="text-xs text-white font-mono uppercase">#FFFFFF</span>
                                <div className="w-4 h-4 rounded-sm bg-white border border-white/10"></div>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                            <div className="text-[11px] text-[#9CA3AF] mb-2 font-medium">Brand Colors</div>
                            <div className="grid grid-cols-5 gap-1.5">
                                <div className="aspect-square rounded-md bg-[#00E87B] cursor-pointer shadow-sm border border-white/10 hover:scale-110 transition-transform"></div>
                                <div className="aspect-square rounded-md bg-[#34D399] cursor-pointer shadow-sm border border-white/10 hover:scale-110 transition-transform ring-2 ring-white ring-offset-1 ring-offset-[#050505]"></div>
                                <div className="aspect-square rounded-md bg-[#059669] cursor-pointer shadow-sm border border-white/10 hover:scale-110 transition-transform"></div>
                                <div className="aspect-square rounded-md bg-[#3b82f6] cursor-pointer shadow-sm border border-white/10 hover:scale-110 transition-transform"></div>
                                <div className="aspect-square rounded-md bg-[#F59E0B] cursor-pointer shadow-sm border border-white/10 hover:scale-110 transition-transform"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
