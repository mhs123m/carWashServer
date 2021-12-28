var Store  = require('../models/Store');

// Authenticate middleware
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    Store.findByToken(token).then((store) => {
        if (!store) {
            return Promise.reject()
        }

        req.store = store
        req.token = token
        next()
    }).catch((e) => {
        console.log(e)
        res.status(401).send({ message: 'Store must be authenticated' })
    })
};

module.exports = authenticate;