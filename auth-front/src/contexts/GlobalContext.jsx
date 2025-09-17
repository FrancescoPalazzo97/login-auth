import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const value = {

    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}