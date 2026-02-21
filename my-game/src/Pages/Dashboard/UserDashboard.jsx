import React, { useEffect, useState } from 'react';
import {
    Plus, Music, Clock, ArrowRight, Search, Layers,
    Settings, Activity, LayoutGrid, X, Save, Sparkles, ChevronRight
} from 'lucide-react';
import ProjectCard from '../../Components/Dashboard/ProjectCard';
import { useNotification } from '../../context/NotificationContext';
import DeleteConfirmDialog from '../../Components/Dashboard/DeleteConfirmDialog';
import { useUser } from '../../context/UserContext';

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
                body: JSON.stringify({ project_name: projectName })
            });

            const data = await response.json();
            if (response.ok) {
                showNotification("Bhai, Project mast create ho gaya!", "success");
                onSave(data.project);
                setProjectName("");
                onClose();
            } else if (response.status === 403) {
                showNotification("Free plan limit khatam 😢 Upgrade karo!", "error");
                return;
            } else {
                showNotification("Kuch locha ho gaya backend mein!", "error");
            }


        } catch (error) {

            showNotification("Network ka chakkar hai!", "error");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-md rounded-[2.5rem] bg-[#0d0d12] border border-white/10 p-8 shadow-2xl shadow-purple-500/10">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Music size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">Create Project</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Project Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. Midnight Beats"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-purple-500/50 text-white"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-4 rounded-2xl bg-white/5 text-gray-400 font-bold text-xs uppercase">Cancel</button>
                        <button onClick={handleSaveClick} disabled={isSaving} className="flex-[2] py-4 rounded-2xl bg-white text-black font-black text-xs uppercase hover:bg-purple-600 hover:text-white transition-all">
                            {isSaving ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN DASHBOARD ---
function UserDashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);


    const { user, fixedLimit } = useUser();

    const token = localStorage.getItem("token");
    const { showNotification } = useNotification();


    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:8000/projects", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();

            setProjects(data.projects || []);


        } catch (err) {
            setProjects([]);
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                showNotification("Project delete ho gaya 🔥", "success");
                setProjects(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            showNotification("Delete nahi ho paya!", "error");
        }
    };

    const openDeleteModal = (project) => {
        setProjectToDelete(project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) deleteProject(projectToDelete.id);
    };

    useEffect(() => { fetchProjects() }, []);
    const currentLimit = projects;



    return (
        <div className="min-h-screen bg-[#08080a] text-white p-4 md:p-10 font-sans selection:bg-purple-500/30 relative">

            {/* Modals are placed outside the layout flow */}
            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
                projectName={projectToDelete?.project_name || "Project"}
            />
            <DialogBox isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={(p) => setProjects([p, ...projects])} />

            {/* Background Glows */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* SIDEBAR - Fixed space-y and classes */}
                    <aside className="lg:col-span-3 space-y-8">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-4 mb-4">Main Menu</p>
                            {[
                                { icon: <LayoutGrid size={18} />, label: "Dashboard", active: true },
                                { icon: <Activity size={18} />, label: "Analytics", active: false },
                                { icon: <Layers size={18} />, label: "Stems library", active: false },
                                { icon: <Settings size={18} />, label: "Studio Settings", active: false },
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${item.active ? 'bg-white/10 text-white border border-white/10' : 'text-gray-500 hover:bg-white/5'}`}>
                                    <span className={item.active ? 'text-purple-400' : ''}>{item.icon}</span>
                                    <span className="text-sm font-bold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN AREA */}
                    <main className="lg:col-span-9 space-y-12">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="relative flex-1 w-full group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search your masterpieces..."
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] py-6 pl-16 pr-6 outline-none focus:border-purple-500/40 transition-all font-medium"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="w-full md:w-auto bg-white text-black font-black px-8 py-6 rounded-[2rem] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all text-xs uppercase tracking-widest"
                            >
                                <Plus size={20} /> New Project
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                                    <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></span> Recent Projects
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {projects.length > 0 ? (
                                    projects
                                        .filter(p => p.project_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .slice(0, 3).map((project, index) => (
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                deleteProject={() => openDeleteModal(project)}
                                                fixedLimit={fixedLimit}
                                                index={projects.length - index - 1}
                                            />
                                        ))
                                ) : (
                                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                                        <p className="text-gray-500 font-bold">Bhai, abhi koi project nahi hai!</p>
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