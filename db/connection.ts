import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const userdb: string = process.env.USER_DB || '';
const password: string = process.env.USER_DB_PASSWORD || '';
const database: string = process.env.DATABASE_NAME || '';
const databaseHost: string = process.env.DATABASE_HOST || '';
const databasePort: number = +process.env.DATABASE_PORT! || 3306;

const db = new Sequelize(database, userdb, password, {
    host: databaseHost,
    dialect: 'mysql',
    port: databasePort
});

export default db;