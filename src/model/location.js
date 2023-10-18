const Sequelize = require("sequelize");
const database = require("../database/db");
const location = database.define(
  "location",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    titulo: { type: Sequelize.STRING },
    tipo: { type: Sequelize.STRING },
    data: { type: Sequelize.STRING },
    hora: { type: Sequelize.STRING },
    cordenada: { type: Sequelize.GEOMETRY, allowNull: false },
  },
  { timestamps: false, createdAt: false, updatedAt: false }
);
module.exports = location;
