const Repository = require('../repository/repository');

module.exports = class GetBlogContent {
  
  constructor() {
    this.access = 'all';
  }

  async handler(payload, user) {
    return new Repository().getBlogContent();
  }
}