const express = require('express');
const cors = require('cors');
const session = require('express-session');
// Initial

//socket io-http server + redis
const { createServer } = require("http");

// const auth = require('./routes/auth');
// const register = require('./routes/register');
// const info = require('./routes/info');
// const send = require('./routes/send');
// const receive = require('./routes/receive');
const dotenv = require('dotenv');
// const connectDB = require('./model/db');
dotenv.config();
const PORT = process.env.PORT || 3001;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
  host: "db.disswnqpbzsaxxybflxo.supabase.co",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

(async () => {
  try {
      await sequelize.authenticate();
      console.log("✅ Kết nối thành công!");
  } catch (error) {
      console.error("❌ Lỗi kết nối:", error);
  }
})();

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true
}));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(express.json());

// app.use('/api/login', auth);
// app.use('/api/register', register);
// app.use('/api/info', info);
// app.use('/api/send', send);
// app.use('/api/receive', receive);

app.get('/', (req, res) => {
    res.send("ReactJS + ExpressJS + MongoDB");
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
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
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone_num: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },{
      timestamps: true,  // Tự động thêm `createdAt` và `updatedAt`
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

  async function createUser() {
    await User.findOrCreate({
      where: { username: "nguyenvana" },
      defaults: {
        name: "Nguyễn Văn A",
        password: "abc",
        email: "nguyenvana@example.com",
      },
    });
  }

(async () => {
    await sequelize.sync({ force: true });
    console.log("✅ Database reset thành công!");
    await createUser(); // Chạy sau khi sync hoàn tất
})();


// async function getUsers() {
//   const users = await User.findAll();
//   console.log(users);
// }

// getUsers();