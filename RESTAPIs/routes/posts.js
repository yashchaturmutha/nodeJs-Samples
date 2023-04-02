const express=require('express');
const router=express.Router();
const testModel=require('../models/Post');

//GET POST
// get  post , etc requests are asynchronous
router.get('/', async (req,res)=>{
    // res.send('<h2>We are on get request</h2>');
    res.send( await testModel.find());
});

//SUBMIT POST
router.post('/',async (req,res)=>{
    // res.send('<h2>We are on post request</h2>');
    
    //new document for collection testModel
    const post=new testModel({
        title:req.body.title,
        description: req.body.description
    });

    const savedPost=await post.save();

    res.send(savedPost);
    //we get data printed in console coz body parser included by default in express v16+ 
    console.log(req.body);
});

//RETRIEVE SPECIFIC POST
router.get('/:postID',async (req,res)=>{

    const selectedPost=await testModel.findById(req.params.postID);

    if(selectedPost)
    res.send(selectedPost);
    // res.json(selectedPost);
    else
    res.json({message : err});

});

//DELETE SPECIFIC POST
router.delete('/:postID',async (req,res)=>{
    const deletedPost=await testModel.remove({_id:req.params.postID});

    if(deletedPost)
    res.send(deletedPost);
    else
    res.json({message : err});

});

//UPDATE SPECIFIC POST

router.patch('/:postID',async (req,res)=>{
    const updatedPost=await testModel.update(
        {_id : req.params.postID},
        {$set: { "title" :req.body.title }});

        if(updatedPost)
        res.send(updatedPost);
        else
        res.json({message : err});
})

module.exports=router;
