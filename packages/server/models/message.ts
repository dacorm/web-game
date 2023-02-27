import type { ModelAttributes } from 'sequelize';
import { DataType, Model } from 'sequelize-typescript';

export interface IMessage {
  msgId?: number,
  themeId: number,
  text: string,
  authorId: number
}

export const messageModel: ModelAttributes<Model, IMessage> = {
    msgId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    themeId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
    authorId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
};
