const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {User} = require('../db/index');

module.exports = (passport) => {
    
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: {id},
        raw: true});
  
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
  
  passport.use('local', new LocalStrategy((username, password, done) => {
  
    User.findOne({where: {username}}).then(user => {
      
      if (!user) return done(null, false, {message: 'هیچ کاربری یافت نشد.'});      
      if (!bcrypt.compareSync(password, user.password)) return done(null, false, {message: 'رمز عبور نادرست می‌باشد.'});
  
      return done(null, user.get({plain: true}));
    }).catch(err => {      
      done(err)
    });
  }));

}