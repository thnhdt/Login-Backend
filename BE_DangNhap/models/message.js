'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class Message extends Model {
    //helper methods
    // getFullName() {
    //     return `${this.firstName} ${this.lastName}`;
    // }
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: 'sender', as: 'Sent'
      });
    }
}
Message.init({
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },{
        sequelize,
        timestamps: true,  // Tự động thêm `createdAt` và `updatedAt`
    });
  return Message;
};