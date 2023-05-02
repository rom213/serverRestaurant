const cors=require('cors');
const express=require('express')
const morgan=require('morgan');

const restaurantRouter=require('./routes/restaurants.routes');
const userRouter=require('./routes/users.routes');
const mealsRouter=require('./routes/meals.router')
const ordersRouter=require('./routes/orders.router')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller')

const app=express()



if (process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
}

app.use(express.json())


app.use('/api/v1/restaurants',restaurantRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/meals',mealsRouter)
app.use('/api/v1/orders',ordersRouter)



app.all('*', (req,res, next)=>{
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`,404))
})

app.use(globalErrorHandler)

module.exports=app



