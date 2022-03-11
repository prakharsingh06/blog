import { Box, Button, InputBase, makeStyles, TextareaAutosize } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import {AccountTree, AddCircle} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../service/api";
import { AccountContext } from "../../context/AccountProvider";
const useStyles = makeStyles((theme)=>({
    container :{
        padding: '0 100px',
        [theme.breakpoints.down('md')] : {
            padding : 0,
        }
    },
    image: {
        width : '100%',
        heigth: '50vh',
        objectFit : 'cover'
    },
    form : {
        display:'flex',
        flexDirection :'row',
        marginTop : '10px'
    },
    textField : {
        flex : 1,
        margin : '0 30px',
        fontSize : 25
    },
    textArea : {
        width : '100%',
        marginTop : '50px',
        border : 'none',
        fontSize : 18,
        '&:focus-visible' : {
            outline: 'none'
        }
    }
}))    

const UpdatePost = ()=>{
    const {account} = useContext(AccountContext);
    const initialValues = {
        title : "",
        description : "",
        picture : "",
        userName : account.name,
        categories : 'All',
        createdDate : new Date(),
        email : account.email
    }
    const classes = useStyles();
    const {id} = useParams();
    const [post,setPost] = useState(initialValues);
    useEffect(()=>{
        const fetchPost = async() =>{
            let response = await getPost(id);
            console.log(response);
            setPost(response);
            
        }
        fetchPost();
    },[]);

    const[url,setUrl] = useState(post.picture);

    const handleChange = (e)=>{
        setPost({...post,[e.target.name] : e.target.value});
    }

    useEffect(()=>{
        setUrl(post.picture);
    },[post]);

    const navigate = useNavigate();
    const updateBlog = async() => {
        console.log(post);
        await updatePost(id,post);
        navigate("/");
    }

    
    return(
       <Box className={classes.container}>
           <img className={classes.image} src={url} alt="banner" />
           <FormControl className={classes.form}>
               
               <InputBase name="title" onChange={(e)=>handleChange(e)} value={post.title} className={classes.textField} ></InputBase>
               <Button onClick={()=>updateBlog()} variant="contained" color="primary">Update</Button>
           </FormControl>
           <FormControl className={classes.form}>
               <InputBase name="picture" onChange={(e)=>handleChange(e)} value={post.picture} className={classes.textField} ></InputBase>
           </FormControl>
           <TextareaAutosize name="description" onChange={(e)=>handleChange(e)} value={post.description} rows={5}
           className={classes.textArea}/>
       </Box> 
       
    )
}

export default UpdatePost;