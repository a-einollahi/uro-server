const {Op, User, Patient, AnswerSheet} = require('../../../db/index');
const moment = require('moment');

module.exports = class Repository {

  // get
  async getUserCount() {
    const adminCount = await User.count({where: {role: 'admin'}});
    const userCount = await User.count({where: {role: 'user'}});

    return {adminCount, userCount};
  }

  async getAnswerSheetCount() {
    const answerSheetsCount = await AnswerSheet.count();
    const latestAnswerSheetsCount = await AnswerSheet.count({where: {created_at: {[Op.gte]: moment().subtract(7, 'days')}}});

    return {answerSheetsCount, latestAnswerSheetsCount};
  }

  async getPatientCount() {
    const malePatientCount = await Patient.count({where: {gender: 'male'}});
    const femalePatientCount = await Patient.count({where: {gender: 'female'}});

    return {malePatientCount, femalePatientCount};
  }


}