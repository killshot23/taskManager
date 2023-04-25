const mongoose = require('mongoose');

const connectDB= (url)=>{
    return mongoose
    .connect(url,{
        useUnifiedTopology:true,
        useFindAndModify:true,
        useNewUrlParser:true,
        useCreateIndex:true

    })
}


module.exports = connectDB;

    