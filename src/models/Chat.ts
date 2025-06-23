import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

export class Chat extends Model {}

Chat.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    prompt: { type: DataTypes.TEXT },
    model: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
  },
  { sequelize, modelName: 'chats', tableName: 'chats', timestamps: false }
); 