const router = require('express').Router(),
serviceController = require('../controllers/service');
const storeAuth = require('../middlewares/storeAuthenticate')


// GET all services
// path: / 
router.get('/stores/:storeId/services',storeAuth, serviceController.index);

// GET a service by id
// /stores/storeId
router.get('/services/:serviceId', storeAuth ,serviceController.one);

// POST a service 
router.post('/services/new', storeAuth, serviceController.create); 

// PATCH a service 
router.patch('/services/:serviceId', storeAuth, serviceController.update);

// DELETE a service 
router.delete('/services/:serviceId', storeAuth ,serviceController.delete);

module.exports = router;
