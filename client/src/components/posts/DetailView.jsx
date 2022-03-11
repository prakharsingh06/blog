import { Box, makeStyles, Typography, FormControl,InputBase,Button } from "@material-ui/core";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Edit, Delete, PostAddRounded } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { getPost, deletePost,createComment,getAllComments } from "../../service/api";
import { AccountContext } from "../../context/AccountProvider";
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            padding: 0,
        }
    },
    image: {
        width: '100%',
        heigth: '50vh',
        objectFit: 'cover'
    },
    icons: {
        float: 'right',
    },
    icon: {
        margin: 5,
        border: '1px solid #878787',
        padding: 5,
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    subheading: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        }
    },
    comments: {
        marginTop: 30,
    },
    form : {
        display:'flex',
        flexDirection :'row',
        marginTop : '10px'
    },
    textField : {
        flex : 1,
        margin : '10px 30px',
        fontSize : 18
    },
}))

const DetailView = () => {
    const { account } = useContext(AccountContext);
    const classes = useStyles();
    const url = "https://www.jimdo.com/static/7f58e83e14a16db25da8e56995f710b8/3e79b/hero.jpg"
    const { id } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        const fetchPost = async () => {
            let response = await getPost(id);
            console.log(response);
            setPost(response);

        }
        fetchPost();
    }, []);
    const navigate = useNavigate();
    const removePost = async () => {
        let doDelete = window.confirm("Do you want ro delete this post ? ");
        if (doDelete) {
            await deletePost(post._id);
            alert("Post Deleted Successfully");
            navigate("/");
        } else {
            return;
        }




    }
    const initialValues = {
        desc : "",
        blogId : id,
        userName : account.name,
        email : account.email
    }

    const [comment,setComment] = useState(initialValues);
    const handleChange = (e)=>{
        setComment({...comment,[e.target.name] : e.target.value});
    }

    const [comments,setComments] = useState([]);
    
    useEffect(()=>{
        const getComments = async()=>{
            const response = await getAllComments(id);
            console.log(response.data);
            setComments(response.data);
        }
        getComments();        
    },[]);

    

    const saveComment = async() => {
        console.log(comment);
        
        await createComment(comment);
        
    }

    return (
        <Box className={classes.container}>
            <img className={classes.image} src={post.picture || url} alt="banner" />
            {account.email === post.email ?
                <Box className={classes.icons}>
                    <Link to={`/updatePost/${post._id}`}><Edit color="primary" className={classes.icon} /></Link>
                    <Delete color="error" className={classes.icon} onClick={() => removePost()} />
                </Box> : null}
            <Typography className={classes.heading}>{post.title}</Typography>
            <Box className={classes.subheading}>

                <Typography>
                    Author :<span style={{ fontWeight: '600' }}>{account.email === post.email ? "You" : post.userName} </span>
                </Typography>

                <Typography style={{ marginLeft: 'auto' }}>
                    {new Date(post.createdDate).toDateString()}
                </Typography>
            </Box>
            <Box>
                <Typography>{post.description}</Typography>
            </Box>

            <Box className={classes.comments}>
                {
                    !account ? <Typography  style={{ fontSize: 18, fontWeight: 600 }}>Login to Add Comment</Typography> :
                        <>
                            <Typography style={{ fontSize: 18, fontWeight: 600 }}>Add a comment</Typography>
                            <Box style={{ border: '1px solid black',margin:10 }}>
                                <FormControl className={classes.form}>

                                    <InputBase name="desc" onChange={(e) => handleChange(e)} className={classes.textField} placeholder="Write a comment"></InputBase>
                                    <Button onClick={() => saveComment()} variant="contained" color="primary">Post</Button>
                                </FormControl>
                            </Box>
                            {
                                comments.map((item)=>(
                                    <Box style={{ border: '1px solid black',margin:10 }}>
                                        <Typography>{item.userName}</Typography>
                                        <Typography>{item.desc}</Typography>    
                                    </Box>
                                ))
                            }
                        </>
                }
            </Box>

        </Box>
    )
}

export default DetailView;