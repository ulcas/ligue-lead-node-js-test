import { ProjectRepo } from '../models/index.js';

export const projectRepoRepository = {
    async bulkCreate(projectId, repos) {
        return ProjectRepo.bulkCreate(repos.map(r => ({ ...r, projectId })));
    }
};