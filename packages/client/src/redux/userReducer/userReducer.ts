import { UserActionTypes, userState, UserURL } from '../types/userReducer.types';
import { ActionType, appDispatch } from '../store';

const initialState: userState = {
    userName: null,
    email: null,
    id: null,
    isLoggedIn: false,
    avatar: null,
    loginError: null,
};

const initialAction = { type: '__INIT__' };

export const userReducer = (state = initialState, action: ActionType = initialAction) => {
    switch (action.type) {
    case UserActionTypes.SET_USER:
        return {
            ...state,
            ...action.payload,
            isLoggedIn: true,
            loginError: null,
        };
    case UserActionTypes.LOGOUT:
        return {
            ...state,
            userName: null,
            email: null,
            isLoggedIn: false,
            avatar: null,
            loginError: null,
        };
    case UserActionTypes.SET_AVATAR:
        return {
            ...state,
            avatar: action.payload,
        };
    case UserActionTypes.LOGIN_ERROR:
        return {
            ...state,
            loginError: action.payload,
        };
    default:
        return state;
    }
};
