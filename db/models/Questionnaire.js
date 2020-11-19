const {Sequelize} = require('../../config/sequelize');

let Questionnaire;

const initialize = sequelize => {
  Questionnaire = sequelize.define('questionnaires', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    questionnaire_title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    questionnaire_desc: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'questionnaires',
    timestamps: true,
    underscored: true,
  });
};

const initialize_relation = () => {
  const User = require('./User');
  const Question = require('./Question');
  const AnswerSheet = require('./AnswerSheet');

  Questionnaire.belongsTo(User.model(), {foreignKey:'user_id'});
  Questionnaire.hasMany(Question.model(), {foreignKey:'questionnaire_id', delete: 'CASCADED'});
  Questionnaire.hasMany(AnswerSheet.model(), {foreignKey:'questionnaire_id'});
};

module.exports = {
  model: () => Questionnaire,
  initialize,
  initialize_relation
};