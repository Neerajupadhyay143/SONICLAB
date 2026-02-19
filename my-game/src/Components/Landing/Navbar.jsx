import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

function MusicNavbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function

    const navLinks = [
        { name: 'Studio', path: '/studio' },
        { name: 'Library', path: '/library' },
        { name: 'Tutorial', path: '/tutorial' },
    ];

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100 font-sans text-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex justify-between items-center h-20">

                    {/* Musical Logo - Navigates Home */}
                    <div
                        onClick={() => navigate('/')}
                        className="flex-shrink-0 cursor-pointer group flex items-center gap-2"
                    >
                        <div className="flex gap-1 items-end h-6">
                            <span className="w-1 bg-indigo-600 h-3 animate-pulse"></span>
                            <span className="w-1 bg-indigo-400 h-6 animate-pulse"></span>
                            <span className="w-1 bg-indigo-600 h-4 animate-pulse"></span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
                            SONIC<span className="text-indigo-600">LAB</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => navigate(link.path)}
                                        className="text-[14px] uppercase tracking-widest font-bold text-gray-500 hover:text-indigo-600 transition-all duration-200"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[15px] font-bold text-gray-700 hover:text-indigo-600 px-3 py-2 transition-all"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/studio')}
                                className="bg-gray-900 text-white px-7 py-3 rounded-full text-[14px] font-extrabold uppercase tracking-tight hover:bg-indigo-600 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
                            >
                                Launch App
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <button onClick={() => setIsDrawerOpen(true)} className="p-2 text-gray-900">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsDrawerOpen(false)}
                ></div>

                <div className={`absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-bold text-sm tracking-widest uppercase text-gray-400">Menu</span>
                            <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <ul className="space-y-8 flex-1">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => { navigate(link.path); setIsDrawerOpen(false); }}
                                        className="text-3xl font-black text-gray-900 hover:text-indigo-600 block tracking-tighter"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-4 pt-10 border-t">
                            <button
                                onClick={() => { navigate('/studio'); setIsDrawerOpen(false); }}
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MusicNavbar;