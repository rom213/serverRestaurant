const Meal = require("./meals.model");
const Order = require("./order.model");
const Restaurant = require("./restaurant.model");
const Review = require("./reviews.model");
const User = require("./user.model");

const initModel = () => {

  Restaurant.hasMany(Meal,{foreignKey:'restaurantId'});
  Meal.belongsTo(Restaurant,{foreignKey:'restaurantId'})

  Meal.hasOne(Order)
  Order.belongsTo(Meal)
  
  User.hasMany(Order)
  Order.belongsTo(User)
  
  User.hasMany(Review)
  Review.belongsTo(User)
  
  Restaurant.hasMany(Review)
  Review.belongsTo(Restaurant)
};

module.exports=initModel
