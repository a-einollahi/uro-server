const Repository = require('../repository/repository');

module.exports = class GetAllMessages {

  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {

    if (!user || !user.id)
      throw new Error('user is not defined');
    
    return new Repository().getAllMessages(user.id);
  }
}