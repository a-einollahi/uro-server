const {Sequelize} = require('../../config/sequelize');

let Blog;

const initialize = sequelize => {
  Blog = sequelize.define('blog', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    header: {
      type: Sequelize.STRING(),
      allowNull: false
    },
    p1: {
      type: Sequelize.STRING(),
      allowNull: false
    },
    p2: {
      type: Sequelize.STRING(),
    },
    ref: {
      type: Sequelize.STRING()
    },
    description: {
      type: Sequelize.STRING()
    }
  }, {
    tableName: 'blog',
    timestamps: false,
    underscored: true
  });
};

const initialize_relation = () => {
};

module.exports = {
  model: () => Blog,
  initialize,
  initialize_relation
};