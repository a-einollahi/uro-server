const jwt = require("jsonwebtoken");

module.exports = class Authenticate {
  constructor() {
    this.access = "all";
  }

  async handler(payload, user) {
    try {
      const verification = jwt.verify(
        payload,
        "tokenFORauthenticationINtheSITE"
      );

      if (verification) return user;
      else return { id: null, username: null, role: null, first_seen: null };
    } catch (err) {
      return { id: null, username: null, role: null, first_seen: null };
    }
  }
};
