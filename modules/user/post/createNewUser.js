const Repository = require("../repository/repository");
const errors = require("../../../utils/errorHandler");

module.exports = class CreateNewUser {
  constructor() {
    this.access = ["super_admin", "admin"];
  }

  async handler(payload, user) {
    if (!payload) throw new Error(errors.payloadIsNotDefined);
    if (
      !payload.username &&
      !payload.email &&
      !payload.password &&
      !payload.role &&
      !payload.gender &&
      !payload.speciality &&
      !payload.last_name &&
      !payload.medical_number
    )
      throw new Error(errors.payloadIsNotValid);

    const foundUser = await new Repository().findUserByUsernameOrEmail(
      payload.username,
      payload.email
    );

    if (foundUser) throw Error(errors.usernameAlreadyIsTaken);

    return new Repository().createNewUser(payload, true);
  }
};
