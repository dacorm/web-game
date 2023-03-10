import type { Forum } from '../index';

export class ForumServices {
    forum: typeof Forum;

    constructor(model: typeof Forum) {
        this.forum = model;
    }

    async findAll() {
        return this.forum.findAll();
    }

    async findOne(themeId: number) {
        return this.forum.findOne({
            where: {
                themeId,
            },
        });
    }

    async findBythemeName(themeName: string) {
        return this.forum.findOne({
            where: {
                themeName,
            },
        });
    }

    async findThemesForOnePage(offset: number, limit: number) {
        return this.forum.findAll({
            offset,
            limit,
            order: [
                ['themeId', 'DESC']],
        });
    }

    async createForum(createdById: number, countMsg: number, themeName: string) {
        await this.forum.create({ createdById, countMsg, themeName });
    }

    async getCountThemes() {
        return this.forum.count();
    }
}
