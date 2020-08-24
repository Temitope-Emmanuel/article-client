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
import {TextField,Box} from "@material-ui/core"
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {isAuthenticated} from "../auth/auth-helper"
import Markdown from "markdown-to-jsx"
import useInputState from "../hook/inputState"
import Chips from "../core/chip"
import {createArticle} from "./api-article"

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
  }
}))

const ArticleDialog = ({open,handleToggle,article,handleAlert,...props}) => {
  const [submitting,setSubmitting] = React.useState(false)

  const [title,setTitle,resetTitle] = useInputState("")
  const [category,setCategory] = React.useState("Food")
  const [error,setError] = React.useState("")
  const jwt = isAuthenticated()
  const classes = useStyles()

  const handleCategory = (e) => {
    setCategory(e)
  }
  const handleSubmit = () => {
    setSubmitting(true)
    const payload = {
      body:article,
      title,
      tag:category
    }
    createArticle(payload,{id:jwt.user.id,token:jwt.token})
    .then(data =>{
      if(data && data.error){
        setError(data.error)
        handleAlert({type:"error",message:data.error})
      }else{
        handleAlert({type:"success",message:"New Article successfully Created"})
      }
    })
    setSubmitting(false)
  }

  return (
      <Dialog disable fullWidth={"true"}
        maxWidth={"md"} keepMounted
        onClose={handleToggle} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleToggle}>
          Modal title
        </DialogTitle>
        <DialogContent className={classes.root} dividers>
          <TextField required id="title"
            value={title}
            onChange={setTitle}
            style={{margin:"3em 0"}} fullWidth
            margin="dense" label="Enter the title of the article"
          />
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
            backgroundColor:"#3f4771",
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