const Comment = require('../models/comments')
const User = require('../models/users')
const express=require('express')

const router=express.Router()


//create comment
router.post('/comment',async (req,res)=>{
    const _id=req.query.id
    try{
        if(!_id){
            return res.status(400).send("Missing URL parameter: id")
        }
    const usr=await User.findOne({_id})
    if(!usr){
        return res.status(404).send("No such User Found")
    }

     const comment=new Comment()
     comment.content=req.body.content
     comment.owner=usr._id
     await comment.save();

     usr.comments.push(comment._id)
     await usr.save();

     res.status(201).send(comment)
    }
    catch(e){
        res.status(500).send(e)
    }
})

//read comment
router.get('/comment',async (req,res)=>{
    const _id=req.query.id
        
    try{
        if(!_id){
            return res.status(400).send("Missing URL parameter: id")
        }
        const usr=await User.findOne({_id}).populate('comments','content')
        res.send(usr)
    }
    catch(e){
        res.status(500).send(e)
    }
    
})

//edit comment
router.put('/comment',async (req,res)=>{
    const _id=req.query.id
    try{
        if(!_id){
            return res.status(400).send("Missing URL parameter: id")
        }
        const comment=await Comment.findOneAndUpdate({ _id:req.query.id},req.body,{
            new:true,
            runValidators:true
        }
        )
        res.send(comment)
    }
    catch(e){
        res.status(500).send(e)
    }
})
router.delete('/comment',async (req,res)=>{
    const _id=req.query.id
    try{
        if(!_id){
            return res.status(400).send("Missing URL parameter: id")
        }
        const comment=await Comment.findByIdAndRemove(req.query.id)
        res.send({message:"Comment Successfully deleted!"})
    }
    catch(e){
        res.status(500).send(e)
    }

})

module.exports=router