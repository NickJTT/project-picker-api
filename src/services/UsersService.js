import User from '../models/User';
import jwtGenerator from '../utils/jwtGenerator';
import passwordEncryptor from '../utils/passwordEncryptor';
import passwordComparator from '../utils/passwordComparator';

export default class UsersService {
  static selectById = async id => {
    return await User.findByPk(id);
  }

  static selectByUsername = async username => {
    return await User.findOne({ where: { username } });
  }

  static userExist = async username => {
    return await this.selectByUsername(username) ? true : false;
  }

  static insert = async (username, password) => {
    return await User.create({ username, password });
  }

  static register = async (username, password) => {
    if (await this.userExist(username))
      return '';
    password = await passwordEncryptor(password);
    const user = await this.insert(username, password);
    return jwtGenerator(user.id);
  }

  static login = async (username, password) => {
    if (await this.userExist(username)) {
      const user = await this.selectByUsername(username);
      if (await passwordComparator(password, user.password))
        return jwtGenerator(user.id);
      return '';
    }
    return '';
  }

  static updateUsername = async (id, username) => {
    if (await this.userExist(username)) {
      const message = `User with username "${ username }" exists!`;
      console.error(message);
      return false;
    }
    const user = await this.selectById(id);
    user.username = username;
    await user.save();
    return true;
  }

  static updatePassword = async (id, password) => {
    const user = await this.selectById(id);
    if(user) {
      user.password = password;
      await user.save();
      return true;
    }
    return false;
  }

  static delete = async id => {
    const user = await this.selectById(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
};
