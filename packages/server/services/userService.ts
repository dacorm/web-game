import type { User } from '../index';

export class UserService {
    user: typeof User;

    constructor(model: typeof User) {
        this.user = model;
    }

    async findAll() {
        return this.user.findAll();
    }

    async findOne(id: number) {
        return this.user.findOne({
            where: {
                id,
            },
        });
    }

    async findByLogin(login: string) {
        return this.user.findOne({
            where: {
                login,
            },
        });
    }

    async createUser(
        id:number,
        first_name: string,
        second_name: string,
        display_name: string,
        login: string,
        avatar:string,
        email: string,
        phone:string,
    ) {
        await this.user.create({
            // eslint-disable-next-line camelcase
            id, first_name, second_name, display_name, login, avatar, email, phone,
        });
    }
}
