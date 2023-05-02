const Restaurant = require("../models/restaurant.model");
const Review = require("../models/reviews.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validIfExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: "active",
      id,
    },
  });

  if (!restaurant) {
    return next(new AppError("restaurant not found", 404));
  }
  req.restaurant = restaurant;
  next();
});

exports.validNotExistRestaurant = catchAsync(async (req, res, next) => {
  const { rating } = req.body;

  if (rating > 6) {
    return next(new AppError("there is no restaurant more than 5", 401));
  }

  const restaurant = await Restaurant.findOne({
    where: {
      status: "active",
      rating,
    },
  });

  if (restaurant) {
    return next(
      new AppError(
        "existing restaurant check if there are seats, or try again later",
        404
      )
    );
  }

  next();
});

exports.validIfExistRestaurantReview = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  const { sessionUser } = req;

  const restaurant = await Restaurant.findOne({
    where: {
      status: "active",
      id: restaurantId,
    },
  });

  if (!restaurant) {
    return next(new AppError("restaurant no found", 404));
  }

  const review = await Review.findOne({
    where: {
      status: "active",
      id,
      userId: sessionUser.id,
      restaurantId: restaurantId,
    },
  });

  if (!review) {
    return next(
      new AppError(
        "review does not exist, or does not belong to another restaurant",
        400
      )
    );
  }
  req.review = review;
  next();
});
