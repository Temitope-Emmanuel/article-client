import React from 'react';
import {makeStyles} from "@material-ui/core/styles"
import {Button,Box,Avatar,Typography} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isAuthenticated,clearJwt} from "../auth/auth-helper"
import {lightGreen} from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
    root:{
        "& > div":{
            backgroundColor:"rgba(255,255,255,.8)",
            left: "819px",
            width: "20em",
            maxWidth:"40em"
        }
    },
    linkContainer:{
        borderTop:".05px solid rgba(0,0,0,.3)"
    },
    profileContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        padding:".2em 1em",
        "& div:first-child":{
            marginRight:"auto",
        }
    },
    detailContainer:{
        display:"flex",
        alignItems:"flex-end",
        flexDirection:"column",
        "& > h6":{
            fontSize:"1.3em"
        }
    }
}))

const SimpleMenu = ({anchorEl,handleAlert,handleAnchor,...props}) => {
  const classes = useStyles()
  const jwt = isAuthenticated()
  const handleClose = () => {
    handleAnchor({currentTarget:null})
  };

  const handleLogOut = () => {
      clearJwt()
      handleAlert({
          type:"success",
          message:"Successfully logout"
      })
      handleClose()
  }

  return (
      <Menu className={classes.root}
        id="simple-menu"
        anchorEl={anchorEl}
        elevation={2}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.profileContainer}>
            <Avatar src={"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}/>
            <Box className={classes.detailContainer}>
                <Typography variant="h6" >
                    {jwt.user.username}
                </Typography>
                <Typography component="span" variant="subtitle2" >
                    {jwt.user.email}
                </Typography>
            </Box>
        </Box>
        <Box className={classes.linkContainer}>
            <MenuItem onClick={handleClose}>New story</MenuItem>
            <MenuItem onClick={handleClose}>Stories</MenuItem>
            <MenuItem onClick={handleClose}>Series</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
        </Box>
        <Box className={classes.linkContainer}>
            <MenuItem onClick={handleClose}>Reading list</MenuItem>
            <MenuItem onClick={handleClose}>Publications</MenuItem>
            <MenuItem onClick={handleClose}>Customize your interests</MenuItem>
            <MenuItem onClick={handleClose}>USM Partner Program</MenuItem>
        </Box>
        <Box className={classes.linkContainer}>
            <MenuItem style={{color:lightGreen[300]}} onClick={handleClose}>Become a member</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Help</MenuItem>
            <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
        </Box>
      </Menu>
  );
}

export default SimpleMenu