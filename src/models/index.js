import { sequelize } from '../config/database.js';
import makeProject from './project.js';
import makeTask from './task.js';
import makeProjectRepo from './projectRepo.js';

const Project = makeProject(sequelize);
const Task = makeTask(sequelize);
const ProjectRepo = makeProjectRepo(sequelize);

Project.hasMany(Task, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    as: 'tasks'
});
Project.hasMany(ProjectRepo, {
    foreignKey: 'projectId',
    as: 'repos',
    onDelete: 'CASCADE'
});
Task.belongsTo(Project, {
    foreignKey: {
        name: 'projectId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    as: 'project'
});
ProjectRepo.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
});

export { sequelize, Project, Task, ProjectRepo };