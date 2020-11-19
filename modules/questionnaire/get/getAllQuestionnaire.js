const Repository = require('../repository/repository');

module.exports = class GetAllQuestionnaire {

  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {
    return new Repository().getAllQuestionnaire();
  }
  
}