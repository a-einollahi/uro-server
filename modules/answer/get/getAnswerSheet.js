const Repository = require('../repository/repository');

module.exports = class GetAnswerSheet {
  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {
    if (!payload, !payload.id) throw new Error('payload is not defined');

    if (!user || !user.id) throw new Error('user is not defined');

    const foundAnswerSheet = await new Repository().getAnswerSheetById(payload.id);

    if (!foundAnswerSheet) throw new Error('the questionnaire sheet is not found');
    
    if (foundAnswerSheet.user_id !== user.id)
      throw new Error('you have not the permition to see this questionnaire');

    return foundAnswerSheet;
  }
}