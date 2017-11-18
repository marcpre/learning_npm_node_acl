// check for logged-in users
function whenLoggedIn(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = {
  whenLoggedIn,
}
