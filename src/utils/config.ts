import { config } from 'dotenv';
config();
import * as winston from 'winston';
const { combine, label, printf } = winston.format;

export const prefix: string[] = [
  'duke',
  'fish',
  'fishron',
  'df',
  'dukefishron',
];

export const owners: string[] = process.env.OWNER.split('_');

const loggerFormat = printf(({ level, message, label }) => {
  return `[${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(label({ label: 'LOGGER' }), loggerFormat),
  transports: [new winston.transports.Console()],
});

export const dbConfig = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
};
