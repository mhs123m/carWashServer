const Appointment = require('../models/Appointment');
const Store = require('../models/Store');
const User = require('../models/User');
const Service = require('../models/Service');
var ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

module.exports = {
    all: async (req, res) => {
        try {
           
            const appointment = await Appointment.find()
            res.status(200).send(appointment);
        } catch (error) {
            res.status(404).send({
                error: error
            });
        }
    },
    // index to get all appointments for a sotre
    index: async (req, res) => {

        try {
            if (!ObjectId.isValid(req.params.storeId)) {
                throw { status: 400, error: `Invalid store Id` }
            }
            const appointment = await Appointment.find().where('storeId').equals(req.params.storeId)
            res.status(200).send(appointment);
        } catch (error) {
            res.status(404).send({
                error: error
            });
        }

    },
    // index to get all appointments for a user
    index_user: async (req, res) => {

        try {
            if (!ObjectId.isValid(req.params.userId)) {
                throw { status: 400, error: `Invalid user Id` }
            }
            var appointment = await Appointment.find().where('userId').equals(req.params.userId).populate('serviceId')
            res.status(200).send(appointment);
        } catch (error) {
            res.status(404).send({
                error: error
            });
        }

    },

    // get one appointments by id
    one: async (req, res) => {
        try {

            if (!ObjectId.isValid(req.params.appointmentId)) {
                return res.status(400).send({message: `Invalid appointment Id`}) 
            }
            const appointment = await Appointment.findById(req.params.appointmentId).populate('storeId').populate('userId')
            if (!appointment) return res.status(404).send('The appointment with the given ID was not found.')
            res.status(201).send(appointment)
        }
        catch (error) {
            res.status(404).send(error.message)
        }
    },

    // create // to post a new service
    // created by store, storeId is passed in req.body as storeId
    create: async (req, res) => {


        try {
            if (!ObjectId.isValid(req.body.slot.storeId)) {
                return res.status(400).send({ message: `Invalid store Id` })
            }
            if (!ObjectId.isValid(req.body.userId)) {
                return res.status(400).send({ message: `Invalid user Id` })
            }
            const store = await Store.findById(req.body.slot.storeId);
            if (!store) return res.status(401).send('no store assigned to the provided id');

            const user = await User.findById(req.body.userId);
            if (!user) return res.status(401).send('no user assigned to the provided id');

            var body = _.pick(req.body, [ 'day'])

            var appointment = new Appointment(body)
            await appointment.save()
            return res.status(201).send(appointment)
        } catch (e) {
            res.status(409).send(e.message)
        }
    },

    // PATCH // appointment/:Id 
    update: async (req, res) => {
        try {
            if (!ObjectId.isValid(req.params.appointmentId)) {
                return res.status(400).send({message: `Invalid appointment Id`}) 
            }
            const appointment = await Appointment.findById(req.params.appointmentId);
        if (!appointment) return res.status(401).send('no appointment found');

        // user would only change status to -> canceled 
        const updates = _.pick(req.body, ['status', 'serviceId', 'storeId', 'userId']);

            _.merge(appointment, updates);
            await appointment.save();
            res.status(200).send(appointment);
        } catch {
            res.status(401).send(e)
        }
    },

    // DELETE //appointment/:Id
    delete: async (req, res) => {

        
        try {

            if (!ObjectId.isValid(req.params.appointmentId)) {
                return res.status(400).send({message: `Invalid appointment Id`}) 
            }
            const appointment = await Appointment.findById(req.params.appointmentId);
        if (!appointment) return res.status(401).send('no appointment found');
            await appointment.remove()
            res.status(200).send(appointment)
        } catch (e) {
            res.status(500).send()
        }
    }

}
