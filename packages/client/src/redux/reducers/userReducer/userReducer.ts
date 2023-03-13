import { UserActionTypes, userState } from '../../types/userReducer.types';
import { ActionType } from '../../store';

const initialState: userState = {
    userName: null,
    email: null,
    id: null,
    isLoggedIn: false,
    avatar: null,
    loginError: null,
    cssTheme: null,
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
    case UserActionTypes.SET_CSS_THEME:
        console.log('userReducer UserActionTypes.SET_CSS_THEME');
        console.log('userReducer state', state);
        console.log('userReducer action.payload', action.payload);
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
};
