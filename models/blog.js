//calling mongodb + mongoose libery & shema method from mongoose
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const Shema = mongoose.Schema

//create the shema
blog_shema = new Shema({
    title : {
        type : String,
        require : true
    },
    body : {
        type : String,
        require : true
    }
}, {timestamps : true})
// create the model 
const blog = mongoose.model("blog" , blog_shema)

module.exports = blog