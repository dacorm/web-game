import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../Contexts/ThemeContext';
import { getIsLoggedInFlag, getUserName } from '../redux/reducers/userReducer/userSelectors';
import { Dispatcher } from '../redux/store';
import { createCssThemeThunk } from '../redux/actionCreators/user';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(srvTheme: Theme | null = null): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const isLoggedIn = useSelector(getIsLoggedInFlag);
    const userLogin = useSelector(getUserName);

    const dispatch = useDispatch<Dispatcher>();

    const toggleTheme = () => {
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        const tTheme = localStorageTheme ?? theme;
        const newTheme = tTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        if (isLoggedIn) {
            dispatch(createCssThemeThunk(newTheme, userLogin));
        }
    };
    useEffect(() => {
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        const theme = srvTheme || localStorageTheme;
        document.body.className = theme || Theme.LIGHT;
    }, []);
    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
