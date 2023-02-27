import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize';

export interface ITheme {
  id: number,
  theme: string,
  device: string,
  ownerId: string
}

export const themeModel: ModelAttributes<Model, ITheme> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    theme: {
        type: DataType.STRING,
        allowNull: false,
    },
    device: {
        type: DataType.STRING,
        allowNull: false,
    },
    ownerId: {
        type: DataType.STRING,
        allowNull: false,
    },
};
