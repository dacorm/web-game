import { userApi } from '../../api/userApi';
import { appDispatch, Dispatcher } from '../store';
import {
    redirectURI, TUserAction, UserActionTypes, UserData, UserCssTheme, UserURL,
} from '../types/userReducer.types';
import { OAuthGetServiceResponse } from '../../api/apiTypes';
import { createUser } from './forum';
import { LOCAL_STORAGE_THEME_KEY, Theme } from '../../Contexts/ThemeContext';

export const setUser = (userName: string, email: string, id: string, avatar: string, themeName: string): TUserAction => {
    const userData: UserData = {
        userName,
        email,
        id,
        avatar: UserURL.BASE_AVATAR_URL + avatar,
        cssTheme: themeName,
    };
    return {
        type: UserActionTypes.SET_USER,
        payload: userData,
    };
};

export const setCssTheme = (themeName: string): TUserAction => {
    const userCssTheme: UserCssTheme = {
        cssTheme: themeName,
    };
    return {
        type: UserActionTypes.SET_CSS_THEME,
        payload: userCssTheme,
    };
};

export const logout = (): TUserAction => ({
    type: UserActionTypes.LOGOUT,
});

export const setAvatar = (avatar: string): TUserAction => ({
    type: UserActionTypes.SET_AVATAR,
    payload: avatar,
});

export const setLoginError = (error: string): TUserAction => ({
    type: UserActionTypes.LOGIN_ERROR,
    payload: error,
});

export const createCssThemeThunk = (themeName: string, login: string) => async (dispatch: Dispatcher) => {
    try {
        const res = await userApi.createCssTheme(themeName, login);
        if (res.status === 200) {
            dispatch(setCssTheme(themeName));
        } else {
            const errors = await res.json();
            console.warn(errors);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const setUserAvatarThunk = (avatar: File) => async (dispatch: appDispatch) => {
    const fd = new FormData();
    fd.append('avatar', avatar);
    try {
        const res = await userApi.setAvatar(fd);
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setAvatar(UserURL.BASE_AVATAR_URL + data.avatar));
        } else {
            console.log('SET_AVATAR_EROR', data);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const registerUserThunk = (userName: string, email: string, password: string) => async (dispatch: Dispatcher) => {
    try {
        const res = await userApi.reg(userName, email, password);
        const userData = await res.json();

        if (res.status === 200) {
            dispatch(setUser(userName, email, userData.id, '', ''));
            console.log('userData!!!!!', userData);
            await dispatch(createUser(
                userData.id,
                userData.first_name,
                userData.second_name,
                userData.display_name,
                userData.login,
                userData.avatar,
                userData.email,
                userData.phone,
            ));
        } else {
            console.log('regError', userData);
            dispatch(setLoginError(userData.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};

export const logoutThunk = () => async (dispatch: appDispatch) => {
    try {
        const res = await userApi.logout();
        if (res.status === 200) {
            dispatch(logout());
        } else {
            const data = await res.json();
            console.log('Error logout', data);
            dispatch(logout());
        }
    } catch (e) {
        console.warn(e);
    }
};

export const getUserInfo = () => async (dispatch: Dispatcher) => {
    try {
        const res = await userApi.getUser();
        const userData = await res.json();
        if (res.status === 200) {
            console.log('userData', userData);
            await dispatch(createUser(
                userData.id,
                userData.first_name,
                userData.second_name,
                userData.display_name,
                userData.login,
                userData.avatar,
                userData.email,
                userData.phone,
            ));
            let resultTheme : string = '';
            try {
                if (userData.login) {
                    const resCss = await userApi.getCssTheme(userData.login);
                    const cssThemeData = await resCss.json();
                    if (resCss.status === 200) {
                        const srvTheme = cssThemeData?.theme;
                        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
                        const theme = srvTheme || localStorageTheme;
                        resultTheme = theme || Theme.LIGHT;
                        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, resultTheme);
                        document.body.className = resultTheme;
                        const res = await userApi.createCssTheme(resultTheme, userData.login);
                        if (res.status === 200) {
                            console.log('cssTheme saved at server', resultTheme);
                        } else {
                            const errors = await res.json();
                            console.warn(errors);
                        }
                    } else {
                        const errors = await resCss.json();
                        console.warn(errors);
                    }
                }
            } catch (e) {
                console.warn(e);
            }

            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar, resultTheme));
        } else {
            console.log('getUserError', userData);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const loginThunk = (userName: string, password: string) => async (dispatch: Dispatcher) => {
    try {
        const loginRes = await userApi.login(userName, password);
        if (loginRes.status === 200) {
            const resUser = await userApi.getUser();
            const userData = await resUser.json();
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar, ''));
            console.log('userData!!!!!', userData);
            await dispatch(createUser(
                userData.id,
                userData.first_name,
                userData.second_name,
                userData.display_name,
                userData.login,
                userData.avatar,
                userData.email,
                userData.phone,
            ));
        } else {
            const errors = await loginRes.json();
            dispatch(setLoginError(errors.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};

export const getCssThemeThunk = (login: string) => async (dispatch: Dispatcher) => {
    try {
        const res = await userApi.getCssTheme(login);
        const cssThemeData = await res.json();
        if (res.status === 200) {
            const srvTheme = cssThemeData?.cssTheme;
            dispatch(setCssTheme(srvTheme));
        } else {
            const errors = await res.json();
            console.warn(errors);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const loginOAuthPart1Thunk = () => async (dispatch: appDispatch) => {
    try {
        const serviceIdRes = await userApi.oAuthGetService();
        if (serviceIdRes.status === 200) {
            const responseOAuthGetService = await serviceIdRes.json() as OAuthGetServiceResponse;
            const redirectUserUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${responseOAuthGetService.service_id}&redirect_uri=${redirectURI}`;
            window.location.replace(redirectUserUrl);
            // возвращается на http://localhost:3000?code=7654321, где и надо производить обработку кода code и проводить установку пользователя через await userApi.getUser();
        } else {
            const errors = await serviceIdRes.json();
            dispatch(setLoginError(errors.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};

export const loginOAuthPart2Thunk = (code: string) => async (dispatch: appDispatch) => {
    try {
        const oAuthLoginRes = await userApi.oAuthLogin(code, redirectURI);
        if (oAuthLoginRes.status === 200) {
            const resUser = await userApi.getUser();
            const userData = await resUser.json();
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar, ''));
        } else {
            const errors = await oAuthLoginRes.json();
            dispatch(setLoginError(errors.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};
