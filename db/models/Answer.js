const {Sequelize} = require('../../config/sequelize');

let Answer;

const initialize = sequelize => {
  Answer = sequelize.define('answers', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    value: {
      type: Sequelize.JSON,
      allowNull: false
    }
  }, {
    tableName: 'answers',
    timestamps: false,
    underscored: true
  });
};

const initialize_relation = () => {
  const AnswerSheet = require('./AnswerSheet');
  const Question = require('./Question');

  Answer.belongsTo(AnswerSheet.model(), {foreignKey:'answer_sheet_id'});
  Answer.belongsTo(Question.model(), {foreignKey:'question_id'});
};

module.exports = {
  model: () => Answer,
  initialize,
  initialize_relation
};