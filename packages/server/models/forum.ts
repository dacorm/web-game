import type { ModelAttributes } from 'sequelize';
import { DataType, Model } from 'sequelize-typescript';

export interface IForum {
  themeId: number,
  createdById: number,
  countMsg: number,
  themeName: string,
}

export const forumModel: ModelAttributes<Model, IForum> = {
    themeId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,

        allowNull: false,
    },
    createdById: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    countMsg: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    themeName: {
        type: DataType.STRING,
        allowNull: false,
    },
};
