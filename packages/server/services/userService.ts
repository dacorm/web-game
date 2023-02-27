import type { User } from '../index'


export class UserService {
  user: typeof User
  constructor(model: typeof User) {
    this.user=model
  }

  async getUser(){
    return "UserService: Getting a User from DB"
  }

}

