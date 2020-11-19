const {Sequelize} = require('../../config/sequelize');

let AnswerSheet;

const initialize = sequelize => {
  AnswerSheet = sequelize.define('answer_sheets', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    }
  }, {
    tableName: 'answer_sheets',
    timestamps: true,
    underscored: true
  });
};

const initialize_relation = () => {
  const User = require('./User');
  const Patient = require('./Patient');
  const Answer = require('./Answer');
  const Questionnaire = require('./Questionnaire');

  AnswerSheet.belongsTo(User.model(), {foreignKey:'user_id'});
  AnswerSheet.belongsTo(Patient.model(), {foreignKey:'patient_id'});
  AnswerSheet.belongsTo(Questionnaire.model(), {foreignKey:'questionnaire_id'});
  AnswerSheet.hasMany(Answer.model(), {foreignKey:'answer_sheet_id'});
};

module.exports = {
  model: () => AnswerSheet,
  initialize,
  initialize_relation
};