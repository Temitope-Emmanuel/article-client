import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {Paper,Box} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding:theme.spacing(2,0),
    margin:theme.spacing(5,2),
    borderRadius:"5em .3em 5em .3em",
    border:"2px solid rgba(255,255,255,.8)",
    width:"70vw",
  },
  chip:{
    width:"8em",
    height:"2.6em",
    borderRadius: "6em",
    margin:theme.spacing(2,1),
    fontSize:"1.2em",
    "& > div":{
      transition:"all .3s ease-in",
    },
    "& > span":{
      transition:"all .5s ease-in-out"
    },
      "&:hover":{
        backgroundColor:"rgba(0,0,0,.3)",
        "& > div":{
          backgroundColor:"white",
          color:"black"
        },
        "& > span":{
          fontWeight:500
        }
      }
  },
  avatar:{
    backgroundColor:"black",
    color:"white",
    height:"1.5em !important",
    width:"1.5em !important",
    fontSize: "25px !important",
    marginRight:"auto",
    marginLeft: "9px",
    boxShadow:"0 0 3px 3px rgba(0,0,0,.5)"
  },
  active:{
    boxShadow:"0px 0px 10px 5px black",
  }
}));

const ChipComponent = ({category,...props}) => {
  const classes = useStyles();

  
  const handleClick = (e) => () => {
    props.setCategory(e)
  };

  return (
    <>
    {/* <Paper elevation={13} className={classes.root}> */}
      <Chip className={`${classes.chip} ${category == "Education" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Education" onClick={handleClick("Education")} />
      <Chip className={`${classes.chip} ${category == "Science" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Science" onClick={handleClick("Science")} />
      <Chip className={`${classes.chip} ${category == "Relationships" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Relationships" onClick={handleClick("Relationships")} />
      <Chip className={`${classes.chip} ${category == "GEN" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="GEN" onClick={handleClick("GEN")} />
      <Chip className={`${classes.chip} ${category == "Business" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Business" onClick={handleClick("Business")} />
      <Chip className={`${classes.chip} ${category == "Technology" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Technology" onClick={handleClick("Technology")} />
      <Chip className={`${classes.chip} ${category == "Food" && classes.active}`} 
      avatar={<Avatar className={classes.avatar} >#</Avatar>}
       label="Food" onClick={handleClick("Food")} />
    {/* </Paper> */}
    </>
  );
}

export default ChipComponent