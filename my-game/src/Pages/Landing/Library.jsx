import React from 'react';
import { useNavigate } from 'react-router-dom';

function Library() {
    const navigate = useNavigate();

    const categories = ["All", "Cinematic", "Techno", "Hip-Hop", "Ambient", "Rock"];

    const soundPacks = [
        {
            id: 1,
            name: "Neon Nights",
            genre: "Synthwave",
            samples: "24 Samples",
            color: "from-purple-500 to-indigo-600",
            image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Deep Tech",
            genre: "Techno",
            samples: "18 Samples",
            color: "from-emerald-500 to-teal-600",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Urban Grit",
            genre: "Hip-Hop",
            samples: "32 Samples",
            color: "from-orange-500 to-red-600",
            image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Ethereal Echo",
            genre: "Ambient",
            samples: "15 Samples",
            color: "from-blue-400 to-cyan-500",
            image: "https://images.unsplash.com/photo-1514525253361-bee8a48740d7?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Distorted Reality",
            genre: "Rock/Industrial",
            samples: "20 Samples",
            color: "from-pink-500 to-rose-600",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 6,
            name: "Cloud Lo-Fi",
            genre: "Chill",
            samples: "40 Samples",
            color: "from-amber-400 to-orange-500",
            image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=500&auto=format&fit=crop"
        }
    ];

    return (
        <div className="bg-[#0b0f1a] min-h-screen text-white pb-20">
            {/* --- Library Header --- */}
            <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2 uppercase">Sound <span className="text-indigo-500">Vault</span></h1>
                        <p className="text-gray-400 text-lg">Browse thousands of curated high-fidelity loops.</p>
                    </div>

                    {/* Search Bar Placeholder */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search loops, genres..."
                            className="bg-gray-900 border border-gray-800 rounded-full px-6 py-3 w-full md:w-80 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                        />
                        <div className="absolute right-4 top-3.5 text-gray-500">🔍</div>
                    </div>
                </div>

                {/* --- Categories Filter --- */}
                <div className="flex gap-4 mt-12 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`px-6 py-2 rounded-full border text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-indigo-600 border-indigo-600' : 'border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Sound Packs Grid --- */}
            <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {soundPacks.map((pack) => (
                    <div
                        key={pack.id}
                        className="group bg-gray-900/40 border border-gray-800 rounded-[2rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
                    >
                        {/* Pack Image/Cover */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={pack.image}
                                alt={pack.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent"></div>

                            {/* Play Hover Button */}
                            <button
                                onClick={() => navigate('/studio')}
                                className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-2xl"
                            >
                                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                        </div>

                        {/* Pack Details */}
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{pack.name}</h3>
                                    <p className="text-indigo-500 text-sm font-bold uppercase tracking-widest">{pack.genre}</p>
                                </div>
                                <span className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-400 font-mono">{pack.samples}</span>
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Professional grade loops designed for high-end {pack.genre} production.
                            </p>

                            <button
                                onClick={() => navigate('/studio')}
                                className="w-full py-4 bg-gray-800 hover:bg-white hover:text-black rounded-xl font-black uppercase tracking-widest text-xs transition-all"
                            >
                                Load into Studio
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- Pro Badge Section --- */}
            <div className="mt-24 px-6 max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-12 rounded-[3rem] text-center">
                    <h2 className="text-3xl font-bold mb-4">Want more exclusive sounds?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join SonicLab Pro to unlock 10,000+ royalty-free loops and direct export to your favorite DAW.</p>
                    <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Library;