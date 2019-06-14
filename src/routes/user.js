const User = require('../models/users')
const express=require('express')

const router=express.Router()

//create user
router.post('/user',(req,res)=>{
if(!req.body){
    return res.status(400).send('Request body is missing')
}

const model= new User(req.body)
model.save()
.then(doc =>{
    if(!doc || doc.length ===0){
        return res.status(500).send(doc)
    }
    res.status(201).send(doc)
})
.catch(err =>{
    res.status(500).json(err)
})

})

//read user by id
router.get('/user',(req,res)=>{
    const id=req.query.id
    if(!id){
        return res.status(400).send('Missing URL parameter : id')
    }
    User.findById(id)
    .then(user =>{
        if(!user){
            return res.status(404).send('No User Found!')
        }
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send(err)
    })
})

//read user by interest 'coding'
router.get('/user/coding',(req,res)=>{
    // const intr=req.query.interest
    // if(!intr){
    //     return res.status(400).send('Missing URL parameter : interest')
    // }
    User.find({ interests:{$in: ['coding']} })
    .then(user =>{
        if(!user){
            return res.status(404).send('No User found')
        }
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send(err)
    })
})

//update user
router.put('/user',(req,res)=>{
    const id=req.query.id
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','phone','designation','address','interests']
    const isValidOperation=updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'invalid updates'});
    }
    if(!id){
       return res.status(400).send('Missing URL parameter : id')
    }
    User.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    })
    .then(doc =>{
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

//delete user
router.delete('/user',(req,res)=>{
    const id=req.query.id
    if(!id){
       return res.status(400).send('Missing URL parameter :id')
    }
    User.findByIdAndRemove(id)
    .then(doc =>{
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

module.exports=router