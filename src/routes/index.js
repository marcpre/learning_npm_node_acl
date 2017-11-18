const express = require('express')

const router = express.Router()
const passportConfig = require('../config/passport')

router.get('/', passportConfig.isAuthenticated, (req, res) => {
  res.render('dashboard')
})

module.exports = router
