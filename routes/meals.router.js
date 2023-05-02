const express = require("express");

const validationMidleware=require('../middlewares/validations.midleware')
const userMidleware = require("../middlewares/user.midleware");
const mealsMidleware = require("../middlewares/meals.midleware");

const mealsController = require("../controllers/meals.controller");

const { upload } = require('../utils/multer')

const router = express.Router();

router.get("/", mealsController.allMeals);
router.get("/:id", mealsController.findOneMeal);

router.post("/:id",
  upload.array('postImgs',1),
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
  .patch(mealsMidleware.validIfExistMeal,mealsController.updateMeal)
  .delete(mealsMidleware.validIfExistMeal,mealsController.deleteMeal);

module.exports = router;
