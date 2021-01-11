const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("journal", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});
async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
authenticate();
module.exports = sequelize;
