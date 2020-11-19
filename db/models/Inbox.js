const {Sequelize} = require('../../config/sequelize');

let Inbox;

const initialize = sequelize => {
  Inbox = sequelize.define('inbox', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
    },
    response: {
      type: Sequelize.STRING
    },
  }, {
    tableName: 'inbox',
    timestamps: true,
    underscored: true
  });
}

const initialize_relation = () => {
  const User = require('./User');

  Inbox.belongsTo(User.model(), {foreignKey:'user_id'});
}

module.exports = {
  model: () => Inbox,
  initialize,
  initialize_relation
}