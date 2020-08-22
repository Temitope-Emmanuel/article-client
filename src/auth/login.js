import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom"
import {Slide,Box,Typography,TextField} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles"
import AppleIcon from '@material-ui/icons/Apple';
import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/MailOutline';
import ArrowIcon from '@material-ui/icons/ArrowBackIosOutlined';

const useStyles = makeStyles(theme => ({
    title:{
        textAlign:"center",
        "& > h2":{
            fontSize:"1.8em"
        }
    },
    root:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        padding:theme.spacing(2,0),
    },
    buttonContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"60%",
        padding:theme.spacing(0,3),
        textAlign:"center",
        "& > button":{
            margin:theme.spacing(2,0),
            border:"2px solid rgba(0,0,0,.5)",
            padding:theme.spacing(1.5,2),
            width:"inherit",
            "& > span":{
                display:"flex",
                alignItems:"center",
                textTransform:"none",
                "& svg":{
                    marginRight:".5em",
                    fontSize:"2em"
                }
            }
        },
        "& > p":{
            margin:"1.5em 0",
            "& a":{
                textDecoration:"none",
                color:"rgba(0,0,0,.8)"
            }
        }
    },
    actionContainer:{
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        margin:theme.spacing(2,0)
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AllOption = ({classes,handleToggle,handleOption,slide,...props}) => {

    
    return(
        <Slide direction="left" in={slide}>
        <DialogContent className={classes.root}>
          <DialogContentText style={{textAlign:"center"}}  id="alert-dialog-slide-description">
          Create an account to receive great stories in <br/>
           your inbox, personalize your homepage, and <br/>
            follow authors and topics that you love.
          </DialogContentText>
          <Box className={classes.buttonContainer}>
              <Button>
                  <AppleIcon/>
                  <Typography caption="button">
                      Register with Apple
                  </Typography>
              </Button>
              <Button>
                  <FacebookIcon/>
                  <Typography caption="button">
                      Register with Facebook
                  </Typography>
              </Button>
              <Button onClick={() => handleOption()}>
                  <MailIcon/>
                  <Typography caption="button">
                      Register with Email
                  </Typography>
              </Button>
              <Typography>
                  Already have an account? <Link onClick={() => handleOption(false)} to="/login">login here</Link>
              </Typography>
          </Box>
        </DialogContent>
        </Slide>
    )
}
const LoginForm = ({classes,handleToggle,slide,register,...props}) => {
    return(
        <Slide direction="right" in={!slide}>
            <DialogContent className={classes.root}>
            <DialogContentText style={{textAlign:"center"}}
              id="alert-dialog-slide-description">
                  {register ? "Enter your email address to create an account" : "Input your email to login"}
            </DialogContentText>
            <Box className={classes.buttonContainer}>
            <TextField required id="Input Email"
                style={{margin:"3em 0"}} fullWidth
                inputProps={{
                    placeholder:"Input your email"
                }}
                margin="dense" label="Enter Your Email Address"/>
                <Button style={{backgroundColor:"black",color:"whitesmoke"}}>Continue</Button> 
            </Box>
            </DialogContent>
        </Slide>
    )
}

const Login = ({open,handleToggle,...props}) => {
    const classes = useStyles()
    const [options,setOptions] = React.useState(true)
    const [register,setRegister] = React.useState(true)
    const handleRegister = (val) => {
        setRegister(val)
    }
    const handleOptions = (val = true) => {
        setOptions(!options)
        handleRegister(val)
        console.log(`this is the register value ${register}`)
    }
 
    return (
      <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        scroll={"paper"}
        maxWidth={"md"}
        onClose={handleToggle}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title"
            className={classes.title}>
            {options ? "Join Campus Magazine" : register ? "Register with Email" : "Login with Email"}
          </DialogTitle>
        
                { options ? <AllOption slide={options} handleOption={handleOptions}
                 handleToggle={handleToggle}
                classes={classes} /> :
                <LoginForm slide={options} register={register} classes={classes} />
                }
           <DialogActions className={classes.actionContainer}>
               {
                   options ?
                   <>
                <Button onClick={handleToggle} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleToggle} color="primary">
                    Agree
                </Button>
                </>
                 :
                <Button onClick={() => handleOptions()} >
                    <ArrowIcon/>
                    All signin options
                </Button>
               }
            </DialogActions>
      </Dialog>
  );
}

export default Login