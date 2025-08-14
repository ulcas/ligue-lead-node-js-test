import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class ProjectRepo extends Model {}

    ProjectRepo.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            projectId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            repoName: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            repoUrl: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'ProjectRepo',
            tableName: 'project_repos'
        }
    );

    return ProjectRepo;
};
