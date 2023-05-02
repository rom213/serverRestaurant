const { ref, getDownloadURL } = require("firebase/storage")
const Meal = require("../models/meals.model")
const Order = require("../models/order.model")
const Restaurant = require("../models/restaurant.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const { storage } = require("../utils/firebase")


exports.createOrder=catchAsync(async(req,res,next)=>{
    const { quantity, mealId }= req.body
    const { meal, sessionUser }=req

    const order=await Order.create({
        quantity,
        mealId,
        totalPrice:(meal.price*quantity),
        userId:sessionUser.id,
    })

    res.status(200).json({
        status:'success',
        message:'order create succesfull',
        order
    })

    
})
exports.ordersUser=catchAsync(async(req,res,next)=>{
    const { sessionUser }=req
    
    const orders = await Order.findAll({
        where:{
            status:'active',
            userId:sessionUser.id
        },
        include:[
            {
                model:Meal,
                attributes:{exclude:['updatedAt','createdAt','status']},
                include:[
                    {
                        model:Restaurant,
                        attributes:{exclude:['address','status','createdAt','updatedAt']}
                    }
                ]
            }
        ],
        attributes:{exclude:['updatedAt','createdAt','status','id','mealId']}
    })
    
    const resolveImg=orders.map(async(order)=>{
        const imgRef=ref(storage,order.meal.postImgUrl);
        const url= await getDownloadURL(imgRef);
        order.meal.postImgUrl=url;
        return order
    })

    await Promise.all(resolveImg)
    
    res.status(200).json({
        status:'success',
        allOrders:orders
    })

})

exports.updateOrderCompleted=catchAsync(async(req,res,next)=>{
    const { order }= req

    await order.update({
        status:'completed'
    })

    res.status(200).json({
        status:'success',
        message:'order completed'
    })

})
exports.deleteOrder=catchAsync(async(req,res,next)=>{
    const { order }= req

    await order.update({
        status:'cancelled'
    })

    res.status(201).json({
        status:'success',
        message:'cancelled order succesfull'
    })

    
})
