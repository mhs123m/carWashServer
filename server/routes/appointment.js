const router = require('express').Router(),
appointmentController = require('../controllers/appointment');
const storeAuth = require('../middlewares/storeAuthenticate');
const userAuth = require('../middlewares/userAuthenticate');


////// STORE ROUTES

// GET all appointments of a store
// path: / 
router.get('/appointments/:storeId',storeAuth, appointmentController.index);

// GET an appointment by id
// /appoint/appointId
router.get('/appointments/:appointmentId', appointmentController.one);

// POST a new appointment by a store 
router.post('/appointments/new', appointmentController.create);

// PATCH a service 
router.patch('/appointments/:appointmentId', appointmentController.update);

// DELETE a service 
router.delete('/appointments/:appointmentId', appointmentController.delete);

///// USER ROUTES

// GET all appointments of a user
// path: / 
router.get('/users/appointments/:userId',userAuth, appointmentController.index_user);

// // GET an appointment by id
// // /appoint/appointId
// router.get('/users/appointments/:appointmentId', userAuth, appointmentController.one);

// // POST a new appointment by a user 
// router.post('/users/appointments/new', appointmentController.create);

// // PATCH an appointment by a user 
// router.patch('/users/appointments/:appointmentId', appointmentController.update);

// // DELETE an appointment by a user 
// router.delete('/users/appointments/:appointmentId', appointmentController.delete);

module.exports = router;
