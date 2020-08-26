import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Typography,Button,Box,Paper,Grid,CssBaseline} from "@material-ui/core"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Chip from "./chip"
import {isAuthenticated} from "../auth/auth-helper"
import MainArticle from "../article/MainArticle"
import FeaturedArticle from "../article/FeaturedArticle"
import SideArticle from "../article/SideArticle"
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {getAllArticle} from "../article/api-article"
import AlertHOC from "./Consumer"


const useStyles = makeStyles(theme => ({
  root:{
    // margin:theme.spacing(3,0),
    // padding:theme.spacing(1.5,0),
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
  },
  mainGrid:{
    marginTop:theme.spacing(3)
  }
}))



const Home = ({context:{handleAlert,...context},...props}) => {
  const [article,setArticle] = React.useState([])
  const classes = useStyles()
  const jwt = isAuthenticated()

  React.useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      getAllArticle({limit:5,page:1},signal).then(response => {
          if(response && response.error){
              handleAlert({type:"error",message:response.error})
          }else{
            const {docs} = response.data
            handleAlert({type:"info",message:"New Article loaded"})
            const newArticle = docs.map((a) => {
              return {
                ...a,
                heading:a.body.split(". ",8)
              }
            })
            setArticle(newArticle)
          }
      })
      return function(){
          abortController.abort()
      }
  },[])

  
  const sidebar = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };
  return (
    <Box style={{overflowX:"hidden"}}>
        <CssBaseline/>
      <Box className={classes.root}>
      {jwt ?
      <>
        <MainArticle article={article[0]} />
        <Grid container spacing={4} >
          {article.map((article,idx) => {
            return(
              <FeaturedArticle key={idx} article={article} />
            )
          })}
        </Grid>
        <Grid container spacing={5} className={classes.mainGrid}>
          <Grid item xs={12} md={8} >
            Feateured 
          </Grid>
          <SideArticle title={sidebar.title} social={sidebar.social}
           description={sidebar.description} archives={sidebar.archives} />
        </Grid>
      </>  
          :
        <>
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
        </>
      }
      </Box>
      <Footer/>
    </Box>
  )
}

export default AlertHOC(Home)