const bcrypt = require("bcryptjs");
const { Op, Questionnaire, Question, AnswerSheet, Answer, Patient, User, Person } = require("../../../db/index");

module.exports = class Repository {
  // get

  async getQuestionsOfQuestionnaire(questionnaire_id) {
    return Questionnaire.findOne({
      order: [[{model: Question, as: 'questions'}, 'position', 'ASC']],
      where: {id: questionnaire_id},
      include: [{
        model: Question,
        required: true
      }]
    });
  }

  async getEachQuestionReport(question_id) {
    return Question.findOne({
      where: {id: question_id},
      include: [{
        model: Answer,
        required: true,
        include: [{
          model: AnswerSheet,
          required: true,
          include: [{
            model: Patient,
            required: true
          }]
        }]
      }]
    })
  }
  
};
