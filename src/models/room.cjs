"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.CourseSection, {
        foreignKey: "room_id",
        as: "roomToCourseSection",
      });

      Room.belongsTo(models.Faculty, {
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
