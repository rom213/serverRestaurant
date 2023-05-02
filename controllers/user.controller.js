const catchAsync = require("../utils/catchAsync")
const bcrypt=require('bcryptjs')
const generateJWT = require("../utils/jwt")
const User = require("../models/user.model")
const AppError = require("../utils/appError")
const Order = require("../models/order.model")
const Meal = require("../models/meals.model")
const Restaurant = require("../models/restaurant.model")



exports.login=catchAsync(async(req,res,next)=>{
    const { email, password }=req.body;
    const user= await User.findOne({
      where:{
          email:email.toLowerCase(),
          status:'active'
      }
    })

    if (!user) {
      return next(new AppError('the user could not be found'),404)
    }

    if (!(await bcrypt.compare(password,user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    const token = await generateJWT(user.id)

    res.status(200).json({  
        message:"success",
        token,
        user:{
          id:user.id,
          name:user.name,
          email:user.email,
          role:user.role
        }
    })



})



exports.signup=catchAsync(async(req,res,next)=>{
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);
  
    const user = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });
  
    const token = await generateJWT(user.id);
  
    res.status(201).json({
      status: 'success',
      message: 'The user has been created succesfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
})


exports.findOneOrderUser=catchAsync(async(req,res,next)=>{
  const { id } = req.params
  const order= await Order.findOne({
      where:{
          id,
          status:'active'
      },
      include:[
        {
          model:User,
          attributes:{exclude:['updatedAt','createdAt','status','role','password']},
        }
      ],
      attributes:{exclude:['updatedAt','createdAt','status']}
  })

  if (!order) {
      return next(new AppError('order not found',404))
  }
  const { sessionUser }= req 
    if (order.userId!=sessionUser.id) {
      next(new AppError('order does not belong to the user',423))
    }


 
    res.status(200).json({
      status:'success',
      message:'order user',
      order
    })    
})

exports.updateUser=catchAsync(async(req,res,next)=>{
  const { name, email }= req.body;
  const { user }= req

  await user.update({
    name,
    email
  })

  res.status(200).json({
    status:'success',
    message:'update user'
  })

})
exports.delete=catchAsync(async(req,res,next)=>{
    const { user }= req

    await user.update({
      status:'disabled'
    })

    res.status(200).json({
      status:'success',
      message:'delete user'
    })
})