const bcrypt = require("bcryptjs");
const { sequelize } = require("../../../db/index");

module.exports = class Repository {
  // get

  async getQuestionnaireReport(questionnaire_id) {
    return sequelize.query(`
      SELECT 
        answers.id AS id,
        questions.position AS question_position,
        questions.question_title AS question_title,
        patients.first_name || ' ' || patients.last_name AS patient_name,
        answers.value AS value,
        answer_sheets.created_at AS date
      FROM questionnaires	
      FULL JOIN questions ON questions.questionnaire_id = questionnaires.id
      RIGHT JOIN answers ON answers.question_id = questions.id
      FULL JOIN answer_sheets ON answer_sheets.id = answers.answer_sheet_id
      FULL JOIN patients ON patients.id = answer_sheets.patient_id
      WHERE questionnaires.id = $1
      ORDER BY question_position, date`,
      {bind: [questionnaire_id], type: sequelize.QueryTypes.SELECT}
    );
  }
  
};

