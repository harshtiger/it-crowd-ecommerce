const { DataTypes } = require("sequelize");
// We first export a function that defines the model
// then, sequelize connection is injected
module.exports = (sequelize) => {
  sequelize.define("Brand", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
        },
  });
};