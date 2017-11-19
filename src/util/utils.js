// check for logged-in users
function whenLoggedIn(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user
    next()
  } else {
    res.redirect('/')
  }
}

// for node_acl implementation
function getCurrentUserId(req, res) {
  
    // Since numbers are not supported by node_acl in this case, convert
    // them to strings, so we can use IDs nonetheless.
    return req.user && req.user.id.toString() || false;
  }

module.exports = {
  whenLoggedIn,
  getCurrentUserId,
}
