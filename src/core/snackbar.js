import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarComponent = ({open,payload:{type,message},...props}) => {
  const classes = useStyles();


  const alertMessage = () => {
    switch(type){
      case "error":
        return <Alert severity="error">{message}</Alert>;
      case "warning":
        return <Alert severity="warning">{message}</Alert>;
      case "info":
        return <Alert severity="info">{message}</Alert>;
      case "success":
        return <Alert severity="success">{message}</Alert>;
      default:
        return <Alert severity="info">{message}</Alert> 
    }
  }
  
  return (
      <Snackbar open={open} autoHideDuration={5000} >
        {
          alertMessage()
        }
      </Snackbar>
  );
}


export default SnackbarComponent