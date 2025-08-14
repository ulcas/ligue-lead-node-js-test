import { projectService } from '../services/projectService.js';

export const projectController = {
    create: async (req, res, next) => {
        try {
            const data = await projectService.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const data = await projectService.list();
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const data = await projectService.get(req.params.id);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await projectService.update(req.params.id, req.body);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        try {
            const data = await projectService.remove(req.params.id);
            res.json(data);
        } catch (err) {
            next(err);
        }
    },
    fetchGithub: async (req, res, next) => {
        try {
            const repos = await projectService.fetchGithubRepos(req.params.id, req.params.username);
            res.json(repos);
        } catch (err) {
            next(err);
        }
    }
};