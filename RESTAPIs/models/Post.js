const mongoose=require('mongoose');

const testSchema=mongoose.Schema({
    // name:String
    // ,
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//Collection Creation
module.exports=new mongoose.model("CollectionName",testSchema);
