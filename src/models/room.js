"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.CourseSession, {
        foreignKey: "room_id",
        as: "roomToCourseSession",
      });

      Room.belongsTo(Model.Faculty, {
        foreignKey: "faculty_id",
        as: "roomToFaculty",
      });
    }
  }

  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faculty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Room",
      tableName: "rooms",
    },
  );

  return Room;
};
