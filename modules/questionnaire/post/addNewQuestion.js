const Repository = require('../repository/repository');

module.exports = class AddNewQuestion {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {

    if (!payload || !payload.questionnaireId || !payload.questionTitle || !payload.questionType || !payload.questionNumber)
      throw new Error('payload is not defined');

    if(!user)
      throw new Error('user is not defined');

    return new Repository().addNewQuestion(payload.questionTitle, payload.questionType, payload.questionNumber, payload.questionOptions, user.id, payload.questionnaireId);
  }
}