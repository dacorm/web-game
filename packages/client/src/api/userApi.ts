import { UserURL, redirectURI } from '../redux/types/userReducer.types';

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
        return await res;
    }

    // eslint-disable-next-line class-methods-use-this
    async oAuthGetService() {
        const url = `${UserURL.OAUTH_SERVICE_ID}?redirect_uri=${redirectURI}`;
        console.log('get oauth url:', url);
        return await fetch(url, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getUser() {
        return await fetch(UserURL.USERINFO, {
            credentials: 'include',
        });
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

    // eslint-disable-next-line class-methods-use-this
    async setAvatar(fd: FormData) {
        return await fetch(UserURL.AVATAR, {
            method: 'PUT',
            body: fd,
            credentials: 'include',
        });
    }
}

export const userApi = new UserApi();
