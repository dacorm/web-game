import type { SequelizeOptions } from 'sequelize-typescript'

export const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'monopoly',
  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};