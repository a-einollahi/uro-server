const Repository = require('../repository/repository');

module.exports = class DeleteQuestionnaire {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    
    if (!payload || !payload.id) throw new Error('payload is not defined');
    
    const questionCount = await new Repository().getQuestionnaireById(payload.id);

    if (questionCount.questions && questionCount.questions.length)
      throw new Error('questionnaire contains some questions and connot be deleted');
    
    return new Repository().deleteQuestionnaire(payload.id);
  }
  
}