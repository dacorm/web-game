import type { ModelAttributes } from 'sequelize';
import { DataType, Model } from 'sequelize-typescript';

export interface IUser {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string,
  email: string,
  phone: string
}

export const userModel: ModelAttributes<Model, IUser> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: DataType.STRING,
        allowNull: false,
    },
    second_name: {
        type: DataType.STRING,
        allowNull: false,
    },
    display_name: {
        type: DataType.STRING,
        allowNull: false,
    },
    login: {
        type: DataType.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataType.STRING,
        allowNull: false,
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
    },
    phone: {
        type: DataType.STRING,
        allowNull: false,
    },
};
