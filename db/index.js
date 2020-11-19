const {sequelize, Sequelize} = require('../config/sequelize');
const Op = Sequelize.Op;

// requiring data modles
const Session = require('./models/Session');
const Answer = require('./models/Answer');
const AnswerSheet = require('./models/AnswerSheet');
const Patient = require('./models/Patient');
const Person = require('./models/Person');
const Question = require('./models/Question');
const Questionnaire = require('./models/Questionnaire');
const User = require('./models/User');
const Inbox = require('./models/Inbox');
const Blog = require('./models/Blog');

const dbModels = [Answer, AnswerSheet, Patient, Person, Question, Questionnaire, User, Inbox, Blog, Session];

// initializing database
dbModels.forEach(model => {
  if (model.model) model.initialize(sequelize);
});

// initializing relation
dbModels.forEach(model => {
  if (model.model) model.initialize_relation();
})

sequelize.sync({force: false})
.then(() => {
  console.log('database syncing...');
});

module.exports = {
  sequelize,
  Op,
  Answer: sequelize.models['answers'],
  AnswerSheet: sequelize.models['answer_sheets'],
  Patient: sequelize.models['patients'],
  Person: sequelize.models['persons'],
  Question: sequelize.models['questions'],
  Questionnaire: sequelize.models['questionnaires'],
  User: sequelize.models['user'],
  Inbox: sequelize.models['inbox'],
  Blog: sequelize.models['blog'],
};