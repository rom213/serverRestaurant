const express = require("express");

const restaurantMiddleware = require("../middlewares/restauran.midlewares");
const userMiddleware = require("../middlewares/user.midleware");

const controllerRestaurants = require("../controllers/restaurant.controller");
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
 *      Restaurant:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: The restaurant name
 *          address:
 *              type: string
 *              description: The restaurant address
 *          rating:
 *              type: string
 *              description: The restaurant rating
 *        required:
 *         - name
 *         - address
 *         - rating
 *        example:
 *           name: John Doe
 *           address: '3232113231'
 *           rating: '4'
 */



// Rutas públicas
router.route("/")
/**
 * @swagger
 * /api/v1/restaurants:
 *  get:
 *    summary: get all restaurants
 *    tags: [Restaurant]
 *    description: get all restaurants
 *    responses:
 *      200:
 *        description: The restaurants was successfully created
 *      500:
 *        description: Some server error
 *  
 *  post:
 *    summary: create a new restaurant
 *    tags: [Restaurant]
 *    description: create a new restaurant
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Restaurant'
 *    responses:
 *      201:
 *        description: The restaurant was successfully created
 *      500:
 *        description: Some server error
 */
  .get(controllerRestaurants.findAllrestaurants)
  .post(
    userMiddleware.protect,
    userMiddleware.accesIfAdmin,
    controllerRestaurants.createRestaurant
  );

router.route("/:id")
/** 
 * @swagger
 * /api/v1/restaurants/{id}:
 *  get:
 *    summary: get a restaurant by id
 *    tags: [Restaurant]
 *    description: get a restaurant by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: restaurant id
 *    responses:
 *      200:
 *        description: The restaurant was successfully created
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some server error
*/
  .get(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.findOneRestaurant);

  // Rutas protegidas
  router.use(userMiddleware.protect)

  router.route("/reviews/:id")
  /**
   * @swagger
   * /api/v1/restaurants/reviews/{id}:
   *  post:
   *    summary: create a new review
   *    tags: [Restaurant]
   *    description: create a new review
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: restaurant id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              rating:
   *                type: number
   *                description: The review rating
   *              comment:
   *                type: string
   *                description: The review comment
   *            required:
   *              - rating
   *              - comment
   *            example:
   *              rating: '4'
   *              comment: 'good restaurant'
   *    responses:
   *      201:
   *        description: The review was successfully created
   *      404:
   *        description: The restaurant was not found
   *      500:
   *       description: Some server error
   *
  */
  .post(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.createReview);

router.route("/reviews/:restaurantId/:id")
/** 
 * @swagger
 * /api/v1/restaurants/reviews/{restaurantId}/{id}:
 *  patch:
 *    summary: update a review
 *    tags: [Restaurant]
 *    description: update a review
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: restaurantId
 *        schema:
 *          type: string
 *        required: true
 *        description: restaurant id
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: review id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              rating:
 *                type: string
 *                description: The review rating
 *              comment:
 *                type: string
 *                description: The review comment
 *            required:
 *              - rating
 *              - comment
 *            example:
 *              rating: '4'
 *              comment: 'good restaurant'
 *    responses:
 *      201:
 *        description: The review was successfully updated
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some server error 
 *  delete:
 *    summary: delete a review
 *    tags: [Restaurant]
 *    description: delete a review
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: restaurantId
 *        schema:
 *          type: string
 *        required: true
 *        description: restaurant id
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: review id
 *    responses:
 *      201:
 *        description: The review was successfully deleted
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some server error
*/
  .patch(restaurantMiddleware.validIfExistRestaurantReview, controllerRestaurants.updateReview)
  .delete(restaurantMiddleware.validIfExistRestaurantReview, controllerRestaurants.deleteReview);

router.use(userMiddleware.protect, userMiddleware.accesIfAdmin);

router.route("/:id")
/** 
 * @swagger
 * /api/v1/restaurants/{id}:
 *  patch:
 *    summary: update a restaurant
 *    tags: [Restaurant]
 *    description: update a restaurant
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: restaurant id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The restaurant name
 *              address:
 *                type: string
 *                description: The restaurant address
 *            required:
 *              - name
 *              - address
 *            example:
 *              name: 'restaurant name'
 *              address: 'restaurant address'
 *    responses:
 *      201:
 *        description: The restaurant was successfully updated
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some server error
 *
 * delete:
 *    summary: delete a restaurant
 *    tags: [Restaurant]
 *    description: delete a restaurant
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: restaurant id
 *    responses:
 *      201:
 *        description: The restaurant was successfully deleted
 *      404:
 *        description: The restaurant was not found
 *      500:
 *        description: Some server error
 *
*/
  .patch(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.updateRestaurant)
  .delete(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.deleteRestaurant);
 


module.exports = router;