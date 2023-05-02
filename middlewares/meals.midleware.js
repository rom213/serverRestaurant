const Meal = require("../models/meals.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validIfExistMeal=catchAsync(async(req, res, next)=>{
    const { id } = req.params;
    
    const meal= await Meal.findOne({
        where:{
            id,
            status:'active'
        }
    })
    if (!meal) {
        return next(new AppError('meal not found',404))
    }
    req.meal=meal
    next()

})

