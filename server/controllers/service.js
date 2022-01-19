const Service = require('../models/Service');
const Store = require('../models/Store');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    // index to get all services
    index: async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.storeId)) {
                return res.status(400).send({ message: `Invalid store Id` })
            }
            const store = await Store.findById(req.params.storeId);
            if (!store) return res.status(401).send('no store assigned to the provided id');
            const service = await Service.find().where('storeId').equals(req.params.storeId)
            .populate('storeId', 'name geometry')
            res.status(200).send(service);
        } catch (e) {
            res.status(401).send(e.message);
        }
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


        try {
            if (!ObjectId.isValid(req.body.storeId)) {
                return res.status(400).send({ message: `Invalid store Id` })
            }
            const store = await Store.findById(req.body.storeId);
            if (!store) return res.status(401).send('no store assigned to the provided id');
            var body = _.pick(req.body, ['title', 'description', 'durationInMin', 'price', 'logo', 'available', 'storeId'])

            var service = new Service(body)
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

        const updates = _.pick(req.body, ['title', 'description', 'durationInMin', 'price', 'logo', 'available', 'storeId']);


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
