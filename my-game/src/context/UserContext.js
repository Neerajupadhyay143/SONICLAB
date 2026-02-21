import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Backend se user details lane ka function
    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setIsAuthenticated(true);

            } else {

                logout();
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const limit = user?.plan;
    const fixedLimit = (limit === "free") ? 10 : 50;

    return (
        <UserContext.Provider value={{ user, setUser, loading, isAuthenticated, login, logout, refreshUser: fetchUserProfile, fixedLimit }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);