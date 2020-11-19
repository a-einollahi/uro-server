const Repository = require('../repository/repository');

module.exports = class GetAllUsers {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    let searchByName = false;
    if (payload) searchByName = true;

    return new Repository().getAllUsers(searchByName);
  }
}