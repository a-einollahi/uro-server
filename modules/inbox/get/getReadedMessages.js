const Repository = require('../repository/repository');

module.exports = class GetReadedMessages {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {

    if (!user || !user.id)
      throw new Error('user is not defined');
    
    return new Repository().getReadedMessages();
  }
}