const router = require('express').Router(),
userController = require('../controllers/user');

// GET all users
// path: / 
router.get('/users', userController.index);

// GET one user
router.get('users/one/:userId', userController.one);

// POST / register user
router.post('/users/register', userController.create);

//POST / user login
router.post('/users/login', userController.login);

// PATCH / users/:userId
router.patch('/users/:userId',userController.update);

module.exports = router;