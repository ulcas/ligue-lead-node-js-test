import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Project extends Model {}

    Project.init(
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
            }
        },
        {
            sequelize,
            modelName: 'Project',
            tableName: 'projects'
        }
    );

    return Project;
};