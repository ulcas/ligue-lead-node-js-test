import { Project, ProjectRepo, Task } from '../models/index.js';

export const projectRepository = {
    async create(data) {
        return Project.create(data);
    },

    async findAll() {
        return Project.findAll({
            include: [
                { model: Task, as: 'tasks' },
                { model: ProjectRepo, as: 'repos' }
            ]
        });
    },

    async findById(id) {
        return Project.findByPk(id,{
            include: [
                { model: Task, as: 'tasks' },
                { model: ProjectRepo, as: 'repos' }
            ]
        });
    },

    async update(id, data) {
        const project = await Project.findByPk(id);
        if (!project) return null;
        return project.update(data);
    },

    async delete(id) {
        const project = await Project.findByPk(id);
        if (!project) return null;
        await project.destroy();
        return true;
    }
};