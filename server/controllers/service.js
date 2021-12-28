const Service = require('../models/Service');
const Store = require('../models/Store');
const _ = require('lodash');

module.exports = {
    // index to get all services
    index: async (req, res) => {
        const service = await Service.find().populate('storeId', 'name')
        res.status(200).send(service);
    },
    // get one service by id
    one: async (req, res) => {
        const service = await Service.findById(req.params.serviceId).populate('storeId', 'name')
        if (!service) return res.status(404).send('The store with the given ID was not found.')
        res.send(service)
    },

    // create // to post a new service
    // created by store, storeId is passed in req.body as storeId
    create: async (req, res) => {
        const store = await Store.findById(req.body.storeId);
        if (!store) return res.status(401).send('no store assigned to the provided id');
        var body = _.pick(req.body, ['title', 'description', 'durationInMin', 'price', 'availble', 'storeId'])

        var service = new Service(body)

        try {
            await service.save()
            return res.status(201).send(service)
        } catch (e) {
            res.status(409).send(e.message)
        }
    },

    // PATCH // service/:Id
    update: async (req, res) => {

        const service = await Service.findById(req.params.serviceId);
        if (!service) return res.status(401).send('no service found');

        const updates = _.pick(req.body, ['title', 'description', 'durationInMin', 'price', 'availble', 'storeId']);


        try {
            _.merge(service, updates);
            await service.save();
            res.status(200).send(service);
        } catch {
            res.status(401).send(e)
        }
    },

    // DELETE //service/:Id
    delete: async (req, res) => {

    const service = await Service.findById(req.params.serviceId);
    if (!service) return res.status(401).send('no service found');
        try {
            await service.remove()
            res.status(200).send(service)
        } catch (e) {
            res.status(500).send()
        }
    }

}
