const express = require('express');

const ValidationMidleware=require('../middlewares/validations.midleware')
const orderMidleware=require('../middlewares/order.midleware')
const userMidleware=require('../middlewares/user.midleware')
const userController = require('../controllers/user.controller');
const ordersController=require('../controllers/orders.controller')

const router = express.Router();
/** 
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: The user name
 *          email:
 *              type: string
 *              description: The user email
 *          password:
 *              type: string
 *              description: The user password
 *          role:
 *              type: string
 *              description: user / admin
 *        required:
 *         - name
 *         - email
 *         - password
 *         - role
 *        example:
 *           name: John Doe
 *           email: john@correo.com
 *           password: "123456789"
 *           role: user / admin
 */

/** 
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *    summary: create a new user
 *    tags: [User]
 *    description: create a new user
 * 
 * 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The users was successfully created
 *      500:
 *        description: Some server error
*/

router.post('/signup',ValidationMidleware.creteUserValidations, userController.signup)
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: login user
 *    tags: [User]
 *    description: login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                email:
 *                  type: string
 *                  description: The user email
 *                password:
 *                  type: string
 *                  description: The user password
 *            required:
 *              - email
 *              - password
 *    responses:
 *     200:
 *       description: The user was successfully logged in
 *     401:
 *       description: Incorrect email or password
 *     404:
 *       description: The user could not be found
 *     500:
 *       description: Some server error  
 */
router.post('/login',ValidationMidleware.loginUserValidation,userController.login)





router.use(userMidleware.protect)
/** 
 * @swagger
 * /api/v1/users/orders:
 *  get:
 *    summary: get all orders of the user
 *    tags: [User]
 *    description: get all orders of the user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: The orders was successfully obtained
 *      500:
 *        description: Some server error
*/
router.get('/orders',ordersController.ordersUser)
/** 
 * @swagger
 * /api/v1/users/orders/{id}:
 *  get:
 *    summary: get one order of the user
 *    tags: [User]
 *    description: get one order of the user
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The order ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The order was successfully obtained
 *      500:
 *        description: Some server error
*/
router.get('/orders/:id',userController.findOneOrderUser)
 


router
    .route('/:id')
    /**
     * @swagger
     * /api/v1/users/{id}:
     *  patch:
     *    summary: update user
     *    tags: [User]
     *    description: update user
     *    security:
     *      - bearerAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The user ID
     *        schema:
     *          type: string
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *                name:
     *                  type: string
     *                  description: The user name
     *                email:
     *                  type: string
     *                  description: The user email
     *            required:
     *              - name
     *              - email
     *    responses:
     *     200:
     *       description: The user was successfully updated
     *     401:
     *       description: Incorrect email or password
     *     404:
     *       description: The user could not be found
     *     500: 
     *       description: Some server error
     * 
     * 
     *  delete:
     *    summary: delete user
     *    tags: [User]
     *    description: delete user
     *    security:
     *      - bearerAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The user ID
     *        schema:
     *          type: string
     *    responses:
     *     200:
     *       description: The user was successfully deleted
     *     404:
     *       description: The user could not be found
     *     500:
     *       description: Some server error 
     *
     */

    .patch( ValidationMidleware.updateUserValidation,userMidleware.validIfExistUser,userMidleware.protectAccountOwner,userController.updateUser)
    .delete(userMidleware.validIfExistUser,userMidleware.protectAccountOwner,userController.delete)

module.exports = router