import Project from '../models/Project';

export default class ProjectsService {
  static selectById = async (userId, id) => {
    const project = await Project.findByPk(id);
    if (project.userId === userId) {
      return project;
    }
  }

  static select = async userId => {
    return await Project.findAll({ where: { userId } });
  }

  static insert = async (userId, name) => {
    const project = await Project.create({ userId, name });
    return project.id;
  }

  static update = async (userId, id, name) => {
    const project = await this.selectById(userId, id);
    if (project) {
      project.name = name;
      await project.save();
      return true;
    }
    return false;
  }

  static delete = async (userId, id) => {
    const project = await this.selectById(userId, id);
    if (project) {
      await project.destroy();
      return true;
    }
    return false;
  }
};
