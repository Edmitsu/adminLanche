const express = require('express');
const router = express.Router();

const checkToken = require('../middlewares/checkToken');
const userController = require('../controllers/UserController');


router.get('/user/:id', checkToken, userController.userLogged);

router.post('/auth/register', userController.userRegister);

router.post('/auth/login', userController.userLogin);




module.exports = router;