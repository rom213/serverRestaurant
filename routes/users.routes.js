const express = require('express');

const ValidationMidleware=require('../middlewares/validations.midleware')
const orderMidleware=require('../middlewares/order.midleware')
const userMidleware=require('../middlewares/user.midleware')
const userController = require('../controllers/user.controller');
const ordersController=require('../controllers/orders.controller')

const router = express.Router();

router.post('/signup',ValidationMidleware.creteUserValidations, userController.signup)
router.post('/login',ValidationMidleware.loginUserValidation,userController.login)





router.use(userMidleware.protect)

router.get('/orders',ordersController.ordersUser)
router.get('/orders/:id',userController.findOneOrderUser)
 


router
    .route('/:id')
    .patch( ValidationMidleware.updateUserValidation,userMidleware.validIfExistUser,userMidleware.protectAccountOwner,userController.updateUser)
    .delete(userMidleware.validIfExistUser,userMidleware.protectAccountOwner,userController.delete)

module.exports = router