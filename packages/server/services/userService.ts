import type { User } from '../index';

export class UserService {
    user: typeof User;

    constructor(model: typeof User) {
        this.user = model;
    }

    // eslint-disable-next-line class-methods-use-this
    async getUser() {
        return 'UserService: Getting a User from DB';
    }
}
