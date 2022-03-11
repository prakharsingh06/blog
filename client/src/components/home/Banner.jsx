import { makeStyles,Box,Typography } from "@material-ui/core"



const useStyles = makeStyles({
    image:{
        background : `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuub1qqprhrAi5nC5Yol6grcv1y4xblegZKA&usqp=CAU'}) center/55% repeat-x #000000`,
        width : '100%',
        height : '50vh',
        alignItems : 'center',
        display: 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        '& > *':{
            fontSize :70,
            color : 'white',
            // backgroundColor : 'black',
            // padding:'5px'
        }
    }
})

const Banner = ()=>{
    const classes = useStyles();
    return(
        <Box className={classes.image}>
            <Typography>Blog Box</Typography>    
            
        </Box>
    )
}

export default Banner;

