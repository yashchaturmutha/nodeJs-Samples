const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv/config');

app.use(express.json());

//IMPORT ROUTES
const postsRoute=require('./routes/posts');
const coursesRoute=require('./routes/courses');

//Middleware
app.use('/posts',postsRoute);
app.use('/courses',coursesRoute);

app.get('/',(req,res)=>{
    res.send("APP.JS");
});

// mongoose.connect('mongodb://localhost:27017/TestDB',(err)=>{
//     if(err)
//     console.log(err);
//     else
//     console.log("DB Connected");
// });

// const testSchema=mongoose.Schema({
//     name:String
// })

// //Collection entered is singular, mongo converts into plural
// const testModel=new mongoose.model("Collection",testSchema);

// const data=new testModel({
//     name:'new course update'
// });
// data.save();

mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("DataBase Connected");
});

const PORT=process.env.PORT || 3000;

app.listen(3000,()=>console.log(`Listening ${PORT}`));