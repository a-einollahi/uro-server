const Repository = require('../repository/repository');

module.exports = class DeleteQuestion {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {    
    if (!payload) throw new Error('payload is not defined');
    
    const foundQuestion = await new Repository().getQuestionById(payload);

    if (!foundQuestion) throw new Error('question is not found or deleted before');

    return new Repository().deleteQuestion(payload);
  }
  
}