const Repository = require("../repository/repository");

module.exports = class CreateAnswer {
  constructor() {
    this.access = ["super_admin", "admin", "user"];
  }

  async handler(payload, user) {
    if ((!payload, !payload.answer_sheet_id, !payload.question_id))
      throw new Error("payload is not defined");
    const repo = new Repository();

    const answer = await repo.getAnswer(
      payload.answer_sheet_id,
      payload.question_id
    );

    if (answer && !payload.value) return repo.deleteAnswer(answer.id);

    const multiAnswer = Array.isArray(payload.value);

    let value;
    if (answer) {
      return repo.updateAnswer(answer.id, payload.value);
    } else {
      return repo.createAnswer(payload.answer_sheet_id, payload.question_id, payload.value);
    }
  }
};
