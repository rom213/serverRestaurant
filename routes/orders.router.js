const express= require('express')

const userMidleware=require('../middlewares/user.midleware')
const orderMidleware=require('../middlewares/order.midleware')


const orderController=require('../controllers/orders.controller')
const router=express.Router();

router.use(userMidleware.protect)

router.post('/',orderMidleware.validExistMeal,orderController.createOrder)

router.get('/me',orderController.ordersUser)

router.route('/:id')
    .patch(orderMidleware.validExistOrder,orderMidleware.orderValidUser,orderController.updateOrderCompleted)
    .delete(orderMidleware.validExistOrder,orderMidleware.orderValidUser,orderController.deleteOrder)


module.exports=router