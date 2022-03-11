import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
        desc : String,
        blogId : String,
        userName : String,
        email : String
});

const comment =  mongoose.model('comment', CommentSchema);

export default comment;
    

    