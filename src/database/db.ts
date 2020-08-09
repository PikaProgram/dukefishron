import { dbConfig, logger } from '../utils/config';
import { Sequelize } from 'sequelize';
const { host, user, password, database } = dbConfig;

export const db = new Sequelize({
  dialect: 'mysql',
  username: user,
  password: password,
  host: host,
  database: database,
  logging: msg => logger.debug(msg),
});
