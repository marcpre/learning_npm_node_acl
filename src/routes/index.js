const express = require('express')

const router = express.Router()
const passportConfig = require('../config/passport')
const acl = require('../config/nodeacl')
const serviceUser = require('../service/auth')

router.get('/', [passportConfig.isAuthenticated, acl.middleware(1, serviceUser.getCurrentUser())], (req, res) => {
  res.render('index')
})

module.exports = router
