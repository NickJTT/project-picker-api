import ProjectsService from '../services/ProjectsService';

export default class ProjectsController {
  static insert = async (userId, name) => {
    return await ProjectsService.insert(userId, name);
  }

  static select = async (userId) => {
    return await ProjectsService.select(userId);
  }

  static selectById = async (userId, id) => {
    return await ProjectsService.selectById(userId, id);
  }

  static update = async (userId, id, name) => {
    return await ProjectsService.update(userId, id, name);
  }

  static delete = async(userId, id) => {
    return await ProjectsService.delete(userId, id);
  }
}
