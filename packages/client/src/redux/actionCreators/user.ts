import { userApi } from '../../api/userApi';
import { appDispatch } from '../store';
import {
    redirectURI, TUserAction, UserActionTypes, UserData, UserURL,
} from '../types/userReducer.types';
import { OAuthGetServiceResponse } from '../../api/apiTypes';

export const setUser = (userName: string, email: string, id: string, avatar:string): TUserAction => {
    const userData :UserData = {
        userName,
        email,
        id,
        avatar: UserURL.BASE_AVATAR_URL + avatar,
    };
    return {
        type: UserActionTypes.SET_USER,
        payload: userData,
    };
};

export const logout = (): TUserAction => ({
    type: UserActionTypes.LOGOUT,
});

export const setAvatar = (avatar:string): TUserAction => ({
    type: UserActionTypes.SET_AVATAR,
    payload: avatar,
});

export const setLoginError = (error:string): TUserAction => ({
    type: UserActionTypes.LOGIN_ERROR,
    payload: error,
});

export const setUserAvatarThunk = (avatar:File) => async (dispatch:appDispatch) => {
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

export const registerUserThunk = (userName: string, email: string, password: string) => async (dispatch: appDispatch) => {
    try {
        const res = await userApi.reg(userName, email, password);
        const userData = await res.json();
        console.log(userData);
        if (res.status === 200) {
            dispatch(setUser(userName, email, userData.id, ''));
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

export const getUserInfo = () => async (dispatch: appDispatch) => {
    try {
        const res = await userApi.getUser();
        const userData = await res.json();
        if (res.status === 200) {
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
        } else {
            console.log('getUserError', userData);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const loginThunk = (userName: string, password: string) => async (dispatch: appDispatch) => {
    try {
        const loginRes = await userApi.login(userName, password);
        if (loginRes.status === 200) {
            const resUser = await userApi.getUser();
            const userData = await resUser.json();
            console.log('LOGINDATA', userData);
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
        } else {
            const errors = await loginRes.json();
            dispatch(setLoginError(errors.reason));
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
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
        } else {
            const errors = await oAuthLoginRes.json();
            dispatch(setLoginError(errors.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};
