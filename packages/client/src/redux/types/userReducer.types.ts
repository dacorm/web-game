export interface userState {
  userName: string | null;
  id: string | null;
  email: string | null;
  isLoggedIn: boolean;
  avatar: string | null;
  loginError: string | null;
  cssTheme: string | null;
}

export interface UserCssTheme {
  cssTheme: string | null;
}

export interface UserData {
  userName: string | null;
  id: string | null;
  email: string | null;
  avatar: string | null;
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  SET_CSS_THEME = 'SET_CSS_THEME',
  LOGOUT = 'LOGOUT',
  SET_AVATAR = 'SET_AVATAR',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

export const redirectURI = 'http://localhost:3000'; // только http://localhost:3000 зарегистрирован как callback_url в практикуме

export enum UserURL {
  BASE_AVATAR_URL = 'https://ya-praktikum.tech/api/v2/resources/',
  AVATAR = 'https://ya-praktikum.tech/api/v2/user/profile/avatar',
  SIGNUP = 'https://ya-praktikum.tech/api/v2/auth/signup',
  LOGOUT = 'https://ya-praktikum.tech/api/v2/auth/logout',
  USERINFO = 'https://ya-praktikum.tech/api/v2/auth/user',
  LOGIN = 'https://ya-praktikum.tech/api/v2/auth/signin',
  OAUTH_SERVICE_ID = 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
  OAUTH_LOGIN = 'https://ya-praktikum.tech/api/v2/oauth/yandex'
}

type TUserActionlogout = {
  type: UserActionTypes.LOGOUT
}

type TUserActionSetUser = {
  type: UserActionTypes.SET_USER
  payload: UserData
}

type TUserActionSetCssTheme = {
  type: UserActionTypes.SET_CSS_THEME
  payload: UserCssTheme
}

type TUserActionSetAvatar = {
  type: UserActionTypes.SET_AVATAR,
  payload: string,
}
type TUserActionSetLoginError = {
  type: UserActionTypes.LOGIN_ERROR,
  payload: string,
}

export type TUserAction =
  | TUserActionlogout
  | TUserActionSetAvatar
  | TUserActionSetLoginError
  | TUserActionSetUser
  | TUserActionSetCssTheme;
