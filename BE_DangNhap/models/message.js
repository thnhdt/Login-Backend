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
      Message.belongsTo(models.User, {
        foreignKey:'receiver', as: 'Received'
      });
    }
}
Message.init({
    sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
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