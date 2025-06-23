import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
  },
  { sequelize, modelName: 'users', tableName: 'users', timestamps: false }
); 