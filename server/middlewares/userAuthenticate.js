var  User  = require('../models/User')

// Authenticate middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth')

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        req.user = user
        req.token = token
        next()
    }).catch((e) => {
        console.log(e)
        res.status(401).send({ message: 'User must be authenticated' })
    })
}

module.exports = authenticate