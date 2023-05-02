const express = require("express");

const restaurantMiddleware = require("../middlewares/restauran.midlewares");
const userMiddleware = require("../middlewares/user.midleware");

const controllerRestaurants = require("../controllers/restaurant.controller");
const router = express.Router();
// Rutas públicas
router.route("/")
  .get(controllerRestaurants.findAllrestaurants)
  .post(
    userMiddleware.protect,
    userMiddleware.accesIfAdmin,
    controllerRestaurants.createRestaurant
  );

router.route("/:id")
  .get(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.findOneRestaurant);

  // Rutas protegidas
  router.use(userMiddleware.protect)

  router.route("/reviews/:id")
  .post(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.createReview);

router.route("/reviews/:restaurantId/:id")
  .patch(restaurantMiddleware.validIfExistRestaurantReview, controllerRestaurants.updateReview)
  .delete(restaurantMiddleware.validIfExistRestaurantReview, controllerRestaurants.deleteReview);

router.use(userMiddleware.protect, userMiddleware.accesIfAdmin);

router.route("/:id")
  .patch(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.updateRestaurant)
  .delete(restaurantMiddleware.validIfExistRestaurant, controllerRestaurants.deleteRestaurant);
 


module.exports = router;