const Repository = require('../repository/repository');

module.exports = class CreateContent {
  
  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {

    if (!payload || !payload.header || !payload.p1)
        throw new Error('paylaod is not defined');

    return new Repository().createContent(payload.header, payload.p1, payload.p2, payload.ref, payload.description);
  }
}