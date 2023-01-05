import { appDispatch } from "../store";
import { UserActionTypes, UserURL } from "../types/userReducer.types";

export const setUser = (userName: string, email: string, id: string, avatar:string) => {

    let userData ={ 
       userName,
       email,
       id,
       avatar: UserURL.BASE_AVATAR_URL+avatar}
   
       localStorage.setItem('user', JSON.stringify(userData))
       console.log("localStor set user", localStorage)
       return {
       type: UserActionTypes.SET_USER,
       payload: userData,
   }};
   
   export const logout = () => {
       localStorage.removeItem('user')
      return {
       type: UserActionTypes.LOGOUT,
       payload: null,
   }};
   
   
   export const setAvatar=(avatar:string)=>({
   type: UserActionTypes.SET_AVATAR,
   payload:avatar
   })
   
   
   export const setUserAvatarThunk =(avatar:File) =>async (dispatch:appDispatch) => {
       const fd = new FormData()
       fd.append('avatar', avatar)
       try {
           const data = await fetch(UserURL.AVATAR, {
               method: 'PUT',
               body: fd,
               credentials: 'include',
           });
           const res = await data.json();
           dispatch(setAvatar(UserURL.BASE_AVATAR_URL+res.avatar));
       } catch (e) {
           console.warn(e);
       }
   }
   
   
   
   export const registerUserThunk = (userName: string, email: string, password: string) => async (dispatch: appDispatch) => {
       try {
           const data = await fetch(UserURL.SIGNUP, {
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
           dispatch(setUser(userName, email, res.id, res.avatar));
       } catch (e) {
           console.warn(e);
       }
   };
   
   export const logoutThunk = () => async (dispatch: appDispatch) => {
       try {
           const data = await fetch(UserURL.LOGOUT, {
            method: 'POST',  
            credentials: 'include',
               headers: {
                'Accept': 'application/json',
            },
           });
           await data.json();
           console.log("logoutData",data)
           dispatch(logout());
           
       } catch (e) {
           console.log(`eror ${e}`)
           console.warn(e);
       }
   };
   
   export const getUserInfo = () => async (dispatch: appDispatch) => {
       try {
           const data = await fetch(UserURL.USERINFO, {
               credentials: 'include',
           });
           const res = await data.json();
           dispatch(setUser(res.login, res.email, res.id, res.avatar));
       } catch (e) {
           console.warn(e);
       }
   };
   
   export const loginThunk = (userName: string, password: string) => async (dispatch: appDispatch) => {
       try {
           const login= await fetch(UserURL.LOGIN, {
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
           console.log("loginDATA", login)
           const auth = await fetch(UserURL.USERINFO, {
               credentials: 'include',
           });
           const userData = await auth.json();
           console.log("serDATA", userData)
           dispatch(setUser(userData.login, userData.email, userData.id, userData.avatar));
       } catch (e) {
           console.warn(e);
       }
   };