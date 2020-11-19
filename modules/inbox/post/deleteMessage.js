const Repository = require('../repository/repository');

module.exports = class DeleteMessage {

  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {

    if (!user || !user.id)
      throw new Error('user is not defined');
      
      if (!payload?.id)
      throw new Error('payload is not defined');
      
    if (!['super_admin', 'admin'].includes(user.role)) {
        const foundMessage = await new Repository().getMessage(payload.id);
        if (foundMessage.user_id !== user.id) {
            throw new Error('you haven\'t the permission for deleting this message');
        }
    }
    
    return new Repository().deleteMessage(payload.id);
  }
}