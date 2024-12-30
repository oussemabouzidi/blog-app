/*
    we have the express app: blog page
    connected to the data base, rooted to html pages
    create a blog and saved it in the mongodb data base, and show
    all the created blogs from the database in the "blog.html" page
    and we can see every single blog alone with the get by id method

*/

//calling liberies
const Http = require("http")
const express = require("express")
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const blog = require("./models/blog")
// creating app + connect to Db + listening to the server
const app = express()
const uri = "mongodb://127.0.0.1:27017/blogs"
mongoose.connect(uri).then((responce)=>{
    console.log("Connected to the data base")
    app.listen(3000 , ()=>{console.log("listening on port : 3000 ...")})
})

//callthe "urlencoded" method
app.use(express.urlencoded({extended : true}))

// create page with the post method
app.post("/new_blog" , (req , res)=>{
    const new_b = new blog(req.body)
    new_b.save().then((result)=>{
        console.log("Blog added")
        res.redirect('/blogs')
    })
})

//delete a blog with the delete method
app.delete("/blog/:id", (req,res)=>{
    //first we get the id
    const id = req.params.id
    blog.findByIdAndDelete(id).then(result =>{
        console.log("Blog deleted")
        res.json({redirect : '/blogs'})
    })
})


// Rooting
app.set('view engine' , 'ejs')// view engine
app.set('views' , 'folder')// the folder


//Rooting the Get:id
app.get("/blog/:id", (req ,res)=>{
    const title = "Blog details"
    const id = req.params.id
    blog.findById(id).then(result =>{
        res.render('details' , {blog : result , title})
    })
})





app.get("/", (req , res)=>{
    const title_index = {title : "Home"}
    res.render('index' , title_index)
})

app.get("/about", (req , res)=>{
    const title_about = {title : "About"}
    res.render('about', title_about)
})

app.get("/blogs" , (req , res)=>{
    const title_blogs = {title : "Blogs"}
    blog.find().then((result)=>{
        res.render('blogs', {...title_blogs , blogs : result})
    })
})

app.get("/create" , (req ,res)=>{
    const title_create = {title : "Creating"}
    res.render('create', title_create)
})

app.use((req , res)=>{
    const title_404 = {title : "Error 404"}
    res.render('404' , title_404)
})