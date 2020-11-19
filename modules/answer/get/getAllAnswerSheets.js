const Repository = require("../repository/repository");

module.exports = class GetAllAnswerSheets {
  constructor() {
    this.access = ["super_admin", "admin", "user"];
  }

  async handler(payload, user) {
    if (!user || !user.id) throw new Error("user is not defined");

    return new Repository().getAnswerSheetsByUser(user.id, {
      from: new Date(payload.from),
      until: new Date(payload.until),
    });
  }
};
