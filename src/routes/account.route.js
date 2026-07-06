const express= require('express')
const router= express.Router()
const {createAccount}= require('../controllers/account.controller')
const {authMiddleware}= require('../middleware/auth.middleware')

router.post('/', authMiddleware, createAccount)

module.exports= router;