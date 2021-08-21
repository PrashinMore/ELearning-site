const express = require('express')
const bcrypt = require('bcrypt')
const  userSchema = require('../../models/register')
const router = express.Router()

router.post('/student', async (req, res) => {


bcrypt.hash(req.body.password, 10, async function(err, hash) {
  const hashedPassword = hash
  const userStudent = new userSchema({
    uname: req.body.uname,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role
  })

  try {
    const newUser = await userStudent.save()
    res.status(201).json("User Created")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

  
})

module.exports = router