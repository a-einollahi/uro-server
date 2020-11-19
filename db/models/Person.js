const { Sequelize } = require("../../config/sequelize");

let Person;

const initialize = (sequelize) => {
  Person = sequelize.define(
    "persons",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      gender: {
        type: Sequelize.STRING,
      },
      national_code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      speciality: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medical_number: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      hospital: Sequelize.STRING,
      hospital_phone: Sequelize.JSON,
      hospital_address: Sequelize.STRING,
      office_phone: Sequelize.JSON,
      office_address: Sequelize.STRING,
      mobile: Sequelize.JSON,
      is_faculty: Sequelize.BOOLEAN,
      university: Sequelize.STRING,
      university_grade: Sequelize.STRING,
      avtar_url: Sequelize.STRING,
    },
    {
      tableName: "persons",
      timestamps: false,
      underscored: true,
    }
  );
};

const initialize_relation = () => {
  const User = require("./User");

  Person.belongsTo(User.model(), { foreignKey: "user_id" });
};

module.exports = {
  model: () => Person,
  initialize,
  initialize_relation,
};
