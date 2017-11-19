const express = require('express')

const router = express.Router()
const passportConfig = require('../config/passport')
const acl = require('../config/nodeacl')
const util = require('../util/utils')

router.get('/', [passportConfig.isAuthenticated, acl.middleware(1, util.getCurrentUserId())], (req, res) => {
  res.render('index')
})

module.exports = router
