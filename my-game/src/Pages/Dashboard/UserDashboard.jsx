import React, { useEffect, useState } from 'react';
import {
    Plus, Music, Clock, Crown, ArrowRight, Search, Mic, Download,
    Settings, BarChart3, Radio, Hash, PlayCircle, Layers,
    Share2, Save, Trash2, Cpu, Activity, LayoutGrid, Bell, Zap, Menu, X, Sparkles, ChevronRight
} from 'lucide-react';
import ProjectCard from '../../Components/Dashboard/ProjectCard';
import { useNotification } from '../../context/NotificationContext';

// --- DIALOG BOX COMPONENT ---
function DialogBox({ isOpen, onClose, onSave }) {
    const { showNotification } = useNotification();
    const [projectName, setProjectName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSaveClick = async () => {
        if (!projectName.trim())
            return showNotification("Naam To Daalo babu bhaiya!", "error");

        try {
            const token = localStorage.getItem("token");
            setIsSaving(true);
            const response = await fetch('http://localhost:8000/projects', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    project_name: projectName
                })


            })

            const data = await response.json();
            if (response.ok) {
                showNotification("Bhai, Project mast create ho gaya!", "success");
                onSave(data.project);
            } else {
                showNotification("Kuch locha ho gaya backend mein!", "error");
            }
            setProjectName("");
            onClose();
        } catch (error) {
            console.log(error);
            showNotification("Network ka chakkar hai babu bhaiya!", "error");

        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-[#0d0d12] border border-white/10 p-8 shadow-2xl transition-all shadow-purple-500/10">
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-purple-600/20 blur-[60px] pointer-events-none"></div>

                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                            <Music size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tight">Create Project</h2>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Studio Cloud Sync</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Project Name</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="e.g. Midnight Summer Beats"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all text-sm font-medium text-white shadow-inner"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                <Sparkles size={16} className="text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-white/5 bg-white/5 font-bold text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveClick}
                            disabled={isSaving}
                            className={`flex-[2] relative overflow-hidden px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 
                                ${isSaving ? 'bg-purple-600/50 cursor-not-allowed' : 'bg-white text-black hover:bg-purple-600 hover:text-white active:scale-95'}`}
                        >
                            {isSaving ? "Saving..." : <><Save size={16} strokeWidth={3} /> Save Project</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN DASHBOARD COMPONENT ---
function UserDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // FIX: Hamesha empty array [] se start karo taaki .length error na aaye
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            // Backend se data.projects aa raha hai
            setProjects(data.projects);

        } catch (err) {
            console.log("Error:", err);
            setProjects([]); // Error aane par empty array rakho
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleCreateProject = (newProject) => {
        // Naya project list mein sabse upar dikhane ke liye
        setProjects((prev) => [newProject, ...prev]);
    };
    return (
        <div className="min-h-screen bg-[#08080a] text-white p-4 md:p-10 font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
            <DialogBox
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleCreateProject}
            />

            {/* --- BACKGROUND GLOWS --- */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- SIDEBAR --- */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-4 mb-4">Main Menu</p>
                            {[
                                { icon: <LayoutGrid size={18} />, label: "Dashboard", active: true },
                                { icon: <Activity size={18} />, label: "Analytics", active: false },
                                { icon: <Layers size={18} />, label: "Stems library", active: false },
                                { icon: <Settings size={18} />, label: "Studio Settings", active: false },
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${item.active ? 'bg-white/10 text-white shadow-xl border border-white/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                                    <span className={item.active ? 'text-purple-400' : ''}>{item.icon}</span>
                                    <span className="text-sm font-bold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* --- MAIN AREA --- */}
                    <main className="lg:col-span-9 space-y-12">
                        {/* --- TOP SEARCH & ACTION BAR --- */}
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="relative flex-1 w-full group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search your masterpieces..."
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] py-6 pl-16 pr-6 outline-none focus:border-purple-500/40 focus:bg-white/[0.04] transition-all font-medium text-sm backdrop-blur-xl shadow-2xl"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="w-full md:w-auto bg-gradient-to-r from-white to-gray-200 text-black font-black px-8 py-6 rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] text-xs uppercase tracking-[0.2em]"
                            >
                                <Plus size={20} strokeWidth={3} /> New Project
                            </button>
                        </div>

                        {/* --- RECENT PROJECTS SECTION --- */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Recent Projects</h2>
                                </div>
                                {projects.length > 3 && (
                                    <button className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>

                            {/* --- PROJECT GRID --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {projects && projects.length > 0 ? (
                                    projects
                                        .filter(p => p.project_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .slice(0, 3) // Sirf top 3 dikhane ke liye
                                        .map((project) => {
                                            const formattedDate = new Date(project.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            });

                                            return (
                                                <div key={project.id} className="group relative">
                                                    {/* Glassmorphism effect overlay on hover */}
                                                    <div className="absolute -inset-2 bg-gradient-to-b from-purple-500/10 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                                                    <ProjectCard
                                                        project={{
                                                            ...project,
                                                            name: project.project_name,
                                                            date: formattedDate
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })
                                ) : (
                                    /* --- MODERN EMPTY STATE --- */
                                    <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01] transition-colors hover:bg-white/[0.02]">
                                        <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6 mb-4">
                                            <Music className="text-gray-600" size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-300">No projects yet</h3>
                                        <p className="text-sm text-gray-500 mt-2 mb-8">Bhai, pehla project create karke shuruat karo!</p>
                                        <button
                                            onClick={() => setIsDialogOpen(true)}
                                            className="text-xs font-black uppercase tracking-widest px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                                        >
                                            Click to start
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;