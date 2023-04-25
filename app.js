const express = require('express');
const app = express();


const tasks = require('./routes/tasks');
const connectDB= require('./db/connect');
const notFound = require('../starter/middleware/notFound');
const errorHandlerMiddleware= require('../starter/middleware/error-handler');
require('dotenv').config();

//middleware
app.use(express.static('./public'));
app.use(express.json())


//routes 
app.use('/api/v1/tasks',tasks);


app.use(notFound);
app.use(errorHandlerMiddleware);


const port = 3000;

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(` the application is running at the port ${port}`));
    } catch (error) {
        console.log(error)
        
    }
}


start();