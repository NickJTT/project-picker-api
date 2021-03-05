import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import options from '../../config/config.json';

config();

const MODE = process.env.NODE_ENV || 'development';
const OPTIONS = options[MODE] || options['development'];
const sequelize = new Sequelize(OPTIONS);

export default sequelize;
