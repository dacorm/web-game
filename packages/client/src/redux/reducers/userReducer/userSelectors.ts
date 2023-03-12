import { AppStateType } from '../../store';

export const getUserName = (state: AppStateType) => state.user.userName;
export const getUserAvatar = (state: AppStateType) => state.user.avatar;
export const getEmail = (state: AppStateType) => state.user.email;
export const getId = (state: AppStateType) => state.user.id;
export const getIsLoggedInFlag = (state: AppStateType) => state.user.isLoggedIn;
