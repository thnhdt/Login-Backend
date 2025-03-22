// const io = require("socket.io-client");
// const socket = io("http://localhost:3000", { withCredentials: true });

// socket.on("connect", () => {
//     console.log("Connected to server:", socket.id);
//     socket.emit("message", "Hello from Node.js client 1!");
// });

// socket.on("message", (msg) => {
//     console.log("Received:", msg);
// });


const io = require("socket.io-client");
const socket = io("http://localhost:3000", { withCredentials: true });

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);
    socket.emit("message", "Hello from Node.js client 2!");
});

socket.on("message", (msg) => {
    console.log("Received:", msg);
});

socket.on('connect', function() {
    console.log('connected');
    // send join message
    socket.emit('join', JSON.stringify({}));
});
socket.on('connecting', function() {
    console.log('connecting');
});
socket.on('disconnect', function() {
    console.log('disconnect');
    intervalID = setInterval(tryReconnect, 4000);
});
socket.on('connect_failed', function() {
    console.log('connect_failed');
});
socket.on('error', function(err) {
    console.log('error: ' + err);
});
socket.on('reconnect_failed', function() {
    console.log('reconnect_failed');
});
socket.on('reconnect', function() {
    console.log('reconnected ');
});
socket.on('reconnecting', function() {
    console.log('reconnecting');
});


'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class User extends Model {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
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
  modelName: "User", // Tên Model
  timestamps: true,
});

return User;
};