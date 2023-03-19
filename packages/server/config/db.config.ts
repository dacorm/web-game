import type { SequelizeOptions } from 'sequelize-typescript';

export const getSequelizeOptions = (host: string, port: number, username: string, password: string, database:string) : SequelizeOptions => ({
    host,
    port,
    username,
    password,
    database,
    dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
});
