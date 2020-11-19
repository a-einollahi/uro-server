const Repository = require("../repository/repository");

module.exports = class EditPatient {
  constructor() {
    this.access = ["super_admin", "admin"];
  }

  async handler(payload, user) {
    if ((!payload, !payload.value, !payload.value.gender))
      throw new Error("payload is not defined");
    if ((!payload.value.first_name, !payload.value.last_name))
      throw new Error("name is not correctly defined");
    if (!payload.value.national_code)
      throw new Error("national code is not defined");
    if (!payload.value.birthday) throw new Error("birth date is not defined");

    return new Repository().updatePatient(
      {
        gender: payload.value.gender,
        national_code: payload.value.national_code,
        first_name: payload.value.first_name,
        last_name: payload.value.last_name,
        birthday: payload.value.birthday,
        mobile: payload.value.mobile,
        state: payload.value.state,
        city: payload.value.city,
      },
      payload.id
    );
  }
};
