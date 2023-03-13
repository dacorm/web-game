import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../Contexts/ThemeContext';
import {
    getIsLoggedInFlag, getCssTheme, getUserName,
} from '../redux/reducers/userReducer/userSelectors';
import { Dispatcher } from '../redux/store';
import { createCssThemeThunk, getCssThemeThunk } from '../redux/actionCreators/user';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(srvTheme: Theme | null = null): UseThemeResult {
    console.log('useTheme fired');
    const { theme, setTheme } = useContext(ThemeContext);

    const isLoggedIn = useSelector(getIsLoggedInFlag);
    console.log('isLoggedIn', isLoggedIn);
    const userLogin = useSelector(getUserName);
    console.log('userLogin', userLogin);

    const dispatch = useDispatch<Dispatcher>();
    // const srvTheme: Theme | null = null;
    // if (isLoggedIn) {
    //     dispatch(getCssThemeThunk(userLogin));
    //     // srvTheme = useSelector(getCssTheme);
    // }

    const toggleTheme = () => {
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        console.log('localStorageTheme', localStorageTheme);
        const tTheme = localStorageTheme ?? theme;
        const newTheme = tTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        if (isLoggedIn) {
            console.log('save toggleTheme isLoggedIn true');
            dispatch(createCssThemeThunk(newTheme, userLogin));
        } else {
            console.log('toggleTheme isLoggedIn false');
        }
    };
    useEffect(() => {
        console.log('srvTheme', srvTheme);
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        console.log('localStorageTheme', localStorageTheme);
        const theme = srvTheme || localStorageTheme;
        console.log('theme', theme);
        document.body.className = theme || Theme.LIGHT;
    }, []);
    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
