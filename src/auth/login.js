import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom"
import {Slide,Box,Typography,TextField, IconButton} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles"
import AppleIcon from '@material-ui/icons/Apple';
import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/MailOutline';
import ArrowIcon from '@material-ui/icons/ArrowBackIosOutlined';
import {create} from "./api-user"
import {login} from "./api-auth"
import inputState from "../hook/inputState"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {authenticate} from "./auth-helper"

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
    },
    inputContainer:{
        padding:theme.spacing(.5,1),
        "& > div":{
            margin:"18px 0 !important"
        }
    },
    button:{
        fontSize:"1.1em",
        padding:".4em 1em"
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
                  Already have an account? <Link onClick={() => handleOption(false)} to="/">login here</Link>
              </Typography>
          </Box>
        </DialogContent>
        </Slide>
    )
}

const LoginForm = ({classes,handleToggle,slide,register,handleMessage,...props}) => {
    const [email,setEmail,resetEmail] = inputState("")
    const [username,setUsername,resetUsername] = inputState("topeojo")
    const [password,setPassword,resetPassword] = inputState("")
    const [visible,setVisible] = React.useState(false)
    const [submit,setSubmit] = React.useState(true)
    const [isSubmitting,setIsSubmitting] = React.useState(false)
    const [error,setError] = React.useState("")
    console.log(props)
    React.useEffect(() => {
        const isSubmit = isValid()
        setSubmit(!isSubmit)
        setError("")
    },[email,password,username])
    
    const isValid = () => {
        return [email,password,username].every(i => i.length > 4)
    }
    const handleVisible = () => {
        setVisible(!visible)
    }
    const resetInput = () => {
        resetPassword()
        resetEmail()
        resetUsername()
    }
    
    const handleSubmit = () => {
        setIsSubmitting(true)
        const payload = {
            username,
            password,
            email
        }
        const response = register ? create(payload) : login(payload)
        console.log("hitting the handle submit func",response)
        response.then(res => res.json())
                .then(data => {
                    console.log("this is the data",data)
                    if(data.error){
                        setError(data.error)
                        handleMessage({
                            type:"error",
                            message:data.error
                        })
                    }else{
                        handleToggle()
                        authenticate({
                            token:data.token,
                            user:data.user
                        },
                        handleMessage({
                            type:"success",
                            message:`${data.message || data.user.username}, Welcome to USM`
                        }))    
                        console.log("this is the successful data",data)
                    }
                })
        resetInput()
        setIsSubmitting(false)
    }
    
    return(
        <Slide direction="left" in={!slide}>
            <DialogContent className={classes.root}>
            <DialogContentText style={{textAlign:"center"}}
              id="alert-dialog-slide-description">
                  {register ? "Enter your email address to create an account" : "Input your email to login"}
            </DialogContentText>
            <Box className={classes.buttonContainer}>
                <Box className={classes.inputContainer}>
                    {register &&
                    <TextField required id="Input Username"
                        value={username}
                        onChange={setUsername}
                        style={{margin:"3em 0"}} fullWidth
                        margin="dense" label="Enter Your Username"
                    />}
                    <TextField required id="Input Email"
                        value={email}
                        onChange={setEmail}
                        style={{margin:"3em 0"}} fullWidth
                        margin="dense" label="Enter Your Email Address"
                    />
                    <TextField required id="Input Your Email"
                        value={password}
                        onChange={setPassword}
                        style={{margin:"3em 0"}} fullWidth
                        type={visible ? 'text':'password'}
                        InputProps={{
                            endAdornment:
                            <InputAdornment position="end" >
                                <IconButton onClick={handleVisible} >
                                    {visible ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                        margin="dense" label="Enter Your Password"
                    />
                </Box>
            <Button disabled={submit || isSubmitting} className={classes.button}
             onClick = {handleSubmit}
             style={{backgroundColor:error.length < 2 ? "black" : "red",color:"whitesmoke"}}>
                        {error.length > 2 ? error : submit ? "Fill email & password" : "Submit"}
                </Button> 
            </Box>
            </DialogContent>
        </Slide>
    )
}

const Login = ({open,handleToggle,handleMessage,...props}) => {
    const classes = useStyles()
    const [options,setOptions] = React.useState(true)
    const [register,setRegister] = React.useState(true)
    const handleRegister = (val) => {
        setRegister(val)
    }
    const handleOptions = (val = true) => {
        setOptions(!options)
        handleRegister(val)
    }

    console.log(props)
    return (
      <Dialog 
        open={open}
        TransitionComponent={Transition}
        keepMounted
        scroll={"paper"}
        fullWidth={true}
        maxWidth={"md"}
        onClose={handleToggle}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title"
            className={classes.title}>
            {options ? "Join Campus Magazine" : register ? "Register with Email" : "Login with Email"}
          </DialogTitle>
        
                { options ? <AllOption slide={options} classes={classes}
                 handleOption={handleOptions}/> :
                <LoginForm handleMessage={handleMessage} handleToggle={handleToggle} slide={options} register={register} classes={classes} />
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