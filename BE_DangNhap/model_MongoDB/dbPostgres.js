const { Sequelize } = require("sequelize");

// const dotenv = require("dotenv");
// dotenv.config();
// console.log(process.env.POSTGRES_URI);
// const sequelize = new Sequelize(process.env.POSTGRES_URI);
const sequelize = new Sequelize("postgres", "postgres", "thnhdt", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Kết nối thành công!");
    } catch (error) {
        console.error("❌ Lỗi kết nối:", error);
    }
};

//models
//
//migrate models

module.exports = connectDB