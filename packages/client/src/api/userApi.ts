import { setAvatar } from "../redux/actionCreators/user";
import { UserURL } from "../redux/types/userReducer.types"

class UserApi{

async login(userName: string,  password:string){
   const res= await fetch(UserURL.LOGIN, {
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
    return await  res
}


async getUser(){
    return await fetch(UserURL.USERINFO, {
        credentials: 'include',
    });
    
}

async logout(){
    const data = await fetch(UserURL.LOGOUT, {
        method: 'POST',  
        credentials: 'include',
           headers: {
            'Accept': 'application/json',
        },
       });
       return data
}

async reg(userName: string, email: string, password: string){
    return await fetch(UserURL.SIGNUP, {
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

}

async setAvatar(fd: FormData){
    return await fetch(UserURL.AVATAR, {
         method: 'PUT',
         body: fd,
         credentials: 'include',
     });
 }

}

export const userApi= new UserApi