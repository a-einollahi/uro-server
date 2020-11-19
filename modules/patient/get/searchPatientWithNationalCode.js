const Repository = require('../repository/repository');

module.exports = class SearchPatientWithNationalCode {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    
    if (!payload.national_code) throw new Error('payload is not defined');
    
    return new Repository().getPatientWithNationalCode(payload.national_code);
  }

}
