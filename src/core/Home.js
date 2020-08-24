import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Container,Typography,Button,Box,Paper} from "@material-ui/core"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Chip from "./chip"
import Snackbar from "./snackbar"
import {AlertContext} from "../MainRouter"

const useStyles = makeStyles(theme => ({
  root:{
    margin:theme.spacing(3,0),
    padding:theme.spacing(1.5,0),
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    width:"100vw",
    overflowX:"hidden",
    "& > h2":{
      fontSize:"3em"
    },
    "& > span":{
      fontSize:"1.75em"
    },
    "& > button":{
      padding:"1em 4em",
      fontSize:"1.3em",
      fontWeight:300
    }
  },
  chipContainer:{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding:theme.spacing(2,0),
      margin:theme.spacing(5,2),
      borderRadius:"5em .3em 5em .3em",
      border:"2px solid rgba(255,255,255,.8)",
      width:"70vw"
  }
}))




const Home = () => {
  const classes = useStyles()
  
  return (
    <Box style={{overflowX:"hidden"}}>
      <AlertContext.Consumer>
        {(context) => (
          <>
        <Navbar handleMessage={context.handleAlert} />
        <Snackbar open={context.open} payload={context.payload} />
        </>
        )}
      </AlertContext.Consumer>
      <Container className={classes.root}>
        <Typography variant="h2" >
          Dive deeper on topics that matter to you
        </Typography>
        <Typography component="span" variant="caption" >
          Select what you're into. we'll help ypu find great things
        </Typography>
        <Paper elevation={13} className={classes.chipContainer}>
          <Chip/>
        </Paper>
        <Button style={{
          backgroundColor:"black",
          color:"white",
          borderRadius:"7em"}} >
          Get Started
        </Button>
      </Container>
      <Footer/>
    </Box>
  )
}

export default Home