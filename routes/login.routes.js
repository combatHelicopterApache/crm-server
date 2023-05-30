const {Router} = require('express')
const {LoginUser} = require('../controllers/login/login.controller')
const router = Router()

router.post(
  '/',
  LoginUser
)

module.exports = router