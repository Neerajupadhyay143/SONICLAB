import React from 'react';

function Tutorial() {
    const steps = [
        {
            number: "01",
            title: "How to Upload Your Tracks?",
            description: "First, navigate to the 'Studio' section. On each Pad, you will find a '+' icon or an 'Upload' button. You can also simply drag-and-drop your .mp3 or .wav files directly from your computer onto the pads.",
            image: ""
        },
        {
            number: "02",
            title: "Connecting & Coloring Pads",
            description: "Once a track is uploaded, the pad will activate and light up. You can assign unique color codes to each pad to help you distinguish between instruments like Drums, Bass, and Synths at a glance.",
            image: ""
        },
        {
            number: "03",
            title: "Running Multiple Loops in Sync",
            description: "Click the pads to start playing your tracks. Our 'Auto-Sync' engine ensures that even if you trigger a pad slightly off-beat, it will wait for the next bar to start, keeping your rhythm perfectly in sync.",
            image: ""
        }
    ];

    return (
        <div className="bg-[#0f172a] text-white min-h-screen font-sans pb-20">
            {/* --- Header Section --- */}
            <div className="py-16 px-6 text-center bg-gradient-to-b from-indigo-900/30 to-transparent">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Studio Guide</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Follow these steps to master your music loops and create professional-grade soundscapes.
                </p>
            </div>

            {/* --- Steps Section --- */}
            <div className="max-w-6xl mx-auto px-6 space-y-24 mt-12">
                {steps.map((step, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>

                        {/* Image Container */}
                        <div className="flex-1 w-full group">
                            <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-700 shadow-2xl bg-gray-800 aspect-video flex items-center justify-center">
                                {/* <img
                                    src={`/assets/${step.image}`}
                                    alt={step.title}
                                    className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Step+" + step.number }}
                                /> */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 space-y-5">
                            <span className="text-7xl font-black text-indigo-500/10 block leading-none">{step.number}</span>
                            <h2 className="text-3xl font-bold text-indigo-400 tracking-tight">{step.title}</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {step.description}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <span className="px-3 py-1 bg-gray-800 rounded-md text-xs font-mono text-gray-500 border border-gray-700">FORMATS: MP3, WAV</span>
                                <span className="px-3 py-1 bg-gray-800 rounded-md text-xs font-mono text-gray-500 border border-gray-700">MAX SIZE: 10MB</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Pro Tips Section --- */}
            <div className="max-w-5xl mx-auto mt-32 px-6">
                <div className="bg-indigo-600/5 border border-indigo-500/20 p-10 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>

                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="text-3xl">💡</span> Pro Tips for Producers
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 bg-gray-900/40 rounded-2xl border border-gray-800">
                            <h4 className="font-bold text-indigo-300 mb-2 text-xl">Smart Layering</h4>
                            <p className="text-gray-400">Start with a Drum loop to set the foundation. Gradually add the Bassline followed by Melodic elements to build a rich soundscape.</p>
                        </div>
                        <div className="p-6 bg-gray-900/40 rounded-2xl border border-gray-800">
                            <h4 className="font-bold text-indigo-300 mb-2 text-xl">Volume Balance</h4>
                            <p className="text-gray-400">Use the individual volume sliders on each pad to ensure no single track 'clips' or overpowers the mix. Balance is key!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Final CTA --- */}
            <div className="text-center mt-24">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-full font-black text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(79,70,229,0.3)] tracking-widest uppercase">
                    Launch Your Studio
                </button>
            </div>
        </div>
    );
}

export default Tutorial;