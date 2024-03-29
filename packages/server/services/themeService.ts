import type { Theme } from '../index';

export class ThemeService {
    theme: typeof Theme;

    constructor(model: typeof Theme) {
        this.theme = model;
    }

    async findAll() {
        return this.theme.findAll();
    }

    async findOne(id: number) {
        return this.theme.findOne({ where: { id } });
    }

    async findOneByOwnerId(ownerId: string) {
        return this.theme.findOne({
            where: {
                ownerId,
            },
        });
    }

    async updateOne(theme: string, id: number) {
        return this.theme.update(
            { theme },
            { where: { id } },
        );
    }

    async createTheme(theme: string, ownerId: string) {
        await this.theme.create({ theme, ownerId });
    }

    async getCountThemes() {
        return this.theme.count();
    }
}
