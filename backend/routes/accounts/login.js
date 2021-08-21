const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUser = require('../../middleware/getUser')
const {generateAccessToken, generateRefreshToken} =  require('../../utils/generateToken')
const { request } = require('express')
const authenticateToken = require('../../middleware/authenticateToken')


let refreshTokens = []
router.post('/', getUser,async (req, res) => {
  try {
    hash = res.user.password
    uname = res.user.uname
    user = { name: uname, role: res.user.role }
    bcrypt.compare(req.body.password, hash, function(err, result) {
      if (err) { throw (err); }
      if (result === true) {
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.status(200).json({message: res.user.uname, accessToken: accessToken, refreshToken: refreshToken })        
      } else if (result === false) {
        res.status(401).json({message: "Wrong Credentials!"})
      }
  });
  }
   catch (error) {
      res.status(500).json({error: error})
  }
})


router.post('/token', authenticateToken, (req, res) => {
    const accessToken = generateAccessToken({name: res.user.name, role: res.user.role})
    res.json({ accessToken: accessToken })
})

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})


module.exports = router