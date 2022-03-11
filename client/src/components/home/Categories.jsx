import { Button, makeStyles, Grid,Box ,Table, TableCell, TableRow, TableBody, TableHead } from "@material-ui/core";
import { categories } from "../../constants/data";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AccountContext } from "../../context/AccountProvider";
import { CategoryContext } from "../../context/CategoryProvider";
import { GoogleLogout,GoogleLogin } from "react-google-login";
import { useContext } from "react";
const useStyles = makeStyles({
    create: {
        margin: 20,
        backgroundColor: '#6495ed',
        color: 'white',
        width: '86%'
    },
    table:{
        border: '1px solid',
        color: `rgba(224,224,224,1)`
    }
})

const Categories = () => {
    const clientId = "331587353711-jkk8qtcvj7ev887l863vhrigjk14r32m.apps.googleusercontent.com"
    const { account, setAccount } = useContext(AccountContext);
    
    
    const onLoginSuccess = async (res) => {
      setAccount(res.profileObj);
      // await addUser(res.profileObj);
      console.log(res.profileObj);
      
    }
  
    const onLoginFailure = () => {
      console.log("Login Failed");
    }
    const classes = useStyles();
    const navigate = useNavigate();
    const {category, setCategory} = useContext(CategoryContext);
    const handleClick = (item)=>{
        setCategory(item);
        
    }
    return (
        <>
            {
                account ? <Link to="/createPost" style={{textDecoration:'none', color:'inherit'}}>
                <Button className={classes.create} variant="contained">WRITE BLOG</Button>
                </Link> : <Box style={{margin:20}}><GoogleLogin
              cookiePolicy={'single_host_origin'}
              clientId={clientId}
              
              isSignedIn={true}
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}

            /></Box>
            }
            
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={()=>setCategory("All")}>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map((item) => (
                            <TableRow>
                                <TableCell onClick={()=> handleClick(item)}>
                                    {item}
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </>
    )
}

export default Categories;