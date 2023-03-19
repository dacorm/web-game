import { redirectURI, UserURL } from '../redux/types/userReducer.types';
import { fullServerHostNamePrefixNoSlash } from '../constants';

class UserApi {
    // eslint-disable-next-line class-methods-use-this
    async login(userName: string, password: string) {
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
        return await fetch(url, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async oAuthLogin(codeValue: string, redirectUri: string) {
        const payload = JSON.stringify({
            code: codeValue,
            redirect_uri: redirectUri,
        });
        return await fetch(UserURL.OAUTH_LOGIN, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
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
        return await fetch(UserURL.LOGOUT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
            },
        });
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

    // eslint-disable-next-line class-methods-use-this
    async createCssTheme(themeName: string, login: string) {
        return await fetch(`${fullServerHostNamePrefixNoSlash}/api/createcsstheme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                themeName,
                login,
            }),
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getCssTheme(login: string) {
        return await fetch(`${fullServerHostNamePrefixNoSlash}/api/getcsstheme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login,
            }),
            credentials: 'include',
        });
    }
}

export const userApi = new UserApi();
