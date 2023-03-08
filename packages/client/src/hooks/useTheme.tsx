import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../Contexts/ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        console.log('NEW', newTheme);
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };
    useEffect(() => {
        const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        document.body.className = theme || Theme.LIGHT;
    }, []);
    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
