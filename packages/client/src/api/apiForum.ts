class ForumAPI {
// eslint-disable-next-line class-methods-use-this
    async getAllThemes(currentPage:number, PAGE_SIZE:number) {
        return await fetch(`http://localhost:3001/api/forums?page=${currentPage}&count=${PAGE_SIZE}`, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getOneTheme(themeId:number) {
        return await fetch(`http://localhost:3001/api/oneforum?themeId=${themeId}`, {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async getCountThemes() {
        return await fetch('http://localhost:3001/api/forumcount', {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async createTheme(themeName:string) {
        return await fetch('http://localhost:3001/api/createforum', {
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
    async createMes(themeId:number, text:string, authorId:number) {
        return await fetch('http://localhost:3001/api/createmes', {
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
    async getMes(themeId:number) {
        return await fetch(`http://localhost:3001/api/mes?themeId=${themeId}`, {
            credentials: 'include',
        });
    }
}

export const forumApi = new ForumAPI();
