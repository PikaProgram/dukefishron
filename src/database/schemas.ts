import { db } from './db';
import { DataTypes } from 'sequelize/types';

// TODO: Design A Database + Schemas

const User = db.define('User', {
	userID: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	ownedCash: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});
