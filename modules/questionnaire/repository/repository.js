const {
  Questionnaire,
  Question,
  Answer,
  AnswerSheet,
  sequelize,
} = require("../../../db/index");
module.exports = class Repository {
  // get
  async getAllQuestionnaire() {
    const questionnaires = await Questionnaire.findAll({
      include: [
        {
          model: Question,
          required: false,
        },
      ],

      order: [["updated_at", "Desc"]],
    });

    if (questionnaires && questionnaires.length)
      return questionnaires.map((el) => el.get({ plain: true }));

    return null;
  }

  async getQuestionnaireById(id) {
    const questionnaire = await Questionnaire.findOne({
      where: { id },
      order: [[Question, "position", "ASC"]],
      include: [
        {
          model: Question,
          required: false,
        },
      ],
    });

    if (questionnaire) return questionnaire.get({ plain: true });

    return null;
  }

  async getQuestionById(id) {
    return Question.findOne({ where: { id }, raw: true });
  }

  async getQuestionnaireOverview(id) {
    return Questionnaire.findOne({
      where: { id },
      order: [[Question, "position", "ASC"]],
      include: [
        {
          model: AnswerSheet,
        },
        {
          model: Question,
          include: [
            {
              model: Answer,
            },
          ],
        },
      ],
    });
  }

  async getQuestionnaireReport(questionnaire_id) {
    // return AnswerSheet.findAll({
    //   where: { questionnaire_id },
    //   order: [
    //     ["patient_id", "ASC"],
    //     ["created_at", "ASC"],
    //   ],
    //   include: [
    //     {
    //       model: Answer,
    //       required: true,
    //       include: [
    //         {
    //           model: Question,
    //           required: true,
    //         },
    //       ],
    //     },
    //   ],
    // });

    return sequelize.query(
      `
      SELECT
        questionnaires.id as questionnaires_id,
        questionnaires.questionnaire_title as questionnaires_title,
        answer_sheets.patient_id as patients_id,
        patients.first_name || ' ' || patients.last_name as patient_name,
        questions.position as "position",
        questions.question_title as question_title,
        questions.question_type as question_type,
        questions.options as question_options,
        answers.value as answer_value,
        answer_sheets.created_at as answers_created_at
      FROM
        questionnaires
        JOIN answer_sheets ON answer_sheets.questionnaire_id = questionnaires.id
        JOIN answers ON answers.answer_sheet_id = answer_sheets.id
        JOIN questions ON answers.question_id = questions.id
        JOIN patients ON patients.id = answer_sheets.patient_id
      WHERE
        questionnaires.id = $1
      ORDER BY
        "position",
        patients_id,
        answers_created_at
      `,
      {
        bind: [questionnaire_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );
  }

  // post
  async createQuestionnaire(options, user_id) {
    const questionnaire = await Questionnaire.create({
      questionnaire_title: options.questionnaire_title,
      questionnaire_desc: options.questionnaire_desc,
      user_id,
    });

    return questionnaire.id;
  }

  async createQuestion(options, user_id) {
    return Question.create({
      questionnaire_id: options.questionnaire_id,
      position: options.position,
      question_title: options.question_title,
      question_type: options.question_type,
      options: options.options,
      user_id,
    });
  }

  async editQuestionnaireTitle(id, questionnaire_title, user_id) {
    return Questionnaire.update(
      { questionnaire_title, user_id },
      { where: { id } }
    );
  }

  async addNewQuestion(
    question_title,
    question_type,
    position,
    options,
    user_id,
    questionnaire_id
  ) {
    return Question.create({
      question_title,
      question_type,
      position,
      options,
      user_id,
      questionnaire_id,
    });
  }

  async editQuestion(payload, user_id) {
    return Question.update(
      {
        question_title: payload.questionTitle,
        question_type: payload.questionType,
        position: payload.questionNumber,
        options: payload.questionOptions,
        user_id,
        questionnaire_id: payload.questionnaireId,
      },
      { where: { id: payload.questionId } }
    );
  }

  async deleteQuestion(id) {
    return Question.destroy({ where: { id } });
  }

  async deleteQuestionnaire(id) {
    return Questionnaire.destroy({ where: { id } });
  }
};
