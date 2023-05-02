const { body, validationResult } = require("express-validator");

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

exports.creteUserValidations = [
  body("name").notEmpty().withMessage("Name cannot empety"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 caracering long"),
  validFields,
];

exports.loginUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validFields,
];

exports.updateUserValidation=[
    body("name")
        .notEmpty()
        .withMessage('name cannot be empty'),
    body("Email")
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage("Must be a valid email"),
    validFields,
]

exports.createMealValidation=[
      body("name")
        .notEmpty()
        .withMessage('name cannot be empty'),
      validFields
]
