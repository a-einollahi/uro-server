const Repository = require('../repository/repository');

module.exports = class GetQuestionnaireOverview {
  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload) {
    if (!payload || !payload.id) throw new Error('payload is not found');

    return new Repository().getQuestionnaireOverview(payload.id);
  }
}