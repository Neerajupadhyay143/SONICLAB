import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback((message, type = 'success') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // 3 second baad apne aap hat jayega
        setTimeout(() => removeNotification(id), 3000);
    }, [removeNotification]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {/* --- SNACKBAR UI --- */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-3 w-full max-w-sm px-4">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className={`flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right duration-300
                            ${n.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                n.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                    'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}
                    >
                        {n.type === 'success' && <CheckCircle2 size={18} />}
                        {n.type === 'error' && <AlertCircle size={18} />}
                        {n.type === 'info' && <Info size={18} />}

                        <p className="text-xs font-bold tracking-wide flex-1">{n.message}</p>

                        <button onClick={() => removeNotification(n.id)} className="opacity-50 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);