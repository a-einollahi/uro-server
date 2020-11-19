const bcrypt = require("bcryptjs");
const { Op, User, Person } = require("../../../db/index");

module.exports = class Repository {
  // get
  async findUserById(id) {
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id },
      include: [
        {
          model: Person,
          required: true,
        },
      ],
    });

    if (user) return user.get({ plain: true });

    return null;
  }

  async findUserByUsernameOrEmail(username, email) {
    return User.findOne({
      attributes: { exclude: ["password"] },
      where: { [Op.or]: [{ username }, { email }] },
      include: [
        {
          model: Person,
          required: true,
        },
      ],
    });
  }

  async getAllUsers(order) {
    const orderClause = [];
    if (order) orderClause.push(["last_name", "ASC"], ["first_name", "ASC"]);
    else orderClause.push(["createdAt", "Desc"]);

    const users = await Person.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
          where: { [Op.not]: [{ role: "super_admin" }] },
          required: true,
        },
      ],
      order: orderClause,
    });

    if (users && users.length)
      return users.map((el) => el.get({ plain: true }));

    return null;
  }

  // post

  async createNewUser(options, active) {
    const user = await User.create({
      username: options.username,
      password: bcrypt.hashSync(options.password, 10),
      email: options.email,
      role: options.role,
      register_date: new Date(),
      active,
      first_seen: false,
    });

    const person = await Person.create({
      national_code: user.username,
      gender: options.gender,
      speciality: options.speciality,
      medical_number: options.medical_number,
      first_name: options.first_name,
      last_name: options.last_name,
      state: options.state,
      city: options.city,
      hospital: options.hospital,
      hospital_phone: options.hospital_phone,
      hospital_address: options.hospital_address,
      office_phone: options.office_phone,
      office_address: options.office_address,
      mobile: options.mobile,
      is_faculty: options.is_faculty,
      university: options.university,
      university_grade: options.university_grade,
      avtar_url: null,
      user_id: user.id,
    });

    if (user && person) return true;
  }

  async changePassword(id, password) {
    return User.update(
      {
        password: bcrypt.hashSync(password, 10),
        first_seen: true,
      },
      { where: { id } }
    );
  }

  async changePasswordByUser(id, password) {
    return User.update(
      {
        password: bcrypt.hashSync(password, 10),
        first_seen: false,
      },
      { where: { id } }
    );
  }

  async changeUserActiveness(id, status) {
    return User.update({ active: status }, { where: { id } });
  }
};
