const Repository = require('../repository/repository');

module.exports = class SendResponse {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {

    if (!user || !user.id)
      throw new Error('user is not defined');
      
    if (!payload?.id, !payload?.status)
      throw new Error('payload is not defined');
    
    return new Repository().updateRespone(payload.id, payload.status, user.response);
  }
}