const Repository = require('../repository/repository');

module.exports = class ChangePassword {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    if (!user || !user.id) throw new Error('user is not defined');
    if (!payload || !payload.id || !payload.password) throw new Error('payload is not defined');

    return new Repository().changePassword(payload.id, payload.password);

  }

}