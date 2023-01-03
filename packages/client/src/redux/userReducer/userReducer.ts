import { userState } from './userReducer.types';
import { ActionType, appDispatch } from '../store';

const initialState: userState = {
    userName: null,
    email: null,
    id: null,
    isLoggedIn: false,
};

const initialAction = { type: '__INIT__' };
export const userReducer = (state = initialState, action: ActionType = initialAction) => {
    switch (action.type) {
    case 'SET_USER':
        return {
            ...state,
            ...action.payload,
            isLoggedIn: true,
        };
    case 'LOGOUT':
        return {
            ...state,
            userName: null,
            email: null,
            isLoggedIn: false,
        };
    default:
        return state;
    }
};

export const setUser = (userName: string, email: string, id: string) => ({
    type: 'SET_USER',
    payload: {
        userName,
        email,
        id,
    },
});

export const logout = () => ({
    type: 'LOGOUT',
    payload: null,
});

export const registerUserThunk = (userName: string, email: string, password: string) => async (dispatch: appDispatch) => {
    try {
        const data = await fetch('https://ya-praktikum.tech/api/v2/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: userName,
                second_name: 'unknown',
                login: userName,
                email,
                password,
                phone: '77777777777',
            }),
            credentials: 'include',
        });
        const res = await data.json();
        dispatch(setUser(userName, email, res.id));
    } catch (e) {
        console.warn(e);
    }
};

export const logoutThunk = () => async (dispatch: appDispatch) => {
    try {
        const data = await fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
            credentials: 'include',
        });
        const res = await data.json();
        dispatch(logout());
    } catch (e) {
        console.warn(e);
    }
};

export const getUserInfo = () => async (dispatch: appDispatch) => {
    try {
        const data = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
            credentials: 'include',
        });
        const res = await data.json();
        dispatch(setUser(res.login, res.email, res.id));
    } catch (e) {
        console.warn(e);
    }
};

export const loginThunk = (userName: string, password: string) => async (dispatch: appDispatch) => {
    try {
        const data = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: userName,
                password,
            }),
            credentials: 'include',
        });
        const auth = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
            credentials: 'include',
        });
        const userData = await auth.json();
        dispatch(setUser(userName, userData.email, userData.id));
    } catch (e) {
        console.warn(e);
    }
};
