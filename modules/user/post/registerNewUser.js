const Repo = require("../repository/repository");
const jwt = require("jsonwebtoken");
module.exports = class RegisterNewUser {
  constructor() {
    this.access = "all";
  }

  async handler(payload, user) {
    if (!payload) throw new Error("payload is not defined");
    const repo = new Repo();

    const foundedUser = await repo.findUserByUsernameOrEmail(
      payload.user_info.username,
      payload.user_info.email
    );

    if (foundedUser && foundedUser.email === payload.email)
      throw new Error("email already is taken");
    if (foundedUser && foundedUser.username === payload.username)
      throw new Error("username already is taken");

    const newUser = await repo.createNewUser(
      {
        role: "user",
        gender: payload.user_info.gender,
        speciality: payload.user_info.speciality,
        username: payload.user_info.username,
        password: payload.user_info.password,
        email: payload.user_info.email,
        first_name: payload.user_info.first_name,
        last_name: payload.user_info.last_name,
        medical_number: payload.personal_info.medical_number,
        state: payload.personal_info.state,
        city: payload.personal_info.city,
        hospital: payload.personal_info.hospital,
        hospital_phone: payload.personal_info.hospital_phone,
        hospital_address: payload.personal_info.hospital_address,
        office_phone: payload.personal_info.office_phone,
        office_address: payload.personal_info.office_address,
        mobile: payload.personal_info.mobile,
        is_faculty: payload.university_info.is_faculty,
        university: payload.university_info.university,
        university_grade: payload.university_info.university_grade,
      },
      null
    );

    if (newUser) {
      const token = jwt.sign(
        {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
          first_seen: newUser.first_seen,
        },
        "tokenFORauthenticationINtheSITE",
        { expiresIn: "2 days" }
      );

      return {
        message: "Registered in Successfully",
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
          email: newUser.email,
          first_seen: newUser.first_seen,
          active: newUser.active,
        },
        token: token,
      };
    }
  }
};
