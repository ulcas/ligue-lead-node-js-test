'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'projects', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            title: {type: Sequelize.STRING, allowNull: false},
            description: {type: Sequelize.TEXT, allowNull: true},
            status: {type: Sequelize.ENUM('pendente', 'em_andamento', 'concluido'), defaultValue: 'pendente'},
            createdAt: {allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
            updatedAt: {allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')}
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('tasks');
    }
};
