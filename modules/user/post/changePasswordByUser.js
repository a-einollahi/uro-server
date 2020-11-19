const Repository = require('../repository/repository');

module.exports = class ChangePasswordByUser {

  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {
    if (!user || !user.id) throw new Error('user is not defined');
    if (!payload || !payload.password) throw new Error('payload is not defined');

    return new Repository().changePasswordByUser(user.id, payload.password);
  }

}