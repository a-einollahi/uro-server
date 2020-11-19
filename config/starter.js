require('dotenv').config();
const bcrypt = require('bcryptjs');
const {User, Person} = require('../db/index');

(async () => {
  require('../db/index');
  
  const user = await User.findOne({where: {role: 'super_admin'}, raw: true});
  
  if (!user) {
    const pass = bcrypt.hashSync('123456', 10);
    const user = await User.create({
      username: 'admin',
      password: pass,
      email: "admin@test.com",
      role: "super_admin",
      register_date: new Date(),
      active: true,
      first_seen: false
    })
    console.log('Admin is created...');

    await Person.create({
      national_code: '0000000000',
      first_name: 'admin',
      last_name: 'admin',
      user_id: user.id
    })
    console.log('Admin is updated...')
  } else {
    console.log('Admin already is initialized...')
  }

  process.exit();
})();