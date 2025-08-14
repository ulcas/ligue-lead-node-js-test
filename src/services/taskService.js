import { projectRepository } from '../repositories/projectRepository.js';
import { taskRepository } from '../repositories/taskRepository.js';
import { TaskStatus } from '../models/task.js';
import ApiError from '../utils/ApiError.js';

const isValidStatus = (status) => Object.values(TaskStatus).includes(status);

export const taskService = {
    async create(projectId, dto) {
        if (!dto?.title) throw new ApiError(400, 'title é obrigatório');

        const status = dto.status ?? TaskStatus.PENDING;
        if (!isValidStatus(status))
            throw new ApiError(
                400,
                `O status fornecido não é válido. Status permitidos: ${Object.values(TaskStatus).join(', ')}`
            );

        const project = await projectRepository.findById(projectId);
        if (!project) throw new ApiError(404, 'Projeto não encontrado');

        return taskRepository.createForProject(projectId, {
            title: dto.title,
            description: dto.description ?? null,
            status
        });
    },

    async update(id, dto) {
        if (dto.status && !isValidStatus(dto.status)) {
            throw new ApiError(
                400,
                `O status fornecido não é válido. Status permitidos: ${Object.values(TaskStatus).join(', ')}`
            );
        }

        const updated = await taskRepository.update(id, dto);
        if (!updated) throw new ApiError(404, 'Tarefa não encontrada');

        return updated;
    },

    async remove(id) {
        const ok = await taskRepository.delete(id);
        if (!ok) throw new ApiError(404, 'Tarefa não encontrada');

        return {message: 'Tarefa deletada com sucesso'};
    }
};