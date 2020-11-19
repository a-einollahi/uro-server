const {Sequelize} = require('../../config/sequelize');

let Session;

const initialize = sequelize => {
  Session = sequelize.define('session', {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    sess: {
      type: Sequelize.JSON,
      allowNull: false
    },
    expire: {
      type: 'TIMESTAMP',
      allowNull: false
    }
  }, {
    tableName: 'session',
    timestamps: false,
    underscored: true,
  });
};

const initialize_relation = () => {};

module.exports = {
  model: () => Session,
  initialize,
  initialize_relation
};