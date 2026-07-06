const express= require('express')
const app= express()

const cookieParser= require('cookie-parser')

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* 
* -Routes
*/

const authRoutes= require('./routes/auth.route')
const accountRoutes= require('./routes/account.route')
const transactionRoutes= require('./routes/transaction.route')

app.use('/api/auth', authRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/transactions', transactionRoutes)


module.exports= app;