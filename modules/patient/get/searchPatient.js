const Repository = require("../repository/repository");

module.exports = class SearchPatient {
  constructor() {
    this.access = ["super_admin", "admin", "user"];
  }

  async handler(payload, user) {
    if (!payload || (!payload.national_code && !payload.last_name))
      throw new Error("payload is not defined");

    return new Repository().searchPatient(
      payload.national_code,
      payload.last_name
    );
  }
};
