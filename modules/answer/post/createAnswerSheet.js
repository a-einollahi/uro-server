const Repository = require('../repository/repository');
const PatientRepository = require('../../patient/repository/repository');

module.exports = class CreateAnswerSheet {
  constructor() {
    this.access = ['super_admin', 'admin', 'user'];
  }

  async handler(payload, user) {
    
    if (!payload, !payload.patient_id, !payload.questionnaire_id) throw new Error('payload is not defined');
    if (!user || !user.id) throw new Error('user is not defined');
    
    const patient = new PatientRepository().getPatientWithId(payload.patient_id);
    if (!patient) throw new Error('patient is not found');

    const foundAnswerSheet = await new Repository().foundCloneAnswerSheet(payload.patient_id, payload.questionnaire_id, user.id);
    if (foundAnswerSheet) throw new Error('this sheet is registered for today');
    
    return new Repository().createAnswerSheet(payload.patient_id, payload.questionnaire_id, user.id); 
  }
}
