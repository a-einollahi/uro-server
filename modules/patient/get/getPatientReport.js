const Repository = require("../repository/repository");

module.exports = class GetPatientReport {
  constructor() {
    this.access = ["super_admin", "admin", "user"];
  }

  async handler(paylaod, user) {
    if (!paylaod || !paylaod.national_code || !paylaod.questionnaire_id)
      throw new Error("payload is not defined.");

    const repo = new Repository();

    const patient = await repo.getPatientWithNationalCode(
      paylaod.national_code
    );

    return new Repository().getPatientReport(
      user.id,
      patient.id,
      paylaod.questionnaire_id,
      paylaod.search_by_date,
      paylaod.start_date,
      paylaod.end_date
    );
  }
};
