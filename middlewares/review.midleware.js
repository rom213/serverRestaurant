const Review = require("../models/reviews.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validIfExistReview=catchAsync(async(res, req, next)=>{
    const { id }= req.params

    const review = await Review.findOne({
        where:{
            id,
            status:'active'
        }
    })

    if (!review) {
        return next(AppError('review not found',404))
    }
     
    req.review=review;
    
    next()
})