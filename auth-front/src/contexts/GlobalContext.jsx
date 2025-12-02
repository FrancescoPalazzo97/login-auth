import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    });

    useEffect(() => {
        const userString = JSON.stringify(user);
        localStorage.setItem('user', userString);
    }, [user]);

    const [token, setToken] = useState(() => {
        const tokenString = localStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    });

    useEffect(() => {
        const tokenString = JSON.stringify(token);
        localStorage.setItem('token', tokenString);
    }, [token]);

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    const value = {
        user,
        setUser,
        token,
        setToken,
        logout
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}