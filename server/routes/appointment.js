const router = require('express').Router(),
appointmentController = require('../controllers/appointment');
const storeAuth = require('../middlewares/storeAuthenticate');
const userAuth = require('../middlewares/userAuthenticate');


////// STORE ROUTES

// GET all appointments of a store
// path: / 
router.get('/stores/appointments/:storeId',storeAuth, appointmentController.index);

// GET an appointment by id
// /appoint/appointId
router.get('/stores/appointments/:appointmentId', storeAuth, appointmentController.one);

// POST a new appointment by a store 
router.post('/stores/appointments/new', storeAuth, appointmentController.create);

// PATCH a service 
router.patch('/stores/appointments/:appointmentId',storeAuth, appointmentController.update);

// DELETE a service 
router.delete('/stores/appointments/:appointmentId',storeAuth, appointmentController.delete);

///// USER ROUTES

// GET all appointments of a user
// path: / 
router.get('/users/appointments/:userId',userAuth, appointmentController.index_user);

// GET an appointment by id
// /appoint/appointId
router.get('/users/appointments/:appointmentId', userAuth, appointmentController.one);

// POST a new appointment by a user 
router.post('/users/appointments/new', userAuth, appointmentController.create);

// PATCH an appointment by a user 
router.patch('/users/appointments/:appointmentId',userAuth, appointmentController.update);

// DELETE an appointment by a user 
router.delete('/users/appointments/:appointmentId',userAuth, appointmentController.delete);

module.exports = router;
