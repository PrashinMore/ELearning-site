require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))
const db = mongoose.connection
db.on('error', (error) => console.error(error))

const app = express()
app.use(express.json())

const port = 8000 || process.env.port

app.use('/register', require('./routes/accounts/register'))
app.use('/login', require(('./routes/accounts/login')))

app.listen(port, () => console.log(`Server running on port ${port}`))