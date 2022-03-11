import express from 'express';
import { createPost, updatePost, getAllPosts,getPost,deletePost } from "../controller/post-controller.js";
import {uploadImage, getImage} from "../controller/image-controller.js";
import upload from "../utils/upload.js";
import {createComment,getAllComments} from "../controller/comment-controller.js";
const router = express.Router();

router.post('/createPost',createPost);
router.post('/createComment',createComment);
router.get('/posts',getAllPosts);
router.get('/post/:id',getPost);
router.get('/comment/:id',getAllComments);
router.post('/updatePost/:id',updatePost);
router.delete('/deletePost/:id',deletePost);
router.post('/file/upload',upload.single("file"),uploadImage);
router.get("/file/:filename",getImage)
export default router;