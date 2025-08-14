import { taskService } from '../services/taskService.js';

export const taskController = {
    create: async (req, res, next) => {
        try {
            const data = await taskService.create(req.params.projectId, req.body);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await taskService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        try {
            const data = await taskService.remove(req.params.id);
            res.json(data);
        } catch (err) {
            next(err);
        }
    }
};