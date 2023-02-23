import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IForum {
  title: string;
  user_id: number;
}

export const forumModel: ModelAttributes<Model, IForum>= {
  title: {
    type: DataType.STRING,
    allowNull: false
  },
  user_id: {
    type: DataType.INTEGER,
  }
};

