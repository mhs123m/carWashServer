const User = require('../models/User');
const auth = require('../middlewares/userAuthenticate')
const _ = require('lodash');

module.exports = {
    // index to get all users
    index: (req,res)=> {
        User.find({})
        .then(users=> {
            res.json(users)
        })
        .catch(error=> {
            res.json({error : error})
        })
    },

    one: async (req, res) => {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).send('The user with the given ID was not found.')
        res.send(user)
    },

    // create // to post a new user
    create: async (req, res) => {
        var body = _.pick(req.body, ['fullname', 'email', 'phone', 'password'])
    
        var user = new User(body)
    
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.header('x-auth', token).status(201).send(user)
        } catch (e) {
            res.status(400).send(e)
        }
    },

    // post // user log in
    login: async (req, res) => {
        var body = _.pick(req.body, ['email', 'password'])
        try {
            var user = await User.findByCredentials(body.email, body.password)
            var token = await user.generateAuthToken()
            res.header('x-auth', token).send(user)
        } catch (e) {
            res.status(400).send(e)
        }
    },

    // PATCH // users/:userId
    update: async (req, res) => {
        // TODO: updating uninitialized body field is possible. look at user 1 in mongoDB
        const { fullname, email, phone } = req.body;
        const { _id } = req.params;
        const filter = { userId : _id }
      
        const updatedUser =  await User.findOneAndUpdate(filter, req.body, { new: true }).catch(error => {
          return res.status(500).send(error);
        });
      
        return res.status(200).json(updatedUser);
    
    }
    
}



