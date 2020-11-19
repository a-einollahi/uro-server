const Repository = require('../repository/repository');

module.exports = class SendNewMessage {

  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {

    if (!user || !user.id)
      throw new Error('user is not defined');
      
    if (!payload?.title, !payload?.message)
      throw new Error('payload is not defined');
    
    return new Repository().sendNewMessage(payload.title, payload.message, user.id);
  }
}