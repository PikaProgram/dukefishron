import { DataTypes, Model } from 'sequelize';
import { db } from './db';

const { STRING, INTEGER } = DataTypes;

// TODO: Design A Database + Schemas

export class User extends Model {}
export class Items extends Model {}

/*
 * ID: User's Discord ID.
 * Cash: User's Current Cash.
 * lifetimeEarning: User's Lifetime Earning.
 * items: Items Owned By A User
 */

User.init(
  {
    id: {
      type: STRING,
      allowNull: false,
      primaryKey: true,
    },
    cash: {
      type: INTEGER,
      defaultValue: 0,
    },
    lifetimeEarning: {
      type: INTEGER,
      defaultValue: 0,
    },
    items: {
      type: INTEGER,
      references: 'Items',
    },
  },
  { sequelize: db, modelName: 'User' }
);

/*
 * ID: Items ID, Auto Incremented Per Item.
 * Name: The Item's Name.
 * Price: The Item Price.
 */

Items.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
  },

  { sequelize: db, modelName: 'Items' }
);
