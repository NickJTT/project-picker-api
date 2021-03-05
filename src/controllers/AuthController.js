import UsersService from '../services/UsersService';

export default class AuthController {
  static register = async(username, password) => {
    return await UsersService.register(username, password);
  }

  static login = async(username, password) => {
    return await UsersService.login(username, password);
  }
}
