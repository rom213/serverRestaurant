const Meal = require("../models/meals.model");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validExistOrder=catchAsync(async(req,res, next)=>{
    const { id } = req.params
    const order= await Order.findOne({
        where:{
            id,
            status:'active'
        }
    })

    if (!order) {
        return next(new AppError('order not found',404))
    }

    req.order=order
    next()
})

exports.validExistMeal=catchAsync(async(req,res,next)=>{
    const { mealId }=req.body
     
    const meal= await Meal.findOne({
        where:{
            id:mealId,
            status:'active'
        }
    })

    if (!meal) {
        next(new AppError('meal not found',404))
    }

    req.meal=meal;
    next()

})

exports.orderValidUser=catchAsync(async(req,res,next)=>{
   const { sessionUser, order }= req
   
   if (sessionUser.id!=order.userId) {
    return next(new AppError('Unauthorized',401))
   }
  
   next()
})

