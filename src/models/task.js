import { DataTypes, Model } from 'sequelize';

export const TaskStatus = {
    PENDING: 'pendente',
    IN_PROGRESS: 'em_andamento',
    DONE: 'concluido'
};

export default (sequelize) => {
    class Task extends Model {}

    Task.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM(...Object.values(TaskStatus)),
                allowNull: false,
                defaultValue: TaskStatus.PENDING
            }
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'tasks'
        }
    );

    return Task;
};