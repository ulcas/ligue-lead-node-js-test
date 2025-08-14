import { Task } from '../models/index.js';

export const taskRepository = {
    async createForProject(projectId, data) {
        return Task.create({ ...data, projectId });
    },

    async findById(id) {
        return Task.findByPk(id);
    },

    async update(id, data) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        return task.update(data);
    },

    async delete(id) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        await task.destroy();
        return true;
    }
};