import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const technicalDetails = [
        {
            title: "Buffer & Latency Optimization",
            desc: "Advanced audio buffering for a seamless 'Zero-Latency' experience across 6 tracks.",
            color: "border-l-indigo-500"
        },
        {
            title: "Auto-Loop Synchronization",
            desc: "Global BPM detection to sync tracks automatically with the master clock.",
            color: "border-l-purple-500"
        },
        {
            title: "Layered Frequency Separation",
            desc: "Designed to prevent frequency clashing, keeping your mix clean and professional.",
            color: "border-l-emerald-500"
        }
    ];

    return (
        <div className="bg-[#0b0f1a] text-white min-h-screen font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">

            {/* --- Hero Section --- */}
            <header className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent -z-10"></div>

                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full animate-fade-in">
                        Next-Gen Audio Looper
                    </span>

                    {/* Responsive Heading: Text scales based on screen size */}
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tighter">
                        Infinite Layers. <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                            Zero Boundaries.
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed font-light px-2">
                        Not just a player, but your personal **Digital Audio Workstation (DAW)**. Upload, layer, and produce in real-time.
                    </p>

                    {/* Mobile-ready Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                        <button
                            onClick={() => navigate('/studio')}
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95"
                        >
                            Open Studio
                        </button>
                    </div>
                </div>
            </header>

            {/* --- Workflow Section: Stacks on mobile, Side-by-side on desktop --- */}
            <section className="py-16 md:py-24 px-4 sm:px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                        {/* Text Content */}
                        <div className="w-full lg:flex-1 space-y-8 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight italic">3-Step Production Workflow</h2>

                            <div className="space-y-8 md:space-y-12">
                                {[
                                    { num: "1", title: "Load Essence", desc: "Upload loops, vocal chops, or pads to any blank canvas pad.", color: "bg-indigo-600 shadow-indigo-600/40" },
                                    { num: "2", title: "Live Trigger", desc: "Toggle tracks live. Engine ensures loops trigger on the bar-start.", color: "bg-purple-600 shadow-purple-600/40" },
                                    { num: "3", title: "Master Mix", desc: "Merge 6 layers and export your session as a high-quality WAV.", color: "bg-pink-600 shadow-pink-600/40" }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6 group">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.color} flex items-center justify-center font-bold text-xl shadow-[0_0_15px]`}>
                                            {step.num}
                                        </div>
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-bold mb-2 text-white">{step.title}</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive UI Card: Adjusts width and padding for mobile */}
                        <div className="w-full lg:flex-1 bg-gradient-to-br from-gray-800 to-gray-900 p-px rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
                            <div className="bg-[#0b0f1a] p-6 md:p-10 rounded-[2rem] md:rounded-[2.4rem] h-full border border-white/10">
                                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center justify-center lg:justify-start gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    Engine Architecture
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    {technicalDetails.map((detail, idx) => (
                                        <div key={idx} className={`p-4 md:p-5 rounded-2xl bg-white/5 border-l-4 ${detail.color} hover:bg-white/10 transition-all`}>
                                            <h5 className="font-bold text-base md:text-lg mb-1">{detail.title}</h5>
                                            <p className="text-xs md:text-sm text-gray-400 leading-snug">{detail.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Capability Grid: 2 columns on mobile, 4 on desktop --- */}
            <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 underline decoration-indigo-500 underline-offset-8 decoration-4">Core Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                        { label: "Format Support", value: "MP3, WAV, OGG" },
                        { label: "Max Layers", value: "6 Simultaneous" },
                        { label: "Audio Engine", value: "WebAudio API" },
                        { label: "Sync Mode", value: "Global BPM" }
                    ].map((stat, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all group">
                            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 group-hover:text-indigo-400 transition-colors">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Call to Action: Responsive padding and font size --- */}
            <section className="pb-24 md:pb-32 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] md:rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-gray-900 border border-gray-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 italic">Ready to break the silence?</h2>
                        <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg">Experience the power of professional music production right in your browser.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate('/studio')}
                                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-lg">
                                Open Studio
                            </button>
                            <button
                                onClick={() => navigate('/tutorial')}
                                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all border border-gray-700">
                                View Tutorials
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;