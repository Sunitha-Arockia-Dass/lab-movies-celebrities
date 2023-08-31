const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model')
const MONGO_URI =process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";

mongoose.connect('MONGO_URI')
.then(() => {
    console.log("Connected to MongoDB");
    
    Celebrity.insertMany(dbCelebriyData)
    .then(()=>{
        console.log('successfully added')
    })

})