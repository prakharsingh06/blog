import { request } from "express";
import Post from "../model/postSchema.js"

export const createPost = async(req,res)=>{
    try{
        console.log(req.body);
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(200).json("Post Saved to database");
    }catch(error){
        res.status(500).json(error);
    }
}

export const getAllPosts = async(req,res)=>{
    let username = req.query.username;
    let categories = req.query.categories;
    let posts;
    try{
        if(username){
             posts = await Post.find({username : username});
        }
        else if(categories){
             posts  = await Post.find({categories : categories});
        }
        else{
            posts = await Post.find({})
        }
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json(error);
    }
}

export const getPost = async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        console.log(post);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json(error);
    }
}

export const updatePost = async(req,res)=>{
    try{
        console.log(req.body);
       await Post.findByIdAndUpdate(req.params.id,{ $set: req.body});
       res.status(200).json("Post Updated");
    }catch(error){
        res.status(500).json(error);
    }
}

export const deletePost = async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        await post.delete();
        res.status(200).json("Post Deleted Successfully");
    }catch(error){
        res.status(500).json(error);
    }
}