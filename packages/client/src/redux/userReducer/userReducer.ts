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
    });
    const res = await data.json();
    console.log('HERE TUTA');
    dispatch(setUser(userName, email, res.id));
};

export const logoutThunk = () => async (dispatch: appDispatch) => {
    const data = await fetch('https://ya-praktikum.tech/api/v2/auth/logout');
    const res = await data.json();
    if (res.ok) {
        dispatch(logout());
    }
};

export const loginThunk = (userName: string, password: string) => async (dispatch: appDispatch) => {
    const data = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: userName,
            password,
        }),
    });
    const res = await data.json();
    const auth = await fetch('https://ya-praktikum.tech/api/v2/auth/user');
    const userData = await auth.json();
    if (res.ok && userData.ok) {
        dispatch(setUser(userName, userData.data.email, userData.data.id));
    }
};
