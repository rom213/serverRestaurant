const express= require('express')

const userMidleware=require('../middlewares/user.midleware')
const orderMidleware=require('../middlewares/order.midleware')


const orderController=require('../controllers/orders.controller')
const router=express.Router();

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Order:
 *       type: object
 *       properties:
 *          mealId:
 *              type: integer
 *              description: The meal id
 *          userId:
 *              type: integer
 *              description: The user id
 *          totalPrice:
 *              type: integer
 *              description: The total price
 *          quantity:
 *              type: integer
 *              description: The quantity
 *       required:
 *         - mealId
 *         - userId
 *         - totalPrice
 *         - quantity
 *       example:
 *          mealId: 1
 *          userId: 1
 *          totalPrice: 10000
 *          quantity: 2
 */

router.use(userMidleware.protect)
/**
 * @swagger
 * /api/v1/orders:
 *  post:
 *    summary: create a new order
 *    tags: [Order]
 *    description: create a new order
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mealId:
 *                type: integer
 *              quantity:
 *                type: integer
 *            example:
 *              mealId: 1
 *              quantity: 2
 *    responses:
 *      200:
 *        description: The order was successfully created
 *      404:
 *        description: The meal was not found
 *      500:
 *        description: Some server error
 */

router.post('/',orderMidleware.validExistMeal,orderController.createOrder)

/** 
 * @swagger
 * /api/v1/orders/me:
 *  get:
 *    summary: get all orders of user
 *    tags: [Order]
 *    description: get all orders of user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: The orders was successfully created
 *      500:
 *        description: Some server error
*/
router.get('/me',orderController.ordersUser)

router.route('/:id')
/** 
 * @swagger
 * /api/v1/orders/{id}:
 *  patch:
 *    summary: update order completed
 *    tags: [Order]
 *    description: update order completed
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The order id
 *    responses:
 *      200:
 *        description: The order was successfully updated
 *      401:
 *        description: The user is not authorized
 *      404:
 *        description: The order was not found
 *      500:
 *        description: Some server error
 * 
 * 
 *  delete:
 *    summary: delete order
 *    tags: [Order]
 *    description: delete order
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The order id
 *    responses:
 *      200:
 *        description: The order was successfully deleted
 *      401:
 *        description: The user is not authorized
 *      404:
 *        description: The order was not found
 *      500:
 *        description: Some server error
*/
    .patch(orderMidleware.validExistOrder,orderMidleware.orderValidUser,orderController.updateOrderCompleted)
    .delete(orderMidleware.validExistOrder,orderMidleware.orderValidUser,orderController.deleteOrder)


module.exports=router