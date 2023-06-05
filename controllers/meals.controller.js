const Meal = require("../models/meals.model")
const Restaurant = require("../models/restaurant.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');


exports.allMeals=catchAsync(async(req,res,next)=>{
    const meals= await Meal.findAll({
        where:{
            status:'active'
        },
        include:[
            {
                model:Restaurant,
                attributes:{exclude:['address','status','createdAt','updatedAt']}
            }
        ],
        attributes:{exclude:['createdAt','updatedAt','status']}
    })
    const resoveImg = meals.map(async(meal)=>{
        const imgRef=ref(storage,meal.postImgUrl);
        const url= await getDownloadURL(imgRef)
        meal.postImgUrl=url
        return meal
    })

    await Promise.all(resoveImg)

    res.status(200).json({
        status:'success',
        message:'all meals',
        meals
    })
})

exports.findOneMeal=catchAsync(async(req,res,next)=>{
    const { id }=req.params

    const meal= await Meal.findOne({
        where:{
            status:'active',
            id,
        },
        include:[
            {
                model:Restaurant,
                attributes:{exclude:['status','createdAt','updatedAt']}
            }
        ],
        attributes:{exclude:['status','createdAt','updatedAt']}
    })
    if (!meal) {
        return next(new AppError('meal not found',404))
    }

    const imgRef=ref(storage,meal.postImgUrl);
    const url= await getDownloadURL(imgRef)

    meal.postImgUrl=url

    res.status(200).json({
        status:'success',
        message:'get one meal',
        meal,
    })
})

exports.createMeal=catchAsync(async(req,res,next)=>{
    const {name, price}=req.body
    const { id }=req.params
    


    const imgRef= ref(storage, `meals/${Date.now()}-${req.files[0].originalname}`);

    const imgUploaded = await uploadBytes(imgRef, req.files[0].buffer);
    
    const meal= await Meal.create({
        name,
        price,
        restaurantId:id,
        postImgUrl:imgUploaded.metadata.fullPath,
    })





    res.status(201).json({
        status:'success',
        message:'create meal succesfull',
        meal
    })
})
exports.updateMeal=catchAsync(async(req,res,next)=>{
    const { meal } =req;
    const { name, price }=req.body

    await meal.update({
        name,
        price,
    })

    res.status(201).json({
        status:'success',
        message:'update meal succesfull'
    })
})

exports.deleteMeal=catchAsync(async(req,res,next)=>{
    const { meal } =req;

    await meal.update({
        status:'disabled'
    })

    res.status(201).json({
        status:'success',
        message:'delete meal succesfull'
    })
})

