"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SubjectPrerequisite extends Model {
    static associate(models) {
      SubjectPrerequisite.belongsTo(models.Subject, {
        foreignKey: "subject_id",
        as: "subject",
      });

      SubjectPrerequisite.belongsTo(models.Subject, {
        foreignKey: "prerequisite_subject_id",
        as: "prerequisite",
      });
    }
  }

  SubjectPrerequisite.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      prerequisite_subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "SubjectPrerequisite",
      tableName: "subject_prerequisites",
    },
  );

  return SubjectPrerequisite;
};
