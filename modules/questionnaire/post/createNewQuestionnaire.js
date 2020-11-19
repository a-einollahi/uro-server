const Repository = require('../repository/repository');

module.exports = class CreateNewQuestionnaire {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    if (!payload) throw new Error('payload is not defined');
    if (!payload.title) throw new Error('title is not defined');
    if (!payload.questions) throw new Error('questions is not defined');

    const questionnaire_id = await new Repository().createQuestionnaire({
      questionnaire_title: payload.title,
      questionnaire_desc: payload.description 
    }, user.id);

    if (!questionnaire_id) throw new Error('error occurred during creating questionnaire');

    payload.questions.forEach(async question => {
      
      const question_options = {
        questionnaire_id,
        position: question.no,
        question_title: question.question_title || null,
        question_type: question.question_type,
        options: []
      }
        
      if (Object.values(question).length > 3) { 
        question_options.options.push(...Object.values(question).filter((el, index) => index > 2));
      }

      await new Repository().createQuestion(question_options, user.id);
    });
  }
}
