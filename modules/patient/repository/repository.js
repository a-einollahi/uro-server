const {
  Patient,
  AnswerSheet,
  Answer,
  Questionnaire,
  Question,
  Op,
} = require("../../../db/index");

module.exports = class Repository {
  constructor() {}

  // get

  async searchPatient(national_code, last_name) {
    return Patient.findOne({
      where: { [Op.or]: [{ national_code }, { last_name }] },
      raw: true,
    });
  }

  async getPatientWithNationalCode(national_code) {
    return Patient.findOne({ where: { national_code }, raw: true });
  }

  async getPatientWithId(id) {
    return Patient.findOne({ where: { id }, raw: true });
  }

  async getAllPatient() {
    return Patient.findAll({ raw: true });
  }

  async getPatientsOfUser(user_id) {
    return Patient.findAll({
      attributes: ["id", "first_name", "last_name", "national_code"],
      include: [
        {
          model: AnswerSheet,
          where: { user_id },
          required: true,
          include: [
            {
              model: Questionnaire,
              required: true,
            },
          ],
        },
      ],
    });
  }

  async getPatientReport(
    user_id,
    patient_id,
    questionnaire_id,
    search_by_date,
    start_date,
    end_date
  ) {
    const whereClause = { user_id, patient_id, questionnaire_id };

    if (search_by_date) {
      if (start_date && end_date) {
        whereClause.created_at = { [Op.between]: [start_date, end_date] };
      } else if (!start_date && end_date) {
        whereClause.created_at = { [Op.lte]: end_date };
      } else if (start_date && !end_date) {
        whereClause.created_at = { [Op.gte]: start_date };
      }
    }
    return AnswerSheet.findAll({
      where: whereClause,
      order: [[{model: Answer, as: 'answers'}, {model: Question, as: 'question'}, 'position', 'ASC']],
      include: [
        {
          model: Answer,
          required: true,
          include: [
            {
              model: Question,
              required: true,
            },
          ],
        },
      ],
    });
  }

  // post
  async createPatient(options) {
    return Patient.create({
      gender: options.gender,
      national_code: options.national_code,
      first_name: options.first_name,
      last_name: options.last_name,
      birthday: options.birthday,
      mobile: options.mobile,
      state: options.state,
      city: options.city,
      registered_by: options.registered_by,
    });
  }

  async updatePatient(options, id) {
    return Patient.update(
      {
        gender: options.gender,
        national_code: options.national_code,
        first_name: options.first_name,
        last_name: options.last_name,
        birthday: options.birthday,
        mobile: options.mobile,
        state: options.state,
        city: options.city,
      },
      { where: { id } }
    );
  }
};
