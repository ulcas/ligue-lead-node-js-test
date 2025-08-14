import { projectRepository } from '../repositories/projectRepository.js';
import { projectRepoRepository } from "../repositories/projectRepoRepository.js";
import ApiError from '../utils/ApiError.js';
import axios from "axios";

export const projectService = {
    async create(dto) {
        if (!dto?.title) throw new ApiError(400, 'title é obrigatório');

        return projectRepository.create({ title: dto.title, description: dto.description ?? null });
    },

    async list() {
        return projectRepository.findAll();
    },

    async get(id) {
        const project = await projectRepository.findById(id);
        if (!project) throw new ApiError(404, 'Projeto não encontrado');

        return project;
    },

    async update(id, dto) {
        const updated = await projectRepository.update(id, dto);
        if (!updated) throw new ApiError(404, 'Projeto não encontrado');

        return updated;
    },

    async remove(id) {
        const ok = await projectRepository.delete(id);
        if (!ok) throw new ApiError(404, 'Projeto não encontrado');

        return { message: 'Projeto deletado com sucesso' };
    },

    async fetchGithubRepos(projectId, username) {
        const project = await projectRepository.findById(projectId);
        if (!project) throw new ApiError(404, 'Projeto não encontrado');

        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`,
                { params: { per_page: 5, sort: 'created' }
            });

            const repos = response.data.map(repo => ({
                repoName: repo.name,
                repoUrl: repo.html_url
            }));

            await projectRepoRepository.bulkCreate(projectId, repos);

            return repos;
        } catch (err) {

            throw new ApiError(500, err);
        }
    }
};