const { Sequelize } = require("../../config/sequelize");

let Question;

const initialize = (sequelize) => {
  Question = sequelize.define(
    "questions",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "questions",
      timestamps: true,
      underscored: true,
    }
  );
};

const initialize_relation = () => {
  const User = require("./User");
  const Questionnaire = require("./Questionnaire");
  const Answer = require("./Answer");

  Question.belongsTo(User.model(), { foreignKey: "user_id" });
  Question.belongsTo(Questionnaire.model(), {
    foreignKey: "questionnaire_id",
    delete: "CASCADED",
  });
  Question.hasMany(Answer.model(), { foreignKey: "question_id" });
};

module.exports = {
  model: () => Question,
  initialize,
  initialize_relation,
};
