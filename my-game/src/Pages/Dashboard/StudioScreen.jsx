import React, { useState, useRef } from 'react';
import { Play, Pause, Plus, Save, Volume2, FastForward, Rewind, Mic } from 'lucide-react';

/**
 * StudioScreen - The core heart of SoundLab
 * Yahan saare tracks, playback controls aur recording logic handle hoga.
 */
function StudioScreen({ projectData }) {
    const [tracks, setTracks] = useState([
        { id: 1, name: 'Vocal Track', volume: 80, speed: 1.0, isPlaying: false },
        { id: 2, name: 'Base Guitar', volume: 60, speed: 1.0, isPlaying: false },
    ]);
    const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

    // Track add karne ka function
    const addTrack = () => {
        const newTrack = {
            id: Date.now(),
            name: `Track ${tracks.length + 1}`,
            volume: 70,
            speed: 1.0,
            isPlaying: false
        };
        setTracks([...tracks, newTrack]);
    };

    // Specific track ki speed change karne ka logic (Smoothly)
    const updateTrackSpeed = (id, newSpeed) => {
        setTracks(tracks.map(t => t.id === id ? { ...t, speed: parseFloat(newSpeed) } : t));
        // Yahan aapka Web Audio API ka playbackRate logic jayega
    };

    return (
        <div className="flex flex-col h-screen bg-[#121212] text-white overflow-hidden">

            {/* --- 1. Top Toolbar --- */}
            <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#181818]">
                <h1 className="text-xl font-bold tracking-tight text-orange-500">SoundLab <span className="text-gray-400 font-light">Studio</span></h1>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-700 rounded-full transition"><Rewind size={20} /></button>
                    <button
                        onClick={() => setIsGlobalPlaying(!isGlobalPlaying)}
                        className="p-3 bg-orange-600 hover:bg-orange-500 rounded-full transition shadow-lg shadow-orange-900/20"
                    >
                        {isGlobalPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-full transition"><FastForward size={20} /></button>
                    <button className="flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-md font-bold hover:bg-red-500 transition">
                        <Mic size={18} /> REC
                    </button>
                </div>

                <button className="flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-500 transition">
                    <Save size={18} /> Save Project
                </button>
            </header>

            {/* --- 2. Main Studio Area --- */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">

                {/* Track List Section */}
                <div className="max-w-6xl mx-auto space-y-2">
                    {tracks.map((track) => (
                        <div key={track.id} className="group bg-[#1e1e1e] border border-gray-800 rounded-lg p-4 flex items-center gap-6 hover:border-orange-500/50 transition-all">
                            {/* Track Info */}
                            <div className="w-40">
                                <p className="font-medium truncate">{track.name}</p>
                                <span className="text-xs text-gray-500 font-mono tracking-tighter">ID: {track.id.toString().slice(-4)}</span>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-3 flex-1 max-w-xs">
                                <Volume2 size={16} className="text-gray-400" />
                                <input
                                    type="range"
                                    className="w-full accent-orange-500 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* Speed Control (The Smooth Feature) */}
                            <div className="flex flex-col gap-1 items-center">
                                <label className="text-[10px] uppercase text-gray-500 font-bold">Playback Speed</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range" min="0.5" max="2.0" step="0.01"
                                        value={track.speed}
                                        onChange={(e) => updateTrackSpeed(track.id, e.target.value)}
                                        className="w-24 accent-blue-500 h-1.5 bg-gray-700 rounded-lg appearance-none"
                                    />
                                    <span className="text-xs font-mono w-8">{track.speed}x</span>
                                </div>
                            </div>

                            {/* Visualizer Placeholder */}
                            <div className="flex-1 h-12 bg-black/40 rounded flex items-center justify-center border border-dashed border-gray-700">
                                <div className="text-[10px] text-gray-600">Waveform Visualization</div>
                            </div>

                            {/* Individual Play/Stop */}
                            <button className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition">
                                <Pause size={16} />
                            </button>
                        </div>
                    ))}

                    {/* Add New Track Button */}
                    <button
                        onClick={addTrack}
                        className="w-full py-4 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center gap-2 text-gray-500 hover:text-orange-500 hover:border-orange-500/50 transition"
                    >
                        <Plus size={20} /> Add New Track
                    </button>
                </div>
            </main>

            {/* --- 3. Bottom Status Bar --- */}
            <footer className="h-10 bg-[#0f0f0f] border-t border-gray-800 px-6 flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-widest">
                <div>Sample Rate: 44.1 kHz</div>
                <div className="text-orange-500 font-bold">SoundLab Engine v1.0</div>
                <div>Latancy: 12ms</div>
            </footer>
        </div>
    );
}

export default StudioScreen;