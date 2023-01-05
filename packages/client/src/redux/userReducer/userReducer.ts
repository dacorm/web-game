import { UserActionTypes, userState, UserURL } from '../types/userReducer.types';
import { ActionType, appDispatch } from '../store';


const localStor=JSON.parse(localStorage.getItem("user")|| '{}')
console.log("localStor", localStor)

const initialState: userState = Object.keys(localStor).length!==0? 
{
    userName: localStor.login,
    email: localStor.email,
    id: localStor.id,
    isLoggedIn: true,
    avatar: UserURL.BASE_AVATAR_URL+localStor.avatar
}:{
    userName: null,
    email: null,
    id: null,
    isLoggedIn: false,
    avatar: null
} ;

const initialAction = { type: '__INIT__' };

export const userReducer = (state = initialState, action: ActionType = initialAction) => {
    switch (action.type) {
    case UserActionTypes.SET_USER:
        return {
            ...state,
            ...action.payload,
            isLoggedIn: true,
        };
    case UserActionTypes.LOGOUT:
        return {
            ...state,
            userName: null,
            email: null,
            isLoggedIn: false,
            avatar:null
        };
    case UserActionTypes.SET_AVATAR:
        return {
            ...state,
           avatar: action.payload
        };
    default:
        return state;
    }
};


