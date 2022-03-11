import { Box, Button, InputBase, makeStyles,InputLabel,Select, TextareaAutosize } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { createPost,uploadFile } from "../../service/api";
import { AccountContext } from "../../context/AccountProvider";
import {useNavigate} from "react-router-dom";
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
        margin : '10px 30px',
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


const CreatePost = ()=>{
    const {account} = useContext(AccountContext);

    const initialValues = {
        title : "",
        description : "",
        picture : "https://www.jimdo.com/static/7f58e83e14a16db25da8e56995f710b8/3e79b/hero.jpg",
        userName : account ? account.name : 'Anonymous',
        categories : 'All',
        createdDate : new Date(),
        email : account.email
    }
    const [post, setPost] = useState(initialValues);
    const [url,setUrl] = useState('https://www.jimdo.com/static/7f58e83e14a16db25da8e56995f710b8/3e79b/hero.jpg');
    
    const classes = useStyles();
    const handleChange = (e)=>{
        setPost({...post,[e.target.name] : e.target.value});
    }
    useEffect(()=>{
        setUrl(post.picture);
    },[post]);
    const navigate = useNavigate();
    const savePost = async() => {
        console.log(post);
        
        await createPost(post);
        navigate("/"); 
    }
    
    
    // useEffect(()=>{
    //     const getImage = async()=>{
    //         if(file) {
    //             const data = new FormData();
    //             data.append("name", file.name);
    //             data.append("file",file);
    //             const image = await uploadFile(data);
    //             post.picture = image.data;
    //             setImage(image.data);
    //         }
    //     }
    //     getImage();
    // },[file])

    return(
       <Box className={classes.container}>
           <img className={classes.image} src={url} alt="banner" />
           <FormControl className={classes.form}>
               
               <InputBase name="title" onChange={(e)=>handleChange(e)} className={classes.textField} placeholder="Title"></InputBase>
               <Button onClick={()=> savePost()} variant="contained" color="primary">Publish</Button>
           </FormControl>
           <FormControl className={classes.form}>
            <InputLabel className={classes.textField} htmlFor="age-native-simple"></InputLabel>
            <Select
            native
            value={post.categories}
            className={classes.textField}
            onChange={(e)=>handleChange(e)}
            inputProps={{
            name: 'categories',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" disabled>Select Category</option>
          <option value="All">All</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          
          
          
        </Select>
      </FormControl>
            <FormControl className={classes.form}>   
            <InputBase name="picture" onChange={(e)=>handleChange(e)} className={classes.textField} placeholder="Enter Image URL"></InputBase>
            </FormControl>
           <TextareaAutosize name="description" onChange={(e)=>handleChange(e)} rows={5} placeholder="Write something...."
           className={classes.textArea}/>
       </Box> 
       
    )
}

export default CreatePost;