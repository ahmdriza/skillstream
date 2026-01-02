'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
    colorScheme: ColorScheme;
    toggleColorScheme: () => void;
    setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

    useEffect(() => {
        const saved = localStorage.getItem('skillstream_theme');
        if (saved === 'light' || saved === 'dark') {
            setColorScheme(saved);
        }
    }, []);

    const toggleColorScheme = () => {
        const newScheme = colorScheme === 'light' ? 'dark' : 'light';
        setColorScheme(newScheme);
        localStorage.setItem('skillstream_theme', newScheme);
    };

    const handleSetColorScheme = (scheme: ColorScheme) => {
        setColorScheme(scheme);
        localStorage.setItem('skillstream_theme', scheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                toggleColorScheme,
                setColorScheme: handleSetColorScheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
