import type { SequelizeOptions } from 'sequelize-typescript'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env
console.log(POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT)
console.log(process.env)
export const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '12345',
  database: 'monopoly',
  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql'
};