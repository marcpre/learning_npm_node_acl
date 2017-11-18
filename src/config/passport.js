const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const serviceAuth = require('../service/auth')

// module.exports = () => {
// serializeUser determines, which data of the user object should be stored in the session.
// see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await serviceAuth.findById(id)
  done(null, user)
})

// Sign in with username and Password
passport.use('local', new LocalStrategy({
  usernameField: 'username',
}, async(username, password, done) => {
  const user = await serviceAuth.signin(username, password)
  done(null, user)
}))


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.session.user    
    return next()
  } else {
    res.redirect('login')
  }
}
