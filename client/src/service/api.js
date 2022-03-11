import axios from "axios";

const url = 'http://localhost:8000';

export const createPost = async(post) => {
    try{
        return await axios.post(`${url}/createPost`, post)
    }catch(error){
        console.log("Error while calling Post API : ", error);
    }
}

export const getAllPosts = async()=>{
    try{
        return await axios.get(`${url}/posts`);
    }catch(error){
        console.log('Error while calling getAllPosts api', error);
    }
}

export const getPost = async(id)=>{
    try{
       let response = await axios.get(`${url}/post/${id}`);
        return response.data;
    }catch(error){
        console.log("error while calling getpost Api ", error);
    }
}

export const updatePost = async(id,post) => {
    try{
        return await axios.post(`${url}/updatePost/${id}`, post);
    }catch(error){
        console.log("Error while calling updatePost API : ", error);
    }
}

export const deletePost = async(id)=>{
    try{
        return await axios.delete(`${url}/deletePost/${id}`);
    }catch(error){
        console.log("Error while calling deletePost API : ", error);
    }
}


export const uploadFile = async(data)=>{
    try{
        return await axios.post(`${url}/file/upload`,data);
    }catch(error){
        console.log("Error while calling uploadFile API ", error);
    }
}

export const createComment = async(comment) => {
    try{
        return await axios.post(`${url}/createComment`, comment)
    }catch(error){
        console.log("Error while calling Post API : ", error);
    }
}

export const getAllComments = async(id)=>{
    try{
       let response = await axios.get(`${url}/comment/${id}`);
        return response;
    }catch(error){
        console.log("error while calling getpost Api ", error);
    }
}