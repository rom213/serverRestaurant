const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'api-restaurant',
            version: '1.0.0',

        }
    },
    apis: ['./routes/users.routes.js','./models/user.model.js','./routes/restaurants.routes.js','./models/restaurant.model.js','./routes/meals.routes.js','./models/meal.model.js','./routes/orders.routes.js','./models/order.model.js']
};

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs=(app, port)=>{
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.js', (req, res)=>{
        res.setHeader('Content-type', 'application/json')
        res.send(swaggerSpec)
    })
    console.log(`Docs are avalible at http://localhost:${port}/api/v1/docs`)
}

module.exports=swaggerDocs;