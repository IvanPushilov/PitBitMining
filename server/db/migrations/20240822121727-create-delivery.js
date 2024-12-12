'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deliveries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      middle_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      last_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      address: { // Исправлено: 'adress' на 'address'
        allowNull: false,
        type: Sequelize.TEXT,
      },
      city: { // Новое поле для города
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phone: { // Новое поле для номера телефона
        allowNull: false,
        type: Sequelize.TEXT,
      },
      passport: { // Новое поле для паспортных данных
        allowNull: false,
        type: Sequelize.TEXT,
      },
      inn: { // Новое поле для ИНН (может быть пустым)
        allowNull: true,
        type: Sequelize.TEXT,
      },
      company_name: { // Новое поле для наименования компании
        allowNull: true,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      delivery_method: { // Новое поле для способа доставки
        allowNull: false,
        type: Sequelize.ENUM('delivery', 'pickup'),
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Deliveries');
  },
};
