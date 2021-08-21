const jwt = require("jsonwebtoken")

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)


    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        res.user = user
        next()
    })
}

module.exports = authenticateToken