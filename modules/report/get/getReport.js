const Repository = require('../reository/repository');

module.exports = class GetReport {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    
    if (!payload && !payload.questionnaire_id)
			throw new Error('payload is not defined');

		const repo = new Repository();
		const questions = (await repo.getQuestionsOfQuestionnaire(payload.questionnaire_id))?.questions.map(q => q.id);

		const res = [];
		for (let i of questions) {
			res.push(await repo.getEachQuestionReport(i));
			console.log(i);
		}

		return res;
		return repo.getEachQuestionReport(questions[0]);
		return questions;
    // return new Repository().getAllUsers(searchByName);
  }
}