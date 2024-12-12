const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const usersData = [
      {
        name: 'user1',
        email: '1@1.com',
        password: await bcrypt.hash('321', 10),
        phone: '89519805480',
        role:'user'
      },
      {
        name: 'user2',
        email: '2@2.com',
        password: await bcrypt.hash('123', 10),
        phone: '89519805480',
        role:'user'
      },
      {
        name: 'Admin',
        email: 'admin@admin.ru',
        password: await bcrypt.hash('123123123', 10),
        phone: '89519805480',
        role:'admin'
      },
    ]
    const users = usersData.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert("Users", users);
  },

  async down (queryInterface) {
 await queryInterface.bulkDelete("Users")
  }
};

 
