const Repository = require('../repository/repository');

module.exports = class GetStatistics {

  constructor() {
    this.access = ['super_admin', 'admin'];
  }

  async handler(payload, user) {
    const repo = new Repository();
    const {adminCount, userCount} = await repo.getUserCount();
    const {malePatientCount, femalePatientCount} = await repo.getPatientCount();
    const {answerSheetsCount, latestAnswerSheetsCount} = await repo.getAnswerSheetCount();

    return {adminCount, userCount, malePatientCount, femalePatientCount, answerSheetsCount, latestAnswerSheetsCount};
  }
}