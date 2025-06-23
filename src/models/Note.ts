import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

export class Note extends Model {}

Note.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    url: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
  },
  { sequelize, modelName: 'notes', tableName: 'notes', timestamps: false }
); 