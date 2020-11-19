const Repository = require('../repository/repository');

module.exports = class GetQuestionnaireById {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    
    if (!payload.id) throw new Error('payload is not defined');
    
    return new Repository().getQuestionnaireById(payload.id);
  }
  
}