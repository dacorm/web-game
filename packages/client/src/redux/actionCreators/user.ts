import { userApi } from '../../api/userApi';
import { appDispatch } from '../store';
import {
    TUserAction, UserActionTypes, UserData, UserURL,
} from '../types/userReducer.types';

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
        if (res.status === 200) {
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
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
            console.log('getuserError', userData);
        }
    } catch (e) {
        console.warn(e);
    }
};

export const loginThunk = (userName: string, password: string) => async (dispatch: appDispatch) => {
    try {
        const loginRes = await userApi.login(userName, password);
        console.log('loginDATA', loginRes);
        if (loginRes.status === 200) {
            const resUser = await userApi.getUser();
            const userData = await resUser.json();
            console.log('serDATA', userData);
            dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
        } else {
            const errorres = await loginRes.json();
            dispatch(setLoginError(errorres.reason));
        }
    } catch (e) {
        console.warn(e);
    }
};
