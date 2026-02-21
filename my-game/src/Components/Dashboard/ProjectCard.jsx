import React from 'react';
import {
    Music,
    Clock,
    Layers,
    ArrowUpRight,
    Trash2,
    Activity,
    ChevronRight
} from 'lucide-react';

const ProjectCard = ({ project, index, onClick, deleteProject, fixedLimit = 10 }) => {
    const trackCount = project.track_count || 0;
    const trackLimit = 10;
    const progressPercentage = Math.min((trackCount / trackLimit) * 100, 100);

    return (
        <div
            onClick={onClick}
            className="group relative bg-gradient-to-b from-white/[0.07] to-transparent border border-white/[0.08] rounded-[2.5rem] p-1 transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] active:scale-[0.98]"
        >
            {/* Inner Content Container */}
            <div className="bg-[#0c0c0e] rounded-[2.4rem] p-7 h-full w-full overflow-hidden relative">

                {/* Animated Background Glow */}
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-purple-600/10 blur-[80px] group-hover:bg-purple-600/20 transition-all duration-700" />

                {/* Floating Index Badge (Top Right) */}
                <div className="absolute top-6 right-6 z-20">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/5 px-3 py-1 rounded-full shadow-2xl">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">ID</span>
                        <span className="text-[11px] font-black text-purple-400">0{index + 1}</span>
                    </div>
                </div>

                {/* Header: Icon & Metadata */}
                <div className="flex items-start gap-5 mb-10 relative z-10">
                    <div className="relative">
                        <div className="h-16 w-16 bg-[#16161a] rounded-3xl flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                            <Music size={28} className="text-white group-hover:text-purple-400 transition-colors" />
                        </div>
                        {/* Status Pulse */}
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-[#0c0c0e] rounded-full flex items-center justify-center">
                            <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white truncate pr-16 tracking-tight leading-none mb-2">
                            {project.project_name || "New Masterpiece"}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                <Clock size={12} className="text-purple-500/70" /> {project.date || "Just Now"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Bento Box */}
                <div className="grid grid-cols-5 gap-3 mb-8 relative z-10">
                    <div className="col-span-3 bg-white/[0.03] border border-white/[0.05] rounded-3xl p-4">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Project Load</p>
                        <div className="flex items-end justify-between">
                            <div className="flex gap-1 h-6 items-end">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 rounded-full transition-all duration-500 ${i < (trackCount / 1.25) ? 'bg-purple-500' : 'bg-white/10'
                                            }`}
                                        style={{ height: `${20 + (i * 10)}%` }}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-black text-white">{trackCount}<span className="text-xs text-gray-600 font-bold">/10</span></span>
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); deleteProject(); }}
                        className="col-span-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-3xl flex flex-col items-center justify-center transition-colors group/trash"
                    >
                        <Trash2 size={18} className="text-gray-600 group-hover/trash:text-red-400 transition-colors mb-1" />
                        <span className="text-[8px] font-black text-gray-600 group-hover/trash:text-red-400 uppercase tracking-tighter">Discard</span>
                    </button>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-2 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-9 w-9 rounded-full border-[3px] border-[#0c0c0e] bg-[#1a1a1d] ring-1 ring-white/5 flex items-center justify-center">
                                    <Activity size={12} className="text-gray-500" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 tracking-tight ml-2">Active Stems</span>
                    </div>

                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center group-hover:bg-purple-500 transition-all duration-500 shadow-[0_10px_20px_rgba(255,255,255,0.05)] group-hover:shadow-purple-500/20">
                        <ArrowUpRight size={22} className="text-black group-hover:text-white transition-colors" />
                    </div>
                </div>

                {/* Interactive Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default ProjectCard;