import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.SUPABASE_DB || '', // строка подключения Supabase
  {
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize; 