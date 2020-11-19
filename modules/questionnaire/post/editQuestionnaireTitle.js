const Repository = require('../repository/repository');

module.exports = class EditQuestionnaireTitle {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    if (!payload || !payload.id) throw new Error('payload is not defined');
    if (!payload.title) throw new Error('title is not defined');
    if (!user || !user.id) throw new Error('user is not defined');
    
    return new Repository().editQuestionnaireTitle(payload.id, payload.title, user.id);
  }
  
}