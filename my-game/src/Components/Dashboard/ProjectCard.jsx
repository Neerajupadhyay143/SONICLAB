import React from 'react';
import {
    Music,
    MoreVertical,
    Play,
    Clock,
    Layers,
    ChevronRight,
    Trash2
} from 'lucide-react';

const ProjectCard = ({ project, onClick, onDelete }) => {
    // Free version limit calculation (Max 10)
    const trackLimit = 10;
    const trackCount = project.track_count || 0;
    const progressPercentage = (trackCount / trackLimit) * 100;

    return (
        <div
            onClick={() => onClick(project.id)}
            className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
        >
            {/* Background Glow Effect on Hover */}
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-all duration-500"></div>

            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <Music size={22} className="text-purple-400 group-hover:text-white transition-colors" />
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Title & Info */}
            <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors truncate">
                    {project.project_name || "Untitled Masterpiece"}
                </h3>
                <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                        <Layers size={12} /> {trackCount} Tracks
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} /> {project.date}
                    </span>
                </div>
            </div>

            {/* Track Limit Progress Bar (Free Version UI) */}
            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-gray-400">
                    <span>Capacity</span>
                    <span>{trackCount}/{trackLimit} Tracks</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 rounded-full ${progressPercentage > 80 ? 'bg-orange-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Footer / Action */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex -space-x-2">
                    {/* Mockup for collaborators or track types icons */}
                    <div className="h-6 w-6 rounded-full border-2 border-[#0d0d12] bg-purple-600 flex items-center justify-center text-[8px] font-bold">D</div>
                    <div className="h-6 w-6 rounded-full border-2 border-[#0d0d12] bg-blue-600 flex items-center justify-center text-[8px] font-bold">T</div>
                    <div className="h-6 w-6 rounded-full border-2 border-[#0d0d12] bg-pink-600 flex items-center justify-center text-[8px] font-bold">M</div>
                </div>

                <div className="flex items-center gap-2 text-xs font-black text-purple-400 group-hover:translate-x-1 transition-transform">
                    OPEN STUDIO <ChevronRight size={14} strokeWidth={3} />
                </div>
            </div>

            {/* Play Button Overlay on Hover */}
            <div className="absolute right-6 top-24 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl shadow-purple-500/20">
                    <Play size={20} fill="currentColor" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;