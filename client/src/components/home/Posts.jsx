import { Grid } from "@material-ui/core";
import Post from "./Post";
import { Link, useLocation} from "react-router-dom";
import { CategoryContext } from "../../context/CategoryProvider";
import { useState,useEffect, useContext } from "react";
import {getAllPosts} from "../../service/api";
const Posts = () => {
    const [blogPosts,setBlogPosts] = useState([]);
    const {category} = useContext(CategoryContext);
    useEffect(()=>{
        const getPosts = async()=>{
            const response = await getAllPosts();
            console.log(response.data);
            setBlogPosts(response.data);
        }
        getPosts();        
    },[category]);

    
    
    

    return (
        blogPosts.map((post) => (
            
                post.categories == category ? <Grid item lg={3} sm={4} xs={12}>
                <Link to={`/detailView/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                    <Post title={post.title} description={post.description} userName={post.userName} categories={post.categories} picture={post.picture}/>
                </Link>
                
            </Grid> : null
            
            
        ))
    )
} 

export default Posts;