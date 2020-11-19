const bcrypt = require("bcryptjs");
const { Op, Blog } = require("../../../db/index");

module.exports = class Repository {

  constructor() {}

  // get
  async getBlogContent() {
    return Blog.findOne({raw: true});
  }

  // post

  async createContent(header, p1, p2, ref, description) {
    let content = await this.getBlogContent();

    if (!content) return Blog.create({header, p1, p2, ref, description});
    return this.updateContent(content.id, header, p1, p2, ref, description);
  }

  async updateContent(id, header, p1, p2, ref, description) {
    return Blog.update({header, p1, p2, ref, description}, {where: {id}});
  }

};
