import mongoose from "mongoose";

const Connection = async()=>{
    try {
        const url = "mongodb+srv://admin:admin@blog.ve66c.mongodb.net/blog?retryWrites=true&w=majority"
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
        console.log("Database Connected Successfully");
    }catch(error){
        console.log("Error : ", error.message);
    }
}

export default Connection;