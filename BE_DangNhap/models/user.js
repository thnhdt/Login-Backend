'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class User extends Model {
    //helper methods
    // getFullName() {
    //     return `${this.firstName} ${this.lastName}`;
    // }
    static associate(models) {
      User.hasMany(models.Message, { foreignKey: 'sender' , as: 'Sender' });
    }
}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone_num: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize, // Kết nối đến database
    timestamps: true,
  });
  return User;
};

// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
//   host: "db.disswnqpbzsaxxybflxo.supabase.co",
//   dialect: "postgres",
//   port: 5432,
//   logging: false,
// });

// const User = sequelize.define("User", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
//   address: {
//     type: DataTypes.STRING,
//   },
//   phone_num: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//   },
// },{
//     timestamps: true,  // Tự động thêm `createdAt` và `updatedAt`
// });

// sequelize.sync({alter: true});

// module.exports = User;



// async function createUser() {
//   await User.create({
//     name: "Nguyễn Văn A",
//     email: "nguyenvana@example.com",
//   });
// }

// createUser();


// async function getUsers() {
//   const users = await User.findAll();
//   console.log(users);
// }

// getUsers();

// module.exports = User;

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.sequelize.transaction(t => {
//       return Promise.all([
//         queryInterface.addColumn(
//           'Person',
//           'petName',
//           {
//             type: Sequelize.DataTypes.STRING,
//           },
//           { transaction: t },
//         ),
//         queryInterface.addColumn(
//           'Person',
//           'favoriteColor',
//           {
//             type: Sequelize.DataTypes.STRING,
//           },
//           { transaction: t },
//         ),
//       ]);
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.sequelize.transaction(t => {
//       return Promise.all([
//         queryInterface.removeColumn('Person', 'petName', { transaction: t }),
//         queryInterface.removeColumn('Person', 'favoriteColor', {
//           transaction: t,
//         }),
//       ]);
//     });
//   },
// };