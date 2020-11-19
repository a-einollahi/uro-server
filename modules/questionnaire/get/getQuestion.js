const Repository = require('../repository/repository');

module.exports = class GetQuestion {
  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload) {
    if (!payload) throw new Error('payload is not found');

    return new Repository().getQuestionById(payload);
  }
}