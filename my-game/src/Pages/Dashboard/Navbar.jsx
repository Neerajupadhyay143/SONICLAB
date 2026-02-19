import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Music,
    LayoutDashboard,
    Bell,
    LogOut,
    Menu,
    X,
    Settings,
    Crown,
    ChevronDown,
    Zap
} from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8 pointer-events-none">
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`max-w-[1400px] mx-auto pointer-events-auto transition-all duration-500 ease-in-out
                    ${scrolled
                        ? 'bg-[#0b0f1a]/80 backdrop-blur-2xl py-3 px-6 border-white/10'
                        : 'bg-white/[0.03] backdrop-blur-md py-5 px-8 border-white/5'} 
                    border rounded-[2rem] shadow-2xl flex items-center justify-between overflow-visible`}
            >

                {/* --- Logo Section --- */}
                <div
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-3 cursor-pointer group relative"
                >
                    <div className="absolute -inset-2 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover:scale-110 transition-transform duration-300">
                        <Music size={22} className="text-white" />
                    </div>
                    <h1 className="relative text-2xl font-black uppercase tracking-tighter text-white">
                        SONIC<span className="text-indigo-500 group-hover:text-indigo-400 transition-colors">LAB</span>
                    </h1>
                </div>

                {/* --- Desktop Navigation --- */}
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 p-1.5 rounded-2xl gap-2">
                    <NavButton icon={<LayoutDashboard size={18} />} label="Studio" active />
                    <NavButton icon={<Crown size={18} />} label="Pro Plan" />
                    <NavButton icon={<Settings size={18} />} label="Settings" />
                </div>

                {/* --- Right Actions --- */}
                <div className="flex items-center gap-3 md:gap-5">
                    {/* Live Status Indicator */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Sync</span>
                    </div>

                    <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-rose-500 rounded-xl shadow-lg group-hover:shadow-indigo-500/20 transition-all">
                                <div className="w-full h-full bg-[#05070a] rounded-[9px] flex items-center justify-center font-bold text-sm">
                                    NK
                                </div>
                            </div>
                            <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showProfileMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-56 bg-[#0b121f]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 overflow-hidden"
                                >
                                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Signed in as</p>
                                        <p className="text-sm font-bold text-white truncate">neeraj.sonic@lab</p>
                                    </div>
                                    <DropdownItem icon={<Zap size={16} />} label="Upgrade to Pro" color="text-amber-400" />
                                    <DropdownItem icon={<LogOut size={16} />} label="Log out" onClick={handleLogout} color="text-rose-400" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* --- Mobile Menu Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-4 right-4 bg-[#0b0f1a]/95 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-3xl lg:hidden flex flex-col gap-6"
                    >
                        <NavButton icon={<LayoutDashboard size={22} />} label="Studio" fullWidth />
                        <NavButton icon={<Crown size={22} />} label="Subscription" fullWidth />
                        <NavButton icon={<Settings size={22} />} label="Settings" fullWidth />
                        <div className="h-[1px] bg-white/5"></div>
                        <button onClick={handleLogout} className="flex items-center gap-4 text-rose-400 font-black uppercase text-sm tracking-[0.2em]">
                            <LogOut size={22} /> Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components for cleaner code
function NavButton({ icon, label, active, fullWidth }) {
    return (
        <button className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest
            ${active
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'}
            ${fullWidth ? 'w-full text-base py-4' : ''}`}
        >
            {icon} {label}
        </button>
    );
}

function DropdownItem({ icon, label, onClick, color = "text-gray-400" }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold ${color} hover:bg-white/5 rounded-2xl transition-all`}
        >
            {icon} {label}
        </button>
    );
}

export default Navbar;