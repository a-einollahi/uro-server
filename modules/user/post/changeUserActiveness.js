const Repository = require("../repository/repository");

module.exports = class ChangeUserActiveness {
  constructor() {
    this.access = ["super_admin", "admin"];
  }

  async handler(payload, user) {
    if (!payload || !payload.id || payload.status === null)
      throw new Error("payload is not defined");

    return new Repository().changeUserActiveness(payload.id, payload.status);
  }
};
