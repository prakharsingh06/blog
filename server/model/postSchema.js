import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    description : {
        type : String,
        required : true,
        
    },
    picture :{
        type : String,
        required : false
    },
    userName : {
        type : String,
        required : true,
    },
    categories : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date
    },
    email : {
        type : String
    }
})

const post =  mongoose.model('post', PostSchema);

export default post;