import { UserURL } from '../redux/types/userReducer.types';

class UserApi {
    // eslint-disable-next-line class-methods-use-this
    async login(userName: string, password:string) {
        const res = await fetch(UserURL.LOGIN, {
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
        return res;
    }

    // eslint-disable-next-line class-methods-use-this
    async getUser() {
        const data = await fetch(UserURL.USERINFO, {
            credentials: 'include',
        });
        return data;
    }

    // eslint-disable-next-line class-methods-use-this
    async logout() {
        const data = await fetch(UserURL.LOGOUT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
        });
        return data;
    }

    // eslint-disable-next-line class-methods-use-this
    async reg(userName: string, email: string, password: string) {
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
        return data;
    }

    // eslint-disable-next-line class-methods-use-this
    async setAvatar(fd: FormData) {
        const data = await fetch(UserURL.AVATAR, {
            method: 'PUT',
            body: fd,
            credentials: 'include',
        });
        return data;
    }
}

export const userApi = new UserApi();
