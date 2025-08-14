'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('projects', {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
            title: {type: Sequelize.STRING, allowNull: false},
            description: {type: Sequelize.TEXT, allowNull: true},
            createdAt: {allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')},
            updatedAt: {allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW')}
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('projects');
    }
};
