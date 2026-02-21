import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

function DeleteConfirmDialog({ isOpen, onClose, onConfirm, projectName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-sm transform overflow-hidden rounded-[2.5rem] bg-[#0d0d12] border border-red-500/20 p-8 shadow-2xl transition-all shadow-red-500/5">
                {/* Red Glow Background */}
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-red-600/10 blur-[60px] pointer-events-none"></div>

                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="h-16 w-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mb-6">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>

                    <h2 className="text-xl font-black text-white tracking-tight mb-2">Are you sure?</h2>
                    <p className="text-sm text-gray-400 font-medium mb-8">
                        Bhai, "<span className="text-white font-bold">{projectName}</span>" delete ho jayega. Isse wapas nahi laya ja sakta!
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-2xl bg-white/5 font-bold text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                        >
                            Nahi, Rehne Do
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 px-6 py-4 rounded-2xl bg-red-600 font-black text-xs uppercase tracking-widest text-white hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                        >
                            <Trash2 size={16} /> Haan, Delete Karo
                        </button>
                    </div>
                </div>

                {/* Close X Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}

export default DeleteConfirmDialog;