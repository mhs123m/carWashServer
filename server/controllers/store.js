const Store = require('../models/Store');
const _ = require('lodash');

module.exports = {
    // index to get all stores
    index: (req,res)=> {
        Store.find({})
        .then(stores => {
            res.json(stores)
        })
        .catch(error=> {
            res.json({error : error})
        })
    },

    // create // to post a new store
    create: async (req, res) => {
        var body = _.pick(req.body, ['name', 'email', 'phone', 'password', 'logo'])
    
        var store = new Store(body)
    
        try {
            await store.save()
            const token = await store.generateAuthToken()
            res.header('x-auth', token).status(201).send(store)
        } catch (e) {
            res.status(400).send(e)
        }
    },

    // post // store log in
    login: async (req, res) => {
        var body = _.pick(req.body, ['email', 'password'])
        try {
            var store = await Store.findByCredentials(body.email, body.password)
            var token = await store.generateAuthToken()
            res.header('x-auth', token).send(store)
        } catch (e) {
            res.status(400).send(e)
        }
    },

    // PATCH // stores/:Id
    update: async (req, res) => {
        //You can pass req.body directly or you can separate object
        const { name, email, phone, logo } = req.body;
        const { _id } = req.params;
        const filter = { storeId : _id }
      
        const updatedUser =  await Store.findOneAndUpdate(filter, req.body, { new: true }).catch(error => {
          return res.status(500).send(error);
        });
      
        return res.status(200).json(updatedUser);
    
    }

}
