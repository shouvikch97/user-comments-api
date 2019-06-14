const express = require('express')
const path=require('path')
const bodyparser=require('body-parser')
const userRoute=require('./routes/user')
const commentRoute=require('./routes/comment')



const app = express()
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(userRoute)
app.use(commentRoute)

const port = process.env.PORT||3000

//error 400
app.use((req,res,next)=>{
    res.status(404).send("We think you are lost")
})
//error 500
app.use((err,req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public/500.html'))
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
