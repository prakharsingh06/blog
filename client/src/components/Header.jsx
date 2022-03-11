import {AppBar, Toolbar,Typography, makeStyles} from "@material-ui/core";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
const useStyles = makeStyles({
    component : {
        backgroundColor : '#ffffff',
        color: 'black'
    },
    container : {
        justifyContent: 'center',
        '& > *' :{
            padding : '20px'
        }
    }
})

const Header = ()=> {
    const clientId = "331587353711-jkk8qtcvj7ev887l863vhrigjk14r32m.apps.googleusercontent.com"
    const { account, setAccount } = useContext(AccountContext);
    
    const onSuccess = () => {

        alert("Logged Out Successfully");
    
        console.clear();
        setAccount('');
        
    
      }
    const onLoginSuccess = async (res) => {
      setAccount(res.profileObj);
      // await addUser(res.profileObj);
      console.log(res.profileObj);
      
    }
  
    const onLoginFailure = () => {
      console.log("Login Failed");
    }
const classes = useStyles();
    return(
       <AppBar className={classes.component}>
           <Toolbar className = {classes.container}>
               <Link to ="/" style={{textDecoration:'none',color:'inherit'}}><Typography>HOME</Typography></Link>
               <Typography>ABOUT</Typography>
               <Typography>CONTACT</Typography>
               {
               account ? <><GoogleLogout clientId={clientId} buttonText="Logout"
            onLogoutSuccess={onSuccess} /> <Typography style={{marginLeft:'auto'}}>{account.name}</Typography></> :


            <GoogleLogin
              cookiePolicy={'single_host_origin'}
              clientId={clientId}

              isSignedIn={true}
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}

            />}
           </Toolbar>
        </AppBar>
    )
}

export default Header;