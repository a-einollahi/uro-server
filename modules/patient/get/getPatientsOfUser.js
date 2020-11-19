const Repository = require("../repository/repository");

module.exports = class GetPatientsOfUser {
  constructor() {
    this.access = ["super_admin", "admin", "user"];
  }

  async handler(payload, user) {
    if (!user || !user.id) throw new Error("user is not defined");

    const result = (
      await new Repository().getPatientsOfUser(user.id)
    ).map((el) => el.get({ plain: true }));

    this.mapQuestionnairedata(result);

    return result;
  }

  mapQuestionnairedata(result) {
    result.forEach((res) => {
      const questionnaire = [];
      res.questionnaire = [];
      res.answer_sheets.forEach((el) => {
        questionnaire.push({
          id: el.questionnaire.id,
          title: el.questionnaire.questionnaire_title,
        });
      });

      res["questionnaire"] = [
        ...new Set(questionnaire.map(JSON.stringify)),
      ].map(JSON.parse);

      delete res.answer_sheets;
    });
  }
};
