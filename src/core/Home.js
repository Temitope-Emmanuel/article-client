import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Container,Typography,Button,Box} from "@material-ui/core"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Chip from "./chip"
import Snackbar from "./snackbar"

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
  }
}))



const Home = () => {
  const classes = useStyles()
  const [openSnackbar,setOpenSnackbar] = React.useState(false)
  const [alert,setAlert] = React.useState({
    type:"success",
    message:"Login Successful"
  })

  const handleSnackbar = (payload) => {
    setOpenSnackbar(true)
    setAlert(payload)
    setTimeout(() => {
      setOpenSnackbar(false)
    },2000)
  }

  return (
    <Box style={{overflowX:"hidden"}}>
      <Navbar handleMessage={handleSnackbar} />
      <Snackbar open={openSnackbar} payload={alert} />
      <Container className={classes.root}>
        <Typography variant="h2" >
          Dive deeper on topics that matter to you
        </Typography>
        <Typography component="span" variant="caption" >
          Select what you're into. we'll help ypu find great things
        </Typography>
        <Chip/>
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