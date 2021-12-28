const router = require('express').Router(),
serviceController = require('../controllers/service');
const storeAuth = require('../middlewares/storeAuthenticate')


// GET all services
// path: / 
router.get('/stores/:storeId/services',storeAuth, serviceController.index);

// GET a service by id
// /stores/storeId
router.get('/services/:serviceId', serviceController.one);

// POST a service 
router.post('/services/new', serviceController.create);

// PATCH a service 
router.patch('/services/:serviceId', serviceController.update);

// DELETE a service 
router.delete('/services/:serviceId', serviceController.delete);

module.exports = router;
