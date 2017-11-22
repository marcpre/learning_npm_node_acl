const express = require('express')

const router = express.Router()
const passportConfig = require('../config/passport')
let acl = require('../config/nodeacl')
acl = acl.setup()
const util = require('../util/utils')

router.get('/', [passportConfig.isAuthenticated, acl.middleware(1, util.getCurrentUserId)], (req, res) => {
  res.render('index')
})

module.exports = router
