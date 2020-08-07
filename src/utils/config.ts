import { config } from 'dotenv';
config();
import * as winston from 'winston';
const { combine, splat, label, printf } = winston.format;

export const prefix: string[] = [
	'duke',
	'fish',
	'fishron',
	'df',
	'dukefishron',
];

export const owners: string | string[] = ['695418626987130900'];

const loggerFormat = printf(({ level, message, label }) => {
	return `[${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
	format: combine(label({ label: 'LOGGER' }), loggerFormat),
	transports: [new winston.transports.Console()],
});

export const dbConfig = {
	host: 'localhost',
	user: 'dukefish',
	password: process.env.DBPASS,
	database: 'dukefish',
};
