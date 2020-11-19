const Repository = require("../repository/repository");

module.exports = class GetQuestionnaireReport {
  constructor() {
    this.access = ["super_admin", "admin"];
  }
  async handler(payload, user) {
    if (!payload || !payload.questionnaire_id)
      throw new Error("payload is not defined");

    // const records = await
    return new Repository().getQuestionnaireReport(payload.questionnaire_id);
  }
};

function mapRecordData(arr) {
  const patientsRecords = [];
  arr.forEach((rec) => {
    if (patientsRecords.find((x) => x.patient_id === rec.patient_id)) {
    } else {
      patientsRecords.push({
        patient_id: rec.patient_id,
      });
    }
  });
}

/*
patient {
  patient_name,
  question: [
    pos,
    question_title,
    answers: [

    ]
  ]
}
*/

/*
[
  {
    answers: [
      {
        [{question: {
          question_title,
          question_type,
          options: []
        }, question_id, value}]
      }
    ],
    patient_id
  }
]
*/
