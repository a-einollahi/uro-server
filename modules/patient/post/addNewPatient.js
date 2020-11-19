const Repository = require('../repository/repository');

module.exports = class AddNewPatient {
  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {
    if (!payload, !payload.gender) throw new Error('payload is not defined');
    if (!payload.first_name, !payload.last_name) throw new Error('name is not correctly defined');
    if (!payload.national_code) throw new Error('national code is not defined');
    if (!payload.birthday) throw new Error('birth date is not defined');

    if (!user || !user.id) throw new Error('user is not defined');

    const foundPatient = await new Repository().getPatientWithNationalCode(payload.national_code);

    if (foundPatient) throw new Error("patient's national code already is exist");

    return new Repository().createPatient({
      gender: payload.gender,
      national_code: payload.national_code,
      first_name: payload.first_name,
      last_name: payload.last_name,
      birthday: payload.birthday,
      mobile: payload.mobile,
      state: payload.state,
      city: payload.city,
      registered_by: user.id
    });
  }
}
