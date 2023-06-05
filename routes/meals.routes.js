const express = require("express");

const validationMidleware=require('../middlewares/validations.midleware')
const userMidleware = require("../middlewares/user.midleware");
const mealsMidleware = require("../middlewares/meals.midleware");

const mealsController = require("../controllers/meals.controller");

const { upload } = require('../utils/multer')

const router = express.Router();
/**
 * @swagger
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      Meal:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: The meal name
 *          price:
 *              type: integer
 *              description: The meal price
 *        required:
 *          - name
 *          - price
 *          - restaurantId
 *        example:
 *          name: "meal name"
 *          price: 100
 */

/**
 * @swagger
 * /api/v1/meals:
 *  get:
 *    summary: get all meals
 *    tags: [Meals]
 *    description: get all meals
 *    responses:
 *      200:
 *        description: The meals was successfully created
 *      500:
 *        description: Some server error
 */
router.get("/", mealsController.allMeals);
/**
 * @swagger
 * /api/v1/meals/{id}:
 *  get:
 *    summary: get one meal
 *    tags: [Meals]
 *    description: get one meal
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: meal id
 *    responses:
 *      200:
 *        description: get one meal
 *      500:
 *        description: Some server error
 */
router.get("/:id", mealsController.findOneMeal);

/**
 * @swagger
 * /api/v1/meals/{id}:
 *  post:
 *    summary: create a new meal
 *    tags: [Meals]
 *    description: create a new meal
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
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The meal name
 *              price:
 *                type: integer
 *                description: The meal price
 *              mealImg:
 *                type: string
 *                format: binary
 *                description: The meal image
 *            required:
 *              - name
 *              - price
 *              - mealImg
 *            example:
 *              name: "meal name"
 *              price: 100
 *              mealImg: "meal image"
 *    responses:
 *      201:
 *        description: The meal was successfully created
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Some server error
 */

router.post("/:id",
  upload.array('mealImg',1),
  validationMidleware.createMealValidation,
  userMidleware.protect,
  userMidleware.accesIfAdmin,
  mealsController.createMeal
);



router.use(
  userMidleware.protect,
  userMidleware.accesIfAdmin,
);

router
  .route("/:id")
  /**
   * @swagger
   * /api/v1/meals/{id}:
   *  patch:
   *    summary: update a meal
   *    tags: [Meals]
   *    description: update a meal
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: meal id
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *                description: The meal name
   *              price:
   *                type: integer
   *                description: The meal price
   *            required:
   *              - name
   *              - price
   *            example:
   *              name: "meal name"
   *              price: 100
   *    responses:
   *      200:
   *        description: The meal was successfully updated
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: Some server error
   *
   *  delete:
   *    summary: delete a meal
   *    tags: [Meals]
   *    description: delete a meal
   *    security:
   *      - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: meal id
   *    responses:
   *      201:
   *        description: The meal was successfully deleted
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: Some server error
   */
  .patch(mealsMidleware.validIfExistMeal,mealsController.updateMeal)
  .delete(mealsMidleware.validIfExistMeal,mealsController.deleteMeal);

module.exports = router;
