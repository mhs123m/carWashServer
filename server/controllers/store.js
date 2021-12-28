const Store = require('../models/Store');
const _ = require('lodash');

module.exports = {
    // index to get all stores
    index: (req, res) => {
        Store.find({})
            .then(stores => {
                res.json(stores)
            })
            .catch(error => {
                res.json({ error: error })
            })
    },
    // get one store by id
    one: async (req, res) => {
        const store = await Store.findById(req.params.storeId)
        if (!store) return res.status(404).send('The store with the given ID was not found.')
        res.send(store)
    },

    // create // to post a new store
    create: async (req, res) => {
        var body = _.pick(req.body, ['name', 'email', 'phone', 'password'])

        var store = new Store(body)

        try {
            await store.save()
            const token = await store.generateAuthToken()
            res.header('x-auth', token).status(201).send(store)
        } catch (e) {
            res.status(409).send(e.message)
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

        const store = await Store.findById(req.params.storeId);
        if (!store) return res.status(404).send('The task with the given ID was not found.');

        const updates = _.pick(req.body, ['name', 'email', 'phone', 'logo', 'geometry']);
        

        try {
            _.merge(store, updates);
            await store.save();
            res.status(200).send(store);
        } catch {
            res.status(401).send(e)
        }
    },

    // POST //stores/logout/:Id
    logout: async (req, res) => {
        
        try {
            await req.store.removeToken(req.token)
            await req.store.save()
            res.status(200).send()
        } catch (e) {
            res.status(500).send()
        }
    }

}
