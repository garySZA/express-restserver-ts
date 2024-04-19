import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const userdb: string = process.env.USER_DB || '';
const password: string = process.env.USER_DB_PASSWORD || '';

const db = new Sequelize('node', userdb, password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default db;