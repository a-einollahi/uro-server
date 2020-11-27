const Repository = require('../reository/repository');

module.exports = class GetReport {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    
    if (!payload && !payload.questionnaire_id)
			throw new Error('payload is not defined');

		return new Repository().getQuestionnaireReport(payload.questionnaire_id);
  }
}