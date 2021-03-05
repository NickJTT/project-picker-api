import { DataTypes } from 'sequelize';
import sequelize from '../database';

export default sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(128), allowNull: false }
});
