import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import {TextField,Box,FormControlLabel,Switch} from "@material-ui/core"
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {isAuthenticated} from "../auth/auth-helper"
import Markdown from "markdown-to-jsx"
import useInputState from "../hook/inputState"
import Chips from "../core/chip"
import {createArticle} from "./api-article"
import {green,deepPurple} from "@material-ui/core/colors"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    "& button":{
      padding:theme.spacing(1,2.7),
      "& svg":{
        marginRight:".3em"
      }
    }
  }
}))(MuiDialogActions);

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: "9em",
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    overflow:"visible !important"
  },
  switchBase: {
    padding: 1,
    transform: 'translateY(-.3em)',
    '&$checked': {
      transform: 'translate(4.3em,-.3em)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: 'black',
        opacity: 1,
        border: 'none',
      },
      "& $thumb":{
        color:deepPurple[100]
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 35,
    height: 35,
    border:`2px solid ${deepPurple["A200"]}`,
    color:"#3f4771"
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: deepPurple["A700"],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles(theme => ({
  root:{
    "& > span":{
      marginTop:theme.spacing(3),
      fontSize:"1.2em"
    }
  },
  chipContainer:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr 1fr",
    gridTemplateRows:"auto",
    justifyItems:"center",
    alignContent:"center",
    flexDirection:"column",
    minWidth:"60%",
    marginBottom:"30px",
    "div:last-child":{
      margin:"auto !important",
      justifySelf:"center"
    }
  },
  bodyContainer:{
    border:"2px solid rgba(0,0,0,.5)",
    borderRadius:".5em",
    marginBottom:theme.spacing(3),
    padding:theme.spacing(3),
    backgroundColor:"whitesmoke",
    minHeight:"40vw",
    overflowY:"auto"
  },
  input:{
    display:"none"
  },
  urlContainer:{
    transition:"all .5s ease-in",
    margin:"3em 0"
  },
  switchContainer:{
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    transition:"all .5s ease-in"
  },
  inputContainer:{
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"center",
    marginTop:"35px"
  }
}))

const ArticleDialog = ({open,handleToggle,article,handleAlert,...props}) => {
  const [submitting,setSubmitting] = React.useState(false)
  const [urlImage,setUrlImage] = React.useState(true)
  const [imageInput,setImageInput] = React.useState(null)
  const [imageLink,setImageLink,resetImageLink] = useInputState("")
  const [title,setTitle,resetTitle] = useInputState("")
  const [category,setCategory] = React.useState("Food")
  const jwt = isAuthenticated()
  const classes = useStyles()

  const handleCategory = (e) => {
    setCategory(e)
  }
  const handleUrlChange = () => {
    setUrlImage(!urlImage)
  }
  const handleImageUpload = e => {
    const value = e.target.files[0]
    setImageInput(value) 
  }
  console.log(handleAlert)
  const handleSubmit = () => {
    setSubmitting(true)
    const articleData = new FormData();
      articleData.append('title',title)
      articleData.append('tag',category)
      articleData.append('body',article)
      if(urlImage){
        articleData.append('imageLink',imageLink)
      }else{
        articleData.append('image',imageInput)
      }
    
      createArticle(articleData,{id:jwt.user._id || jwt.user.id,token:jwt.token},false)
    .then(data => {
      setSubmitting(false)
      console.log(data)
      if(data && data.error){
        handleAlert({type:"error",message:data.error})
      }else{
        handleAlert({type:"success",message:"New Article successfully Created"})
      }
    }).catch(err => console.log(err))
  }
  return (
      <Dialog disable fullWidth={"true"}
        maxWidth={"md"} keepMounted
        onClose={handleToggle} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleToggle}>
          New Article
        </DialogTitle>
        <DialogContent className={classes.root} dividers>
          <TextField required id="title"
            value={title}
            onChange={setTitle}
            style={{margin:"3em 0"}} fullWidth
            margin="dense" label="Enter the title of the article"
          />
          <Box className={classes.switchContainer}>
            <Box style={{width:"20em"}} >
              <TextField id="image url" 
                value={imageLink} disabled={!urlImage} className={classes.urlContainer}
                onChange={setImageLink} focused={urlImage}
                style={{ width:urlImage && "100%"}}
                margin="dense" label="Enter Image url"
              />
            </Box>
            <FormControlLabel
            control={
              <IOSSwitch checked={!urlImage} onChange={handleUrlChange} />
            }
            />
            <Box className={classes.inputContainer} >
              <input accept="image/*" onChange={handleImageUpload}
              className={classes.input} id="icon-button" type="file" />
              <label htmlFor={ !urlImage && "icon-button"} >
                <Button style={{backgroundColor: !urlImage ? "#3f4771": "grey",color:"black"}}
                  disabled={urlImage} variant="contained" component="span" >
                  Upload Photo
                  <FileUpload/>
                </Button>
              </label>
              <span className={classes.filename}>{imageInput ? imageInput.name : ''}</span><br/>
            </Box>
          </Box>
            <Typography style={{textAlign:"center"}} variant="h5" >
              Please Select One Category
            </Typography>
            <Box className={classes.chipContainer}>
              <Chips category={category} setCategory={handleCategory} />
            </Box>
              <Typography variant="caption" >
                Created on {new Date().toLocaleString()}
              </Typography>
            <Box className={classes.bodyContainer}>
              <Markdown>
                {article}
              </Markdown>
            </Box>
          </DialogContent>
        <DialogActions>
          <Button style={{
            backgroundColor:"black"
          }} onClick={handleToggle} color="primary">
            <BookmarksOutlinedIcon/>
            Stash
          </Button>
          <Button onClick={handleSubmit} 
            disabled={title.length < 3 || submitting} style={{
            backgroundColor:title.length < 3 ? "grey" : "#3f4771",
            color:"black"
          }}>
          <SaveAltIcon/>
            { title.length < 3 ? "Please Fill in title Name" : submitting ? "Creating New Article" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ArticleDialog