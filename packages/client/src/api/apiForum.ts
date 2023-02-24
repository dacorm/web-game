class ForumAPI {
// eslint-disable-next-line class-methods-use-this
    async getAllThemes() {
        return await fetch('http://localhost:3001/api/forums', {
            credentials: 'include',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async createTheme(themeName:string) {
        return await fetch('http://localhost:3001/api/createtheme', {
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
}

export const forumApi = new ForumAPI();
