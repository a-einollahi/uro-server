const Repository = require('../repository/repository');

module.exports = class GetUser {
  
  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    if (!payload || !payload.id) throw new Error('payload is not defined');

    return new Repository().findUserById(payload.id);

  }
}