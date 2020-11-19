const moment = require("moment");
const {
  Op,
  Answer,
  AnswerSheet,
  Question,
  Questionnaire,
  Patient,
} = require("../../../db/index");

module.exports = class Repository {
  constructor() {}

  // get
  async getAnswerSheetById(id) {
    const answerSheet = await AnswerSheet.findOne({
      where: { id },
      include: [
        {
          model: Questionnaire,
          required: true,
          include: [
            {
              model: Question,
              order: [["position", "ASC"]],
              required: true,
            },
          ],
        },
        {
          model: Answer,
          required: false,
        },
        {
          model: Patient,
          required: true,
        },
      ],
    });

    if (answerSheet) return answerSheet.get({ plain: true });

    return null;
  }

  async getAnswerSheetsByUser(user_id, options) {
    const whereClause = { user_id };

    if (options.from && options.until) {
      whereClause["created_at"] = {
        [Op.between]: [options.from, options.until],
      };
    } else if (options.from) {
      whereClause["created_at"] = { [Op.gte]: options.from };
    } else if (options.until) {
      whereClause["created_at"] = { [Op.lte]: options.until };
    }

    const answerSheets = await AnswerSheet.findAll({
      where: whereClause,
      order: [["created_at", "ASC"]],
      include: [
        {
          model: Questionnaire,
          required: true,
          include: [
            {
              model: Question,
              required: true,
            },
          ],
        },
        {
          model: Answer,
          required: false,
        },
        {
          model: Patient,
          required: true,
        },
      ],
    });

    if (answerSheets && answerSheets.length)
      return answerSheets.map((el) => el.get({ plain: true }));

    return null;
  }

  async foundCloneAnswerSheet(patient_id, questionnaire_id, user_id) {
    return AnswerSheet.findOne({
      where: {
        patient_id,
        questionnaire_id,
        user_id,
        created_at: {
          [Op.between]: [
            moment().startOf("day").format(),
            moment().endOf("day").format(),
          ],
        },
      },
      raw: true,
    });
  }

  async getAnswer(answer_sheet_id, question_id) {
    return Answer.findOne({
      where: { answer_sheet_id, question_id },
      raw: true,
    });
  }

  // post

  async createAnswerSheet(patient_id, questionnaire_id, user_id) {
    return AnswerSheet.create({ patient_id, user_id, questionnaire_id });
  }

  async createAnswer(answer_sheet_id, question_id, value) {
    return Answer.create({ answer_sheet_id, question_id, value });
  }

  async updateAnswer(id, value) {
    return Answer.update({ value }, { where: { id } });
  }

  async deleteAnswer(id) {
    return Answer.destroy({ where: { id } });
  }
};
