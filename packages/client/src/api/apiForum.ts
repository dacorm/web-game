class ForumAPI {
// eslint-disable-next-line class-methods-use-this
    async getAllThemes(currentPage: number, PAGE_SIZE: number) {
        return await fetch(`/api/forums?page=${currentPage}&count=${PAGE_SIZE}`, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getOneTheme(themeId: number) {
        return await fetch(`/api/oneforum?themeId=${themeId}`, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getCountThemes() {
        return await fetch('/api/forumcount', {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async createTheme(themeName: string) {
        return await fetch('/api/createforum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                createdById: 0,
                countMsg: 0,
                themeName,
            }),
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async createMes(themeId: number, text: string, authorId: number) {
        return await fetch('/api/createmes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                themeId, text, authorId,
            }),
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async createUser(
        id: number,
        first_name: string,
        second_name: string,
        display_name: string,
        login: string,
        avatar: string | null,
        email: string,
        phone: string,
    ) {
        return await fetch('/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, first_name, second_name, display_name, login, avatar, email, phone,
            }),
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getMes(themeId: number) {
        return await fetch(`/api/mes?themeId=${themeId}`, {
            credentials: 'include',
        });
    }
}

export const forumApi = new ForumAPI();
