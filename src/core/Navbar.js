import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Link,withRouter} from  "react-router-dom";
import {Toolbar,Button,Avatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {green} from "@material-ui/core/colors"
import Login from "../auth/login"
import {NavImg1} from "../asset"
import SearchIcon from '@material-ui/icons/Search';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import FacebookIcon from "@material-ui/icons/Facebook"
import TwitterIcon from "@material-ui/icons/Twitter"
import InstagramIcon from "@material-ui/icons/Instagram"
import {isAuthenticated} from "../auth/auth-helper"
import {AlertContext} from "../MainRouter"
import Menu from "./Menu"
import TagsTab from "./tagsTab"
import AlertHOC from "./Consumer"



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    width:"6em",
    height:"3em"
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  appBar:{
    backgroundColor:"rgba(255,255,255,.2)",
    color:"black",
    "& > div":{
      padding:theme.spacing(.2,1),
      paddingLeft:"6em",
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    overflow:"hidden",
    flex:1,
    marginLeft: 0,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    "& > a":{
      height:"100% !important",
      textDecoration:"none !important",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      color:"rgba(0,0,0,0.6)",
      width:"15%",
      height:"34px",
      cursor:"pointer",
      "&::after":{
        content:"' '",
        display:"block",
        height:"2.5px !important",
        width:"0%",
        backgroundImage:`linear-gradient(to right,${green["A400"]},${green["A700"]})`,
        transition:"0.35s ease-out all",
      },
      "&:hover":{
        color:"rgba(0,0,0,1)",
        "&::after":{
          height:"2.5px !important",
          width: "50%",
        }
      },
      "& > span":{
        fontSize:"1.2em",
        fontWeight:"500",
        transition:"color .3s linear",
        textDecoration:"none",
          "&::after":{
            content:"' '",
            display:"block",
            height:"2.5px !important",
            width:"0%",
            backgroundImage:`linear-gradient(to right,${green["A400"]},${green["A700"]})`,
            transition:"0.35s ease-out all",
          },
          "&:hover":{
            color:"rgba(0,0,0,1)",
            "&::after":{
              height:"2.5px !important",
              width: "100%",
            }
          }
      }
    },
    "& span":{
      margin:".3em 1.1em",
      "& > a":{
        fontSize:"inherit",
        whiteSpace:"nowrap",
        width:"100%",
        color:"whitesmoke",
        textDecoration:"none !important"
      }
    }
  },
  button:{
    backgroundColor:"rgba(0,0,0,.7)",
    transition:"all .5s linear",
    color:"white",
    "&:hover":{
      backgroundColor:"rgba(0,0,0,1)"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  socialContainer:{
    backgroundImage:"linear-gradient(-145deg,rgba(0,0,0,.1),rgba(0,0,0,.2),rgba(0,0,0,.4))",
    "& > svg":{
      fontSize:"2.5em",
      margin:theme.spacing(0,2),
      cursor:"pointer",
      transition:"filter .3s ease-in",
      filter:"drop-shadow(2px 4px 4px black)",
      "&:hover":{
        filter:"drop-shadow(-16px 4px 7px)",
      }
    }    
  }
}));

const Navbar = ({context,...props}) => {
  const classes = useStyles();
  const [isOpen,setIsOpen] = React.useState(false)
  const [anchorEl,setAnchorEl] = React.useState(null)


  const handleEl = (e) => {
    setAnchorEl(e.currentTarget)
  }
  
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  console.log(props)
  const jwt = isAuthenticated()
  const atHome = props.history.location.pathname === "/"
  return (
    <>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Toolbar>
          <Link to="/"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <img src={NavImg1} style={{width:"100%"}} />
          </Link>
          <div className={classes.search}>
            {
              !jwt ?
              <>  
                <Link onClick={handleToggle} to="/" >
                  <Typography variant="caption">
                    Subscribe
                  </Typography>
                </Link>
                <Link onClick={handleToggle} to="/" >
                  <Typography variant="caption">
                    Write
                  </Typography>
                </Link>
                <Link onClick={handleToggle} >
                  <Typography variant="caption">
                    Sign in
                  </Typography>
                </Link>
                <Button onClick={handleToggle} className={classes.button}>
                  Get started
                </Button>
                <Login handleMessage={context.handleAlert} open={isOpen} handleToggle={handleToggle}/>
              </>:
              <>
              <Link to="/article/create" >
                <Typography variant="caption">
                  Article
                </Typography>
              </Link>
              <Link>
                  <Typography>
                    <SearchIcon/>
                </Typography>
                </Link>
              <Link>
                  <Typography>
                    <BookmarksOutlinedIcon/>
                </Typography>
                </Link>
              <Link>
                  <Typography>
                    <NotificationsOutlinedIcon/>
                </Typography>
                </Link>
              <Button variant="outlined" >
                Subscribe
              </Button>
              <Link>
                  <Menu handleAlert={context.handleAlert} handleAnchor={handleEl} anchorEl={anchorEl} />
                  <Avatar onClick={handleEl} src={"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"} />
              </Link>
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.socialContainer}>
        <FacebookIcon/>
        <TwitterIcon/>
        <InstagramIcon/>
      </Toolbar>
      {atHome && jwt && <TagsTab/>}
      </>
  );
}

export default withRouter(AlertHOC(Navbar))