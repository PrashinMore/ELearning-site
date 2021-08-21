const userSchema = require('../models/register')

async function getUser(req, res, next) {
  let user  
  try {
      user = await userSchema.findOne({ uname: req.body.uname })
      if (user == null) {
        return res.status(404).json({ message: "Wrong Credentials" })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

  module.exports = getUser