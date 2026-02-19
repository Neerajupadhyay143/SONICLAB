import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, Music, CheckCircle2, AlertCircle } from 'lucide-react';

function Forget() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8000/forget_password', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Email not found");
                setLoading(false);
                return;
            }

            setIsSubmitted(true);
            setLoading(false);

        } catch (err) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-4 relative overflow-hidden font-sans text-white">

            {/* --- Background Animated Glows --- */}
            <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                {/* --- Logo Section --- */}
                <div
                    onClick={() => navigate('/')}
                    className="flex justify-center items-center gap-2 mb-10 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
                        <Music className="text-white" size={24} />
                    </div>
                    <span className="text-3xl font-black tracking-tighter uppercase">
                        SONIC<span className="text-indigo-500">LAB</span>
                    </span>
                </div>

                {/* --- Main Card --- */}
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <div className="mb-8 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
                                    <p className="text-gray-400 text-sm">No worries! Enter your email and we'll send you recovery instructions.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs flex items-center gap-2">
                                            <AlertCircle size={16} /> {error}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Registered Email</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? "Sending..." : "Send Reset Link"}
                                        {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            /* --- Success State --- */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Check Your Inbox</h2>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    Recovery link sent to: <br />
                                    <span className="text-white font-medium">{email}</span>
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors text-sm uppercase tracking-widest"
                                >
                                    Try another email
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- Footer Navigation --- */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-white font-bold transition-all group text-sm"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Forget;