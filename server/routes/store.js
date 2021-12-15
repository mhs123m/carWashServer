const router = require('express').Router(),
storeController = require('../controllers/store');
const storeAuth = require('../middlewares/storeAuthenticate')
const Store = require('../models/Store');
const _ = require('lodash');

// GET all stores
// path: / 
router.get('/stores', storeController.index);


// POST / register a new store
router.post('/stores/register', storeController.create);

// POST / login store
router.post('/stores/login',storeController.login);

// PATCH / stores/:storeId
router.patch('/stores/:storeId',storeController.update);

module.exports = router;