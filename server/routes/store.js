const router = require('express').Router(),
storeController = require('../controllers/store');
const storeAuth = require('../middlewares/storeAuthenticate')


// GET all stores
// path: / 
router.get('/stores', storeController.index);

// GET a user by id
// /stores/storeId
router.get('/stores/:storeId', storeController.one);


// POST / register a new store
router.post('/stores/register', storeController.create);

// POST / login store
router.post('/stores/login',storeController.login);

// PATCH / stores/:storeId
router.patch('/stores/:storeId', storeController.update);

// DELETE /stores/logout
router.post('stores/logout', storeAuth, storeController.logout);

module.exports = router;