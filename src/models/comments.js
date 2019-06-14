const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/user-api',{
    useNewUrlParser: true,
    useCreateIndex:true
})
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})
    
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment