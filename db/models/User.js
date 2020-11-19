const {Sequelize} = require('../../config/sequelize');

let User;

const initialize = sequelize => {
  User = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    register_date: {
      type: Sequelize.DATE
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    first_seen: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });
}

const initialize_relation = () => {
  const Patient = require('./Patient');
  const Person = require('./Person');
  const AnswerSheet = require('./AnswerSheet');
  const Questionnaire = require('./Questionnaire');
  const Question = require('./Question');
  const Inbox = require('./Inbox');

  User.hasOne(Person.model(), {foreignKey:'user_id'});
  User.hasMany(Patient.model(), {foreignKey:'registered_by'});
  User.hasMany(AnswerSheet.model(), {foreignKey:'user_id'});
  User.hasMany(Questionnaire.model(), {foreignKey:'user_id'});
  User.hasMany(Question.model(), {foreignKey:'user_id'});
  User.hasMany(Inbox.model(), {foreignKey:'user_id'});
}

module.exports = {
  model: () => User,
  initialize,
  initialize_relation
}