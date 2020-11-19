const {Sequelize} = require('../../config/sequelize');

let Patient;

const initialize = sequelize => {
  Patient = sequelize.define('patients', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    national_code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthday: Sequelize.DATE,
    mobile: Sequelize.JSON,
    state: Sequelize.STRING,
    city: Sequelize.STRING
  }, {
    tableName: 'patients',
    timestamps: true,
    underscored: true
  });
};

const initialize_relation = () => {
  const User = require('./User');
  const AnswerSheet = require('./AnswerSheet');

  Patient.belongsTo(User.model(), {foreignKey:'registered_by'});
  Patient.hasMany(AnswerSheet.model(), {foreignKey:'patient_id'});
};

module.exports = {
  model: () => Patient,
  initialize,
  initialize_relation
};