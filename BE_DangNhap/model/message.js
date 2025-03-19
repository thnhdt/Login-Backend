const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
    host: "db.disswnqpbzsaxxybflxo.supabase.co",
    dialect: "postgres",
    port: 5432,
    logging: false,
  });

const Message = sequelize.define("Message", {
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        required: true,
    },
},{
    timestamps: true,  // Tự động thêm `createdAt` và `updatedAt`
});

sequelize.sync({alter: true});

module.exports = Message;