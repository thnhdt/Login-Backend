const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
  host: "db.disswnqpbzsaxxybflxo.supabase.co",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

const User = sequelize.define("User", {
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
},{
    timestamps: true,  // Tự động thêm `createdAt` và `updatedAt`
});

sequelize.sync({alter: true});

module.exports = User;

// class User extends Model {
//     getFullName() {
//         return `${this.firstName} ${this.lastName}`;
//       }
// }

// User.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
// }, {
//   sequelize, // Kết nối đến database
//   modelName: "User", // Tên Model
//   timestamps: true,
// });



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