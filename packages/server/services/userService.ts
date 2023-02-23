import  Models from './../models/index.ts'

export class UserService {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models=sequelize.models
  }

  async getUser(){
    return "UserService: Getting a User from DB"
  }

}

