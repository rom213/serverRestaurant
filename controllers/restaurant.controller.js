const { ref, getDownloadURL } = require("firebase/storage");
const Meal = require("../models/meals.model");
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/reviews.model");
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../utils/firebase");

exports.findAllrestaurants = async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: "active",
    },
    include: [
      {
        model: Review,
        attributes:{exclude:['updatedAt','createdAt','status','restaurantId','userId']}
      },
      {
        model:Meal,
        attributes:{exclude:['updatedAt','createdAt','status']}
      }
    ],
    attributes:{exclude:['updatedAt','createdAt','status']}

  });

  const imgs=restaurants.map(async(restaurant)=>{
      const im=restaurant.meals.map(async(meal)=>{
        
        const imgRef= ref(storage,meal.postImgUrl);
        const url = await getDownloadURL(imgRef)

        meal.postImgUrl=url
        return meal
      })

      const resolved = await Promise.all(im)
      restaurant.meals=resolved
      return restaurant
  })
  await Promise.all(imgs)

  return res.status(200).json({
    status: "success",
    messagge: "All restaurants",
    restaurants,
  });
};

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: "success",
    messagge: "create restaurant succesfull",
    restaurant,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restauran = await Restaurant.findOne({
    where: {
      status: "active",
      id,
    },
    include: [
      {
        model: Review,
        attributes:{exclude:['updatedAt','createdAt','status','restaurantId','userId']},
      },
      {
        model:Meal,
        attributes:{exclude:['updatedAt','createdAt','status','restaurantId']}
      }
    ],
    attributes:{exclude:['updatedAt','createdAt','status']}
  });

  const resolv=restauran.meals.map(async(meal)=>{
        
    const imgRef= ref(storage,meal.postImgUrl);
    const url = await getDownloadURL(imgRef)

    meal.postImgUrl=url
    return meal
  })

  await Promise.all(resolv)

  res.status(201).json({
    status: "success",
    restauran,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {

  const { restaurant } = req;
  const { name, address } = req.body;
  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: "success",
    message: "update restaurant succesfull",
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant }=req
    await restaurant.update({
        status:'disabled'
    })

    res.status(200).json({
        status:'success',
        message:'delete restaurant succesfull'
    })
});

exports.createReview=catchAsync(async(req, res, next)=>{
    const { rating, comment }= req.body
    const { restaurant, sessionUser }= req
    const review = await Review.create({
        restaurantId: restaurant.id,
        userId:sessionUser.id,
        rating,
        comment
    })

    res.status(201).json({
        status:'success',
        message:'create review succesfull',
        review
    })

})

exports.updateReview=catchAsync(async(req,res,next)=>{
    const { review }= req
    const { comment, rating }= req.body
    await review.update({
        comment,
        rating
    })
    res.status(201).json({
        status:'success',
        message:'update review succesfull'
    })
})

exports.deleteReview=catchAsync(async(req,res,next)=>{
    const { review }= req
    await review.update({
        status:'disabled'
    })
    res.status(201).json({
        status:'success',
        message:'delete review succesfull'
    })
})
