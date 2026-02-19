import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    ArrowRight,
    Github,
    Chrome,
    Music
} from 'lucide-react';
import { isTokenValid } from '../auth/Token.js';

function Login() {
    const navigate = useNavigate();
    const location = useLocation(); // Location check karne ke liye
    const [inValid, setInvalid] = useState();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (isTokenValid()) {
            navigate('/dashboard');
        }
    }, [])

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
    // Check kar rahe hain ki kya user Register page se aaya hai?
    const isFromRegister = location.state?.from === 'register';

    // Animation Settings
    const variants = {
        initial: {
            x: isFromRegister ? -100 : 100, // Agar register se aaya toh left (-100), warna right (100)
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:8000/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            console.log(res.ok);
            if (!res.ok) {
                setInvalid(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            setInvalid("");
            navigate("/dashboard");
        } catch (err) {
            setInvalid("Server error");
            console.log(err);
        }
    };







    return (
        <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-4 relative overflow-hidden font-sans">

            {/* --- Background Animated Blobs --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>

            {/* --- Main Animated Container --- */}
            <motion.div
                key={location.pathname} // Route change hone par animation trigger karega
                initial="initial"
                animate="animate"
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut" }}
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

                {/* --- Login Card --- */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Enter your credentials to access your studio.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    name='email'
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                                <p onClick={() => navigate('/forget')} className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer">Forgot?</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={formData.password}
                                    name='password'
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                    placeholder="••••••••"
                                />
                            </div>
                            {inValid && <p className="text-red-400 text-sm">{inValid}</p>}

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
                        >
                            Sign In to Studio
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute w-full border-t border-white/5"></div>
                            <span className="relative bg-[#0b0f1a] px-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Or continue with</span>
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

                {/* Footer Link - Yahan hum state pass kar rahe hain */}
                <p className="text-center mt-8 text-gray-500 text-sm">
                    Don't have an account?
                    <button
                        onClick={() => navigate('/register', { state: { from: 'login' } })}
                        className="text-indigo-400 font-bold ml-2 hover:text-indigo-300 transition-colors hover:underline"
                    >
                        Create Account
                    </button>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;