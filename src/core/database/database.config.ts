import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interface/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  },
};
