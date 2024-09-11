import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Create Provider Component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if(typeof localStorage == "object")
            return localStorage.getItem('theme') || 'light';
        return "dark"
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme context
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
