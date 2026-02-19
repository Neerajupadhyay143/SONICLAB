import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Framer Motion Import
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Github,
    Chrome,
    Music
} from 'lucide-react';

function UserRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const handleRegister = async (e) => {
        e.preventDefault();
        // Registration logic yahan aayega
        try {
            const res = await fetch('http://localhost:8000/register', {
                method: "POST",
                headers: { "content-type": "application/JSON" },
                body:JSON.stringify ({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),

            })

            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Regestration faild !')
            }
            alert('regestration successfull');
            navigate('/')
        }
        catch (err) {
            console.log(err.message || "server error")
        }

        navigate('/login'); // Register ke baad login par bhej rahe hain
    };

    return (
        <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-4 relative overflow-hidden font-sans">

            {/* --- Background Animated Blobs --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>

            {/* --- Main Motion Div (Right to Left Animation) --- */}
            <motion.div
                initial={{ x: 100, opacity: 0 }} // Start: Right side (100px) and Invisible
                animate={{ x: 0, opacity: 1 }}    // End: Original position and Visible
                transition={{ duration: 0.6, ease: "easeOut" }} // Smoothness
                className="w-full max-w-md z-10"
            >
                {/* --- Logo Section --- */}
                <div
                    onClick={() => navigate('/')}
                    className="flex justify-center items-center gap-2 mb-10 cursor-pointer group"
                >
                    <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Music className="text-white" size={24} />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-white uppercase">
                        SONIC<span className="text-indigo-500">LAB</span>
                    </span>
                </div>

                {/* --- Registration Card --- */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400 text-sm">Join the next generation of music producers.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name='email'
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    name='password'
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
                        >
                            Create Studio Account
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Social Logins */}
                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute w-full border-t border-white/5"></div>
                            <span className="relative bg-[#0b0f1a] px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Or Register with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl transition-all group">
                                <Chrome size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                <span className="text-sm font-bold text-white">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-xl transition-all group">
                                <Github size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                <span className="text-sm font-bold text-white">Github</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-gray-500 text-sm">
                    Already have a studio?
                    <button onClick={() => navigate('/login')} className="text-indigo-400 font-bold ml-2 hover:text-indigo-300 transition-colors hover:underline">Sign In</button>
                </p>
            </motion.div>
        </div>
    );
}

export default UserRegistration;